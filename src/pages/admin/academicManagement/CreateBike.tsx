// import { Button, Col, Flex } from "antd";
// import { FieldValues, SubmitHandler } from "react-hook-form";
// import { toast } from "sonner";
// import PHForm from "../../../components/form/PHForm";
// import PHInput from "../../../components/form/PHInput";
// import PHSelect from "../../../components/form/PHSelect";
// import { categoriesOptions } from "../../../constants/global";
// import { useAddProductMutation } from "../../../redux/features/admin/productManagement.api";
// import { TResponse } from "../../../types";

// const CreateBike = () => {
//   const [addProduct] = useAddProductMutation();

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const toastId = toast.loading("Creating... ");

//     const category = data?.category
//       ?.toLowerCase()
//       .replace(/^./, (c: string) => c.toUpperCase());

//     const bikeData = {
//       name: data.name,
//       brand: data.brand,
//       model: data.model,
//       price: Number(data.price),
//       description: data.description,
//       category: category,
//       inStock: data.inStock,
//       quantity: Number(data.quantity),
//     };

//     console.log("createbike", bikeData);

//     try {
//       const res = (await addProduct(bikeData)) as TResponse;
//       if (res.error) {
//         toast.error(res.error.data.message, { id: toastId });
//       } else {
//         toast.success("Bike Created", { id: toastId });
//       }
//     } catch (err) {
//       toast.error("Something went wrong", { id: toastId });
//     }
//   };

//   return (
//     <Flex justify="center" align="center">
//       <Col span={6}>
//         <PHForm onSubmit={onSubmit}>
//           <PHInput type="text" label="Name" name="name" />

//           <PHInput type="text" label="Brand" name="brand" />

//           <PHInput type="text" label="Model" name="model" />
//           <PHInput type="number" label="Price" name="price" />

//           <PHInput type="text" label="Description" name="description" />

//           <PHSelect
//             label="Category"
//             name="category"
//             options={categoriesOptions}
//           />
//           <PHInput type="number" label="Quantity" name="quantity" />

//           <PHInput label="Availability" name="inStock" type="checkbox" />

//           <Button htmlType="submit">Submit</Button>
//         </PHForm>
//       </Col>
//     </Flex>
//   );
// };

// export default CreateBike;
