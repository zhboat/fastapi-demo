import { Routes, Route } from "react-router-dom";
import NotFound from "../../routes/NotFound";
import NavConfig from "../Nav/config";
import Main from "../Main";
import OverView from "../../routes/OverView";

function AllRoutes(props) {
  const getRouteConfig = () => {
    const config = NavConfig();
    const getPushItem = (item) => {
      return {
        title: item.title,
        path: item.path,
        subtitle: item.subtitle ? item.subtitle : "",
      };
    };

    return config.reduce((acc, cur) => {
      if (cur.path) {
        acc.push(getPushItem(cur));
        return acc;
      }
      if (cur.submenus) {
        cur.submenus.forEach((item) => {
          acc.push(getPushItem(item));
        });
        return acc;
      }
      return acc;
    }, []);
  };
  const config = getRouteConfig();
  const getRouteList = (config) => {
    const convertPathToComponentName = (path) => {
      const pathArr = path.split("/");
      const toUpperFirstLetter = (str) => {
        return str[0].toUpperCase() + str.slice(1);
      };
      const dirName = toUpperFirstLetter(pathArr[0]);
      const subDirName = pathArr
        .map((item) => {
          return toUpperFirstLetter(item);
        })
        .join("");
      if (pathArr.length > 1) {
        return dirName + "/" + subDirName;
      }
      return subDirName;
    };

    return config.map((item, index) => {
      const componentName = convertPathToComponentName(item.path);
      const Component = require(`../../routes/${componentName}`).default;
      return (
        <Route
          key={index}
          path={item.path}
          element={<Main content={<Component />} />}
        />
      );
    });
  };

  return (
    <Routes>
      <Route path="" element={<Main content={<OverView />} />} />
      {getRouteList(config)}
      <Route path="*" element={<Main content={<NotFound />} />} />
    </Routes>
  );
}
export default AllRoutes;
