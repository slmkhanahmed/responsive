import { ChangeEventHandler, forwardRef } from "react";
import { tw } from "../lib/tailwindest";
const input = tw.variants({
  variants: {
    type: {
      normal: {
        ":active": {
          borderColor: "active:border-blue",
          borderWidth: "active:border-[1.5px]",
          borderStyle: "active:border-solid",
        },
        ":focus": {
          borderColor: "focus:border-blue",
          borderWidth: "focus:border-[1.5px]",
          borderStyle: "focus:border-solid",
        },
      },
      error: {
        borderColor: "border-red",
        borderWidth: "border-[1.5px]",
        borderStyle: "border-solid",
      },
    },
  },
  base: {
    outlineStyle: "outline-none",
    backgroundColor: "bg-gray",
    borderRadius: "rounded-md",
    paddingX: "px-[12px]",
    paddingY: "py-[6.5px]",
    fontSize: "text-[15px]",
  },
});

const inputContainer = tw.style({
  display: "flex",
  maxHeight: "max-h-[48px]",
  maxWidth: "max-w-[255px]",
  flexDirection: "flex-col",
  gap: "gap-1",
  "@tablet": {
    maxWidth: "tablet:max-w-full",
  },
});

const message = tw.style({
  color: "text-red",
  fontSize: "text-[14px]",
});

export const TextField = forwardRef<
  HTMLInputElement,
  {
    isError?: boolean;
    value?: string;
    errorMessage?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
  }
>(({ isError = false, errorMessage, onChange, value }, ref) => {
  return (
    <div className={inputContainer.class}>
      <input
        value={value}
        onChange={onChange}
        className={input.class({
          type: isError ? "error" : "normal",
        })}
        ref={ref}
      />
      {isError && errorMessage && (
        <span className={message.class}>{errorMessage}</span>
      )}
    </div>
  );
});

TextField.displayName = "TextField";
