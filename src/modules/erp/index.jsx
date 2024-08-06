import { useState, useEffect, useMemo } from "react";
import { Button, Layout, Menu } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingPage from "@/common/components/loading/page";
import ProductManage from "./manage/productManage";
import BannerManage from "./manage/bannerManage";
import KnowledgeManage from "./manage/knowledgeManage";

const { Sider } = Layout;

export default function ERP(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const [selectedMenuItem, setSelectedMenuItem] = useState("manage-product");

  const componentsSwitch = (type) => {
    switch (type) {
      case "manage-product":
        return <ProductManage username={location.state.username} />;
      case "manage-banner":
        return <BannerManage username={location.state.username} />;
      case "manage-knowledge":
        return <KnowledgeManage username={location.state.username} />;
      default:
        return null;
    }
  };

  const detectSignin = () => {
    setLoading(true);

    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/");
    } else {
      setLoading(false);
    }
  };

  useMemo(() => {
    detectSignin();
  }, []);

  useEffect(() => {
    setInterval(async () => {
      detectSignin();
    }, 1000);
  }, []);

  return (
    <>
      {!loading ? (
        <div style={{ backgroundColor: "#ECECEC" }}>
          <div style={{ paddingLeft: 0, paddingRight: 0 }}>
            <PageHeader
              title={
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        paddingLeft: 10,
                        display: "grid",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "1rem",
                        }}
                      >
                        <img src="./assets/images/logo/logo.png" alt="logo" />
                        <div style={{ fontWeight: 400, fontSize: 20 }}>
                          <span style={{ fontWeight: "700" }}>Back office</span>
                          <br />
                          of Get print and press
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
              extra={[
                <Button
                  type="text"
                  onClick={async () => {
                    navigate("/");
                    sessionStorage.removeItem("accessToken");
                  }}
                  style={{ marginTop: 16, color: "white" }}
                >
                  LOGOUT
                </Button>,
              ]}
              style={{ backgroundColor: "black" }}
            ></PageHeader>

            <Layout>
              <Sider width={250} className="site-layout-background">
                <Menu
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["mamage-user"]}
                  mode="inline"
                  theme="dark"
                  selectedKeys={selectedMenuItem}
                  onClick={(e) => {
                    setSelectedMenuItem(e.key);
                  }}
                  style={{ height: "100%", paddingTop: 6 }}
                >
                  <Menu.Item key="manage-product">
                    <label
                      style={{
                        paddingLeft: 10,
                        marginBottom: 0,
                        cursor: "pointer",
                      }}
                    >
                      จัดการ Product
                    </label>
                  </Menu.Item>
                  <Menu.Item key="manage-banner">
                    <label
                      style={{
                        paddingLeft: 10,
                        marginBottom: 0,
                        cursor: "pointer",
                      }}
                    >
                      จัดการ Banner
                    </label>
                  </Menu.Item>
                  <Menu.Item key="manage-knowledge">
                    <label
                      style={{
                        paddingLeft: 10,
                        marginBottom: 0,
                        cursor: "pointer",
                      }}
                    >
                      จัดการ เกร็ดน่ารู้
                    </label>
                  </Menu.Item>
                </Menu>
              </Sider>

              <article
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div style={{ padding: 20 }}>
                  {componentsSwitch(selectedMenuItem)}
                </div>
              </article>
            </Layout>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
