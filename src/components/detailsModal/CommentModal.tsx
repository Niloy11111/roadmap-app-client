import { SendHorizontal, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAddCommentMutation } from "../../redux/features/roadmap/roadmapManagement.api";
import { useAppSelector } from "../../redux/hooks";
import { TResponse } from "../../types/global";
import "./commentModal.css";

const CommentModal = ({
  setOpenComment,
  openComment,
  payload,
  title,
  setOpen,
}) => {
  const [addComment] = useAddCommentMutation();
  const [commentData, setCommentData] = useState("");
  const user = useAppSelector(selectCurrentUser);

  // console.log(commentData);
  const handleClick = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading... ");

    const payloadData = {
      ...payload,
      comment: commentData,
    };

    // console.log("payloadData", payloadData);

    try {
      const res = (await addComment(payloadData)) as TResponse;
      console.log("here res", res);
      if (res.error) {
        if (commentData.length > 300) {
          toast.error("Comment must be at most 300 characters", {
            id: toastId,
          });
        } else {
          toast.error(res.error.data.message, { id: toastId });
        }
        setOpen(false);
      } else {
        toast.success("Commented successfully", { id: toastId });
        setOpen(false);
        setOpenComment(!openComment);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="reserve z-30  ">
      <div className="rContainer bg-white  rounded-lg shadow-2xl w-[600px] h-[300px] ">
        <X
          className="absolute p-2 w-[40px] h-[40px] bg-[#f87272]/80 hover:bg-[#f87272] rounded-full   text-white top-4 right-4  cursor-pointer"
          onClick={() => setOpen(false)}
        />
        <h1 className="text-2xl mt-8 text-center  mb-5 font-semibold">
          {title}
        </h1>
        <div>
          <p>Comment here</p>
          <form className="lContainer">
            <textarea
              placeholder="Put your thought here"
              id="comment"
              onChange={(e) => setCommentData(e.target.value)}
              className="pl-2 rounded-2xl h-[80px] py-2 border border-b1"
            />

            <button
              onClick={handleClick}
              className="mx-auto cursor-pointer hover:bg-p1/90 w-[80px] px-4 text-white py-2 rounded-lg bg-p1 "
            >
              <SendHorizontal className="text-white text-2xl w-full mx-auto" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
