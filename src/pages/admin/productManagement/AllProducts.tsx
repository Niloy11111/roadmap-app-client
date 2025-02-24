import type { TableColumnsType, TableProps } from "antd";
import { Button, Col, Flex, Modal, Popconfirm, Row, Table } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { categoriesOptions } from "../../../constants/global";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "../../../redux/features/admin/productManagement.api";
import { TQueryParam } from "../../../types";
import { TProduct } from "../../../types/productManagement.type";

export type TTableData = Pick<
  TProduct,
  "name" | "category" | "category" | "quantity"
>;

const AllProducts = () => {
  const [productId, setProductId] = useState("");
  const [defaultValues, setDefaultValues] = useState({});
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: bikeData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(params);

  const tableData = bikeData?.data?.map(
    ({
      _id,
      name,
      brand,
      category,
      quantity,
      description,
      price,
      model,
      inStock,
      photoURL,
    }) => ({
      key: _id,
      name,
      brand,
      category,
      quantity,
      description,
      price,
      model,
      inStock,
      photoURL,
    })
  );

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [open, setOpen] = useState(false);

  const showModal = (item) => {
    setProductId(item.key);
    setDefaultValues({ ...item });
    setOpen(true);
    console.log(item);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const [addProduct] = useAddProductMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating... ");

    const category = data?.category
      ?.toLowerCase()
      .replace(/^./, (c: string) => c.toUpperCase());

    // console.log("createbike", bikeData);
    const updateData = {
      id: productId,
      data: {
        name: data.name,
        brand: data.brand,
        model: data.model,
        price: Number(data.price),
        description: data.description,
        category: category,
        inStock: data.inStock,
        quantity: Number(data.quantity),
        photoURL: data.photoURL,
      },
    };

    console.log("uddatedData", updateData);

    try {
      const res = await updateProduct(updateData);
      if (res.error) {
        console.log(res.error);
        toast.error(res.error.data.message, { id: toastId });
      } else {
        console.log("here", res);
        toast.success("Product Updated", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleDelete = async (item) => {
    const toastId = toast.loading("Creating... ");

    const deleteData = {
      id: productId,
    };

    try {
      const res = await deleteProduct(deleteData);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Product Deleted", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  // console.log("bikeData", bikeData);
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      filters: [
        {
          text: "Mountain",
          value: "Mountain",
        },
        {
          text: "Road",
          value: "Road",
        },
        {
          text: "Folding",
          value: "Folding",
        },
        {
          text: "Electric",
          value: "Electric",
        },
      ],
    },

    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div>
            <Button onClick={() => showModal(item)}>Update</Button>

            <Modal
              title="Update Product"
              open={open}
              onCancel={handleCancel}
              width={800}
              footer={null}
              styles={{
                mask: { background: "rgba(0, 0, 0, 0.05)" },
                content: { boxShadow: "none" },
              }}
            >
              <Flex justify="center" align="center">
                <Col span={24}>
                  {" "}
                  {/* Expand to full width */}
                  <PHForm
                    key={productId}
                    onSubmit={onSubmit}
                    defaultValues={defaultValues}
                  >
                    {/* First Row with 2 inputs */}
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        {" "}
                        {/* Each input takes half the row */}
                        <PHInput type="text" label="Name" name="name" />
                      </Col>
                      <Col span={12}>
                        <PHInput type="text" label="Brand" name="brand" />
                      </Col>
                    </Row>

                    {/* Second Row with 2 inputs */}
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <PHInput type="text" label="Model" name="model" />
                      </Col>
                      <Col span={12}>
                        <PHInput type="number" label="Price" name="price" />
                      </Col>
                    </Row>

                    {/* Third Row with 2 inputs */}
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <PHInput
                          type="number"
                          label="Quantity"
                          name="quantity"
                        />
                      </Col>

                      <Col span={12}>
                        <PHSelect
                          label="Category"
                          name="category"
                          options={categoriesOptions}
                        />
                      </Col>
                    </Row>

                    {/* Fourth Row with 2 inputs */}
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <PHInput
                          type="text"
                          label="Photo URL"
                          name="photoURL"
                        />
                      </Col>
                      <Col span={12}>
                        <PHInput
                          type="text"
                          label="Description"
                          name="description"
                        />
                      </Col>
                    </Row>
                    <Col span={12}>
                      <PHInput
                        label="Availability"
                        name="inStock"
                        type="checkbox"
                      />
                    </Col>
                    <Button htmlType="submit">Submit</Button>
                  </PHForm>
                </Col>
              </Flex>
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
            <Popconfirm
              title="Delete the Product"
              description="Are you sure to delete this Product?"
              okText="Yes"
              cancelText="No"
              onConfirm={handleDelete}
            >
              <Button onClick={() => setProductId(item.key)} danger>
                Delete
              </Button>
            </Popconfirm>
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

  if (isLoading) {
    return <p>Loading..</p>;
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

export default AllProducts;
