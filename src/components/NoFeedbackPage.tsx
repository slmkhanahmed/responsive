import notFoundIcon from "../public/not-found.svg";
import { tw } from "../lib/tailwindest";
import Button from "./Button";

const noFound = tw.style({
  display: "flex",
  // justifyContent: "justify-center",
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

const suggestion = tw.style({
  paddingTop: "pt-[14px]",
  fontSize: "text-[13px]",
  textWrap: "text-balance",
  textAlign: "text-center",
  "@tablet": {
    paddingTop: "tablet:pt-[16px]",
    maxWidth: "tablet:max-w-[410px]",
  },
});

const addFeedback = tw.style({
  paddingTop: "pt-[24px]",
  "@tablet": {
    paddingTop: "tablet:pt-[48px]",
  },
});

export function NoFeedbackPage() {
  return (
    <div className={noFound.class}>
      <img src={notFoundIcon} alt="Not Found Icon" />
      <span className={message.class}>There is no feedback yet.</span>
      <span className={suggestion.class}>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </span>
      <a href={"/new-feedback"} className={addFeedback.class}>
        <Button color="purple">+ Add Feedback</Button>
      </a>
    </div>
  );
}
