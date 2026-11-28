#!/usr/bin/env bash
# Every version in CHANGELOG.md gets an annotated vX.Y.Z tag and a GitHub
# Release. Run by the Release workflow after `changesets/action`, so it only
# fills gaps: a version Changesets already tagged and released is left alone.
#
# - A `## X.Y.Z` heading with no tag is tagged on the first commit whose
#   package.json carries that version (its release commit). That covers
#   versions whose publish never happened, e.g. 2.2.1 and 2.2.2.
# - A tag with no GitHub Release gets one, with that version's CHANGELOG
#   section as its notes. Backfilled releases are never marked "latest".
#
# Only main counts: versions come from main's CHANGELOG.md and tags go on
# commits reachable from main. changesets/action leaves the unmerged
# "version packages" commit checked out when it opens the release PR, and
# tagging that would put vX.Y.Z on a commit that never lands (rebase merges
# rewrite it). Set RELEASE_REF to use another ref.
#
# Idempotent: a second run with nothing missing changes nothing. Existing tags
# are never moved or rewritten.
#
# Needs: full history and tags (`fetch-depth: 0`), `gh` with GH_TOKEN, push
# rights for tags. Set DRY_RUN=1 to print what it would do.
set -euo pipefail

repo="${GITHUB_REPOSITORY:?set GITHUB_REPOSITORY=owner/name}"
ref="${RELEASE_REF:-origin/main}"
dry() { if [ "${DRY_RUN:-}" = 1 ]; then echo "  (dry run) $*"; else "$@"; fi; }

notes() { # CHANGELOG section for version $1, without its heading
  awk -v h="## $1" '
    $0 == h { found = 1; next }
    found && /^## / { exit }
    found { print }
  ' <(git show "$ref:CHANGELOG.md") | sed -e '/./,$!d'
}

git fetch --quiet --tags origin "+refs/heads/main:refs/remotes/origin/main"

missing=()
versions=$(grep -E '^## [0-9]+\.[0-9]+\.[0-9]+$' <(git show "$ref:CHANGELOG.md") | sed 's/^## //' | sort -V)

for v in $versions; do
  tag="v$v"
  if git rev-parse -q --verify "refs/tags/$tag" >/dev/null; then continue; fi
  commit=$(git log --reverse --format=%H -G"\"version\": \"$v\"" "$ref" -- package.json | awk "NR == 1")
  if [ -z "$commit" ] || ! git show "$commit:package.json" | grep -F "\"version\": \"$v\"" >/dev/null; then
    echo "::warning::$tag: no commit sets package.json to $v; left untagged"
    continue
  fi
  echo "tag $tag -> ${commit:0:7}"
  dry git tag -a "$tag" "$commit" -m "$tag" -m "$(notes "$v")"
  # GITHUB_TOKEN can't push a ref to a commit whose .github/workflows differ
  # from the default branch ("refusing to allow a GitHub App to create or
  # update workflow ... without `workflows` permission"), which is the case
  # for most old release commits. Don't fail the release over a backfill:
  # warn with the exact command for a maintainer to run, and move on.
  if ! dry git push origin "refs/tags/$tag"; then
    git tag -d "$tag" >/dev/null
    echo "::warning::$tag could not be pushed with GITHUB_TOKEN. Push it by hand: git tag -a $tag ${commit:0:12} -m $tag && git push origin $tag"
    missing+=("$tag")
  fi
done

for v in $versions; do
  tag="v$v"
  git rev-parse -q --verify "refs/tags/$tag" >/dev/null || continue
  if gh api "repos/$repo/releases/tags/$tag" --silent 2>/dev/null; then continue; fi
  echo "release $tag"
  notes "$v" >"${RUNNER_TEMP:-/tmp}/notes-$v.md"
  dry gh release create "$tag" --repo "$repo" --verify-tag --latest=false \
    --title "$tag" --notes-file "${RUNNER_TEMP:-/tmp}/notes-$v.md"
done

if [ ${#missing[@]} -gt 0 ]; then
  echo "::notice::Tags still missing (need a maintainer push): ${missing[*]}"
fi
