import React from 'react'
import initial_data from "../public/data.json";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { tw } from "../lib/tailwindest";
import Button from "./Button";
import { useLocalStorage } from '../lib/useLocalStorage';

const comment_box = tw.style({
  paddingBottom: "pb-[32px]",
});
const replies = tw.style({
  borderLeftColor: "border-l-gray",
  borderLeftWidth: "border-l-[1px]",
  paddingLeft: "pl-[23px]",
});
const commenter = tw.style({
  display: "flex",
  flexDirection: "flex-row",
  gap: "gap-[16px]",
  justifyContent: "justify-start",
  alignItems: "items-center",
});

const commentHead = tw.style({
  display: "flex",
  justifyContent: "justify-between",
});
const content = tw.style({
  color: "text-gray-dark",
  paddingTop: "pt-[16px]",
});

const replyButton = tw.style({
  fontWeight: "font-bold",
  color: "text-blue",
  ":hover": {
    textDecorationLine: "hover:underline",
  },
});

export function Reply({
  commentId,
  reply,
  commenterName,
  commenterUsername,
}: {
  commentId: number;
  reply: {
    content: string;
    replyingTo: string;
    user: {
      image: string;
      name: string;
      username: string;
    };
  };
  commenterName: string;
  commenterUsername: string;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  return (
    <div key={crypto.randomUUID()} className="pt-[23px]">
      <div className={commentHead.class}>
        <div className={commenter.class}>
          <img
            className="rounded-full"
            src={
              // TODO: temporary fix for image assets. Remove this once the images are hosted.
              reply.user.image?.replace(".", "") ??
              "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
            }
            width={40}
            height={40}
            alt={`${reply.user.name} Avatar`}
          />
          <div>
            <p className="text-blue-dark font-bold">{commenterName}</p>
            <p className="text-gray-dark text-sm">{commenterUsername}</p>
          </div>
        </div>
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className={replyButton.class}
        >
          Reply
        </button>
      </div>
      <p className={content.class}>
        <span className="text-purple font-bold">{`@${reply.replyingTo}`}</span>{" "}
        {reply.content}
      </p>
      {showReplyForm && (
        <ReplyForm commentId={commentId} setShowReplyForm={setShowReplyForm} />
      )}
    </div>
  );
}

function ReplyForm({
  commentId,
  setShowReplyForm,
}: {
  commentId: number;
  setShowReplyForm?: (show: boolean) => void;
}) {
  const [reply, setReply] = useState("");
  const { 'product-request-id': productRequestId } = useParams<{ 'product-request-id': string }>();

  const { data, setData } = useLocalStorage(initial_data);

  const post = data.productRequests.find(
    (pr) => pr?.id.toString() === productRequestId,
  );
  const PostReply = () => {
    if (reply.length === 0) {
      toast.dismiss();
      toast.error("Reply cannot be empty");
      return;
    }
    if (!post?.comments) return;
    const comment = post?.comments.find((c) => c.id === commentId);
    if (!comment) {
      setShowReplyForm?.(false);
      return;
    }
    const new_reply = {
      content: reply,
      replyingTo: comment.user.username,
      user: {
        image: data.currentUser.image,
        name: data.currentUser.name,
        username: data.currentUser.username,
      },
    };
    if (!comment?.replies)
      /* @ts-ignore */
      comment.replies = [new_reply];
    else comment.replies.push(new_reply);
    setData(data);
    setShowReplyForm?.(false);
  };

  return (
    <div className="flex items-start pt-[24px] rounded-lg gap-[16px]">
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="max-w-[416px] tablet:max-w-full w-full resize-none rounded-lg max-h-[80px] active:outline-blue focus:outline-blue bg-gray py-[16px] px-[24px]"
        maxLength={250}
        placeholder="Reply to this comment"
      />
      <div className="text-[5px]">
        <Button onClick={PostReply} color="purple">
          Reply
        </Button>
      </div>
    </div>
  );
}

type Comments = NonNullable<
  (typeof initial_data.productRequests)[number]["comments"]
>;
type Comment = Comments[number];
export function Comment({ comment }: { comment: Comment }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  return (
    <div className={comment_box.class} key={comment.id}>
      <div className={commentHead.class}>
        <div className={commenter.class}>
          <img
            className="rounded-full"
            src={
              // TODO: temporary fix for image assets. Remove this once the images are hosted.
              comment.user.image?.replace(".", "") ??
              "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
            }
            width={40}
            height={40}
            alt={`${comment.user.name} Avatar`}
          />
          <div>
            <p className="text-blue-dark font-bold">{comment.user.name}</p>
            <p className="text-gray-dark text-sm">{comment.user.username}</p>
          </div>
        </div>
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className={replyButton.class}
        >
          Reply
        </button>
      </div>
      <p className={content.class}>{comment.content}</p>
      {showReplyForm && (
        <ReplyForm commentId={comment.id} setShowReplyForm={setShowReplyForm} />
      )}
      <div className={replies.class}>
        {comment.replies?.map((reply) => (
          <Reply
            commentId={comment.id}
            key={crypto.randomUUID()}
            reply={reply}
            commenterName={comment.user.name}
            commenterUsername={comment.user.username}
          />
        ))}
      </div>
    </div>
  );
}
const commentarea = tw.style({
  borderRadius: "rounded-lg",
  paddingX: "px-[28px]",
  paddingY: "py-[32px]",
  backgroundColor: "bg-white",
});

export function CommentArea() {
  const [comment, setComment] = useState("");
  const { 'product-request-id': productRequestId } = useParams<{ 'product-request-id': string }>();

  const { data, setData } = useLocalStorage(initial_data);

  const post = data.productRequests.find(
    (pr) => pr?.id.toString() === productRequestId,
  );
  const PostComment = () => {
    if (comment.length === 0) {
      toast.dismiss();
      toast.error("Comment cannot be empty");
      return;
    }
    if (!post) return;
    post.comments = post.comments ?? [];
      // if (!post.comments) post.comments = [];
    post?.comments.push({
      id:
        post.comments.length === 0
          ? 1
          : post.comments.length === 1
            ? post.comments[0].id + 1
            : post.comments.reduce((a, b) => (a.id > b.id ? a : b)).id + 1,
      content: comment,
      user: {
        image: data.currentUser.image,
        name: data.currentUser.name,
        username: data.currentUser.username,
      },
    });
    setData(data);
  };

  return (
    <div className={commentarea.class}>
      <p className="text-blue-dark-2 font-bold pb-[28px]">Add Comment</p>
      <textarea
        required
        onChange={(e) => setComment(e.target.value)}
        className="w-full resize-none rounded-lg max-h-[80px] active:outline-blue focus:outline-blue bg-gray py-[16px] px-[24px] text-[15px]"
        maxLength={250}
        placeholder="Type your comment here"
      />
      <div className="flex flex-row justify-between items-center pt-[16px] text-gray-dark">
        <span>{250 - comment.length} characters left</span>
        <Button onClick={PostComment} color="purple">
          Post Comment
        </Button>
      </div>
    </div>
  );
}
