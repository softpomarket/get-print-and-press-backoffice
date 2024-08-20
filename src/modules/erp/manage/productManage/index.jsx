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
  InputNumber,
  Radio,
  // DatePicker
} from "antd";
import { FaCog } from "react-icons/fa";
import moment from "moment";
import { Icon } from "@iconify/react";
import { Notification } from "@/common/components/notification";
import { serverUrl } from "@/constants";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import {
  deleteProductByIdFetch,
  getProductFetch,
  insertProductFetch,
  updateProductFetch,
} from "./API/propertyApi";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

const { TextArea } = Input;
const { Option } = Select;

const columns = [
  {
    title: "No.",
    dataIndex: "index",
    width: "5%",
  },
  {
    title: "Product",
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

export default function ProductManage(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formProperty] = Form.useForm();
  // const [formPropertyGallery] = Form.useForm()
  const [formSearch] = Form.useForm();

  const accessToken = sessionStorage.getItem("accessToken");

  //For Display UI
  const [promotionGalleryDisplay, setPromotionGalleryDisplay] = useState([]);

  const [imageCoverProduct, setImageCoverProduct] = useState({
    loading: false,
    imageUrl: null,
    imagePath: null,
  });

  const [imageAdsProduct, setImageAdsProduct] = useState({
    loading: false,
    imageUrl: null,
    imagePath: null,
  });

  const [imageProductRecommend, setImageProductRecommend] = useState({
    loading: false,
    imageUrl: null,
    imagePath: null,
  });

  const [imageProductGalleryURL, setImageProductGalleryURL] = useState({
    loading: false,
    imageUrl: null,
    imagePath: null,
  });

  const [imageProductDetailsGalleryURL, setImageProductDetailGalleryURL] =
    useState({
      loading: false,
      imageUrl: null,
      imagePath: null,
    });
  const [productDetailGalleryDisplay, setProductDetailGalleryDisplay] =
    useState([]);
  useState(false);

  const [imageProductExampleGalleryURL, setImageProductExampleGalleryURL] =
    useState({
      loading: false,
      imageUrl: null,
      imagePath: null,
    });
  const [productExampleGalleryDisplay, setProductExampleGalleryDisplay] =
    useState([]);

  const propertyRef = useRef();

  const pageCurrentRef = useRef(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const searchNameRef = useRef("");

  const [modalProperty, setModalProperty] = useState({
    isShow: false,
    title: null,
  });

  const optionProductCoverImage = {
    name: "file",
    action: `${serverUrl}/api/v1/back-office/upload-file`,
    data: {
      bucket: "productcover",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        let result = info.file.response;
        if (result?.status) {
          console.log("A1 --- : ", result.result.googleImage);
          setImageCoverProduct({
            imageUrl: result.result.googleImage,
            loading: false,
            imagePath: result.result.imagePath,
          });
        }
      } else {
        setImageCoverProduct({
          imageUrl: imageCoverProduct.imageUrl,
          loading: true,
          imagePath: imageCoverProduct.imagePath,
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
        setImageCoverProduct({
          imageUrl: null,
          loading: false,
          imagePath: null,
        });
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

  const optionProductAdsImage = {
    name: "file",
    action: `${serverUrl}/api/v1/back-office/upload-file`,
    data: {
      bucket: "productadvert",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onChange(info) {
      // const newFileName = generateNewFileName(info.file.name)
      // optionProductCoverImage.data.name = newFileName

      if (info.file.status !== "uploading") {
        let result = info.file.response;
        if (result?.status) {
          console.log("A1 --- : ", result.result.googleImage);
          setImageAdsProduct({
            imageUrl: result.result.googleImage,
            loading: false,
            imagePath: result.result.imagePath,
          });
        }
      } else {
        setImageAdsProduct({
          imageUrl: imageCoverProduct.imageUrl,
          loading: true,
          imagePath: imageCoverProduct.imagePath,
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

  const optionProductRecommendImage = {
    name: "file",
    action: `${serverUrl}/api/v1/back-office/upload-file`,
    data: {
      bucket: "productrecommend",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onChange(info) {
      // const newFileName = generateNewFileName(info.file.name)
      // optionProductCoverImage.data.name = newFileName

      if (info.file.status !== "uploading") {
        let result = info.file.response;
        if (result?.status) {
          console.log("A1 --- : ", result.result.googleImage);
          setImageProductRecommend({
            imageUrl: result.result.googleImage,
            loading: false,
            imagePath: result.result.imagePath,
          });
        }
      } else {
        setImageProductRecommend({
          imageUrl: imageProductRecommend.imageUrl,
          loading: true,
          imagePath: imageProductRecommend.imagePath,
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
        setImageProductRecommend({
          imageUrl: null,
          loading: false,
          imagePath: null,
        });
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

  // product promotion
  const optionProductGalleryImage = {
    name: "file",
    action: `${serverUrl}/api/v1/back-office/upload-files`,
    data: {
      bucket: "productpromotion",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    async onChange(info) {
      console.log("info gallery", info);
      let result = info.file.response;
      if (info.file.status !== "uploading") {
        if (result?.status) {
          setImageProductGalleryURL({
            // imageUrl: result.formData.fileUrl,
            loading: false,
          });
        }
      } else {
        setImageProductGalleryURL({
          // imageUrl: imageProductGalleryURL.imageUrl,
          loading: true,
        });
      }

      console.log("A1 --- : ", result?.results);
      if (info.file.status === "done") {
        await getProductAlls("");
        const [fill] = result?.results;
        const tempObj = { ...fill, id: uuidv4() };
        console.log("fill", fill);

        //myEdit
        setPromotionGalleryDisplay((prev) => [...prev, tempObj]);

        Notification("success", "เเจ้งเตือน!", "อัพโหลดรูปภาพสำเร็จ");
      } else if (info.file.status === "error") {
        Notification(
          "error",
          "เเจ้งเตือน!",
          "อัพโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
        );
        setImageProductGalleryURL({
          imagePath: null,
          loading: false,
          imageUrl: null,
        });
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

  const optionProductDetailGalleryImage = {
    name: "file",
    action: `${serverUrl}/api/v1/back-office/upload-files`,
    data: {
      bucket: "productdetail",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    async onChange(info) {
      console.log("info gallery", info);
      let result = info.file.response;
      if (info.file.status !== "uploading") {
        if (result?.status) {
          setImageProductDetailGalleryURL({
            // imageUrl: result.formData.fileUrl,
            loading: false,
          });
        }
      } else {
        setImageProductDetailGalleryURL({
          // imageUrl: imageProductGalleryURL.imageUrl,
          loading: true,
        });
      }

      console.log("A1 --- : ", result?.results);
      if (info.file.status === "done") {
        await getProductAlls("");
        const [fill] = result?.results;
        const tempObj = { ...fill, id: uuidv4() };
        console.log("fill", fill);

        //myEdit
        setProductDetailGalleryDisplay((prev) => [...prev, tempObj]);

        Notification("success", "เเจ้งเตือน!", "อัพโหลดรูปภาพสำเร็จ");
      } else if (info.file.status === "error") {
        Notification(
          "error",
          "เเจ้งเตือน!",
          "อัพโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
        );
        setImageProductDetailGalleryURL({
          imageUrl: null,
          loading: false,
          imagePath: null,
        });
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

  const optionProductExampleGalleryImage = {
    name: "file",
    action: `${serverUrl}/api/v1/back-office/upload-files`,
    data: {
      bucket: "productexample",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    async onChange(info) {
      console.log("info gallery", info);
      let result = info.file.response;
      if (info.file.status !== "uploading") {
        if (result?.status) {
          setImageProductExampleGalleryURL({
            // imageUrl: result.formData.fileUrl,
            loading: false,
          });
        }
      } else {
        setImageProductExampleGalleryURL({
          // imageUrl: imageProductGalleryURL.imageUrl,
          loading: true,
        });
      }

      console.log("A1 --- : ", result?.results);
      if (info.file.status === "done") {
        await getProductAlls("");
        const [fill] = result?.results;
        const tempObj = { ...fill, id: uuidv4() };
        console.log("fill", fill);

        //myEdit
        setProductExampleGalleryDisplay((prev) => [...prev, tempObj]);

        Notification("success", "เเจ้งเตือน!", "อัพโหลดรูปภาพสำเร็จ");
      } else if (info.file.status === "error") {
        Notification(
          "error",
          "เเจ้งเตือน!",
          "อัพโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
        );
        setImageProductExampleGalleryURL({
          imageUrl: null,
          loading: false,
          imagePath: null,
        });
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

  const getProductAlls = async (name) => {
    setLoading(true);

    let param = {
      name,
    };
    const result = await getProductFetch(param, null, accessToken);
    // console.log("getPropertiesFetch : ", result)
    propertyRef.current = result?.results;
    setTotal(result?.totalItems);
    let tempList = [];
    result?.results?.map((val, index) => {
      console.log("val: ", val);
      tempList.push({
        index: index + 1,
        title: val.title,

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
                formProperty.setFieldsValue({
                  id: val.id,
                  title: val.title,
                  isActive: val.isActive,
                  subTitle: val.subTitle,
                  productcategoryId: val.productCategoryId,
                });

                setImageCoverProduct({
                  loading: false,
                  imageUrl: val.ProductCover.googleImage,
                  imagePath: val.ProductCover.imagePath,
                });
                setImageAdsProduct({
                  loading: false,
                  imageUrl: val.ProductAdvertImage.googleImage,
                  imagePath: val.ProductAdvertImage.imagePath,
                });
                setImageProductRecommend({
                  loading: false,
                  imageUrl: val.ProductRecommendImage.googleImage,
                  imagePath: val.ProductRecommendImage.imagePath,
                });
                //myEdit
                setPromotionGalleryDisplay(val.ProductPromotionGallery);
                setProductDetailGalleryDisplay(val.ProductDetailGalley);
                setProductExampleGalleryDisplay(val.ProductExampleGallery);
                setModalProperty({ isShow: true, title: "edit" });
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
                await handleProductDelete(val.id);

                // reload
                await getProductAlls("");
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

    const listOfPromotionGallery = promotionGalleryDisplay?.map(
      (gal) => gal.imagePath
    );
    const listOfDetailGallery = productDetailGalleryDisplay?.map(
      (gal) => gal.imagePath
    );
    const listOfExampleGallery = productExampleGalleryDisplay?.map(
      (gal) => gal.imagePath
    );

    let body = {
      title: values.title,
      isActive: values.isActive,
      subTitle: values.subTitle,
      description: values.description ?? "-",
      productcategoryId: values.productcategoryId,
      imagepathproductcoverSingle: imageCoverProduct.imagePath,
      imagepathproductadvertSingle: imageAdsProduct.imagePath,
      imagepathproductrecommendSingle: imageProductRecommend.imagePath,
      imagepathproductpromotionMultiple: listOfPromotionGallery,
      imagepathproductdetailMultiple: listOfDetailGallery,
      imagepathproductexampleMultiple: listOfExampleGallery,
    };

    //myEdit
    const bodyUpdate = {
      id: values.id,
      title: values.title,
      subTitle: values.subTitle,
      description: values.description ?? "-",
      isActive: values.isActive,
      productcategoryId: values.productcategoryId,
      imageproductcoverSingle: {
        imagePath: imageCoverProduct.imagePath,
        id: null,
      },
      imageproductadvertSingle: {
        imagePath: imageAdsProduct.imagePath,
        id: null,
      },
      imageproductrecommendSingle: {
        imagePath: imageProductRecommend.imagePath,
        id: null,
      },
      imageproductpromotionMultiple: listOfPromotionGallery.map((l) => ({
        imagePath: l,
        id: uuidValidate(l.id) ? l.id : null,
      })),
      imageproductdetailMultiple: listOfDetailGallery.map((l) => ({
        imagePath: l,
        id: uuidValidate(l.id) ? l.id : null,
      })),
      imageproductexampleMultiple: listOfExampleGallery.map((l) => ({
        imagePath: l,
        id: uuidValidate(l.id) ? l.id : null,
      })),
    };

    if (modalProperty.title === "add") {
      const result = await insertProductFetch(null, body, accessToken);

      if (result.status) {
        Notification("success", "สร้างสำเร็จ");
      } else {
        Notification("error", "ไม่สามารถสร้างได้ กรุณาลองใหม่อีกครั้ง");
      }
    } else if (modalProperty.title === "edit") {
      const result = await updateProductFetch(param, bodyUpdate, accessToken);

      if (result.status) {
        Notification("success", "เเก้ไขสำเร็จ");
      } else {
        Notification("error", "ไม่สามารถเเก้ไขได้ กรุณาลองใหม่อีกครั้ง");
      }
    }

    // window.location.reload();
    await getProductAlls("");
    // set default
    setFormPropertyDefault();
  };

  const onSearchFinish = async (values) => {
    let title = values?.title ? values.title : "";
    await getProductAlls(title);
  };

  const handleProductDelete = async (id) => {
    let param = {
      id,
    };
    const result = await deleteProductByIdFetch(param, null, accessToken);
    if (result.status) {
      Notification("success", "ลบสำเร็จ");
    } else {
      Notification("error", "ไม่สามารถลบได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const handlePromotionGalleryDelete = async (i) => {
    let newGallery = promotionGalleryDisplay?.filter((_, index) => index !== i);
    //myEdit
    setPromotionGalleryDisplay(newGallery);

    Notification("success", "ลบสำเร็จ");
  };

  const handleProductDetailGalleryDelete = async (i) => {
    let newGallery = productDetailGalleryDisplay?.filter(
      (_, index) => index !== i
    );

    setProductDetailGalleryDisplay(newGallery);

    Notification("success", "ลบสำเร็จ");
  };

  const handleProductExampleGalleryDelete = async (i) => {
    let newGallery = productExampleGalleryDisplay?.filter(
      (_, index) => index !== i
    );

    setProductExampleGalleryDisplay(newGallery);

    Notification("success", "ลบสำเร็จ");
  };

  const onPagine = (n) => {
    pageCurrentRef.current = n.current;
    getProductAlls(searchNameRef.current);
  };

  const setFormPropertyDefault = () => {
    formProperty.setFieldsValue({
      title: undefined,
      isActive: undefined,
      id: undefined,
      subTitle: undefined,
      description: "",
      productcategoryId: undefined,
    });

    setImageCoverProduct({
      loading: false,
      imageUrl: null,
      imagePath: null,
    });
    setImageProductRecommend({
      loading: false,
      imageUrl: null,
      imagePath: null,
    });
    setImageAdsProduct({
      loading: false,
      imageUrl: null,
      imagePath: null,
    });
    setImageProductGalleryURL({
      loading: false,
      imageUrl: null,
      imagePath: null,
    });
    setImageProductExampleGalleryURL({
      loading: false,
      imageUrl: null,
      imagePath: null,
    });

    setProductExampleGalleryDisplay([]);
    setProductDetailGalleryDisplay([]);
    setPromotionGalleryDisplay([]);

    setModalProperty({
      isShow: false,
      title: null,
    });
  };

  const getBaseApi = async () => {
    getProductAlls("");
  };

  useEffect(() => {
    getBaseApi();
  }, []);
  //myEdit
  useEffect(() => { }, [promotionGalleryDisplay]);

  return (
    <Row>
      <Col span={12}>
        <label>จัดการ Product</label>
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
            formProperty.resetFields();

            //myEdit
            setPromotionGalleryDisplay([]);

            setModalProperty({
              isShow: true,
              title: "add",
            });
          }}
        >
          เพิ่มบริการ
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
              {modalProperty.title === "add"
                ? "สร้าง Product"
                : "เเก้ไข Product"}
            </label>
          </strong>
        }
        visible={modalProperty.isShow}
        zIndex={999}
        onCancel={() => {
          // default
          setFormPropertyDefault();
        }}
        width={890}
        onOk={() => {
          formProperty.submit();
        }}
        okText={<label style={{ width: 50, cursor: "pointer" }}>บันทึก</label>}
        cancelText={
          <label style={{ width: 50, cursor: "pointer" }}>ยกเลิก</label>
        }
      >
        <Form layout="vertical" form={formProperty} onFinish={onPropertyFinish}>
          <Row gutter={[24, 0]}>
            <Col xs={24}>
              <Row gutter={[24, 0]}>
                <Form.Item name="id" style={{ display: "none" }}>
                  <Input />
                </Form.Item>

                {/* Product title */}
                <Col xs={24} md={12}>
                  <Form.Item
                    name="title"
                    label="ชื่อ Product"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกชื่อ Product",
                      },
                    ]}
                  >
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col>
                {/* Product Catagories */}
                <Col xs={24} md={12} xl={12}>
                  <Form.Item
                    name="productcategoryId"
                    label="หมวดหมู่ผลิตภัณฑ์"
                    rules={[{ required: true, message: "กรุณาเลือกหมวดหมู่" }]}
                  >
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      optionFilterProp="children"
                      allowClear
                      placeholder="เลือกรายการ"
                    >
                      <Option key={0} value={1}>
                        สื่อส่งเสริมการขาย งานกิจกรรมต่างๆ
                      </Option>
                      <Option key={1} value={2}>
                        สื่อส่งเสริมการขายสินค้าและร้านค้า
                      </Option>
                      <Option key={1} value={3}>
                        สื่อส่งเสริมการขาย แพคเกจจิ้ง
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>

                {/* SubTitle */}
                <Col xs={24}>
                  <Form.Item
                    name="subTitle"
                    label="หัวข้อย่อย"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกหัวข้อย่อย",
                      },
                    ]}
                  >
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col>

                {/* Description */}
                {/* <Col xs={24}>
                  <Form.Item name="description" label="รายละเอียดผลิตภัณฑ์">
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col> */}

                {/* Product Cover Image */}
                <Col xs={24} md={12}>
                  <div style={{ display: "grid" }}>
                    <label style={{ paddingBottom: 6 }}>ภาพปก Product</label>
                    {imageCoverProduct?.imageUrl ? (
                      <img
                        style={{
                          borderRadius: 8,
                          maxWidth: 200,
                          border: "1px solid #EEEEEE",
                        }}
                        src={`${imageCoverProduct.imageUrl}`}
                      />
                    ) : (
                      <img
                        style={{
                          width: 200,
                          borderRadius: 8,
                          border: "1px solid #C4C4C4",
                        }}
                        src={`./assets/images/default/df-img.png`}
                      />
                    )}
                    <div style={{ paddingTop: 24, paddingBottom: 24 }}>
                      <Upload
                        {...optionProductCoverImage}
                        accept="image/jpeg, image/png, image/jfif"
                        style={{ width: "100%" }}
                        maxCount={1}
                        showUploadList={false}
                      >
                        <Button
                          type="primary"
                          style={{ width: "100%" }}
                          icon={
                            imageCoverProduct.loading ? (
                              <LoadingOutlined />
                            ) : (
                              <UploadOutlined />
                            )
                          }
                        >
                          Upload ภาพ
                        </Button>
                      </Upload>
                    </div>
                  </div>
                </Col>

                {/* Product Recommend Image */}
                <Col xs={24} md={12}>
                  <div style={{ display: "grid" }}>
                    <label style={{ paddingBottom: 6 }}>
                      ภาพ สินค้าแนะนำใกล้เคียง
                    </label>
                    {imageProductRecommend?.imageUrl ? (
                      <img
                        style={{
                          borderRadius: 8,
                          maxWidth: 200,
                          border: "1px solid #EEEEEE",
                        }}
                        src={`${imageProductRecommend.imageUrl}`}
                      />
                    ) : (
                      <img
                        style={{
                          width: 200,
                          borderRadius: 8,
                          border: "1px solid #C4C4C4",
                        }}
                        src={`./assets/images/default/df-img.png`}
                      />
                    )}
                    <div style={{ paddingTop: 24, paddingBottom: 24 }}>
                      <Upload
                        {...optionProductRecommendImage}
                        accept="image/jpeg, image/png, image/jfif"
                        style={{ width: "100%" }}
                        maxCount={1}
                        showUploadList={false}
                      >
                        <Button
                          type="primary"
                          style={{ width: "100%" }}
                          icon={
                            imageProductRecommend.loading ? (
                              <LoadingOutlined />
                            ) : (
                              <UploadOutlined />
                            )
                          }
                        >
                          Upload ภาพ
                        </Button>
                      </Upload>
                    </div>
                  </div>
                </Col>

                {/* Product Ads Image */}
                <Col xs={24} md={24}>
                  <div style={{ display: "grid" }}>
                    <label style={{ paddingBottom: 6 }}>
                      ภาพปก โฆษณาของ Product
                    </label>
                    {imageAdsProduct?.imageUrl ? (
                      <img
                        style={{
                          borderRadius: 8,
                          maxWidth: "100%",
                          border: "1px solid #EEEEEE",
                        }}
                        src={`${imageAdsProduct.imageUrl}`}
                      />
                    ) : (
                      <img
                        style={{
                          width: 400,
                          borderRadius: 8,
                          border: "1px solid #C4C4C4",
                        }}
                        src={`./assets/images/default/df-img.png`}
                      />
                    )}
                    <div style={{ paddingTop: 24, paddingBottom: 24 }}>
                      <Upload
                        {...optionProductAdsImage}
                        accept="image/jpeg, image/png, image/jfif"
                        style={{ width: "100%" }}
                        maxCount={1}
                        showUploadList={false}
                      >
                        <Button
                          type="primary"
                          style={{ width: "100%" }}
                          icon={
                            imageAdsProduct.loading ? (
                              <LoadingOutlined />
                            ) : (
                              <UploadOutlined />
                            )
                          }
                        >
                          Upload ภาพ
                        </Button>
                      </Upload>
                    </div>
                  </div>
                </Col>

                {/* Product Status */}
                <Col xs={24} md={12}>
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
                {/* Product Promotion Image */}
                <Col span={24} style={{ paddingTop: 24 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <label>โปรโมชั่น</label>
                    <Upload
                      {...optionProductGalleryImage}
                      accept="image/jpeg, image/png, image/jfif"
                      style={{ width: "100%" }}
                      multiple
                      maxCount={1}
                      showUploadList={false}
                    >
                      <Button
                        type="primary"
                        style={{ width: "100%" }}
                        icon={
                          imageProductGalleryURL.loading ? (
                            <LoadingOutlined />
                          ) : (
                            <UploadOutlined />
                          )
                        }
                      >
                        เพิ่มภาพโปรโมชั่น
                      </Button>
                    </Upload>
                  </div>
                  <div style={{ paddingTop: 12, paddingBottom: 24 }}>
                    <div
                      style={{
                        padding: 12,
                        border: "2px solid #EEEEEE",
                        borderRadius: 16,
                      }}
                    >
                      <Row gutter={[12, 24]}>
                        {promotionGalleryDisplay?.map(
                          (val, index) =>
                            val.imagePath !== null && (
                              <Col xs={24} md={8} key={index}>
                                <img
                                  src={`${val.googleImage}`} // Assuming googleImage is the source
                                  alt="Property Image"
                                  style={{
                                    objectFit: "contain",
                                    width: 200,
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                  }}
                                />
                                <Button
                                  type="primary"
                                  style={{ width: 200 }}
                                  onClick={async () => {
                                    await handlePromotionGalleryDelete(index);
                                  }}
                                >
                                  ลบรูปภาพ
                                </Button>
                              </Col>
                            )
                        )}

                        {promotionGalleryDisplay?.length === 0 ? (
                          <Col span={24}>
                            <div
                              style={{
                                padding: 24,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                backgroundColor: "#EEEEEE",
                              }}
                            >
                              <label>ไม่มีรูปภาพ</label>
                            </div>
                          </Col>
                        ) : (
                          []
                        )}
                      </Row>
                    </div>
                  </div>
                </Col>
                {/* Product Detail Image */}
                <Col span={24} style={{ paddingTop: 24 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <label>ภาพรายละเอียด Product</label>
                    <Upload
                      {...optionProductDetailGalleryImage}
                      accept="image/jpeg, image/png, image/jfif"
                      style={{ width: "100%" }}
                      multiple
                      maxCount={1}
                      showUploadList={false}
                    >
                      <Button
                        type="primary"
                        style={{ width: "100%" }}
                        icon={
                          imageProductDetailsGalleryURL.loading ? (
                            <LoadingOutlined />
                          ) : (
                            <UploadOutlined />
                          )
                        }
                      >
                        เพิ่มภาพรายละเอียด Product
                      </Button>
                    </Upload>
                  </div>
                  <div style={{ paddingTop: 12, paddingBottom: 24 }}>
                    <div
                      style={{
                        padding: 12,
                        border: "2px solid #EEEEEE",
                        borderRadius: 16,
                      }}
                    >
                      <Row gutter={[12, 24]}>
                        {productDetailGalleryDisplay?.map(
                          (val, index) =>
                            val.imagePath !== null && (
                              <Col xs={24} key={index}>
                                <img
                                  src={`${val.googleImage}`}
                                  alt="Property Image"
                                  style={{
                                    objectFit: "contain",
                                    width: "100%",
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                  }}
                                />
                                <Button
                                  type="primary"
                                  style={{ width: 200 }}
                                  onClick={async () => {
                                    await handleProductDetailGalleryDelete(
                                      index
                                    );
                                  }}
                                >
                                  ลบรูปภาพ
                                </Button>
                              </Col>
                            )
                        )}

                        {productDetailGalleryDisplay?.length === 0 ? (
                          <Col span={24}>
                            <div
                              style={{
                                padding: 24,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                backgroundColor: "#EEEEEE",
                              }}
                            >
                              <label>ไม่มีรูปภาพ</label>
                            </div>
                          </Col>
                        ) : (
                          []
                        )}
                      </Row>
                    </div>
                  </div>
                </Col>
                {/* Product Example Image */}
                <Col span={24} style={{ paddingTop: 24 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <label>ภาพตัวอย่างผลงาน</label>
                    <Upload
                      {...optionProductExampleGalleryImage}
                      accept="image/jpeg, image/png, image/jfif"
                      style={{ width: "100%" }}
                      multiple
                      maxCount={1}
                      showUploadList={false}
                    >
                      <Button
                        type="primary"
                        style={{ width: "100%" }}
                        icon={
                          imageProductExampleGalleryURL.loading ? (
                            <LoadingOutlined />
                          ) : (
                            <UploadOutlined />
                          )
                        }
                      >
                        เพิ่มภาพตัวอย่างผลงาน
                      </Button>
                    </Upload>
                  </div>
                  <div style={{ paddingTop: 12, paddingBottom: 24 }}>
                    <div
                      style={{
                        padding: 12,
                        border: "2px solid #EEEEEE",
                        borderRadius: 16,
                      }}
                    >
                      <Row gutter={[12, 24]}>
                        {productExampleGalleryDisplay?.map(
                          (val, index) =>
                            val.imagePath !== null && (
                              <Col xs={24} md={6} key={index}>
                                <img
                                  src={`${val.googleImage}`} // Assuming googleImage is the source
                                  alt="Property Image"
                                  style={{
                                    objectFit: "contain",
                                    width: 200,
                                    // borderTopLeftRadius: 8,
                                    // borderTopRightRadius: 8,
                                  }}
                                />
                                <Button
                                  type="primary"
                                  style={{ width: 200 }}
                                  onClick={async () => {
                                    await handleProductExampleGalleryDelete(
                                      index
                                    );
                                  }}
                                >
                                  ลบรูปภาพ
                                </Button>
                              </Col>
                            )
                        )}

                        {productExampleGalleryDisplay?.length === 0 ? (
                          <Col span={24}>
                            <div
                              style={{
                                padding: 24,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                backgroundColor: "#EEEEEE",
                              }}
                            >
                              <label>ไม่มีรูปภาพ</label>
                            </div>
                          </Col>
                        ) : (
                          []
                        )}
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Row>
  );
}
