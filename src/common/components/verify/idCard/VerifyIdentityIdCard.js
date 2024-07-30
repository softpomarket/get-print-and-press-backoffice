import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BsInfoCircle } from "react-icons/bs"

export default function VerifyIdentityIdCard(props) {
    const providerId = props.providerId
    const navigate = useNavigate()

    return (
        <>
            {props.businessOperationId ?
                <Modal
                    maskClosable={false}
                    closable={false}
                    title={
                        <label>
                            <BsInfoCircle style={{ marginRight: 10, width: 22, height: 22, marginTop: -3, color: '#006FFF' }} />
                            {props.businessOperationId === 1 ? 
                                `โปรดยืนยันตัวตน${(providerId === "email/password" ? "ขั้นตอนที่ 2 " : "")}ด้วยบัตรประชาชน เเละบัญชีธนาคาร เพื่อให้สามารถลงทะเบียนสอนได้ !`
                                : 
                                `โปรดยืนยันตัวตน${(providerId === "email/password" ? "ขั้นตอนที่ 2 " : "")}ด้วยหนังสือรับรอง หรือใบสําคัญแสดงการจดทะเบียนห้างหุ้นส่วนบริษัท เเละบัญชีธนาคาร เพื่อให้สามารถลงทะเบียนสอนได้ !`
                            }
                        </label>
                    }
                    style={{ top: 20 }}
                    visible={props.modalVerifyIdentityIdCardActive}
                    onOk={() => {
                        props.handleVerifyIdentityIdCardModal(false)
                        navigate("/account?tab=verifyIdentity")
                    }}
                    onCancel={() => props.handleVerifyIdentityIdCardModal(false)}
                    okText={<label style={{ width: 130, cursor: 'pointer' }}>ไปที่หน้า บัญชีของฉัน</label>}
                    cancelText={<label style={{ width: 65, cursor: 'pointer' }}>ภายหลัง</label>}
                    width={610}
                >
                    <strong><p>ท่านสามารถยืนยันตัวตนได้โดยไปที่</p></strong>
                    <p>1. กดเเทบเมนูมุมขวาบน "บัญชีของฉัน"</p>
                    <p>2. เลือกเมนู "ยืนยันตัวตน"</p>
                    <p>3. เลือก{(providerId === "email/password" ? "ขั้นตอนที่ 2" : "")} ยืนยันตัวตนด้วย ข้อมูลส่วนตัว</p>
                    <p>4. กรอกข้อมูลในส่วนของบัตรประชาชน</p>
                    <p>หรือคลิกที่ปุ่มด้านล่างนี้</p>
                </Modal>
                : []
            }
        </>
    )
}