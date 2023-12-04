import { HomeTwoTone, SmileTwoTone } from "@ant-design/icons";

const config = [
  {
    title: "首页",
    path: "",
    icon: <HomeTwoTone />,
    submenus: [],
  },
  {
    title: "Example",
    icon: <SmileTwoTone />,
    submenus: [
      {
        title: "example1",
        path: "example/1",
      },
      {
        title: "example2",
        path: "example/2",
      },
      {
        title: "example3",
        path: "example/3",
        hidden: true,
      },
    ],
  },
];

function NavConfig() {
  return config;
}

export default NavConfig;
