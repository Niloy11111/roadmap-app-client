const SingleComment = ({
  item,
  replyReceiver,
}: {
  item: Record<string, any>;
  replyReceiver?: string;
}) => {
  return (
    <div className="mb-[-5px] bg-white max-w-max  rounded-xl p-2">
      <h1 className="font-semibold text-sm">{item?.user?.name}</h1>
      <p key={item?._id} className="">
        {replyReceiver && (
          <span className="hover:underline cursor-pointer font-semibold mr-1">
            {replyReceiver}
          </span>
        )}
        {item?.isDeleted ? (
          <span className="text-red-500">comment has been deleted </span>
        ) : (
          item?.comment
        )}
      </p>
    </div>
  );
};

export default SingleComment;

// const SingleComment = ({ item }) => {
//   return (
//     <div className="mb-[-5px] bg-white max-w-max rounded-xl p-2 ">
//       <h1 className="font-semibold">{item?.user?.name}</h1>
//       <p className="">
//         {item?.isDeleted ? (
//           <span className="text-red-500">comment has been deleted </span>
//         ) : (
//           item?.comment
//         )}
//       </p>
//     </div>
//   );
// };

// export default SingleComment;
{
  /* <div className="bg-white max-w-max rounded-xl p-2">
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
                                </div> */
}

{
  /* <div className=" bg-white rounded-xl p-2">
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
                          </div> */
}
