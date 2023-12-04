import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import NavConfig from "./config";

function Nav() {
  const navigate = useNavigate();

  const getMenuItem = (item) => {
    return {
      key: item.path,
      icon: item.icon,
      label: item.title,
      onClick: () => navigate("/" + item.path),
    };
  };
  const getSubMenu = (item) => {
    return {
      key: item.title,
      icon: item.icon,
      label: item.title,
      children: item.submenus
        .filter((submenu) => !submenu.hidden)
        .map(getMenuItem),
    };
  };

  const getNavMenus = (menus) => {
    return menus.map((menu, index) => {
      return menu.submenus.length > 0 ? getSubMenu(menu) : getMenuItem(menu);
    });
  };

  return (
    <>
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["1"]}
        items={getNavMenus(NavConfig())}
      />
    </>
  );
}

export default Nav;
