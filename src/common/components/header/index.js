/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "../header/css/index.css"
// import styled from 'styled-components'
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
	Drawer,
	Button,
	Menu,
} from 'antd'
import { Icon } from '@iconify/react'
import { useDimensions } from "../../mamager/ScreenManager"
import { scroller } from "react-scroll"
import { serverUrl } from "../../../constants"

// const CustomMenu = styled(Menu)`
// 	background-color: rgba(0, 0, 0, 0);
// 	color: white;
// `

export default function Header(props) {
	const navigate = useNavigate()
	const location = useLocation()

	const { width } = useDimensions()

	const [state, setState] = useState({
		current: 'mail',
		visible: false
	})

	const showDrawer = () => {
		setState({
			visible: true
		})
	}

	const onClose = () => {
		setState({
			visible: false
		})
	}

	const genRightMenu = () => {
		return (
			<Menu mode="inline">
				<Menu.Item
					key="1"
					onClick={() => {
						openPath("single_house")
					}}
				>
					บ้านเดี่ยว
				</Menu.Item>

				<Menu.Item
					key="2"
					onClick={() => {
						openPath("condo")
					}}
				>
					condo
				</Menu.Item>

				<Menu.Item
					key="3"
					onClick={() => {
						openPath("office_and_shop")
					}}
				>
					ออฟฟิศ / ร้านค้า
				</Menu.Item>

				<Menu.Item
					key="4"
					onClick={() => {
						openPath("townhouse_and_townhome")
					}}
				>
					ทาวน์เฮ้าว์ / ทาวน์โฮม
				</Menu.Item>

				<Menu.Item
					key="5"
					onClick={() => {
						openPath("warehouse_and_factory")
					}}
				>
					โกดัง / โรงงาน
				</Menu.Item>

				<Menu.Item
					key="6"
					onClick={() => {
						openPath("land")
					}}
				>
					ที่ดิน
				</Menu.Item>

				<Menu.Item
					key="7"
					onClick={() => {
						openPath("blog")
					}}
				>
					บทความ
				</Menu.Item>

				{/* <Menu.Item
					key="8"
					onClick={() => {
						openPath("contact_us")
					}}
				>
					ติดต่อ
				</Menu.Item> */}
			</Menu>
		)
	}

	const genLeftMenu = () => {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					fontSize: 18,
					marginTop: -2
				}}
			>
				<div
					onClick={() => {
						openPath("single_house")
					}}
					className="divStyle"
				>
					<div style={{ color: "white", cursor: "pointer" }}>
						<label style={{ padding: 12, cursor: "pointer" }}>บ้านเดี่ยว</label>
					</div>
				</div>

				<div
					onClick={() => {
						openPath("condo")
					}}
					className="divStyle"
				>
					<div style={{ color: "white", cursor: "pointer" }}>
						<label style={{ padding: 12, cursor: "pointer" }}>คอนโด</label>
					</div>
				</div>

				<div
					onClick={() => {
						openPath("office_and_shop")
					}}
					className="divStyle"
				>
					<div style={{ color: "white", cursor: "pointer" }}>
						<label style={{ padding: 12, cursor: "pointer" }}>ออฟฟิศ / ร้านค้า</label>
					</div>
				</div>

				<div
					onClick={() => {
						openPath("townhouse_and_townhome")
					}}
					className="divStyle"
				>
					<div style={{ color: "white", cursor: "pointer" }}>
						<label style={{ padding: 12, cursor: "pointer" }}>ทาวน์เฮ้าว์ / ทาวน์โฮม</label>
					</div>
				</div>

				<div
					onClick={() => {
						openPath("warehouse_and_factory")
					}}
					className="divStyle"
				>
					<div style={{ color: "white", cursor: "pointer" }}>
						<label style={{ padding: 12, cursor: "pointer" }}>โกดัง / โรงงาน</label>
					</div>
				</div>

				<div
					onClick={() => {
						openPath("land")
					}}
					className="divStyle"
				>
					<div style={{ color: "white", cursor: "pointer" }}>
						<label style={{ padding: 12, cursor: "pointer" }}>ที่ดิน</label>
					</div>
				</div>

				<div
					onClick={() => {
						openPath("blog")
					}}
					className="divStyle"
				>
					<div style={{ color: "white", cursor: "pointer" }}>
						<label style={{ padding: 12, cursor: "pointer" }}>บทความ</label>
					</div>
				</div>

				{/* <div
					onClick={() => {
						openPath("contact_us")
					}}
					className="divStyle"
				>
					<div style={{ color: "white", cursor: "pointer" }}>
						<label style={{ padding: 12, cursor: "pointer" }}>ติดต่อเรา</label>
					</div>
				</div> */}
			</div>
		)
	}

	const openPath = (menu) => {
		let path = location.pathname
		if (menu === "single_house") {
			if (path === "/" || path === "/home") {
				scroller.scrollTo("single_house", {
					duration: 1500,
					delay: 100,
					smooth: true,
					offset: -210,
				});
			} else {
				navigate("/?menu=single_house")
			}
		} else if (menu === "condo") {
			if (path === "/" || path === "/home") {
				scroller.scrollTo("condo", {
					duration: 1500,
					delay: 100,
					smooth: true,
					offset: -78,
				});
			} else {
				navigate("/?menu=condo")
			}
		} else if (menu === "office_and_shop") {
			if (path === "/" || path === "/home") {
				scroller.scrollTo("office_and_shop", {
					duration: 1500,
					delay: 100,
					smooth: true,
					offset: -78,
				});
			} else {
				navigate("/?menu=office_and_shop")
			}
		} else if (menu === "townhouse_and_townhome") {
			if (path === "/" || path === "/home") {
				scroller.scrollTo("townhouse_and_townhome", {
					duration: 1500,
					delay: 100,
					smooth: true,
					offset: -78,
				});
			} else {
				navigate("/?menu=townhouse_and_townhome")
			}
		} else if (menu === "warehouse_and_factory") {
			if (path === "/" || path === "/home") {
				scroller.scrollTo("warehouse_and_factory", {
					duration: 1500,
					delay: 100,
					smooth: true,
					offset: -78,
				});
			} else {
				navigate("/?menu=warehouse_and_factory")
			}
		} else if (menu === "land") {
			if (path === "/" || path === "/home") {
				scroller.scrollTo("land", {
					duration: 1500,
					delay: 100,
					smooth: true,
					offset: -78,
				});
			} else {
				navigate("/?menu=land")
			}
		} else if (menu === "blog") {
			if (path === "/" || path === "/home") {
				scroller.scrollTo("blog", {
					duration: 1500,
					delay: 100,
					smooth: true,
					offset: -78,
				});
			} else {
				navigate("/?menu=blog")
			}
		} else if (menu === "contact_us") {
			if (path === "/" || path === "/home") {
				scroller.scrollTo("blog", {
					duration: 1500,
					delay: 100,
					smooth: true,
					offset: -78,
				});
			} else {
				navigate("/?menu=contact_us")
			}
		}
	}

	return (
		<div
			style={{
				paddingTop: 0,
				paddingBottom: 0,
				paddingLeft: width > 1200 ? "10%" : (width > 760 && width < 1200 ? 12 : 12),
				paddingRight: width > 1200 ? "10%" : (width > 760 && width < 1200 ? 12 : 12),
				position: 'fixed',
				zIndex: 2,
				width: width > 1200 ? "80%" : (width > 760 && width < 1200 ? "98%" : "98%"),
				backgroundColor: 'rgba(0, 0, 0, 0.4)',
				overflow: 'hidden',
				boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.4)',
				height: 70,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between"
			}}
		>
			<div style={{ display: "flex", alignItems: "center" }}>
				<div style={{ display: "grid", alignItems: "center", color: "white" }}>
					<img
						src={"./assets/images/logo/logo-wisit-estate.jpg"}
						style={{ width: 55, height: 55, borderRadius: 60, cursor: "pointer" }}
						onClick={() => {
							navigate("/")
						}}
					/>
				</div>
			</div>

			{width > 1012 ?
				<div
					style={{
						display: "flex",
						paddingTop: 2,
						alignItems: "center",
						justifyContent: "flex-end"
					}}
				>
					{genLeftMenu()}
				</div>
				:
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
					<Drawer
						title={<label style={{ fontSize: 16, fontWeight: 100 }}>Is Asset Home ขายบ้านเช่าบ้าน.com</label>} placement="right"
						closable={false}
						onClose={onClose}
						visible={state.visible}
						bodyStyle={{ padding: '0px' }}
						size="default"
					>
						{genRightMenu()}
					</Drawer>

					<Button
						type="primary"
						onClick={showDrawer}
						style={{
							height: 70,
							width: 85,
							borderRadius: 0
						}}
					>
						<Icon
							icon="charm:menu-hamburger"
							style={{
								fontSize: '2.5em',
								marginTop: 4,
								marginLeft: -8,
								color: "white"
							}}
						/>
					</Button>
				</div>
			}
		</div>
	)
}