import { GetVariants, Tailwindest } from "tailwindest";
import Button, { coloredButton } from "./Button";

function BackButton({
  color = "gray",
  height,
  children,
}: React.PropsWithChildren<{
  color: GetVariants<typeof coloredButton>;
  height?: Tailwindest["height"];
  className?: string;
}>) {
  return (
    <Button
      height={height}
      color={color}
      icon
      onClick={() => window.history.back()}
    >
      {children}
    </Button>
  );
}

export default BackButton;
