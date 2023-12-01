import { Breadcrumb, Layout, Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

function HomeHeader() {
  const { Header } = Layout;
  return (
    <Header className="home-header">
      <Breadcrumb className="home-breadcrumb" />
      <Avatar className="home-avatar" icon={<UserOutlined />} />
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
