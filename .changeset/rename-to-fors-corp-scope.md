---
"@fors-corp/fors-design-system": major
---

**Breaking: the package is renamed from `@marcfs31/fors-design-system` to
`@fors-corp/fors-design-system`.** Nothing about the API, exports or styling
changes — only the package name, and therefore every import path and the
`.npmrc` scope line.

The repository moved to the `Fors-Corp` organisation, and GitHub Packages ties a
scope to its owner: a Fors-Corp repository's `GITHUB_TOKEN` cannot publish into
the user-owned `@marcfs31` scope. Publishing had failed with
`403 permission_denied` since the transfer, leaving the registry stuck at 2.2.0
while `main` moved on. Renaming the scope to match the owning organisation is
what the sibling `@fors-corp/forsight` package already does successfully against
the same registry with the same token.

To migrate, in each consuming repo:

```diff
-@marcfs31:registry=https://npm.pkg.github.com
+@fors-corp:registry=https://npm.pkg.github.com
```

```diff
-import { Button } from "@marcfs31/fors-design-system";
-import "@marcfs31/fors-design-system/styles.css";
+import { Button } from "@fors-corp/fors-design-system";
+import "@fors-corp/fors-design-system/styles.css";
```

The `/theme`, `/icons`, `/styles.css`, `/fonts.css`, `/tokens.css`,
`/tailwind.css` and `/tailwind-preset` subpaths are unchanged apart from the
scope. Versions up to 2.2.0 remain published under the old name; 2.2.1 and 2.2.2
were never published, because the registry rejected them.
