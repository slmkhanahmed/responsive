"use client";
import cross from "../public/cross.svg";
import menu from "../public/menu.svg";
import { Dispatch, SetStateAction } from "react";
import { tw } from "../lib/tailwindest";
import { useBreakpoint } from "../lib/useBreakpoint";
import { useImperativeDisableScroll } from "../lib/useImperativeDisableScroll";

const appName = tw.style({
  display: "flex",
  justifyContent: "justify-between",
  alignItems: "items-center",
  paddingX: "px-[24px]",
  paddingY: "py-[4px]",
  height: "h-[72px]",
  "@tablet": {
    width: "tablet:w-[223px]",
    height: "tablet:h-[178px]",
    paddingY: "tablet:py-[24px]",
    borderRadius: "tablet:rounded-xl",
  },
  "@desktop": {
    width: "desktop:w-[255px]",
    paddingY: "desktop:py-[24px]",
    height: "desktop:h-[137px]",
    borderRadius: "desktop:rounded-xl",
  },
});
const name = tw.style({
  placeSelf: "place-self-end",
});

export interface FeedbackAppNameProps {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}
export default function FeedbackAppName({
  menuOpen,
  setMenuOpen,
}: FeedbackAppNameProps) {
  const tablet = useBreakpoint("tablet");
  useImperativeDisableScroll({
    element: document.scrollingElement,
    disabled: menuOpen && !tablet,
  });
  return (
    <div
      className={`${appName.class}`}
      style={{
        background:
          "radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)",
      }}
    >
      <div className={name.class}>
        <h1 className="text-white font-bold text-[15px] tablet:text-[20px] leading-tight ">
          Frontend Mentor
        </h1>
        <h2 className="text-gray-light text-[13px] font-medium tablet:text-[15px]">
          Feedback Board
        </h2>
      </div>
      <div className="tablet:hidden justify-end">
        {menuOpen ? (
          <img
            onClick={() => setMenuOpen && setMenuOpen(false)}
            src={cross}
            alt="Cross Icon"
          />
        ) : (
          <img
            onClick={() => {
              setMenuOpen && setMenuOpen(true);
            }}
            src={menu}
            alt="Menu Icon"
          />
        )}
      </div>
    </div>
  );
}
