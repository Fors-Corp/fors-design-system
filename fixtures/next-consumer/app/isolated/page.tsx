import { Button, type ButtonProps } from "@fors-corp/fors-design-system/button";
import { TokenProbe } from "./token-probe";

const buttonProps: ButtonProps = { variant: "secondary", loading: true };

export default function IsolatedPage() {
  return (
    <main>
      <Button {...buttonProps} data-testid="isolated-button">
        Deploy
      </Button>
      <TokenProbe />
    </main>
  );
}
