"use client";
import { useState } from "react";
import { capitalize } from "../lib/helpers";
import { tw } from "../lib/tailwindest";
const select = tw.style({
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
  color: "text-blue-dark-2",
  outlineStyle: "outline-none",
  fontSize: "text-sm",
  paddingY: "py-[13px]",
  paddingX: "px-[24px]",
  display: "flex",
  justifyContent: "justify-between",
  maxWidth: "max-w-[255px]",
  alignItems: "items-center",
  borderRadius: "rounded-md",
  position: "relative",
  backgroundColor: "bg-gray",
  "@tablet": {
    maxWidth: "tablet:max-w-full",
  },
});

const selectedItem = tw.style({
  fontSize: "text-[15px]",
  paddingLeft: "pl-1",
});

const arrow = tw.toggle({
  truthy: {
    transformRotate: "rotate-180",
  },
  falsy: {},
  base: {
    stroke: "stroke-blue-dark-2",
    transition: "transition ease-out",
    width: "w-2.5",
    height: "h-2.5",
  },
});
const dropdown = tw.toggle({
  truthy: {
    opacity: "opacity-100",
    position: "absolute",
    zIndex: "z-50",
    marginTop: "mt-[55px]",
    "@tablet": {
      width: "tablet:w-full",
    },
  },
  falsy: {
    opacity: "opacity-0",
    height: "h-0",
    width: "w-0",
    zIndex: "-z-50",
  },
  base: {
    transition: "transition ease-in-out",
    maxWidth: "max-w-[255px]",
    backgroundColor: "bg-white",
    boxShadow: "shadow-lg",
    filterDropShadow: "drop-shadow-md",
    borderRadius: "rounded-lg",
    "@dark": {
      backgroundColor: "dark:bg-gray",
      divideColor: "dark:divide-gray-light",
    },
    "@tablet": {
      maxWidth: "tablet:max-w-full",
    },
  },
});

const dropdownList = tw.style({
  divideY: "divide-y",
  divideColor: "divide-gray",
  paddingY: "py-2",
  color: "text-gray-dark",
  "@dark": {
    color: "dark:text-gray-light",
  },
});

const dropdownListItem = tw.style({
  ":hover": {
    color: "hover:text-purple",
  },
  minWidth: "min-w-[255px]",
  display: "flex",
  justifyContent: "justify-between",
  alignItems: "items-center",
  paddingX: "px-[24px]",
  "@tablet": {
    width: "tablet:w-full",
  },
});

const selectContainer = tw.style({
  display: "flex",
  flexDirection: "flex-col",
});

export function Dropdown({
  onChange,
  options,
  defaultOption,
}: {
  onChange?: (option: string) => void;
  defaultOption?: string;
  options: string[];
}) {
  const [selected, setSelected] = useState<string>(defaultOption ?? options[0]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const handleClickItem = (selected: string) => {
    setShowDropdown(false);
    setSelected(selected);
    if (onChange) onChange(selected);
  };
  return (
    <div className={selectContainer.class}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={select.class}
      >
        <span className={selectedItem.class}>
          {selected
            .split("_")
            .map((w) => capitalize(w))
            .join(" ")}
        </span>
        <svg
          className={arrow.class(showDropdown)}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div className={dropdown.class(showDropdown)}>
        <ul className={dropdownList.class}>
          {options.map((o) => (
            <li
              onClick={(e) => {
                e.preventDefault();
                handleClickItem(o);
              }}
              className={dropdownListItem.class}
              key={o}
            >
              <a className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                {o
                  .split("_")
                  .map((w) => capitalize(w))
                  .join(" ")}
              </a>
              <svg
                width="13"
                height="10"
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.96875 4.85894L4.50044 8.39062L12.0004 0.890625"
                  stroke="#AD1FEA"
                  strokeWidth={o === selected ? "2" : "0"}
                />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
