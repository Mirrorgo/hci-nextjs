import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import { ConfigProvider } from "antd";
import { Button } from "antd";
import { useEffect } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import axios from "axios";
import getLoginUser from "../../helper/getLoginUser";

const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, href, children) {
  return {
    key,
    icon,
    children,
    label,
    href,
  };
}

export default function WorkbenchLayout({ children }) {
  const [selected, setSelected] = useState(["1"]);
  const router = useRouter();
  const handleChangeContainer = ({ key, item }) => {
    setSelected(key);
    const { href } = item.props;
    router.push(href);
    const newBreadcrumb = href.split("/").slice(2); //去掉''和'workbench'
    setBreadcrumb(newBreadcrumb);
  };
  const [breadcrumb, setBreadcrumb] = useState(["home"]);
  useEffect(() => {
    getLoginUser().then((res) => {
      setUser(res);
    });
  }, []);
  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      console.log("route change routeChangeComplete", "!");
    });
    return () => {
      router.events.off("routeChangeComplete", () => {
        console.log("stoped");
      });
    };
  }, [router.events]);

  const [user, setUser] = useState({
    userName: "test",
    password: "test",
    type: "test",
  });
  const items = useMemo(() => getLayoutItems(user.type), [user.type]);
  const [prefix, setPrefix] = useState("custom-default");
  const handleSwitchTheme = () => {
    prefix === "custom-default"
      ? setPrefix("custom-dark")
      : setPrefix("custom-default");
  };
  return (
    <ConfigProvider prefixCls={prefix}>
      <div className={prefix}>
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider>
            <Menu
              theme="dark"
              selectedKeys={selected}
              onClick={handleChangeContainer}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout className="site-layout">
            <Content
              style={{
                margin: "0 16px",
              }}
            >
              <div className="header-bar">
                <Breadcrumb
                  separator=">"
                  style={{
                    margin: "16px 0",
                  }}
                >
                  {breadcrumb.map((cur, idx) => (
                    <Breadcrumb.Item key={idx}>
                      {cur.slice(0, 1).toUpperCase() + cur.slice(1)}
                    </Breadcrumb.Item>
                  ))}
                </Breadcrumb>
                <Button onClick={handleSwitchTheme}>
                  {prefix === "custom-default" ? "切换暗黑" : "切换明亮"}
                </Button>
              </div>
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  minHeight: 360,
                }}
              >
                {children}
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              {/*  */}
            </Footer>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
}

const getLayoutItems = (type) => {
  switch (type) {
    case "agency_boss":
      return [
        getItem("用户主页", "1", <HomeOutlined />, "/workbench/home"),
        getItem("企业管理", "2", <HomeOutlined />, "/workbench/company"),
        getItem(
          "订单管理",
          "3",
          <HomeOutlined />,
          "/workbench/order/management"
        ),
        getItem("投标管理", "4", <HomeOutlined />, "/workbench/bid"),
      ];
    case "agency_employee":
      return [
        getItem("用户主页", "1", <HomeOutlined />, "/workbench/home"),
        getItem(
          "订单管理",
          "2",
          <HomeOutlined />,
          "/workbench/order/management"
        ),
        getItem("投标管理", "3", <HomeOutlined />, "/workbench/bid"),
      ];
    case "businessman":
      return [
        getItem("用户主页", "1", <HomeOutlined />, "/workbench/home"),
        getItem(
          "订单管理",
          "2",
          <HomeOutlined />,
          "/workbench/order/management"
        ),
        getItem("投标管理", "3", <HomeOutlined />, "/workbench/bid"),
      ];
    case "manufacturer":
      return [
        getItem("用户主页", "1", <HomeOutlined />, "/workbench/home"),
        getItem("投标管理", "2", <HomeOutlined />, "/workbench/bid"),
        getItem(
          "订单管理",
          "3",
          <HomeOutlined />,
          "/workbench/order/management"
        ),
        getItem("订单交付", "4", <HomeOutlined />, "/workbench/order/delivery"),
      ];
    case "factory_manager":
      return [
        getItem("用户主页", "1", <HomeOutlined />, "/workbench/home"),
        getItem(
          "订单管理",
          "2",
          <DesktopOutlined />,
          "/workbench/order/management"
        ),
        getItem("设备管理", "9", <FileOutlined />, "/workbench/equipment", [
          getItem(
            "设备信息管理",
            "3",
            null,
            "/workbench/equipment/information"
          ),
          getItem("设备类型管理", "4", null, "/workbench/equipment/type"),
        ]),
      ];
    default:
      return [
        getItem("用户主页", "1", <HomeOutlined />, "/workbench/home"),
        getItem(
          "订单管理",
          "2",
          <DesktopOutlined />,
          "/workbench/order/management"
        ),
        getItem("设备管理", "3", <FileOutlined />, "/workbench/equipment", [
          getItem(
            "设备信息管理",
            "4",
            null,
            "/workbench/equipment/information"
          ),
          getItem("设备类型管理", "5", null, "/workbench/equipment/type"),
        ]),
        getItem("投标管理", "6", <HomeOutlined />, "/workbench/bid"),
        // getItem("订单交付", "8", <HomeOutlined />, "/workbench/order/delivery"),
        getItem("企业管理", "9", <HomeOutlined />, "/workbench/company"),
      ];
  }
};
