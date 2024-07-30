/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Modal } from "antd"
import { BsInfoCircle } from "react-icons/bs"
import { Icon } from '@iconify/react'
import { getAccountVerifyByIdFetch } from "../../../../modules/account/API"

export default function VerifyIdentityEmail(props) {
    const navigate = useNavigate()
    const [modalActive, setModalActive] = useState(false)
    
    const verifyIdentityEmail = async () => {
        const result = await getAccountVerifyByIdFetch(props.uid)
        // console.log("props.uid : ", props.uid)
        // console.log("getAccountVerifyByIdFetch : ", result)
        if (result) {
            if (!result.isAccountVerifiedEmail) { // is open modal 
                setModalActive(true)
            }
        }
    }

    useEffect(() => {
        verifyIdentityEmail()
    }, [])

    return (
        <Modal
            maskClosable={false}
            closable={false}
            title={<label><BsInfoCircle style={{ marginRight: 10, width: 22, height: 22, marginTop: -3, color: '#006FFF' }} />โปรดยืนยันตัวตน ด้วย Email เพื่อสมัครสมาชิกที่เสร็จสมบูรณ์ !</label>}
            style={{ top: 20 }}
            visible={modalActive}
            onOk={() => {
                setModalActive(false)
                navigate("/account?tab=verifyIdentity")
            }}
            onCancel={() => setModalActive(false)}
            okText={
                <>
                    <Icon icon="ic:baseline-perm-identity" style={{ marginTop: -2,color: "white", width: 20, height: 20 }} />
                    <label style={{ width: 90, cursor: 'pointer' }}>ยืนยันตัวตน</label>
                </>
            }
            cancelText={
                <>
                    <Icon icon="ph:clock-afternoon" style={{ marginTop: -2, color: "black", width: 20, height: 20 }} />
                    <label style={{ width: 90, cursor: 'pointer' }}>ภายหลัง</label>
                </>
            }
        >
            <p>ท่านสามารถยืนยันตัวตนได้โดยไปที่</p>
            <p>1. กดเเท็บเมนูมุมขวาบน "บัญชีของฉัน"</p>
            <p>2. เลือกเมนู "ยืนยันตัวตน"</p>
            <p>3. กดยืนยันตัวตนด้วย Email</p>
            <p>หรือคลิกที่ปุ่มด้านล่างนี้</p>
        </Modal>
    )
}