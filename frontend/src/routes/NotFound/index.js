import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const clickButton = () => {
    navigate("/");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, 404 page not found"
      extra={
        <Button type="primary" onClick={clickButton}>
          Back Home
        </Button>
      }
    />
  );
}
export default NotFound;
