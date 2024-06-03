"use client";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { TextField } from "../components/TextField";
import { tw } from "../lib/tailwindest";
import initial_data from "../public/data.json";
import PenIcon from "../public/pen.svg";
import { notFound, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useLocalStorageState from "use-local-storage-state";

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

export default function EditFeedback({
  params: { "feedback-id": productRequestId },
}: {
  params: { "feedback-id": string };
}) {
  const [data, setData] = useLocalStorageState("data", {
    defaultValue: initial_data,
  });
  const productRequest = data.productRequests.find(
    (pr) => pr.id.toString() === productRequestId,
  );
  if (!productRequest) {
    notFound();
  }
  const router = useRouter();
  const [title, setTitle] = useState(productRequest.title);
  const [titleError, setTitleError] = useState<string | undefined>();
  const titleRef = useRef(null);
  const [desc, setDesc] = useState(productRequest.description);
  const [category, setCategory] = useState<string>(productRequest.category);
  const [status, setStatus] = useState<string>(productRequest.status);

  const DeleteFeedback = () => {
    data.productRequests = data.productRequests.filter(
      (pr) => pr.id.toString() !== productRequestId,
    );
    toast.success("Feedback deleted successfully!");
    setData(data);
    router.back();
    router.back();
  };

  const EditFeedback = () => {
    if (title.length < 5) {
      setTitleError("Title must be at least 5 characters long");
      /* @ts-ignore */
      titleRef.current?.focus();
      return;
    }
    const productRequest = data.productRequests.find(
      (pr) => pr.id.toString() === productRequestId,
    );
    if (!productRequest) {
      notFound();
    }
    productRequest.title = title;
    productRequest.category = category;
    productRequest.status = status;
    productRequest.description = desc;
    setData(data);
    toast.dismiss();
    toast.success("Feedback edited successfully!");
  };
  return (
    <div className={formPage.class}>
      <div className={back.class}>
        <BackButton color="gray">Go Back</BackButton>
      </div>
      <div className={form.class}>
        <img
          className="absolute -top-5 left-5"
          src={PenIcon}
          alt="pen icon"
        />
        <div className={heading.class}>
          Editing &apos;{productRequest.title}&apos;
        </div>
        <div className={section.class}>
          <span className={sectionTitle.class}>Feedback Title</span>
          <span className={sectionDesc.class}>
            Add a short, descriptive headline
          </span>
          <TextField
            value={title}
            errorMessage={titleError}
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
              defaultOption={productRequest.category}
              options={["Feature", "UI", "UX", "Enhancement", "Bug"]}
            />
          </div>
        </div>
        <div className={section.class}>
          <span className={sectionTitle.class}>Update Status</span>
          <span className={sectionDesc.class}>Change feature state</span>
          <div className="relative">
            <Dropdown
              onChange={(option) => {
                setStatus(option);
              }}
              defaultOption={productRequest.status}
              options={["planned", "in-progress", "live"]}
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
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            name=""
            id=""
            cols={5}
            rows={10}
          />
        </div>
        <div className="flex flex-col gap-[16px] tablet:flex-row-reverse tablet:justify-between">
          <div className="flex flex-col gap-[16px] tablet:flex-row-reverse tablet:justify-start">
            <Button onClick={EditFeedback} color="purple">
              Save Changes
            </Button>
            <Button color="dark-blue">Cancel</Button>
          </div>
          <Button onClick={DeleteFeedback} color="red">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
