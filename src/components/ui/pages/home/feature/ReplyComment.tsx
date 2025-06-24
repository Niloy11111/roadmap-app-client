import { SendHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { selectCurrentUser } from "../../../../../redux/features/auth/authSlice";
import { useReplyCommentMutation } from "../../../../../redux/features/roadmap/roadmapManagement.api";
import { useAppSelector } from "../../../../../redux/hooks";

const ReplyComment = ({
  item,
  currentItem,
  openReplyInput,
  setOpenReplyInput,
  setSelectedItem,
  selectedItem,
  replyToId,
  setReplyToId,
}) => {
  const user = useAppSelector(selectCurrentUser);
  const [replyComment] = useReplyCommentMutation();

  const navigate = useNavigate();

  const handleReplyFunction = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const commentData = form.get("comment");

    const toastId = toast.loading("Replying..");

    console.log("currentItem", currentItem);

    const isSecondReply = currentItem?._id !== item?._id;

    const secondReply = {
      id: item?._id,
      data: {
        firstReply: currentItem?._id,
        comment: commentData,
        user: user?._id,
      },
    };

    const replyData = {
      id: item?._id,
      data: {
        user: user?._id,
        comment: commentData,
      },
    };

    console.log("uddatedData", replyData);

    try {
      const payload = isSecondReply ? secondReply : replyData;
      const res = await replyComment(payload);
      if (res.error) {
        console.log(res.error);
        toast.error(res.error.data.message, { id: toastId });
      } else {
        console.log("here", res);
        toast.success("Replied successfully", { id: toastId });
        setOpenReplyInput(!openReplyInput);
      }
    } catch (err) {
      // toast.error("Something went wrong", { id: toastId });
      console.log(err);
    }
  };

  const handleReplyButton = () => {
    if (!user?.email) {
      toast.error("Please login first to reply");
      navigate("/login");
    }

    setOpenReplyInput(!openReplyInput);

    // setSelectedItem(item);
    if (replyToId === item?._id) {
      setReplyToId("");
    } else {
      setReplyToId(currentItem?._id);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleReplyButton()}
        className="cursor-pointer text-[11px]  text-p1 hover:underline ml-14 mb-2 "
      >
        Reply
      </button>
      {replyToId === item?._id && openReplyInput && (
        <form
          onSubmit={(e) => handleReplyFunction(e)}
          className="flex items-center gap-2 mb-2 ml-12"
        >
          <textarea
            className="h-[80px] w-3/4 bg-white shadow-2xl rounded-2xl px-4 py-2  resize-none"
            name="comment"
          />

          <button className=" cursor-pointer hover:bg-p1 max-w-max px-4 text-white py-2 rounded-lg bg-p1/80 ">
            <SendHorizontal className="text-white text-2xl w-full mx-auto" />
          </button>
        </form>
      )}
    </div>
  );
};

export default ReplyComment;

{
  /* <button
                  onClick={() => handleReplyButton(item)}
                  className="cursor-pointer text-[11px]  text-p1 hover:underline ml-14 mb-2 "
                >
                  Reply
                </button>
                {replyToId === item?._id && openReplyInput && (
                  <form
                    onSubmit={(e) => handleReplyFunction(e, item)}
                    className="flex items-center gap-2 mb-2 ml-12"
                  >
                    <textarea
                      className="h-[80px] w-3/4 bg-white shadow-2xl rounded-2xl px-4 py-2  resize-none"
                      name="comment"
                    />

                    <button className=" cursor-pointer hover:bg-p1 max-w-max px-4 text-white py-2 rounded-lg bg-p1/80 ">
                      <SendHorizontal className="text-white text-2xl w-full mx-auto" />
                    </button>
                  </form>
                )} */
}
