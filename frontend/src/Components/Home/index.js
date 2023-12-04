import React, { useState } from "react";

import { Layout } from "antd";
import Nav from "../Nav";
import AllRoutes from "./allroutes";

const { Sider } = Layout;

function Home() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* TODO: logo */}
        <Nav />
      </Sider>
      <Layout>
        <AllRoutes />
      </Layout>
    </Layout>
  );
}

export default Home;
