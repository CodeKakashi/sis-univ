import { useState, useEffect } from "react";
import {
  Form,
  Card,
  Select,
  Input,
  DatePicker,
  Radio,
  Button,
  notification,
  Alert,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const nameTitle = [
  { key: "mr", label: "Mr" },
  { key: "mrs", label: "Mrs" },
  { key: "miss", label: "Miss" },
];
const guardianNameTitle = [
  { key: "s/o", label: "S/O" },
  { key: "d/o", label: "D/O" },
];

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 12 },
};

const subformItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12, offset: 8 },
};

const tailLayout = {
  wrapperCol: { md: { offset: formItemLayout.labelCol.span, span: 18 } },
};

const G_INDIAN_MOBILE_NUMBER_PATTERN = /^[6-9]\d{9}$/;

const RegistrationForm = () => {
  const [formData, setFormData] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const sampleData = {
    nameTitle: "Miss",
    nameLabel: "Sample Name Me",
    guardianTitle: "D/O",
    guardianNameLabel: "Sample Father Name",
    email: "haarish@sdev.in",
    mobile: "6223527372",
    isResidentOfTN: "no",
    state: "Karnataka",
    district: "Hubli",
    pincode: "635525",
  };

  const getTitle = (formKey) => {
    let titleLabels = nameTitle;
    if (formKey === "guardian") titleLabels = guardianNameTitle;
    return (
      <Form.Item
        name={`${formKey}Title`}
        rules={[{ required: true, message: "Please select Title" }]}
        noStyle
      >
        <Select>
          {titleLabels.map((title) => (
            <Select.Option key={title.key} value={title.key}>
              {title.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...sampleData });
  }, [form]);

  const onFinishFailed = (values) => {
    values.errorFields.map((error) => {
      error.errors.map((message) => {
        return notification.error({ message: message });
      });
    });
  };

  const showAlert = () => {
    notification.success({
      message: "Form Submitted Successfully",
      description: "Your form response have been saved successfully",
      placement: "topRight",
    });
  };

  const handleSubmit = (formData) => {
    setFormData(formData);
    setIsDisabled(true);
  };
  return (
    <Card
      title="SISCASO Registration Form"
      style={{ width: "90%", margin: "auto" }}
      headStyle={{
        textAlign: "center",
        backgroundColor: "black",
        color: "white",
      }}
      extra={
        isDisabled && (
          <Button
            style={{ color: "whiteSmoke" }}
            type="link"
            onClick={() => setIsDisabled(false)}
          >
            <EditOutlined /> Edit
          </Button>
        )
      }
    >
      <Form
        name="registrationForm"
        {...formItemLayout}
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        disabled={isDisabled}
      >
        <Form.Item label="Full Name" required>
          <Form.Item
            name={`nameLabel`}
            rules={[{ required: true, message: `Please enter name` }]}
            noStyle
          >
            <Input
              type="text"
              placeholder={"Enter the name"}
              showCount
              maxLength={46}
              allowClear
              style={{ width: "5%", minWidth: "270px" }}
              addonBefore={getTitle("name")}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Guardian name" required>
          <Form.Item
            name="guardianNameLabel"
            rules={[{ required: true, message: `Please enter Guardian name` }]}
            noStyle
          >
            <Input
              type="text"
              placeholder={"Enter your Guardian name"}
              showCount
              maxLength={46}
              allowClear
              addonBefore={getTitle("guardian")}
              style={{ width: "5%", minWidth: "270px" }}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item name="dob" label="Date of birth" required>
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="email"
          label="Enter your email"
          rules={[
            {
              type: "email",
              message: "Enter a valid email",
            },
            {
              required: true,
              message: "Enter your email",
            },
          ]}
        >
          <Input placeholder="Enter your Email" type="email" />
        </Form.Item>
        <Form.Item
          name="mobile"
          label="Enter your mobile number"
          rules={[
            {
              required: true,
              message: "Enter your mobile number",
            },
            {
              pattern: G_INDIAN_MOBILE_NUMBER_PATTERN,
              message: "Enter a valid mobile number",
            },
          ]}
        >
          <Input
            placeholder="Enter your mobile number"
            type="mobile"
            maxLength={10}
            showCount
          />
        </Form.Item>
        <Form.Item
          name="isResidentOfTN"
          label="Are you a Resident of TamilNadu"
          required
        >
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues, curValues) => {
            return prevValues.isResidentOfTN !== curValues.isResidentOfTN;
          }}
          {...subformItemLayout}
        >
          {({ getFieldValue }) => {
            const isResidentOfTN = getFieldValue("isResidentOfTN");
            if (isResidentOfTN === "no") {
              return (
                <>
                {isDisabled === false &&
                  <Alert
                    style={{ marginBottom: "35px" }}
                    banner
                    message={"Fill this form only if you are from Other state"}
                  />}
                  <Form.Item
                    name="state"
                    label="Enter your state"
                    // style={{ width: "50%" }}
                  >
                    <Input placeholder="Enter State" />
                  </Form.Item>
                  <Form.Item
                    name="district"
                    label="Enter your district"
                    // style={{ width: "50%" }}
                  >
                    <Input placeholder="Enter District" />
                  </Form.Item>
                  <Form.Item
                    name="pincode"
                    label="Enter your pincode"
                    // style={{ width: "50%" }}
                  >
                    <Input placeholder="Enter Pincode" />
                  </Form.Item>
                </>
              );
            }
          }}
        </Form.Item>
        <Form.Item {...tailLayout}>
          {isDisabled === false && (
            <Button
              type="primary"
              size="20"
              style={{ color: "whitesmoke", backgroundColor: "black" }}
              htmlType="submit"
            >
              Proceed to Next Stage
            </Button>
          )}
        </Form.Item>
      </Form>
      {isDisabled  && (
        <Form.Item {...tailLayout}>
          <Link to="/registerPreview">
            <Button
              type="primary"
              size="20"
              style={{ color: "whitesmoke", backgroundColor: "black" }}
              htmlType="submit"
              onClick={showAlert}
            >
              Submit
            </Button>
          </Link>
        </Form.Item>
      )}
    </Card>
  );
};

export default RegistrationForm;
