import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Form, Input, Button } from "antd";
import { getErpSigninFetch } from "../API";

export default function LoginERP() {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  // const [tokenActive, setTokenActive] = useState(true)
  const [loading, setLoading] = useState(false);
  const [loginCorrect, setIsLoginCorrect] = useState(null);

  // const [usernameForToken, setUsernameForToken] = useState(null)

  const onFinish = async (values) => {
    setLoading(true);

    let obj = {
      username: values.username,
      password: values.password,
    };

    const res = await getErpSigninFetch(obj);

    if (res?.status) {
      sessionStorage.setItem(
        "accessToken",
        res?.result?.credential?.accessToken
      );
      openAdminManage(
        res?.result?.credential?.roleId,
        res?.result?.credential?.userId
      );
      setIsLoginCorrect(true);
    } else {
      setIsLoginCorrect(false);
    }

    setLoading(false);
  };

  const openAdminManage = (roles, username) => {
    navigate("/get-print-and-press-backoffice", {
      state: {
        roles,
        username,
      },
    });
  };

  // const handleUserPass = () => {
  //     // on / off tokenActive
  //     let value = form.getFieldValue();
  //     if (value.username !== '' && value.username !== undefined && value.password !== '' && value.password !== undefined) {
  //         setTokenActive(false)
  //     } else {
  //         setTokenActive(true)
  //     }
  // }

  return (
    <div style={{ backgroundColor: "#707070" }}>
      <article>
        <Row
          style={{
            width: 500,
            top: "50%",
            left: "50%",
            position: "absolute",
            msTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Col span={24}>
            <Card>
              <Row
                gutter={[12, 0]}
                style={{
                  paddingTop: "5%",
                  paddingBottom: "5%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                }}
              >
                <Col span={24} style={{ paddingBottom: 15, fontSize: 20 }}>
                  <h4 style={{ float: "left" }}>เข้าสู่ระบบ</h4>
                </Col>

                <Col span={24}>
                  <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item
                      label="ชื่อผู้ใช้"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: (
                            <label style={{ float: "left" }}>
                              กรุณากรอก username!
                            </label>
                          ),
                        },
                      ]}
                      // onChange={(e) => setUsernameForToken(e.target.value)}
                    >
                      <Input
                      // onChange={() => handleUserPass()}
                      />
                    </Form.Item>
                  </Form>
                </Col>

                <Col span={24}>
                  <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item
                      label="รหัสผ่าน"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: (
                            <label style={{ float: "left" }}>
                              กรุณากรอก password!
                            </label>
                          ),
                        },
                      ]}
                    >
                      <Input.Password
                      // onChange={() => handleUserPass()}
                      />
                    </Form.Item>
                  </Form>
                </Col>

                <Col span={24} style={{ paddingBottom: 12 }}>
                  {loginCorrect !== null ? (
                    loginCorrect ? (
                      []
                    ) : (
                      <label style={{ color: "red", paddingBottom: 12 }}>
                        ชื่อผู้ใช้หรือรหัสผ่าน ไม่ถูกต้อง!
                      </label>
                    )
                  ) : (
                    []
                  )}
                </Col>

                <Col span={24}>
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => form.submit()}
                      loading={loading}
                      style={{ width: "100%" }}
                    >
                      {!loading ? "เข้าสู่ระบบ" : []}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </article>
    </div>
  );
}
