import { useState, useEffect, useRef } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Input,
  Popconfirm,
  Select,
  Upload,
  // DatePicker
} from "antd";
import { FaCog } from "react-icons/fa";
import { serverUrl } from "@/constants";
import moment from "moment";
import { Icon } from "@iconify/react";
import { Notification } from "@/common/components/notification";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import {
  deleteBannerByIdFetch,
  getBannersFetch,
  insertBannersFetch,
  updateBannersFetch,
} from "./API/propertyApi";

const { TextArea } = Input;
const { Option } = Select;

const columns = [
  {
    title: "No.",
    dataIndex: "index",
    width: "5%",
  },
  {
    title: "Banner",
    dataIndex: "name",
    width: "30%",
    render: (text, record) => {
      return (
        <>
          <img style={{ width: "60%" }} src={record.name} alt="banner" />
        </>
      );
    },
  },

  {
    title: "สถานะ",
    width: "10%",
    render: (text, record) => {
      return (
        <>
          {record.isActive ? (
            <label>เปิดใช้งาน</label>
          ) : (
            <label>ปิดใช้งาน</label>
          )}
        </>
      );
    },
  },

  {
    title: "วันที่สร้าง",
    dataIndex: "createdAt",
    width: "10%",
    render: (text, record) => {
      return (
        <>
          <label style={{ whiteSpace: "pre" }}>{text}</label>
        </>
      );
    },
  },
  {
    title: "เเก้ไขล่าสุด",
    dataIndex: "updatedAt",
    width: "10%",
    render: (text, record) => {
      return (
        <>
          <label style={{ whiteSpace: "pre" }}>{text}</label>
        </>
      );
    },
  },
  {
    title: <FaCog />,
    dataIndex: "operator",
    align: "center",
    width: "25%",
  },
];

const formatDate = "DD/MM/YYYY";

export default function BannerManage(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formBanner] = Form.useForm();
  const [formSearch] = Form.useForm();

  const accessToken = sessionStorage.getItem("accessToken");

  const [imagePropertyURL, setImagePropertyURL] = useState({
    loading: false,
    imageUrl: null,
    imagePath: null,
  });

  const [detail, setDetail] = useState();

  const propertyRef = useRef();

  const pageCurrentRef = useRef(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const searchNameRef = useRef("");

  const [modalBanner, setModalBanner] = useState({
    isShow: false,
    title: null,
  });

  const optionPropertyImage = {
    name: "file",
    action: `${serverUrl}/api/v1/back-office/upload-file`,
    data: {
      bucket: "banner",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        let result = info.file.response;

        if (result?.status) {
          console.log("A1 --- : ", result.result.googleImage);
          setImagePropertyURL({
            imageUrl: result.result.googleImage,
            loading: false,
            imagePath: result.result.imagePath,
          });
        }
      } else {
        setImagePropertyURL({
          imageUrl: imagePropertyURL.imageUrl,
          loading: true,
          imagePath: imagePropertyURL.imagePath,
        });
      }

      if (info.file.status === "done") {
        Notification("success", "เเจ้งเตือน!", "อัพโหลดรูปภาพสำเร็จ");
      } else if (info.file.status === "error") {
        Notification(
          "error",
          "เเจ้งเตือน!",
          "อัพโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
        );
      }
    },
    progress: {
      strokeColor: {
        "0%": "#FF7F00",
        "100%": "#FF7F00",
      },
      strokeWidth: 3,
      width: "10%",
      format: (percent) => `${parseFloat(percent.toFixed(0))}%`,
    },
  };

  const getBannersAll = async (name) => {
    setLoading(true);
    let param = {
      keyword: name,
    };

    const result = await getBannersFetch(param, accessToken);

    propertyRef.current = result?.results;
    setTotal(result?.length);
    let tempList = [];

    result?.map((val, index) => {
      tempList.push({
        index: index + 1,
        name: val.BannerImage.googleImage,

        isActive: val.isActive, // สถานะการใช้งาน

        createdAt: val.createdAt
          ? moment(val.createdAt).format(formatDate) +
            "\n" +
            moment(val.createdAt).format("HH:mm")
          : "-",
        updatedAt: val.updatedAt
          ? moment(val.updatedAt).format(formatDate) +
            "\n" +
            moment(val.createdAt).format("HH:mm")
          : "-",
        operator: (
          <>
            <Button
              style={{
                width: 35,
                backgroundColor: "orange",
                border: "1px solid orange",
                color: "white",
                borderRadius: 50,
              }}
              onClick={async () => {
                formBanner.setFieldsValue({
                  id: val.id,
                  title: val.title,
                  keyword: val.keyword,
                  fileId: val.BannerImage.id,
                  isActive: val.isActive,
                });

                setImagePropertyURL({
                  loading: false,
                  imageUrl: val.BannerImage.googleImage,
                  imagePath: val.BannerImage.imagePath,
                });

                setModalBanner({ isShow: true, title: "edit" });
              }}
            >
              <div style={{ marginTop: 0, marginLeft: 0 }}>
                <Icon
                  icon="typcn:edit"
                  style={{ color: "white", width: 20, height: 20 }}
                />
              </div>
            </Button>
            {"  "}

            <Popconfirm
              title="คุณยืนยันลบหรือไม่ ?"
              okText={<span style={{ width: 50 }}>ใช่</span>}
              onConfirm={async () => {
                await handlePropertiesDelete(val.id);

                // reload
                await getBannersAll("");
              }}
              cancelText={<span style={{ width: 50 }}>ไม่ใช่</span>}
            >
              <Button
                danger
                type="primary"
                style={{
                  width: 35,
                  borderRadius: 50,
                }}
              >
                <div style={{ marginTop: 0, marginLeft: 0 }}>
                  <Icon
                    icon="fluent:delete-16-regular"
                    style={{ color: "white", width: 20, height: 20 }}
                  />
                </div>
              </Button>
            </Popconfirm>
          </>
        ),
      });
    });
    setList(tempList);
    searchNameRef.current = name;

    setLoading(false);
  };

  const onPropertyFinish = async (values) => {
    let param = {
      id: values.id ? values.id : "",
    };

    let body = {
      title: values.title,
      keyword: values.keyword ? values.keyword : "string",
      isActive: values.isActive ? true : false,
      imagePath: imagePropertyURL.imagePath,
    };

    if (modalBanner.title === "add") {
      const result = await insertBannersFetch(body, accessToken);

      if (result && result.status) {
        Notification("success", "สร้างสำเร็จ");
      } else {
        Notification("error", "ไม่สามารถสร้างได้ กรุณาลองใหม่อีกครั้ง");
      }
    } else if (modalBanner.title === "edit") {
      const result = await updateBannersFetch(param, body, accessToken);

      if (result) {
        Notification("success", "เเก้ไขสำเร็จ");
      } else {
        Notification("error", "ไม่สามารถเเก้ไขได้ กรุณาลองใหม่อีกครั้ง");
      }
    }

    // reload
    await getBannersAll("");

    // set default
    setformBannerDefault();
  };

  const onSearchFinish = async (values) => {
    let title = values?.title ? values.title : "";
    await getBannersAll(title);
  };

  const handlePropertiesDelete = async (id) => {
    let param = {
      id,
    };
    const result = await deleteBannerByIdFetch(param, null, accessToken);
    console.log("DELETE BANNER", result);
    if (result && result.status) {
      Notification("success", "ลบสำเร็จ");
    } else {
      Notification("error", "ไม่สามารถลบได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const onPagine = (n) => {
    pageCurrentRef.current = n.current;
    getBannersAll(searchNameRef.current);
  };

  const setformBannerDefault = () => {
    formBanner.setFieldsValue({
      productId: undefined,
      title: undefined,
      isActive: undefined,
      isClosed: undefined,
      detail: undefined,
    });

    setImagePropertyURL({
      loading: false,
      imageUrl: null,
      imagePath: null,
    });

    setModalBanner({
      isShow: false,
      title: null,
    });
  };

  const getBaseApi = async () => {
    getBannersAll("");
  };

  useEffect(() => {
    getBaseApi();
  }, []);

  return (
    <Row>
      <Col span={12}>
        <label>จัดการ Banner</label>
      </Col>

      <Col span={12} style={{ paddingBottom: 20 }}>
        <Form form={formSearch} layout="vertical" onFinish={onSearchFinish}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ paddingLeft: 10 }}>
              <Form.Item
                // label="ชื่ออสังหา"
                name="title"
                style={{ width: "100%" }}
              >
                <Input placeholder="ชื่อบริการ" />
              </Form.Item>
            </div>

            {/* <div style={{ paddingLeft: 10 }}>
                            <Form.Item
                                label="ช่วงวันที่สร้าง" name="dateRange"
                                style={{ width: '100%' }}
                            >
                                <RangePicker />
                            </Form.Item>
                        </div> */}

            <div style={{ paddingLeft: 10, marginTop: -24 }}>
              <Button
                style={{ float: "right", width: 70 }}
                type="primary"
                onClick={() => formSearch.submit()}
              >
                ค้นหา
              </Button>
            </div>
          </div>
        </Form>
      </Col>

      <Col span={24} style={{ paddingBottom: 20 }}>
        <Button
          type="primary"
          style={{ float: "right" }}
          onClick={() => {
            formBanner.resetFields();

            setModalBanner({
              isShow: true,
              title: "add",
            });
          }}
        >
          เพิ่มรายการ
        </Button>
      </Col>

      <Col span={24}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={list}
          pagination={{
            current: pageCurrentRef.current,
            pageSize: pageSize,
            total: total,
          }}
          onChange={(n) => onPagine(n)}
        ></Table>
      </Col>

      <Modal
        title={
          <strong>
            <label className="topic-color-bold">
              {modalBanner.title === "add" ? "เพิ่มข้อมูล" : "เเก้ไขข้อมูล"}
            </label>
          </strong>
        }
        visible={modalBanner.isShow}
        zIndex={999}
        onCancel={() => {
          // default
          setformBannerDefault();
        }}
        width={"60%"}
        onOk={() => {
          formBanner.submit();
        }}
        okText={<label style={{ width: 50, cursor: "pointer" }}>บันทึก</label>}
        cancelText={
          <label style={{ width: 50, cursor: "pointer" }}>ยกเลิก</label>
        }
      >
        <Form layout="vertical" form={formBanner} onFinish={onPropertyFinish}>
          <Row gutter={[24, 0]}>
            <Col span={24}>
              <Row gutter={[24, 0]}>
                <Form.Item name="fileId" style={{ display: "none" }}>
                  <Input />
                </Form.Item>
                <Col span={24}>
                  <Form.Item name="id" style={{ display: "none" }}>
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="title"
                    label="ชื่อ Banner"
                    rules={[
                      { required: true, message: "กรุณากรอกชื่อ Banner" },
                    ]}
                  >
                    <TextArea
                      autoSize={{ minRows: 1, maxRows: 2 }}
                      placeholder="กรอกข้อความ"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item name="id" style={{ display: "none" }}>
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="keyword"
                    label="keyword"
                    rules={[{ required: true, message: "กรุณากรอก keyword" }]}
                  >
                    <TextArea
                      autoSize={{ minRows: 1, maxRows: 2 }}
                      placeholder="กรอกข้อความ"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col xs={24} md={12} xl={12}>
              <Row gutter={[24, 0]}>
                <Col xs={24} md={24} xl={24}>
                  <div style={{ display: "grid" }}>
                    <label style={{ paddingBottom: 6 }}>ภาพ Banner</label>
                    {imagePropertyURL?.imageUrl ? (
                      <img
                        style={{
                          borderRadius: 8,
                          maxWidth: "100%",
                          border: "1px solid #EEEEEE",
                        }}
                        src={`${imagePropertyURL.imageUrl}`}
                      />
                    ) : (
                      <img
                        style={{
                          width: "100%",
                          borderRadius: 8,
                          border: "1px solid #C4C4C4",
                        }}
                        src={`./assets/images/default/df-img.png`}
                      />
                    )}
                    <div style={{ paddingTop: 24, paddingBottom: 24 }}>
                      <Upload
                        {...optionPropertyImage}
                        accept="image/jpeg, image/png, image/jfif"
                        style={{ width: "100%" }}
                        maxCount={1}
                        showUploadList={false}
                      >
                        <Button
                          type="default"
                          style={{ width: "100%" }}
                          icon={
                            imagePropertyURL.loading ? (
                              <LoadingOutlined />
                            ) : (
                              <UploadOutlined />
                            )
                          }
                        >
                          อัพโหลดรูปภาพ
                        </Button>
                      </Upload>
                    </div>
                  </div>
                </Col>

                <Col xs={24} md={12} xl={12}>
                  <Form.Item
                    name="isActive"
                    label="สถานะการใช้งาน"
                    rules={[
                      { required: true, message: "กรุณาเลือกสถานะการใช้งาน" },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      optionFilterProp="children"
                      allowClear
                      placeholder="เลือกสถานะ"
                    >
                      <Option key={0} value={true}>
                        เปิดใช้งาน
                      </Option>
                      <Option key={1} value={false}>
                        ปิดใช้งาน
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Row>
  );
}
