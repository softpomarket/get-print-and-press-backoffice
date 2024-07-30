/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

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
import { Notification } from "../../../../common/components/notification";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { apiServerUrl, serverUrl } from "../../../../constants";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { getPropertyTypesFetch } from "./API/propertyTypeApi";
import {
  deletePickUpByIdFetch,
  deleteTruckByIdFetch,
  getTrucksFetch,
  insertTruckFetch,
  updateTruckFetch,
} from "./API/propertyApi";
import {
  deletePropertyImageByIdFetch,
  insertPropertyImageFetch,
} from "./API/propertyImage";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

const { TextArea } = Input;
const { Option } = Select;
// const { RangePicker } = DatePicker

const columns = [
  {
    title: "No.",
    dataIndex: "index",
    width: "5%",
  },
  {
    title: "รายการรถบรรทุก ISUZU",
    dataIndex: "name",
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

export default function TruckManage(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPropertyGallery, setLoadingPropertyGallery] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();

  const [formProperty] = Form.useForm();
  // const [formPropertyGallery] = Form.useForm()
  const [formSearch] = Form.useForm();

  const accessToken = sessionStorage.getItem("accessToken");

  const [propertyId, setPropertyId] = useState();

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyGallery, setPropertyGallery] = useState([]);
  const [propertyGalleryDisplay, setPropertyGalleryDisplay] = useState([]);

  const [imagePropertyURL, setImagePropertyURL] = useState({
    loading: false,
    imageUrl: null,
    imagePath: null,
  });

  const isActivePropertyGalleryRef = useRef(false);

  const [imagePropertyGalleryURL, setImagePropertyGalleryURL] = useState({
    loading: false,
    imageUrl: null,
    imagePath: null,
  });

  // const [videoProductDetailURL, setVideoProductDetailURL] = useState({
  //     loading: false,
  //     videoUrl: null
  // })

  const [detail, setDetail] = useState();

  const propertyRef = useRef();

  // const promotionRef = useRef()

  const pageCurrentRef = useRef(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const searchNameRef = useRef("");

  const [modalProperty, setModalProperty] = useState({
    isShow: false,
    title: null,
  });

  // const [modalPropertyGallery, setModalPropertyGallery] = useState({
  //     isShow: false,
  //     title: null
  // })

  const optionPropertyImage = {
    name: "file",
    action: `${serverUrl}/api/v1/back-office/upload-file`,
    data: {
      bucket: "truck",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onChange(info) {
      // const newFileName = generateNewFileName(info.file.name)
      // optionPropertyImage.data.name = newFileName

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

  const optionPropertyGalleryImage = {
    name: "file",
    action: `${serverUrl}/api/v1/back-office/upload-files`,
    data: {
      bucket: "truck",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    async onChange(info) {
      let result = info.file.response;
      if (info.file.status !== "uploading") {
        if (result?.status) {
          setImagePropertyGalleryURL({
            // imageUrl: result.formData.fileUrl,
            loading: false,
          });
        }
      } else {
        setImagePropertyGalleryURL({
          // imageUrl: imagePropertyGalleryURL.imageUrl,
          loading: true,
        });
      }

      console.log("A1 --- : ", result?.results);
      if (info.file.status === "done") {
        setLoadingPropertyGallery(true);

        await getPickUpAlls("");
        const [fill] = result?.results;
        const tempObj = { ...fill, id: uuidv4() };
        console.log("fill", fill);
        setPropertyGalleryDisplay((prev) => [...prev, tempObj]);
        // setPropertyGallery((prev) => [...prev, fill]);

        Notification("success", "เเจ้งเตือน!", "อัพโหลดรูปภาพสำเร็จ");

        // let body = {
        //     propertyId,
        //     image: result.formData.fileUrl
        // }
        // const resultPropertyImage = await insertPropertyImageFetch(null, body, accessToken)
        // isActivePropertyGalleryRef.current = false

        // let obj = {
        //     propertyId,
        //     image: result.formData.fileUrl,
        //     id: resultPropertyImage?.id
        // }
        // let tmpPropertyGallery = propertyGallery
        // tmpPropertyGallery?.push(obj)
        // // console.log("tmpPropertyGallery : ", tmpPropertyGallery)
        // setPropertyGallery(tmpPropertyGallery)

        setLoadingPropertyGallery(false);
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

  // function generateNewFileName(oldFileName) {
  //     // สร้างชื่อไฟล์ใหม่ที่นี่ เช่น เพิ่ม timestamp เป็นส่วนหนึ่งของชื่อไฟล์
  //     const timestamp = Date.now()
  //     const extension = oldFileName.split('.').pop()
  //     const newFileName = `${props.username}-${timestamp}.${extension}`
  //     return newFileName
  // }

  // const optionProductDetailVideo = {
  //     name: 'file',
  //     action: `${apiServerUrl}/upload/file`,
  //     data: {
  //         name: "admin",
  //         path: "upload_file/video/product"
  //     },
  //     headers: {
  //         authorization: 'authorization-text',
  //     },
  //     onChange(info) {
  //         if (info.file.status !== 'uploading') {
  //             if (info.fileList.length > 0) {
  //                 setVideoProductDetailURL({
  //                     videoUrl: info.file.response.filePath,
  //                     loading: false,
  //                 })
  //             }
  //         } else {
  //             setVideoProductDetailURL({
  //                 loading: true,
  //                 videoUrl: videoProductDetailURL.videoUrl
  //             })
  //         }

  //         if (info.file.status === 'done') {
  //             Notification("success", "เเจ้งเตือน!", "อัพโหลดวิดีโอสำเร็จ")
  //         } else if (info.file.status === 'error') {
  //             Notification("error", "เเจ้งเตือน!", "อัพโหลดวิดีโอไม่สำเร็จ กรุณาลองใหม่อีกครั้ง")
  //         }
  //     },
  //     progress: {
  //         strokeColor: {
  //             '0%': '#FF7F00',
  //             '100%': '#FF7F00',
  //         },
  //         strokeWidth: 3,
  //         width: '10%',
  //         format: percent => `${parseFloat(percent.toFixed(0))}%`,
  //     }
  // }

  const getPickUpAlls = async (name) => {
    setLoading(true);

    let param = {
      name,
    };
    const result = await getTrucksFetch(param, null, accessToken);
    // console.log("getPropertiesFetch : ", result)
    propertyRef.current = result?.results;
    setTotal(result?.totalItems);
    let tempList = [];
    result?.results?.map((val, index) => {
      tempList.push({
        index: index + 1,
        name: val.model,

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
                  model: val.model,
                  engine: val.engine,
                  gear: val.gear,
                  torque: val.torque,
                  keyword: val.keyword,
                  weight: val.weight,
                  truckCategoryName: val.TruckCategory.name,
                  truckCategoryId: val.TruckCategory.id,
                  pdfUrl: val.pdfUrl,
                  description: val.description,
                  price: val.price,
                  fileId: val.TruckCover.id,
                  isActive: val.isActive,
                });

                setImagePropertyURL({
                  loading: false,
                  imageUrl: val.TruckCover.googleImage,
                  imagePath: val.TruckCover.imagePath,
                });

                setCategoryId(val.TruckCategory.id);
                // setPropertyId(val.id);
                // console.log("propertyId : ", val.id)

                setPropertyGallery(val.TruckGallery);
                setPropertyGalleryDisplay(val.TruckGallery);

                // setVideoProductDetailURL({
                //     loading: false,
                //     videoUrl: val.videoURL
                // })

                // setDetail(val.descriptionDetail ?? "");

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
                await handlePropertiesDelete(val.id);

                // reload
                await getPickUpAlls("");
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

    const listOfURL = propertyGallery?.map((property) => property.imagePath);

    let body = {
      model: values.model,
      engine: values.engine,
      gear: values.gear,
      torque: values.torque,
      keyword: values.keyword,
      pdfUrl: values.pdfUrl,
      weight: values.weight,
      truckCategoryId: categoryId,
      description: values.description,

      price: values.price,
      // fileId: values.TruckCover.id,
      isActive: values.isActive,
      imagePath: imagePropertyURL.imagePath,
      imagepathMultiple: listOfURL,
    };

    let listOfURLById;
    if (propertyGalleryDisplay.length !== 0) {
      listOfURLById = propertyGalleryDisplay?.map((property) => {
        if (uuidValidate(property.id)) {
          return {
            imagePath: property.imagePath,
            id: null,
          };
        } else {
          return {
            imagePath: property.imagePath,
            id: property.id || null,
          };
        }
      });
    } else {
      listOfURLById = propertyGallery?.map((property) => {
        if (uuidValidate(property.id)) {
          return {
            imagePath: property.imagePath,
            id: null,
          };
        } else {
          return {
            imagePath: property.imagePath,
            id: property.id || null,
          };
        }
      });
    }
    const bodyUpdate = {
      model: values.model,
      engine: values.engine,
      gear: values.gear,
      torque: values.torque,
      keyword: values.keyword,
      weight: values.weight,
      truckCategoryId: categoryId,
      pdfUrl: values.pdfUrl,
      description: values.description,
      price: values.price,
      // fileId: values.TruckCover.id,
      isActive: values.isActive,
      imageSingle: { imagePath: imagePropertyURL.imagePath, id: values.fileId },
      imageMultiple: listOfURLById,
    };

    // console.log("body : ", body)

    if (modalProperty.title === "add") {
      const result = await insertTruckFetch(null, body, accessToken);

      if (result.status) {
        Notification("success", "สร้างสำเร็จ");
      } else {
        Notification("error", "ไม่สามารถสร้างได้ กรุณาลองใหม่อีกครั้ง");
      }
    } else if (modalProperty.title === "edit") {
      const result = await updateTruckFetch(param, bodyUpdate, accessToken);
      console.log("UPDATE TRUCK", result);
      if (result.status) {
        Notification("success", "เเก้ไขสำเร็จ");
      } else {
        Notification("error", "ไม่สามารถเเก้ไขได้ กรุณาลองใหม่อีกครั้ง");
      }
    }

    // reload
    await getPickUpAlls("");

    // set default
    setFormPropertyDefault();
  };

  // const onPropertyGalleryFinish = async (values) => {

  // }

  const onSearchFinish = async (values) => {
    let title = values?.title ? values.title : "";
    await getPickUpAlls(title);
  };

  const handlePropertiesDelete = async (id) => {
    let param = {
      id,
    };
    const result = await deleteTruckByIdFetch(param, null, accessToken);
    if (result.status) {
      Notification("success", "ลบสำเร็จ");
    } else {
      Notification("error", "ไม่สามารถลบได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const handlePropertiesGalleryDelete = async (id) => {
    // let param = {
    //   id,
    // };
    // console.log("param : ", param)
    // const result = await deletePropertyImageByIdFetch(param, null, accessToken);
    // if (result && result.isSuccess) {
    let tmpPropertyGallery = propertyGallery?.map((fill) =>
      fill.id === id ? { ...fill, imagePath: null, id: null } : fill
    );

    let tmpPropertyGalleryDisplay = propertyGalleryDisplay?.filter(
      (fill) => fill.id !== id
    );

    // console.log("tmpPropertyGallery : ", tmpPropertyGallery)
    setPropertyGalleryDisplay(tmpPropertyGalleryDisplay);
    setPropertyGallery(tmpPropertyGallery);

    Notification("success", "ลบสำเร็จ");
    // } else {
    //   Notification("error", "ไม่สามารถลบได้ กรุณาลองใหม่อีกครั้ง");
    // }
  };

  const onPagine = (n) => {
    pageCurrentRef.current = n.current;
    getPickUpAlls(searchNameRef.current);
  };

  const setFormPropertyDefault = () => {
    formProperty.setFieldsValue({
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

    setImagePropertyGalleryURL({
      loading: false,
      imageUrl: null,
    });

    // setVideoProductDetailURL({
    //     loading: false,
    //     videoUrl: null
    // })

    setDetail("");

    setModalProperty({
      isShow: false,
      title: null,
    });
  };

  // const setFormPropertyGalleryDefault = () => {
  //     // formPropertyGallery.setFieldsValue({
  //     //     propertyId: undefined,
  //     // })

  //     setModalPropertyGallery({
  //         isShow: false,
  //         title: null
  //     })
  // }

  const getPropertyTypesAll = async () => {
    let param = {
      name: "",
      isActive: "",
      isClosed: "",
      page: 1,
      size: 20,
    };
    let result = await getPropertyTypesFetch(param, null, accessToken);

    setPropertyTypes(result?.results);
  };

  const getAllCategories = async () => {
    try {
      const res = await fetch(`${serverUrl}/api/v1/truck/category`);
      const data = await res.json();

      setCategories(data.results);
    } catch (error) {
      console.log("Fail to get categories with error:", error);
    }
  };

  const getBaseApi = async () => {
    getPropertyTypesAll();
    getAllCategories();
    getPickUpAlls("");
  };

  // console.log("propertyGallery : ", propertyGallery)

  useEffect(() => {
    // console.log("accessToken : ", accessToken)
    getBaseApi();
  }, []);

  useEffect(() => {}, [propertyGalleryDisplay]);

  return (
    <Row>
      <Col span={12}>
        <label>รถบรรทุก ISUZU</label>
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
                <Input placeholder="ชื่อรถบรรทุก ISUZU" />
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
            formProperty.resetFields();

            setPropertyGallery([]);
            setPropertyGalleryDisplay([]);

            setModalProperty({
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
              {modalProperty.title === "add" ? "เพิ่มข้อมูล" : "เเก้ไขข้อมูล"}
            </label>
          </strong>
        }
        visible={modalProperty.isShow}
        zIndex={999}
        onCancel={() => {
          // default
          setFormPropertyDefault();
        }}
        width={"90%"}
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
            <Col xs={24} md={12} xl={12}>
              <Row gutter={[24, 0]}>
                <Form.Item name="fileId" style={{ display: "none" }}>
                  <Input />
                </Form.Item>
                <Col span={24}>
                  <Form.Item name="id" style={{ display: "none" }}>
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="model"
                    label="ชื่อรถบรรทุก ISUZU"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกชื่อรถบรรทุก ISUZU",
                      },
                    ]}
                  >
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="keyword"
                    label="keyword"
                    rules={[{ required: true, message: "กรุณากรอก keyword" }]}
                  >
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="truckCategoryId" style={{ display: "none" }}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="truckCategoryName"
                    label="จำนวนล้อรถ"
                    rules={[
                      { required: true, message: "กรุณาเลือกสถานะการใช้งาน" },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      optionFilterProp="children"
                      allowClear
                      placeholder="4 ล้อ / 6 ล้อ / 10 ล้อ"
                      onChange={(value) => {
                        setCategoryId(value);
                      }}
                    >
                      {/* fetch category */}
                      {categories?.map((category) => (
                        <Option key={category.id} value={category.id}>
                          {category.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="engine"
                    label="เครื่องยนต์"
                    rules={[
                      { required: true, message: "กรุณากรอกเครื่องยนต์" },
                    ]}
                  >
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="torque"
                    label="แรงบิดสูงสุด"
                    rules={[
                      { required: true, message: "กรุณากรอกแรงบิดสูงสุด" },
                    ]}
                  >
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="weight"
                    label="น้ำหนัก"
                    rules={[{ required: true, message: "กรุณากรอกน้ำหนัก" }]}
                  >
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="gear"
                    label="เกียร์"
                    rules={[{ required: true, message: "กรุณากรอกเกียร์" }]}
                  >
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="price"
                    label="ราคา"
                    rules={[{ required: true, message: "กรุณากรอกราคา" }]}
                  >
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} xl={24}>
                  <div style={{ display: "grid" }}>
                    <label style={{ paddingBottom: 6 }}>
                      ภาพปกรถบรรทุก ISUZU
                    </label>
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
              </Row>
            </Col>

            <Col xs={24} md={12} xl={12}>
              <Row gutter={[24, 0]}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="รายละเอียดรถบรรทุก ISUZU"
                    rules={[
                      { required: true, message: "กรุณากรอกรายละเอียดย่อย" },
                    ]}
                  >
                    <TextArea
                      placeholder="กรอกข้อความ"
                      autoSize={{
                        minRows: 8,
                        maxRows: 10,
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="pdfUrl"
                    label="ลิงค์ PDF"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกลิงค์ PDF",
                      },
                    ]}
                  >
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col>
                {/* 
                                <Col xs={24} md={12} xl={12}>
                                    
                                </Col> */}

                <Col span={24} style={{ paddingTop: 24 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <label>ภาพรายละเอียดรถบรรทุก ISUZU</label>
                    <Upload
                      {...optionPropertyGalleryImage}
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
                          imagePropertyGalleryURL.loading ? (
                            <LoadingOutlined />
                          ) : (
                            <UploadOutlined />
                          )
                        }
                      >
                        เพิ่มรูปภาพ
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
                        {propertyGalleryDisplay?.map(
                          (val, index) =>
                            val.imagePath !== null && (
                              <Col xs={24} md={12} xl={12} key={val.id}>
                                <img
                                  src={`${val.googleImage}`} // Assuming googleImage is the source
                                  alt="Property Image"
                                  style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: 200,
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                  }}
                                />
                                <Button
                                  type="primary"
                                  style={{ width: "100%" }}
                                  onClick={async () => {
                                    await handlePropertiesGalleryDelete(val.id);
                                  }}
                                >
                                  ลบรูปภาพ
                                </Button>
                              </Col>
                            )
                        )}
                        {/* </>
                                                        : []
                                                    } */}

                        {propertyGalleryDisplay?.length === 0 ? (
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

                {/* <Col xs={24} md={12} xl={12}>
                                    <div style={{ display: "grid" }}>
                                        <label style={{ paddingBottom: 6 }}>วิดีโอสินค้า (ไม่บังคับ)</label>
                                        {videoProductDetailURL?.videoUrl ?
                                            <div style={{ backgroundColor: "black", borderRadius: 8 }}>
                                                <Video
                                                    url={videoProductDetailURL.videoUrl}
                                                    title={""}
                                                    height={"100%"}
                                                    width={"100%"}
                                                />
                                            </div>
                                            :
                                            <img
                                                style={{ width: "100%", borderRadius: 8, border: "1px solid #C4C4C4" }}
                                                src={`./assets/images/default/df-vdo.png`}
                                            />
                                        }
                                        <div style={{ paddingTop: 12 }}>
                                            <Upload
                                                {...optionProductDetailVideo}
                                                accept='.mp4'
                                                style={{ width: "100%" }}
                                                maxCount={1}
                                                showUploadList={{ showRemoveIcon: false }}
                                            >
                                                <Button
                                                    type="default"
                                                    style={{ width: "100%" }}
                                                    icon={videoProductDetailURL.loading ? <LoadingOutlined /> : <UploadOutlined />}
                                                >อัพโหลดวิดีโอ</Button>
                                            </Upload>
                                        </div>
                                    </div>
                                </Col> */}
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* <Modal
                title={<strong><label className="topic-color-bold">{modalPropertyGallery.title}</label></strong>}
                visible={modalPropertyGallery.isShow}
                zIndex={1000}
                onCancel={() => {
                    // default
                    setFormPropertyGalleryDefault()
                }}
                width={500}
                onOk={() => {
                    // formPropertyGallery.submit()
                }}
                // okText={<label style={{ width: 50, cursor: 'pointer' }}>บันทึก</label>}
                // cancelText={<label style={{ width: 50, cursor: 'pointer' }}>ยกเลิก</label>}
                footer={[]}
            >
                <Row>
                    <Col span={24}>
                        <div style={{ display: "grid" }}>
                            <label style={{ paddingBottom: 6 }}>ภาพปกอสังหาฯ</label>
                            {imagePropertyGalleryURL?.imageUrl ?
                                <img
                                    style={{ borderRadius: 8, maxWidth: 300, border: "1px solid #EEEEEE" }}
                                    src={`${imagePropertyGalleryURL.imageUrl}`}
                                />
                                :
                                <img
                                    style={{ width: "100%", borderRadius: 8, border: "1px solid #C4C4C4" }}
                                    src={`./assets/images/default/df-img.png`}
                                />
                            }
                            <div style={{ paddingTop: 12 }}>
                                <Upload
                                    {...optionPropertyGalleryImage}
                                    accept='image/jpeg, image/png, image/jfif'
                                    style={{ width: "100%" }}
                                    maxCount={1}
                                    showUploadList={{ showRemoveIcon: false }}
                                >
                                    <Button
                                        type="default"
                                        style={{ width: "100%" }}
                                        icon={imagePropertyGalleryURL.loading ? <LoadingOutlined /> : <UploadOutlined />}
                                    >อัพโหลดรูปภาพ</Button>
                                </Upload>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal> */}
    </Row>
  );
}
