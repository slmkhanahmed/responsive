import bulb from "../public/bulb.svg";
import initial_data from "../public/data.json";
import useLocalStorageState from "use-local-storage-state";
import { tw } from "../lib/tailwindest";
import Button from "./Button";
import { SortBy } from "./SortBy";
const titleBar = tw.style({
  display: "flex",
  position: "relative",
  maxWidth: "max-w-[825px]",
  maxHeight: "max-h-[92px]",
  alignItems: "items-center",
  justifyContent: "justify-between",
  backgroundColor: "bg-blue-dark-2",
  paddingX: "px-[10px]",
  borderRadius: "rounded-none",
  "@tablet": {
    paddingX: "tablet:px-[20px]",
    borderRadius: "tablet:rounded-md",
    justifyContent: "tablet:justify-between",
    marginX: "tablet:mx-[24px]",
    marginTop: "tablet:mt-[40px]",
    marginBottom: "tablet:mb-[20px]",
  },
  "@desktop": {
    marginTop: "desktop:mt-0",
    gridColumnStart: "desktop:col-start-2",
    gridColumnEnd: "desktop:col-end-2",
   
  },
});
export function SuggestionsTitleBar() {
  const [data, setData] = useLocalStorageState("data", {
    defaultValue: initial_data,
  });
  return (
    <div className={titleBar.class}>
      <div className="flex justify-center items-center">
        <div className="tablet:flex gap-[16px] justify-center hidden items-center">
          <img src={bulb} alt="" />
          <div className="text-white font-bold text-[18px]">
            <span>
              {
                data.productRequests.filter((pr) => pr.status === "suggestion")
                  .length
              }
            </span>{" "}
            <span>Suggestions</span>
          </div>
        </div>
        <SortBy />
      </div>
      <a href={"/new-feedback"}>
        <Button color="purple">+ Add Feedback</Button>
      </a>
    </div>
  );
}
