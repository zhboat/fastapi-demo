import React from "react";
import { Modal, Input, Form, Button, Flex } from "antd";
import { useAuth } from "../../hooks/useAuth";

function ResetPasswordModal(props) {
  const [form] = Form.useForm();
  const { resetPassword } = useAuth();

  const handleCancel = () => {
    props.setIsOpen(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        props.setIsOpen(false);
        form.resetFields();
        resetPassword(values.confirmPassword);
        TipModal();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const modalFooter = props.hideCancel ? (
    <Flex justify="space-between">
      <p>*初始密码位于控制台日志中</p>
      <Button key="submit" type="primary" onClick={handleOk}>
        确认
      </Button>
    </Flex>
  ) : (
    <>
      <Button key="back" onClick={handleCancel}>
        取消
      </Button>
      <Button key="submit" type="primary" onClick={handleOk}>
        确认
      </Button>
    </>
  );

  const ResetPasswdContent = () => {
    return (
      <Modal
        title="修改密码"
        open={props.isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        footer={modalFooter}
        closable={!props.hideCancel}
        keyboard={false}
        maskClosable={false}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: "请填写原密码" }]}
          >
            <Input.Password placeholder="原密码" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            dependencies={["oldPassword"]}
            rules={[
              { required: true, message: "请填写新密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("oldPassword") === value) {
                    return Promise.reject(
                      new Error("新密码不允许与旧密码相同!"),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password placeholder="新密码" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "请再次输入密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error("请再次输入新密码"));
                  }
                  if (value !== getFieldValue("newPassword")) {
                    return Promise.reject(new Error("两次输入的密码不匹配!"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password placeholder="再次输入新密码" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const TipModal = () => {
    Modal.success({
      title: "密码修改成功",
      okText: "确定",
    });
  };

  return <ResetPasswdContent />;
}

export default ResetPasswordModal;
