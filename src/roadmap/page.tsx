"use client";
import commentIcon from "../public/comment.svg";
import initial_data from "../public/data.json";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import {
  BLUE_COLOR,
  Circle,
  color,
  ORANGE_COLOR,
  PURPLE_COLOR,
} from "../components/Circle";
import { LinkButton } from "../components/LinkButton";
import type { ProductRequest } from "../components/ProductRequest";
import { UpArrow } from "../components/UpArrow";
import { capitalize } from "../lib/helpers";
import { tw } from "../lib/tailwindest";
type Status = "in-progress" | "planned" | "live";
const card = tw.rotary({
  live: {
    borderTopColor: "border-t-blue",
  },
  planned: {
    borderTopColor: "border-t-orange-light",
  },
  "in-progress": {
    borderTopColor: "border-t-purple",
  },
  base: {
    borderTopWidth: "border-t-[6px]",
    backgroundColor: "bg-white",
    padding: "p-[24px]",
    borderRadius: "rounded-lg",
    "@tablet": {
      maxWidth: "tablet:max-w-[223px]",
      padding: "tablet:p-[18px]",
    },
    "@desktop": {
      maxWidth: "desktop:max-w-[350px]",
      padding: "desktop:p-[32px]",
    },
  },
});

const commentIconContainer = tw.style({
  display: "flex",
  color: "text-gray-dark",
  fontWeight: "font-bold",
  fontSize: "text-[13px]",
  justifyContent: "justify-center",
  alignItems: "items-center",
  gap: "gap-1",
});

const indexToColor = (index: number, string = true) => {
  switch (index) {
    case 0:
      return string ? "orange-light" : ORANGE_COLOR;
    case 1:
      return string ? "purple" : PURPLE_COLOR;
    case 2:
      return string ? "blue" : BLUE_COLOR;
  }
};
const linkButton = tw.style({
  paddingY: "py-[4px]",
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
  display: "flex",
  paddingX: "px-[14px]",
  borderRadius: "rounded-lg",
  alignItems: "items-center",
  gapY: "gap-y-2",
  justifyContent: "justify-center",
  transition: "transition ease-in-out",
  maxWidth: "max-w-max",
  gap: "gap-3",
  height: "h-[minmax(30px,max-content)]",
  fontSize: "text-[13px]",
  transitionDuration: "duration-300",
});

const HorizontalLinkButton = ({
  children,
  onClick,
}: {
  children: string;
  onClick?: (val: string) => void;
}) => (
  <button
    className={linkButton.class}
    onClick={(e) => {
      e.preventDefault();
      if (onClick) onClick(children);
    }}
  >
    <UpArrow />
    <span>{children}</span>
  </button>
);

const statuses = ["planned", "in-progress", "live"];
function FeatureCard({ feature }: { feature: ProductRequest }) {
  const [data, setData] = useLocalStorageState("data", {
    defaultValue: initial_data,
  });
  const UpvoteFeedback = () => {
    const post = data.productRequests.find((pr) => pr.id === feature.id);
    if (!post) return;
    if (!post.upvotes) post.upvotes = 1;
    else post.upvotes = post.upvotes + 1;
    setData(data);
  };
  return (
    <div className={card.class(feature.status as Status)}>
      <div className="flex flex-row gap-2 text-gray-dark justify-start items-center">
        <Circle
          color={
            indexToColor(
              statuses.findIndex((v) => v === feature.status),
              false,
            ) as color
          }
        />
        <span className="text-[13px] desktop:text-[16px]">
          {capitalize(feature.status)}
        </span>
      </div>
      <p className="text-[13px] desktop:text-[18px] pt-[14px] font-bold text-blue-dark-2">
        {feature.title}
      </p>
      <p className="pt-[8px] desktop:text-[16px] text-[13px] pb-[8px]  text-gray-dark">
        {feature.description}
      </p>
      <LinkButton>{capitalize(feature.category)}</LinkButton>
      <div className="pt-[16px] flex justify-between items-center">
        <HorizontalLinkButton onClick={UpvoteFeedback}>
          {feature.upvotes.toString()}
        </HorizontalLinkButton>
        <div className={commentIconContainer.class}>
          <img src={commentIcon} alt="comment icon" />
          <span>{feature.comments?.length ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
export default function Roadmap() {
  const [data] = useLocalStorageState("data", { defaultValue: initial_data });
  const [tab, setTab] = useState(0);
  const tab_data = {
    Planned: data.productRequests.filter((pr) => pr.status === "planned"),
    "In-Progress": data.productRequests.filter(
      (pr) => pr.status === "in-progress",
    ),
    Live: data.productRequests.filter((pr) => pr.status === "live"),
  };

  return (
    <div className="max-w-[1110px] mb-[98px] tablet:mx-auto tablet:mt-[56px] tablet:w-max">
      <div className="flex tablet:rounded-lg  justify-between items-center px-[24px] py-[26px] bg-blue-dark-2">
        <div className="flex flex-col items-center gap-0">
          <BackButton height="h-[13px]" color="dark-blue">
            Go Back
          </BackButton>
          <span className="text-[18px] font-bold text-white">Roadmap</span>
        </div>
        <a href={"/new-feedback"}>
          <Button color="purple">+ Add Feedback</Button>
        </a>
      </div>
      {/* Mobile Tabs */}
      <div className="tablet:hidden">
        <div className="flex w-full justify-evenly ">
          {Object.keys(tab_data).map((key, index) => (
            <button
              key={key}
              onClick={() => setTab(index)}
              className={`${
                tab === index
                  ? `border-b-[6px] border-[${indexToColor(index, false)}]`
                  : "border-b-[1px] border-gray-dark text-gray-dark"
              } font-bold  w-full gap-0 py-[26px]`}
            >
              {/* @ts-ignore */}
              {key} ({tab_data[key].length})
            </button>
          ))}
        </div>
        <div className="p-[24px]">
          <span className="font-bold text-blue-dark-2 text-[18px]">
            {Object.keys(tab_data)[tab]} ({/* @ts-ignore */}
            {tab_data[Object.keys(tab_data)[tab]].length})
          </span>
          <p className="text-gray-dark">
            {tab === 0 && "Ideas prioritized for research"}
            {tab === 1 && "Currently being developed"}
            {tab === 2 && "Released features"}
          </p>
          {/* @ts-ignore */}
          <div className="flex flex-col pt-[24px] gap-[24px]">
            {/* @ts-ignore */}
            {tab_data[Object.keys(tab_data)[tab]].map((pr) => (
              <FeatureCard key={pr.id} feature={pr} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Columns */}
      <div className="hidden tablet:flex gap-[10px] desktop:gap-[30px]">
        <div className="flex flex-col">
          <p className=" text-blue-dark-2 font-bold text-[14px] desktop:text-[18px] w-full gap-0 pt-[26px]">
            Planned ({tab_data.Planned.length})
          </p>
          <p className="text-[14px] desktop:text-[16px] text-gray-dark">
            Ideas prioritized for research
          </p>
          <div className="flex flex-col  pt-[24px] gap-[24px]">
            {/* @ts-ignore */}
            {tab_data.Planned.map((pr) => (
              <FeatureCard key={pr.id} feature={pr} />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <p className=" text-blue-dark-2 font-bold text-[14px] desktop:text-[18px]  w-full gap-0 pt-[26px]">
            In-Progress ({tab_data["In-Progress"].length})
          </p>
          <p className="text-[14px] desktop:text-[16px] text-gray-dark">
            Currently being developed
          </p>
          <div className="flex flex-col  pt-[24px] gap-[24px]">
            {/* @ts-ignore */}
            {tab_data["In-Progress"].map((pr) => (
              <FeatureCard key={pr.id} feature={pr} />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <p className=" text-blue-dark-2 font-bold text-[14px] desktop:text-[18px]  w-full gap-0 pt-[26px]">
            Live ({tab_data.Live.length})
          </p>
          <p className="text-[14px] desktop:text-[16px] text-gray-dark">
            Currently being developed
          </p>
          <div className="flex flex-col  pt-[24px] gap-[24px]">
            {/* @ts-ignore */}
            {tab_data.Live.map((pr) => (
              <FeatureCard key={pr.id} feature={pr} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
