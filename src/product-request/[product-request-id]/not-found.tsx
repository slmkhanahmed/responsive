import { tw } from "../../lib/tailwindest";
import notFoundIcon from "../../public/not-found.svg";
const noFound = tw.style({
  display: "flex",
  flexDirection: "flex-col",
  paddingY: "py-[76px]",
  paddingX: "px-[25px]",
  marginX: "mx-[25px]",
  marginTop: "mt-[32px]",
  marginBottom: "mb-[47px]",
  backgroundColor: "bg-white",
  borderRadius: "rounded-lg",
  alignItems: "items-center",
  color: "text-gray-dark",
  "@tablet": {
    marginTop: "tablet:mt-[0px]",
  },
});

const message = tw.style({
  paddingTop: "pt-[39px]",
  color: "text-blue-dark-2",
  fontSize: "text-[18px]",
  fontWeight: "font-bold",
  "@tablet": {
    paddingTop: "tablet:pt-[53px]",
  },
});

export default function NotFoundFeedback() {
  return (
    <div className={noFound.class}>
      <img src={notFoundIcon} alt="Not Found Icon" />
      <span className={message.class}>Feedback Not Found.</span>
    </div>
  );
}
