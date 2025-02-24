import { Button, Col, Flex, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { categoriesOptions } from "../../../constants/global";
import { useAddProductMutation } from "../../../redux/features/admin/productManagement.api";
import { TResponse } from "../../../types";

const currentYear = new Date().getFullYear();

const CreateBike = () => {
  const [addProduct] = useAddProductMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating... ");

    const category = data?.category
      ?.toLowerCase()
      .replace(/^./, (c: string) => c.toUpperCase());

    const bikeData = {
      name: data.name,
      brand: data.brand,
      model: data.model,
      price: Number(data.price),
      description: data.description,
      category: category,
      inStock: data.inStock,
      quantity: Number(data.quantity),
      photoURL: data.photoURL,
    };

    console.log("createbike", bikeData);

    try {
      const res = (await addProduct(bikeData)) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Bike Created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className=" ">
      <Flex justify="center" align="center">
        <Col span={24}>
          <PHForm onSubmit={onSubmit}>
            {/* First Row */}
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <PHInput type="text" label="Name" name="name" />
              </Col>
              <Col span={8}>
                <PHInput type="text" label="Brand" name="brand" />
              </Col>
              <Col span={8}>
                <PHInput type="text" label="Model" name="model" />
              </Col>
            </Row>

            {/* Second Row */}
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <PHInput type="number" label="Price" name="price" />
              </Col>
              <Col span={8}>
                <PHInput type="number" label="Quantity" name="quantity" />
              </Col>
              <Col span={8}>
                <PHSelect
                  label="Category"
                  name="category"
                  options={categoriesOptions}
                />
              </Col>
            </Row>

            {/* Third Row */}
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <PHInput type="text" label="Description" name="description" />
              </Col>

              <Col span={8}>
                <PHInput type="text" label="Photo URL" name="photoURL" />
              </Col>
            </Row>
            <Col span={8}>
              <PHInput label="Availability" name="inStock" type="checkbox" />
            </Col>
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateBike;
