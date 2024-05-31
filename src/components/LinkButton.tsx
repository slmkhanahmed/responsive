"use client";
import { tw } from "../lib/tailwindest";
import { UpArrow } from "./UpArrow";

const linkButton = tw.variants({
  variants: {
    type: {
      icon: {
        paddingY: "py-[8px]",
        fontWeight: "font-bold",
        flexDirection: "flex-row",
        backgroundColor: "bg-blue-lightest",
        stroke: "stroke-blue",
        ":hover": {
          backgroundColor: "hover:bg-blue-lighter",
        },
        ":active": {
          backgroundColor: "active:bg-blue",
          color: "active:text-white",
          stroke: "active:stroke-gray",
        },
        "@tablet": {
          flexDirection: "tablet:flex-col",
        },
      },
      "no-icon": {
        paddingY: "py-[4px]",
        fontWeight: "font-semibold",
        color: "text-blue",
        backgroundColor: "bg-blue-lightest",
        ":hover": {
          backgroundColor: "hover:bg-blue-lighter",
        },
        ":active": {
          backgroundColor: "active:bg-blue",
          color: "active:text-white",
        },
      },
    },
    canActivate: {
      true: {
        backgroundColor: "bg-blue",
        color: "text-white",
      },
      false: {},
    },
  },
  base: {
    display: "flex",
    paddingX: "px-[14px]",
    borderRadius: "rounded-lg",
    alignItems: "items-center",
    gapY: "gap-y-2",
    justifyContent: "justify-center",
    transition: "transition ease-in-out",
    maxWidth: "max-w-max",
    gap: "gap-4",
    height: "h-[minmax(30px,max-content)]",
    fontSize: "text-[13px]",
    transitionDuration: "duration-300",
  },
});

export function LinkButton({
  onClick,
  activated = false,
  children,
  icon = false,
}: {
  onClick?: (value: string) => void;
  activated?: boolean;
  icon?: boolean;
  children: string;
}) {
  return (
    <button
      className={linkButton.class({
        type: icon ? "icon" : "no-icon",
        canActivate: activated,
      })}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(children);
      }}
    >
      {icon && <UpArrow />}
      <span>{children}</span>
    </button>
  );
}
