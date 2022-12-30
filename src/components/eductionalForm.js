import {
  Card,
  Form,
  Input,
  Select,
  Alert,
  Button,
  Tag,
  notification,
} from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";

const nameTitle = [
  { key: "mr", label: "Mr" },
  { key: "mrs", label: "Mrs" },
  { key: "miss", label: "Miss" },
];

const grades = [
  { key: "cgpa", label: "CGPA" },
  { key: "percentage", label: "Percentage" },
];

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 12 },
};

const subformItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24, offset: 2 },
};

const tailLayout = {
  wrapperCol: { md: { offset: formItemLayout.labelCol.span, span: 18 } },
};

const EducationalForm = () => {
  const [formData, setFormData] = useState(null);

  const getTitle = (formKey) => {
    let titleLabels = nameTitle;
    if (formKey === "grades") titleLabels = grades;
    return (
      <Form.Item
        name={`${formKey}Title`}
        rules={[{ required: true, message: "Please select Title" }]}
        noStyle
      >
        <Select style={{ minWidth: "120px" }}>
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
  useEffect(() => {}, [form]);

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

  //To handle Submit on the form
  const handleSubmit = (formData) => {
    setFormData(formData);
    showAlert();
  };

  return (
    <Card
      title="SISCASO Educational Form"
      style={{ width: "90%", margin: "auto" }}
      headStyle={{
        textAlign: "center",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Form
        onFinish={handleSubmit}
        form={form}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
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
          <Alert
            style={{ marginTop: "10px" }}
            banner
            message={"Fill this form only if you are from Other state"}
          />
        </Form.Item>
        <Form.Item
          label="Enter your registration number"
          required
          rules={[
            {
              required: true,
              message: "Please enter your registration number",
            },
            {
              pattern: /^[0-9]{3}[A-Za-z]{3}$/,
              message: "Please enter your registration number",
            },
          ]}
        >
          <Input
            name="registrationNumber"
            placeholder="Enter your registration number"
          />
        </Form.Item>
        <Form.Item {...subformItemLayout}>
          <Form.List
            name="educationalQualification"
            rules={[{ required: true }]}
          >
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, idx) => {
                    return (
                      <Form.Item required={true} key={field.key}>
                        <Card>
                          <div>
                            <h4 style={{ display: "inline", marginLeft: 80 }}>
                              Educational Qualification {idx + 1}
                            </h4>{" "}
                            {fields.length - 1 === idx && idx !== 0 ? (
                              <Button
                                size="small"
                                danger
                                title="Remove"
                                onClick={() => {
                                  remove(field.name);
                                }}
                                style={{
                                  marginLeft: ".5rem",
                                  marginBottom: "1rem",
                                }}
                              >
                                Remove
                              </Button>
                            ) : (
                              <Tag
                                style={{ marginBottom: "10px" }}
                                color="volcano"
                              >
                                {" "}
                                Atleast one educational qualification is
                                required
                              </Tag>
                            )}
                          </div>

                          <Form.Item
                            label="Category"
                            name={[field.name, "category"]}
                            fieldKey={[field.fieldKey, "category"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter the details!",
                              },
                            ]}
                          >
                            <Select>
                              <Select.Option value="10th">10th</Select.Option>
                              <Select.Option value="12th">12th</Select.Option>
                              <Select.Option value="degree">
                                Degree
                              </Select.Option>
                            </Select>
                          </Form.Item>

                          <Form.Item
                            shouldUpdate={(prevValues, currentValues) =>
                              prevValues.educationalQualification !==
                              currentValues.educationalQualification
                            }
                          >
                            {({ getFieldValue }) => {
                              return (
                                <>
                                  {getFieldValue("educationalQualification")[
                                    idx
                                  ]?.category === "degree" ? (
                                    <Form.Item
                                      label="Add Semester marksheet"
                                      required
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please enter the required details",
                                        },
                                      ]}
                                    >
                                      <Form.List
                                        name="semesterMarksheet"
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Please enter the required details",
                                          },
                                        ]}
                                      >
                                        {(fields, { add, remove }) => {
                                          return (
                                            <div>
                                              {fields.map((field, idx) => {
                                                return (
                                                  <Form.Item
                                                    required={true}
                                                    key={field.key}
                                                  >
                                                    <Card>
                                                      <div>
                                                        <h4
                                                          style={{
                                                            display: "inline",
                                                            marginLeft: 80,
                                                          }}
                                                        >
                                                          Semester {idx + 1}{" "}
                                                          Marksheet
                                                        </h4>{" "}
                                                        {fields.length - 1 ===
                                                          idx && idx !== 0 ? (
                                                          <Button
                                                            size="small"
                                                            danger
                                                            title="Remove"
                                                            onClick={() => {
                                                              remove(
                                                                field.name
                                                              );
                                                            }}
                                                            style={{
                                                              marginLeft:
                                                                ".5rem",
                                                              marginBottom:
                                                                "1rem",
                                                            }}
                                                          >
                                                            Remove
                                                          </Button>
                                                        ) : (
                                                          idx === 0 && (
                                                            <Tag
                                                              style={{
                                                                marginBottom:
                                                                  "10px",
                                                              }}
                                                              color="volcano"
                                                            >
                                                              {" "}
                                                              Atleast one
                                                              educational
                                                              qualification is
                                                              required
                                                            </Tag>
                                                          )
                                                        )}
                                                      </div>
                                                      <Form.Item
                                                        label={`Enter your ${
                                                          idx + 1
                                                        } Marksheet`}
                                                      >
                                                        <Input name="totalMarks" />
                                                      </Form.Item>
                                                    </Card>
                                                  </Form.Item>
                                                );
                                              })}

                                              <Button
                                                type="dashed"
                                                onClick={() => {
                                                  add();
                                                }}
                                              >
                                                <PlusCircleOutlined /> Add
                                                Semester
                                              </Button>
                                            </div>
                                          );
                                        }}
                                      </Form.List>
                                    </Form.Item>
                                  ) : (
                                    <Form.Item
                                      label="Board"
                                      name={[field.name, "board"]}
                                      fieldKey={[field.fieldKey, "board"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please enter the details!",
                                        },
                                      ]}
                                    >
                                      <Input
                                        name={[field.name, "totalMarks"]}
                                        fieldKey={[
                                          field.fieldKey,
                                          "totalMarks",
                                        ]}
                                        placeholder="Enter the total marks"
                                        addonBefore={getTitle("grades")}
                                      ></Input>
                                    </Form.Item>
                                  )}
                                </>
                              );
                            }}
                          </Form.Item>
                        </Card>
                      </Form.Item>
                    );
                  })}

                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    <PlusCircleOutlined /> Add Educational Qualification
                  </Button>
                </div>
              );
            }}
          </Form.List>
        </Form.Item>
        <Form.Item {...tailLayout}>
          {/* <Link to="/registerPreview"> */}
            <Button
              type="primary"
              size="20"
              style={{ color: "whitesmoke", backgroundColor: "black" }}
              htmlType="submit"
            >
              Submit
            </Button>
          {/* </Link> */}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EducationalForm;
