import { Image, Typography, Card } from "antd";
import submitImage from "./pro-slider-1.svg";

const RegistrationFormPreview = () => {
  return (
    <Card style={{ textAlign: "center", marginTop: "10rem" }}>
      <Image src={submitImage} preview={false} />
      <Typography.Title type="success" level={3}>
        Your Form has been Submited
      </Typography.Title>
    </Card>
  );
};

export default RegistrationFormPreview;
