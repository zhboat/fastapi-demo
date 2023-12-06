import React, { useState } from "react";
import { Breadcrumb, Layout, Card, Avatar, Popover, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/useAuth";
import ResetPasswordModal from "./resetPassword";

function HomeHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const { Header } = Layout;
  const { logout } = useAuth();

  const onLogout = () => {
    logout();
  };

  const PopContent = (
    <Space direction="vertical">
      <Button type="text" onClick={showModal}>
        修改密码
      </Button>
      <Button type="text" onClick={onLogout}>
        退出登录
      </Button>
    </Space>
  );

  return (
    <Header className="home-header">
      <Breadcrumb className="home-breadcrumb" />
      <Popover content={PopContent} trigger="click">
        <Avatar className="home-avatar" icon={<UserOutlined />} />
      </Popover>
      <ResetPasswordModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </Header>
  );
}

function HomeFooter() {
  const { Footer } = Layout;

  return (
    <Footer className="home-footer">FastDemo ©2023 Created by ZHBoat</Footer>
  );
}

function Main(props) {
  const { Content } = Layout;

  return (
    <>
      <HomeHeader />
      <Content className="home-content">
        <Breadcrumb className="home-breadcrumb"></Breadcrumb>
        <Card className="home-card" style={{ borderRadius: 10 }}>
          {props.content}
        </Card>
      </Content>
      <HomeFooter />
    </>
  );
}

export default Main;
