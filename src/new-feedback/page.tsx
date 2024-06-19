import initial_data from "../public/data.json";
import PlusIcon from "../public/plus.svg";

import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { TextField } from "../components/TextField";
import { tw } from "../lib/tailwindest";
import { useLocalStorage } from "../lib/useLocalStorage";

const formPage = tw.style({
  marginX: "mx-[25px]",
  marginTop: "mt-[35px]",
  marginBottom: "mb-[77px]",
  "@tablet": {
    marginX: "tablet:mx-auto",
    maxWidth: "tablet:max-w-[540px]",
  },
});

const form = tw.style({
  borderRadius: "rounded-lg",
  backgroundColor: "bg-white",
  position: "relative",
  padding: "p-[24px]",
  display: "flex",
  flexDirection: "flex-col",
  gap: "gap-[24px]",
  "@tablet": {
    paddingX: "tablet:px-[42px]",
    paddingBottom: "tablet:pb-[40px]",
  },
});

const back = tw.style({
  marginBottom: "mb-[35px]",
});

const heading = tw.style({
  paddingTop: "pt-[24px]",
  color: "text-blue-dark-2",
  fontWeight: "font-bold",
  fontSize: "text-[18px]",
});

const section = tw.style({
  display: "flex",
  flexDirection: "flex-col",
  gap: "gap-[8px]",
});

const sectionTitle = tw.style({
  color: "text-blue-dark-2",
  fontWeight: "font-bold",
  fontSize: "text-[13px]",
});

const sectionDesc = tw.style({
  fontSize: "text-[13px]",
  color: "text-gray-dark",
});

const Categories = ["Feature", "UI", "UX", "Enhancement", "Bug"];

export default function NewFeedback() {
  const { data, setData } = useLocalStorage(initial_data);

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState<string | undefined>();
  const titleRef = useRef(null);
  const [category, setCategory] = useState<string | undefined>(Categories[0]);
  const [feedbackDetail, setFeedbackDetail] = useState("");

  const AddFeedback = () => {
    if (title.length < 5) {
      setTitleError("Title must be at least 5 characters long");
      /* @ts-ignore */
      titleRef.current?.focus();
      return;
    }
    data.productRequests.push({
      id:
        data.productRequests.length === 0
          ? 1
          : data.productRequests.length === 1
            ? data.productRequests[0].id + 1
            : data.productRequests.reduce((a, b) => (a.id > b.id ? a : b)).id +
              1,
      title: title,
      category: category ?? "",
      upvotes: 0,
      status: "suggestion",
      description: feedbackDetail,
      comments: [],
    });
    setData(data);
    toast.dismiss();
    toast.success("Feedback added successfully!");
  };
  return (
    <div className={formPage.class}>
      <Toaster />
      <div className={back.class}>
        <BackButton color="gray">Go Back</BackButton>
      </div>
      <div className={form.class}>
        <img className="absolute -top-5 left-5" src={PlusIcon} alt="+ icon" />
        <div className={heading.class}>Create New Feedback</div>
        <div className={section.class}>
          <span className={sectionTitle.class}>Feedback Title</span>
          <span className={sectionDesc.class}>
            Add a short, descriptive headline
          </span>
          <TextField
            ref={titleRef}
            errorMessage={titleError}
            value={title}
            isError={titleError !== undefined}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.length < 5) {
                setTitleError("Title must be at least 5 characters long");
              } else {
                setTitleError(undefined);
              }
            }}
          />
        </div>
        <div className={section.class}>
          <span className={sectionTitle.class}>Category</span>
          <span className={sectionDesc.class}>
            Choose a category for your feedback
          </span>
          <div className="relative">
            <Dropdown
              onChange={(option) => {
                setCategory(option);
              }}
              options={Categories}
              defaultOption={Categories[0]}
            />
          </div>
        </div>
        <div className={`static ${section.class}`}>
          <span className={sectionTitle.class}>Feedback Detail</span>
          <span className={sectionDesc.class}>
            Include any specific comments on what should be improved, added,
            etc.
          </span>
          <textarea
            className="h-[120px] resize-none bg-gray  p-4 rounded-lg active:outline-blue focus:outline-blue"
            value={feedbackDetail}
            onChange={(e) => setFeedbackDetail(e.target.value)}
            cols={5}
            rows={10}
          />
        </div>
        <div className="flex flex-col gap-[16px] tablet:flex-row-reverse tablet:justify-start">
          <Button onClick={AddFeedback} color="purple">
            Add Feedback
          </Button>
          <Button onClick={() => window.history.back()} color="dark-blue">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
