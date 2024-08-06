import { Col, Row, Spin } from "antd";

export default function LoadingPage(props) {
  return (
    <div
      style={{
        width: "100%",
        height: props?.height ? props.height : 600,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Row gutter={[0, 16]}>
          <Col
            span={24}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin size="large" loading={props.loading} />
          </Col>

          {!props?.isTitleActive ? (
            <Col
              span={24}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label style={{ textAlign: "center" }}>กำลังดาวน์โหลด ...</label>
            </Col>
          ) : (
            []
          )}
        </Row>
      </div>
    </div>
  );
}
