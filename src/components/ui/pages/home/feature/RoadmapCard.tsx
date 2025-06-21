import {
  MessageCircle,
  MessageSquareText,
  Pencil,
  SendHorizontal,
  SquarePen,
  Trash,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { selectCurrentUser } from "../../../../../redux/features/auth/authSlice";
import {
  useDeleteCommentMutation,
  useGetFilteredCommentsQuery,
  useReplyCommentMutation,
  useUpdateCommentMutation,
  useUpvoteRoadmapMutation,
} from "../../../../../redux/features/roadmap/roadmapManagement.api";
import { useAppSelector } from "../../../../../redux/hooks";
import { IRoadMap } from "../../../../../types/productManagement.type";
import CommentModal from "../../../../detailsModal/CommentModal";
import Modal from "../../../modal/Modal";
const RoadmapCard = ({ data }: { data: IRoadMap }) => {
  const [upvoteRoadmap] = useUpvoteRoadmapMutation();
  const { data: comments } = useGetFilteredCommentsQuery(data?._id);
  const user = useAppSelector(selectCurrentUser);
  const [openComment, setOpenComment] = useState(false);
  const [replyToId, setReplyToId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openReplyInput, setOpenReplyInput] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [centralComment, setCentralComment] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [replyComment] = useReplyCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const navigate = useNavigate();
  const handleUpvote = async () => {
    const roadmapId = data?._id;
    const userId = user?._id;

    const payload = {
      id: roadmapId,
      data: {
        userId,
      },
    };

    if (!user?.email) {
      toast.error("Please login first to comment");
      navigate("/login");
    }

    try {
      const res = await upvoteRoadmap(payload);
      if (res.error) {
        console.log(res.error);
      } else {
        console.log("here", res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    if (!user?.email) {
      toast.error("Please login first to comment");
      navigate("/login");
    }

    setOpenModal(!openModal);
  };

  const isUpvoted = data?.upvotes?.includes(user?._id);

  const payload = {
    user: user?._id,
    roadmap: data?._id,
  };

  console.log("selectedItem", selectedItem);

  const handleReplyFunction = async (e, item) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const commentData = form.get("comment");

    const toastId = toast.loading("Replying..");

    console.log("selectedItem", selectedItem);

    const isSecondReply = selectedItem?._id !== item?._id;

    const secondReply = {
      id: item?._id,
      data: {
        firstReply: selectedItem?._id,
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

  const handleCommentUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const commentData = form.get("comment");

    const toastId = toast.loading("Loading..");

    console.log("selectedItem", selectedItem);
    console.log("centralComment", centralComment);

    const isMidLevel = selectedItem?._id !== centralComment?._id;

    const topLevelEditData = {
      id: centralComment?._id,
      data: {
        email: user?.email,
        comment: commentData,
      },
    };
    const MidLevelEditData = {
      id: centralComment?._id,
      data: {
        email: user?.email,
        comment: commentData,
        replyId: selectedItem?._id,
      },
    };

    try {
      const payload = isMidLevel ? MidLevelEditData : topLevelEditData;
      const res = await updateComment(payload);
      if (res.error) {
        console.log(res.error);
        toast.error(res.error.data.message, { id: toastId });
        setOpenUpdate(!openUpdate);
      } else {
        console.log("here", res);
        toast.success("Comment edited", { id: toastId });
        setOpenUpdate(!openUpdate);
      }
    } catch (err) {
      // toast.error("Something went wrong", { id: toastId });
      console.log(err);
    }
  };
  const handleDeleteComment = async () => {
    const toastId = toast.loading("Loading..");

    console.log("selectedItem", selectedItem);
    console.log("centralComment", centralComment);

    const isMidLevel = selectedItem?._id !== centralComment?._id;

    const topLevelDelete = {
      id: centralComment?._id,
      data: {
        email: user?.email,
      },
    };
    const MidLevelDelete = {
      id: centralComment?._id,
      data: {
        email: user?.email,
        replyId: selectedItem?._id,
      },
    };

    try {
      const payload = isMidLevel ? MidLevelDelete : topLevelDelete;

      console.log("payload", payload);
      const res = await deleteComment(payload);

      if (res.error) {
        console.log(res.error);
        toast.error(res.error.data.message, { id: toastId });
        setOpenDelete(!openDelete);
      } else {
        console.log("here", res);
        toast.success("Comment deleted successfully", { id: toastId });
        setOpenDelete(!openDelete);
      }
    } catch (err) {
      // toast.error("Something went wrong", { id: toastId });
      console.log(err);
    }
  };

  const handleReplyButton = (item) => {
    if (!user?.email) {
      toast.error("Please login first to reply");
      navigate("/login");
    }

    setOpenReplyInput(!openReplyInput);

    setSelectedItem(item);
    if (replyToId === item?._id) {
      setReplyToId("");
    } else {
      setReplyToId(item?._id);
    }
  };

  const handleCommentUpdateButton = (reply, item) => {
    setCentralComment(item);
    setSelectedItem(reply);
    setOpenUpdate(!openUpdate);
  };
  const handleDeleteCommentButton = (reply, item) => {
    setCentralComment(item);
    setSelectedItem(reply);
    setOpenDelete(!openDelete);
  };

  return (
    <div className="hover:bg-white w-[80%]  mx-auto ">
      <div className="z-10 font-Poppins rounded-lg pb-4  border-b  border-b1 hover:bg-white p-4  flex justify-between">
        <div className="flex gap-4">
          <div className="flex gap-4 flex-col justify-between border-r border-b1 pr-5 ">
            <div className="relative ">
              {isUpvoted && (
                <button
                  onClick={handleUpvote}
                  className=" p-2 hover:bg-[#dcdddf] rounded-lg cursor-pointer"
                >
                  <AiFillLike className=" text-2xl text-p1" />
                </button>
              )}
              {!isUpvoted && (
                <button
                  onClick={handleUpvote}
                  className="upvoteBtn p-2 hover:bg-[#dcdddf] rounded-lg cursor-pointer"
                >
                  <AiOutlineLike className=" text-2xl text-p1" />
                </button>
              )}

              <p className="hidden upvote top-1 left-12 bg-[#cbd5e1] px-2 py-1 rounded font-sans text-p1 absolute ">
                Upvote
              </p>
            </div>

            <div className="relative">
              <button
                onClick={handleClick}
                className="upvoteBtn p-2 hover:bg-[#dcdddf] rounded-lg cursor-pointer"
              >
                <MessageCircle />
              </button>

              <p className="hidden upvote top-1 left-12 bg-[#cbd5e1] px-2 py-1 rounded font-sans text-p1 absolute ">
                comments
              </p>
              {openModal && (
                <CommentModal
                  setOpenComment={setOpenComment}
                  opemComment={openComment}
                  payload={payload}
                  title={data?.title}
                  setOpen={setOpenModal}
                />
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <p
                className={`${
                  data?.status === "In Progress" && "bg-[#3abff8]"
                } ${data?.status === "Planned" && "bg-[#570df8]"} ${
                  data?.status === "Completed" && "bg-[#36d399]"
                }   max-w-max rounded py-1 px-2 text-white `}
              >
                {data?.status}
              </p>{" "}
              <h1 className="text-xl font-semibold"> {data?.title}</h1>
              <span className="max-w-max  py-1 px-2 text-white text-[10px] bg-p1 rounded-full font-sans ">
                {data?.category}
              </span>
            </div>
            <p>{data?.description}</p>
          </div>
        </div>

        <div className="flex gap-4 flex-col justify-between border-l border-b1 pl-5 ">
          <button>+{data?.upvoteCount}</button>
          <button
            onClick={() => setOpenComment(!openComment)}
            className=" p-2 hover:bg-[#dcdddf] rounded-lg cursor-pointer"
          >
            <MessageSquareText />
          </button>
        </div>
      </div>
      {openComment && (
        <div className="space-y-2 p-4">
          {comments?.data?.map((item) => (
            <div
              key={item?._id}
              className="flex rounded p-2  gap-2  items-start"
            >
              <div className="bg-[#cbd5e1] w-full pl-3 pb-1 rounded">
                <div className="flex items-center">
                  <div className="flex gap-2  mt-2 mr-2 ">
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={item?.user?.img}
                      alt=""
                    />
                    <div className=" bg-white max-w-max rounded-xl p-2 ">
                      <h1 className="font-semibold">{item?.user?.name}</h1>
                      <p className="">
                        {item?.isDeleted ? (
                          <span className="text-red-500">
                            comment has been deleted{" "}
                          </span>
                        ) : (
                          item?.comment
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleCommentUpdateButton(item, item)}
                      className="hover:bg-p1 w-[30px] h-[30px] hover:text-white cursor-pointer text-p1 rounded-full flex justify-center items-center "
                    >
                      <SquarePen className="w-[20px]" />
                    </button>
                    <button
                      onClick={() => handleDeleteCommentButton(item, item)}
                      className="hover:bg-p1 w-[30px] h-[30px] hover:text-white cursor-pointer text-p1 rounded-full flex justify-center items-center "
                    >
                      <Trash2 className="w-[20px]" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleReplyButton(item)}
                  className="cursor-pointer text-[11px] text-p1 hover:underline ml-14 mb-2 "
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
                )}
                <div className="ml-10">
                  {item?.replies?.map((reply, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2">
                        <div className="flex   gap-2  ">
                          <img
                            className="w-[30px] h-[30px] rounded-full"
                            src={reply?.user?.img}
                            alt=""
                          />
                          <div className=" bg-white rounded-xl p-2">
                            <h1 className="font-semibold text-sm">
                              {reply?.user?.name}
                            </h1>
                            <p key={reply?._id} className="">
                              <span className="hover:underline cursor-pointer font-semibold mr-1 ">
                                {item?.user?.name}
                              </span>{" "}
                              {reply?.isDeleted ? (
                                <span className="text-red-500">
                                  comment has been deleted{" "}
                                </span>
                              ) : (
                                reply?.comment
                              )}
                            </p>
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() =>
                              handleCommentUpdateButton(reply, item)
                            }
                            className="hover:bg-p1 w-[30px] h-[30px] hover:text-white cursor-pointer text-p1 rounded-full flex justify-center items-center "
                          >
                            <SquarePen className="w-[20px]" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteCommentButton(reply, item)
                            }
                            className="hover:bg-p1 w-[30px] h-[30px] hover:text-white cursor-pointer text-p1 rounded-full flex justify-center items-center "
                          >
                            <Trash2 className="w-[20px]" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleReplyButton(reply)}
                        className="cursor-pointer text-[11px] text-p1 hover:underline ml-12 "
                      >
                        Reply
                      </button>
                      {replyToId === reply?._id && openReplyInput && (
                        <form
                          onSubmit={(e) => handleReplyFunction(e, item)}
                          className="flex items-center gap-2 mb-2 ml-12"
                        >
                          <textarea
                            className="h-[80px] w-3/4 bg-white rounded-2xl px-4 py-2  resize-none"
                            name="comment"
                          />

                          <button className=" cursor-pointer hover:bg-p1 max-w-max px-4 text-white py-2 rounded-lg bg-p1/80 ">
                            <SendHorizontal className="text-white text-2xl w-full mx-auto" />
                          </button>
                        </form>
                      )}

                      <div className="ml-10 space-y-3 mb-4">
                        {reply?.replies.map((deepReply, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="flex  gap-2  ">
                              <img
                                className="w-[30px] h-[30px] rounded-full"
                                src={deepReply?.user?.img}
                                alt=""
                              />
                              <div className="bg-white max-w-max rounded-xl p-2">
                                <h1 className="font-semibold text-sm">
                                  {deepReply?.user?.name}
                                </h1>
                                <p key={reply?._id} className="">
                                  <span className="hover:underline cursor-pointer font-semibold mr-1">
                                    {reply?.user?.name}
                                  </span>{" "}
                                  {deepReply?.isDeleted ? (
                                    <span className="text-red-500">
                                      comment has been deleted{" "}
                                    </span>
                                  ) : (
                                    deepReply?.comment
                                  )}
                                </p>
                              </div>
                            </div>
                            <div>
                              <button
                                onClick={() =>
                                  handleCommentUpdateButton(deepReply, item)
                                }
                                className="hover:bg-p1 w-[30px] h-[30px] hover:text-white cursor-pointer text-p1 rounded-full flex justify-center items-center "
                              >
                                <SquarePen className="w-[20px]" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteCommentButton(deepReply, item)
                                }
                                className="hover:bg-p1 w-[30px] h-[30px] hover:text-white cursor-pointer text-p1 rounded-full flex justify-center items-center "
                              >
                                <Trash2 className="w-[20px]" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <Modal open={openUpdate} onClose={() => setOpenUpdate(false)}>
            <div className="text-center ">
              <Pencil size={26} className="mx-auto text-red-500" />

              <div className="mx-auto my-2 w-[400px]">
                <h3 className="text-lg font-black text-gray-800">
                  Edit Comment
                </h3>
              </div>

              <form
                onSubmit={(e) => handleCommentUpdate(e)}
                className=" gap-2  "
              >
                <textarea
                  className="h-[80px] w-full border border-b1 rounded-2xl px-4 py-2  resize-none"
                  defaultValue={selectedItem?.comment}
                  name="comment"
                />

                <button className=" cursor-pointer hover:bg-p1 max-w-max px-4 text-white py-2 rounded-lg bg-p1/80 ">
                  <SendHorizontal className="text-white text-2xl w-full mx-auto" />
                </button>
              </form>

              {/* <div className="flex justify-center gap-4 ">
                <button
                  type="submit"
                  className="btn btn-light  px-7"
                  onClick={() => setOpenUpdate(false)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-light  px-7"
                  onClick={() => setOpenUpdate(false)}
                >
                  Cancel
                </button>
              </div> */}
            </div>
          </Modal>

          <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
            <div className="text-center ">
              <Trash size={56} className="mx-auto text-red-500" />
              <div className="mx-auto my-4 w-[400px]">
                <h3 className="text-lg font-black text-gray-800">
                  Confirm Delete
                </h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this order?
                </p>
              </div>
              <div className="flex justify-center gap-4 ">
                <button
                  onClick={handleDeleteComment}
                  className="border border-[#cbd5e1] hover:bg-[#cbd5e1] px-7 py-2 rounded cursor-pointer"
                >
                  Delete
                </button>
                <button
                  className="border border-[#cbd5e1] hover:bg-[#cbd5e1] px-7 py-2 rounded cursor-pointer"
                  onClick={() => setOpenDelete(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default RoadmapCard;
