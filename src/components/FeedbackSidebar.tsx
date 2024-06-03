"use client";

import { lazy } from 'react';
import { useState } from "react";
import { tw } from "../lib/tailwindest";
import { CategorySelection } from "./CategorySelection";
import { RoadmapSummary } from "./RoadmapSummary";
const FeedbackAppName = lazy(() => import('./FeedbackAppName'));
const sidebar = tw.toggle({
  truthy: {
    display: "flex",
    alignItems: "items-end",
    position: "absolute",
    zIndex: "z-[900]",
    right: "-right-0",
    height: "h-[100vh]",
    width: "w-max",
    padding: "p-[24px]",
  },
  falsy: {},
  base: {
    backgroundColor: "bg-gray",

    flexDirection: "flex-col",
    gap: "gap-[24px]",
    display: "hidden",
    "@tablet": {
      alignItems: "tablet:items-start",
      width: "tablet:w-max",
      position: "tablet:static",
      height: "tablet:h-max",
      zIndex: "tablet:-z-0",
      display: "tablet:flex",
      padding: "tablet:p-0",
      flexDirection: "tablet:flex-row",
    },
    "@desktop": {
      display: "desktop:flex",
      flexDirection: "desktop:flex-col",
    },
  },
});
export function SidebarMenu({ menuOpen }: { menuOpen: boolean }) {
  return (
    <div>
      <div className={shade.class(menuOpen)}></div>
      <div className={sidebar.class(menuOpen)}>
        <CategorySelection />
        <RoadmapSummary />
      </div>
    </div>
  );
}
const sidebarContainer = tw.style({
  position: "relative",
  zIndex: "z-10",
  "@tablet": {
    display: "tablet:flex",
    marginX: "tablet:mx-[24px]",
    marginTop: "tablet:mt-[56px]",
    alignItems: "tablet:items-center",
    gap: "tablet:gap-[24px]",
  },
  "@desktop": {
    display: "desktop:flex",
    gap: "desktop:gap-[24px]",
    flexDirection: "desktop:flex-col",
    gridColumnStart: "desktop:col-start-1",
    gridColumnEnd: "desktop:col-end-1",
    gridRow: "desktop:row-span-2",
    alignItems: "desktop:items-end",
    marginX: "desktop:mx-0",
    marginTop: "desktop:mt-0",
  },
});
const shade = tw.toggle({
  truthy: {
    display: "flex",
  },
  falsy: {
    display: "hidden",
  },
  base: {
    position: "fixed",
    width: "w-full",
    height: "h-full",
    backgroundColor: "bg-black",
    opacity: "opacity-50",
    zIndex: "z-[800]",
    "@tablet": {
      display: "tablet:hidden",
    },
  },
});
export function FeedbackSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={sidebarContainer.class}>
      <FeedbackAppName menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <SidebarMenu menuOpen={menuOpen} />
    </div>
  );
}
