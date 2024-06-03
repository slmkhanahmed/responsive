"use client";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  return (
    <Button height={height} color={color} icon onClick={() => router.back()}>
      {children}
    </Button>
  );
}

export default BackButton;
