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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { serverUrl } from "@/constants";
import moment from "moment";
import { Icon } from "@iconify/react";
import { Notification } from "@/common/components/notification";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import {
  deleteKnowledgeByIdFetch,
  getKnowledgeFetch,
  insertBlogKnowledge,
  updateBannersFetch,
  updateKnowledgeFetch,
} from "./API/knowledgeApi";
import { getProductFetch } from "../productManage/API/propertyApi";

const { TextArea } = Input;
const { Option } = Select;

const columns = [
  {
    title: "No.",
    dataIndex: "index",
    width: "5%",
  },
  {
    title: "เกร็ดน่ารู้",
    dataIndex: "title",
    width: "30%",
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

export default function KnowledgeManage(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formBlogKnowledge] = Form.useForm();
  const [formSearch] = Form.useForm();

  const accessToken = sessionStorage.getItem("accessToken");

  const [imageKnowledgeCover, setImageKnowledgeCover] = useState({
    loading: false,
    imageUrl: null,
    imagePath: null,
  });

  const [imageKnowledgeDetail, setImageKnowledgeDetail] = useState({
    loading: false,
    imageUrl: null,
    imagePath: null,
  });

  const [description, setDescription] = useState("");

  const [tags, setTags] = useState([]);

  const propertyRef = useRef();

  const pageCurrentRef = useRef(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const searchNameRef = useRef("");

  const [modalBanner, setModalBanner] = useState({
    isShow: false,
    title: null,
  });

  const optionImageKnowledgeCover = {
    name: "file",
    action: `${serverUrl}/api/v1/back-office/upload-file`,
    data: {
      bucket: "blogknowledgecover",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        let result = info.file.response;

        if (result?.status) {
          console.log("A1 --- : ", result.result.googleImage);
          setImageKnowledgeCover({
            imageUrl: result.result.googleImage,
            loading: false,
            imagePath: result.result.imagePath,
          });
        }
      } else {
        setImageKnowledgeCover({
          imageUrl: imageKnowledgeCover.imageUrl,
          loading: true,
          imagePath: imageKnowledgeCover.imagePath,
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
        setImageKnowledgeCover({ ...imageKnowledgeCover, loading: false });
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

  const optionImageKnowledgeDetail = {
    name: "file",
    action: `${serverUrl}/api/v1/back-office/upload-file`,
    data: {
      bucket: "blogknowledgedetail",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        let result = info.file.response;

        if (result?.status) {
          console.log("A1 --- : ", result.result.googleImage);
          setImageKnowledgeDetail({
            imageUrl: result.result.googleImage,
            loading: false,
            imagePath: result.result.imagePath,
          });
        }
      } else {
        setImageKnowledgeDetail({
          imageUrl: imageKnowledgeDetail.imageUrl,
          loading: true,
          imagePath: imageKnowledgeDetail.imagePath,
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
        setImageKnowledgeDetail({ ...imageKnowledgeDetail, loading: false });
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

  const getKnowledgeAll = async (title) => {
    setLoading(true);
    let param = {
      title: title,
    };

    const result = await getKnowledgeFetch(param, accessToken);

    propertyRef.current = result?.results;
    setTotal(result?.length);
    let tempList = [];

    result?.map((val, index) => {
      tempList.push({
        index: index + 1,
        title: val.BlogKnowledge.title,
        isActive: val.BlogKnowledge.isActive,
        description: val.BlogKnowledge.description,
        createdAt: val.BlogKnowledge.createdAt
          ? moment(val.BlogKnowledge.createdAt).format(formatDate) +
            "\n" +
            moment(val.BlogKnowledge.createdAt).format("HH:mm")
          : "-",
        updatedAt: val.BlogKnowledge.updatedAt
          ? moment(val.BlogKnowledge.updatedAt).format(formatDate) +
            "\n" +
            moment(val.BlogKnowledge.createdAt).format("HH:mm")
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
                marginRight: 4,
              }}
              onClick={async () => {
                formBlogKnowledge.setFieldsValue({
                  blogId: val.blogId,
                  productId: val.BlogKnowledge.ProductOnBlog.map((t) =>
                    t.productId.toString()
                  ),
                  description: val.BlogKnowledge.description,
                  title: val.BlogKnowledge.title,
                  isActive: val.BlogKnowledge.isActive,
                  imageCoverId: val.BlogKnowledge.BlogKnowledgeCover.id,
                  imageKnowledgeCoverId:
                    val.BlogKnowledge.BlogKnowledgeDetailImage.id,
                });

                setDescription(val.BlogKnowledge.description);

                setImageKnowledgeCover({
                  loading: false,
                  imageUrl: val.BlogKnowledge.BlogKnowledgeCover.googleImage,
                  imagePath: val.BlogKnowledge.BlogKnowledgeCover.imagePath,
                });

                setImageKnowledgeDetail({
                  loading: false,
                  imageUrl:
                    val.BlogKnowledge.BlogKnowledgeDetailImage.googleImage,
                  imagePath:
                    val.BlogKnowledge.BlogKnowledgeDetailImage.imagePath,
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

            <Popconfirm
              title="คุณยืนยันลบหรือไม่ ?"
              okText={<span style={{ width: 50 }}>ใช่</span>}
              onConfirm={async () => {
                await handleKnowledgeDelete(val.blogId);

                // reload
                await getKnowledgeAll("");
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
    searchNameRef.current = title;

    setLoading(false);
  };

  const onPropertyFinish = async (values) => {
    let param = {
      id: values.blogId ? values.blogId : "",
    };

    //add
    let body = {
      title: values.title,
      description: values.description ?? description,
      isActive: values.isActive,
      Product: values.productId.map((t) => {
        return { productId: +t };
      }),
      imagepathblogknowledgecoverSingle: imageKnowledgeCover.imagePath,
      imagepathblogknowledgedetailSingle: imageKnowledgeDetail.imagePath,
    };

    console.log(
      values.productId.map((t) => {
        return { productId: +t };
      })
    );

    //edit
    let bodyEdit = {
      title: values.title,
      description: values.description ?? description,
      isActive: values.isActive,
      Product: values.productId.map((t) => {
        return { productId: +t };
      }),
      imageblogknowledgecoverSingle: {
        imagePath: imageKnowledgeCover.imagePath,
        id: null,
      },
      imageblogknowledgedetailSingle: {
        imagePath: imageKnowledgeDetail.imagePath,
        id: null,
      },
    };

    if (modalBanner.title === "add") {
      const result = await insertBlogKnowledge(body, accessToken);

      if (result && result.status) {
        Notification("success", "สร้างสำเร็จ");
      } else {
        Notification("error", "ไม่สามารถสร้างได้ กรุณาลองใหม่อีกครั้ง");
      }
    } else if (modalBanner.title === "edit") {
      const result = await updateKnowledgeFetch(param, bodyEdit, accessToken);

      if (result.status) {
        Notification("success", "เเก้ไขสำเร็จ");
      } else {
        Notification("error", "ไม่สามารถเเก้ไขได้ กรุณาลองใหม่อีกครั้ง");
      }
    }

    // reload
    await getKnowledgeAll("");

    // set default
    setformBannerDefault();
  };

  const onSearchFinish = async (values) => {
    let title = values?.title ? values.title : "";
    await getKnowledgeAll(title);
  };

  const handleKnowledgeDelete = async (id) => {
    let param = {
      id,
    };
    const result = await deleteKnowledgeByIdFetch(param, null, accessToken);
    if (result && result.status) {
      Notification("success", "ลบสำเร็จ");
    } else {
      Notification("error", "ไม่สามารถลบได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const onPagine = (n) => {
    pageCurrentRef.current = n.current;
    getKnowledgeAll(searchNameRef.current);
  };

  const setformBannerDefault = () => {
    formBlogKnowledge.setFieldsValue({
      productId: undefined,
      title: undefined,
      isActive: undefined,
      description: undefined,
    });

    setDescription("");

    setImageKnowledgeCover({
      loading: false,
      imageUrl: null,
      imagePath: null,
    });

    setImageKnowledgeDetail({
      loading: false,
      imageUrl: null,
      imagePath: null,
    });

    setModalBanner({
      isShow: false,
      title: null,
    });
  };

  const getTags = async () => {
    const params = {
      name: "",
    };
    const result = await getProductFetch(params, null, accessToken);

    setTags(result?.results);
  };

  const getBaseApi = async () => {
    getKnowledgeAll("");
  };

  useEffect(() => {
    getBaseApi();
    getTags();
  }, []);

  return (
    <Row>
      <Col span={12}>
        <label>จัดการ เกร็ดน่ารู้</label>
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
              <Form.Item name="title" style={{ width: "100%" }}>
                <Input placeholder="ชื่อเกร็ดน่ารู้" />
              </Form.Item>
            </div>

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
            formBlogKnowledge.resetFields();

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
              {modalBanner.title === "add"
                ? "สร้างเกร็ดน่ารู้"
                : "แก้ไขเกร็ดน่ารู้"}
            </label>
          </strong>
        }
        visible={modalBanner.isShow}
        zIndex={999}
        onCancel={() => {
          // default
          setformBannerDefault();
        }}
        width={750}
        onOk={() => {
          formBlogKnowledge.submit();
        }}
        okText={<label style={{ width: 50, cursor: "pointer" }}>บันทึก</label>}
        cancelText={
          <label style={{ width: 50, cursor: "pointer" }}>ยกเลิก</label>
        }
      >
        <Form
          layout="vertical"
          form={formBlogKnowledge}
          onFinish={onPropertyFinish}
        >
          <Row gutter={[24, 0]}>
            <Col span={24}>
              <Row gutter={[24, 0]}>
                <Col span={24}>
                  <Form.Item name="blogId" style={{ display: "none" }}>
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="title"
                    label="ชื่อ เกร็ดน่ารู้"
                    rules={[
                      { required: true, message: "กรุณากรอกชื่อ เกร็ดน่ารู้" },
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
                </Col>
              </Row>
            </Col>

            {/* ภาพปก */}
            <Col xs={24} md={12}>
              <div style={{ display: "grid" }}>
                <label style={{ paddingBottom: 6 }}>ภาพปกเกร็ดน่ารู้</label>
                {imageKnowledgeCover?.imageUrl ? (
                  <img
                    style={{
                      // borderRadius: 8,
                      maxWidth: 200,
                      border: "1px solid #EEEEEE",
                    }}
                    src={`${imageKnowledgeCover.imageUrl}`}
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
                    {...optionImageKnowledgeCover}
                    accept="image/jpeg, image/png, image/jfif"
                    style={{ width: "100%" }}
                    maxCount={1}
                    showUploadList={false}
                  >
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      icon={
                        imageKnowledgeCover.loading ? (
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

            {/* ภาพรายละเอียดเกร็ดน่ารู้ */}
            <Col xs={24} md={12}>
              <div style={{ display: "grid" }}>
                <label style={{ paddingBottom: 6 }}>
                  ภาพรายละเอียดเกร็ดน่ารู้
                </label>
                {imageKnowledgeDetail?.imageUrl ? (
                  <img
                    style={{
                      borderRadius: 8,
                      maxWidth: "100%",
                      border: "1px solid #EEEEEE",
                    }}
                    src={`${imageKnowledgeDetail.imageUrl}`}
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
                    {...optionImageKnowledgeDetail}
                    accept="image/jpeg, image/png, image/jfif"
                    style={{ width: "100%" }}
                    maxCount={1}
                    showUploadList={false}
                  >
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      icon={
                        imageKnowledgeDetail.loading ? (
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

            {/* Description */}
            <Col span={24}>
              <Form.Item
                name="description"
                label="รายละเอียดเกร็ดน่ารู้"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรายละเอียดเกร็ดน่ารู้",
                  },
                ]}
              >
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    toolbar: {
                      items: [
                        "heading",
                        "|",
                        "fontfamily",
                        "fontsize",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "|",
                        "alignment",
                        "|",
                        "fontColor",
                        "fontBackgroundColor",
                        "|",
                        "bulletedList",
                        "numberedList",
                        "todoList",
                        "|",
                        "code",
                        "codeBlock",
                        "|",
                        "undo",
                        "redo",
                        "|",
                        "insertTable",
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells",
                      ],
                      removeButtons: "Subscript,Superscript",
                    },
                    table: {
                      contentToolbar: [
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells",
                      ],
                    },
                    height: 350,
                  }}
                  data={description}
                  onBlur={(event, editor) => {
                    const data = editor.getData();
                    formBlogKnowledge.setFieldValue("description", data);
                  }}
                />
              </Form.Item>
            </Col>

            {/* ProductId Tags */}
            <Col xs={24} md={12} xl={12}>
              <Form.Item
                name="productId"
                label="Product ที่เกี่ยวข้อง"
                rules={[
                  { required: true, message: "กรุณาเลือกสถานะการใช้งาน" },
                ]}
              >
                <Select
                  mode="tags"
                  showSearch
                  style={{ width: "100%" }}
                  optionFilterProp="children"
                  allowClear
                  placeholder="เลือกสถานะ"
                >
                  {tags &&
                    tags.map((tag, index) => {
                      return (
                        <Option key={index} value={tag.id + ""}>
                          {tag.title}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>

            {/* isActive */}
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
        </Form>
      </Modal>
    </Row>
  );
}
