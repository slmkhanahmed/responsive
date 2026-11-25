import { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import { GetVariants, Tailwindest } from "tailwindest";
import { tw } from "../lib/tailwindest";
import { LeftArrow } from "./LeftArrow";
const button = tw.toggle({
  truthy: {
    color: "text-gray-dark",
  },
  falsy: {
    color: "text-white",
  },
  base: {
    display: "flex",
    alignItems: "items-center",
    justifyContent: "justify-center",
    paddingX: "px-[16px]",
    paddingY: "py-[12px]",
    fontWeight: "font-bold",
    height: "h-max",
    borderRadius: "rounded-md",
    transition: "transition ease-in-out",
    gap: "gap-4",
    fontSize: "text-sm",
    transitionDuration: "duration-300",
    "@tablet": {
      paddingX: "tablet:px-[24px]",
    },
  },
});

const iconButton = tw.toggle({
  truthy: {
    ":hover": {
      textDecorationLine: "hover:underline",
    },
  },
  falsy: {
    ":hover": {
      opacity: "hover:opacity-75",
    },
  },
});

export const coloredButton = tw.rotary({
  purple: {
    backgroundColor: "bg-purple",
  },
  blue: {
    backgroundColor: "bg-blue",
  },
  "dark-blue": {
    backgroundColor: "bg-blue-dark-2",
  },
  red: {
    backgroundColor: "bg-red",
  },
  white: {
    backgroundColor: "bg-white",
    stroke: "stroke-blue",
  },
  gray: {
    backgroundColor: "bg-gray-light",
    stroke: "stroke-blue",
  },
  base: {
    stroke: "stroke-gray",
  },
});

const Button = ({
  onClick,
  to,
  height,
  color,
  icon = false,
  children,
}: {
  height?: Tailwindest["height"];
  color: GetVariants<typeof coloredButton>;
  icon?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  to?: string;
  children: ReactNode;
}) => {
  const className = tw.mergeProps(
    button.style(["white", "gray"].includes(color)),
    coloredButton
      .compose(
        iconButton.style(!!icon || ["white", "gray"].includes(color)),
        { height },
      )
      .style(color),
  );
  const content = (
    <>
      {icon && <LeftArrow />}
      <span>{children}</span>
    </>
  );
  return to ? (
    <Link to={to} className={className}>{content}</Link>
  ) : (
    <button onClick={onClick} className={className}>{content}</button>
  );
};

export default Button;
