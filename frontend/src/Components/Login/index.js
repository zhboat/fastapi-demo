import { useAuth } from "../../hooks/useAuth";

import { Form, Input, Button, Card, Divider } from "antd";
import { MailTwoTone, LockTwoTone } from "@ant-design/icons";

function Login() {
  const { error, login } = useAuth();
  const onFinish = (values) => {
    login(values);
  };

  return (
    <>
      <Form
        name="login_form"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Card className="login-card" hoverable={true}>
          <h1>Hello, FastAPI</h1>
          <Divider />
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入邮箱地址!",
              },
            ]}
          >
            <Input
              prefix={<MailTwoTone className="site-form-item-icon" />}
              placeholder="邮箱"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input
              prefix={<LockTwoTone className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          {error ? <p className="warning-font">用户名或密码错误</p> : null}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登入
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </>
  );
}

export default Login;
