"use client";

import { useForsTokens, type ForsTokenName } from "@fors-corp/fors-design-system/use-fors-tokens";

const tokenName: ForsTokenName = "--fors-accent";

export function TokenProbe() {
  const tokens = useForsTokens([tokenName] as const);
  return <output data-testid="isolated-token">{tokens[tokenName] || "hydrating"}</output>;
}
