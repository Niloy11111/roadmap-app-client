import { Button, Col, Divider, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";

const studentDummyData = {
  password: "student123",
  student: {
    id: "S12345",
    name: {
      firstName: "Student2",
      middleName: "A",
      lastName: "Good",
    },
    gender: "male",
    dateOfBirth: "2000-05-15T00:00:00.000Z",
    email: "student3@gmail.com",
    contactNo: "+1234567890",
    emergencyContact: "+0987654321",
    bloodGroup: "O+",
    presentAddress: "123 Present St, Cityville",
    paremenentAddress: "456 Permanent Rd, Townsville",
    guardian: {
      fatherName: "Richard Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "+1234567891",
      motherName: "Jane Doe",
      motherOccupation: "Doctor",
      motherContactNo: "+1234567892",
    },
    localGuardian: {
      name: "Uncle Sam",
      occupation: "Businessman",
      contactNo: "+1234567893",
      address: "789 Guardian Lane, Villagetown",
    },
    admissionSemester: "678806d70d054d01a10ac0aa",
    isDeleted: false,
    academicDepartment: "6787fcd10d054d01a10ac0a7",
  },
};

const CreateStudent = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    // const formData = new FormData();

    // formData.append("data", JSON.stringify(data));

    // console.log(Object.fromEntries(formData))
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Divider>Personal Info </Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
