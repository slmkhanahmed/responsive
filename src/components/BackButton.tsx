import { useHistory } from "react-router-dom";
import { GetVariants, Tailwindest } from "tailwindest";
import Button, { coloredButton } from "./Button";

export function useBackToFeedback() {
  const history = useHistory();
  return () => {
    if (history.location.key) {
      history.goBack();
    } else {
      history.replace("/");
    }
  };
}

function BackButton({
  color = "gray",
  height,
  children,
}: React.PropsWithChildren<{
  color: GetVariants<typeof coloredButton>;
  height?: Tailwindest["height"];
  className?: string;
}>) {
  const goBack = useBackToFeedback();
  return (
    <Button
      height={height}
      color={color}
      icon
      onClick={goBack}
    >
      {children}
    </Button>
  );
}

export default BackButton;
