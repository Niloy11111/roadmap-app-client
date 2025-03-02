import type { TableColumnsType, TableProps } from "antd";
import { Button, Col, Flex, Table } from "antd";
import { LockOpen, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Modal from "../../../components/ui/pages/checkout/modal/Modal";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../redux/features/admin/userManagement.api";
import { TQueryParam, TUser } from "../../../types";

export type TTableData = Pick<
  TUser,
  "name" | "email" | "role" | "isBlocked" | "isDeleted"
>;

const userData = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);

  const [defaultValues, setDefaultValues] = useState({});
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: userData, isLoading, isFetching } = useGetUsersQuery();

  const tableData = userData?.data?.map(
    ({ _id, name, email, role, isBlocked, isDeleted }) => ({
      key: _id,
      name,
      email,
      role,
      isBlocked,
      isDeleted,
      status: isBlocked ? "Blocked" : "Active",
    })
  );

  const [blockUser] = useBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleDeleteModal = (userId) => {
    setOpenDelete(true);
    setUserId(userId);
  };

  const handleDeleteUser = async (item) => {
    setOpenDelete(false);
    const toastId = toast.loading("Deleting... ");

    const deleteData = {
      id: userId,
    };

    try {
      const res = await deleteUser(deleteData);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("User Deleted", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleBlockModal = (userId) => {
    setOpenBlock(true);
    setUserId(userId);
  };

  const handleBlockUser = async () => {
    if (userId) {
      setOpenBlock(false);
      const toastId = toast.loading("Blocking... ");

      const updateData = {
        id: userId,
        data: {
          isBlocked: true,
        },
      };

      console.log("uddatedData", updateData);

      try {
        const res = await blockUser(updateData);
        if (res.error) {
          console.log(res.error);
          toast.error(res.error.data.message, { id: toastId });
        } else {
          console.log("here", res);
          toast.success("User Updated", { id: toastId });
          setOpen(false);
        }
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };

  // console.log("userData", userData);
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div>
            <Button
              onClick={() => handleBlockModal(item.key)}
              disabled={item.isBlocked}
            >
              Block User
            </Button>

            <Modal open={openBlock} onClose={() => setOpenBlock(false)}>
              <div className="text-center ">
                <LockOpen size={26} className="mx-auto text-red-500" />

                <div className="mx-auto my-5 w-[400px]">
                  <h3 className="text-lg font-black text-gray-800">
                    Block User
                  </h3>
                  <p className="text-sm text-gray-500">
                    Are you sure you want to Block this User?
                  </p>
                </div>

                <Flex justify="center" align="center">
                  <Col span={24}>
                    <div className="flex justify-center gap-4 ">
                      <button
                        type="submit"
                        className="btn btn-light  px-7"
                        onClick={handleBlockUser}
                      >
                        Block
                      </button>
                      <button
                        type="button"
                        className="btn btn-light  px-7"
                        onClick={() => setOpenBlock(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Col>
                </Flex>
              </div>
            </Modal>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "y",
      render: (item) => {
        return (
          <div>
            <Button
              onClick={() => handleDeleteModal(item.key)}
              disabled={item.isDeleted}
              danger
            >
              Delete
            </Button>

            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
              <div className="text-center ">
                <Trash size={56} className="mx-auto text-red-500" />
                <div className="mx-auto my-5 w-[400px]">
                  <h3 className="text-lg font-black text-gray-800">
                    Delete User
                  </h3>
                  <p className="text-sm text-gray-500">
                    Are you sure you want to Delete this User?
                  </p>
                </div>

                <Flex justify="center" align="center">
                  <Col span={24}>
                    <div className="flex justify-center gap-4 ">
                      <button
                        type="submit"
                        className="btn btn-light  px-7"
                        onClick={handleDeleteUser}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn btn-light  px-7"
                        onClick={() => setOpenDelete(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Col>
                </Flex>
              </div>
            </Modal>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.category?.forEach((item) =>
        queryParams.push({ name: "category", value: item })
      );

      setParams(queryParams);
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="h-[100vh]">
        <div className="loader ">Loading...</div>;
      </div>
    ); // Handle loading or missing data case
  }

  return (
    <>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </>
  );
};

export default userData;
