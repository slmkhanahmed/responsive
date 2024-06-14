import initial_data from "../public/data.json";
import { tw } from "../lib/tailwindest";
import { BLUE_COLOR, Circle, ORANGE_COLOR, PURPLE_COLOR } from "./Circle";
import { useLocalStorage } from '../lib/useLocalStorage';
const summaryContainer = tw.style({
  display: "flex",
  flexDirection: "flex-col",
  gap: "gap-[12px]",
  padding: "p-[18px]",
  borderRadius: "rounded-xl",
  maxWidth: "max-w-[255px]",
  backgroundColor: "bg-white",
  width: "w-[223px]",
  "@tablet": {
    height: "tablet:h-[178px]",
  },
  "@desktop": {
    width: "desktop:w-[255px]",
  },
});
const summaryHeader = tw.style({
  display: "flex",
  alignItems: "items-center",
  justifyContent: "justify-between",
});
const summaryHeaderTitle = tw.style({
  fontWeight: "font-bold",
  fontSize: "text-[18px]",
  color: "text-blue-dark-2",
});
const summaryHeaderLink = tw.style({
  fontWeight: "font-semibold",
  fontSize: "text-[13px]",
  textDecorationLine: "underline",
  color: "text-blue-dark-1",
});
const summaryContentName = tw.style({
  display: "flex",
  alignItems: "items-center",
  fontWeight: "font-normal",
  gap: "gap-[16px]",
});
const summaryContent = tw.style({
  display: "flex",
  justifyContent: "justify-between",
  alignItems: "items-center",
  fontWeight: "font-bold",
  color: "text-gray-dark",
});
export function RoadmapSummary() {
  const { data, setData } = useLocalStorage(initial_data);

  return (
    <div className={summaryContainer.class}>
      <div className={summaryHeader.class}>
        <span className={summaryHeaderTitle.class}>Roadmap</span>
        <a className={summaryHeaderLink.class} href="/roadmap">
          View
        </a>
      </div>

      <div>
        <div className={summaryContent.class}>
          <span className={summaryContentName.class}>
            <Circle color={ORANGE_COLOR} />
            <span>Planned</span>
          </span>
          <span>
            {data.productRequests.reduce(
              (c, pr) => (pr.status === "planned" ? c + 1 : c),
              0,
            )}
          </span>
        </div>
        <div className={summaryContent.class}>
          <span className={summaryContentName.class}>
            <Circle color={PURPLE_COLOR} />
            <span>In-Progress</span>
          </span>
          <span>
            {data.productRequests.reduce(
              (c, pr) => (pr.status === "in-progress" ? c + 1 : c),
              0,
            )}
          </span>
        </div>
        <div className={summaryContent.class}>
          <span className={summaryContentName.class}>
            <Circle color={BLUE_COLOR} />
            <span>Live</span>
          </span>
          <span>
            {data.productRequests.reduce(
              (c, pr) => (pr.status === "live" ? c + 1 : c),
              0,
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
