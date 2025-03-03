// import React, { useEffect, useState } from 'react';
// import { Layout, Menu, Button, Card, Alert, Row, Col, Modal, Typography, Watermark } from 'antd';
// import { PieChartOutlined, BarChartOutlined, UserOutlined, QrcodeOutlined, LogoutOutlined } from '@ant-design/icons';
// import colors from '../../constant/colors';
// // import { Pie } from '@ant-design/plots';
// import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
// import { apiUtility, getUser,getRole } from '../../utils/api';
// import { useNavigate } from 'react-router-dom';
// import { useSnackbar } from "notistack";
// import { FooterPage } from '../../Auth/FooterPage';

// const { Header, Content, Sider } = Layout;

// export const UserDashboardPage = () => {
//     const [visible, setVisible] = useState(true);
//     const [showAttendance, setShowAttendance] = useState(false);
//     const [showVoting, setShowVoting] = useState(false);
//     const navigate = useNavigate();
//     const { enqueueSnackbar } = useSnackbar();
//     const [User, setShData] = useState({});

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const data = await getUser();
//                 setShData(data);
//             } catch (error) {
//             }
//         }

//         fetchData();
//     }, []);

//     const pieConfig = [
//         { name: 'Subscribe Amount', value: User ? User.subscribeAmount : 0 },
//         { name: 'Paid Amount', value: User ? User.paidAmount : 0 },
//         {
//             name: 'Remaining Amount', value: User ? User.subscribeAmount - User.paidAmount : 0
//         },
//     ];

//     useEffect(() => {
//         fetchUserRole();
//     }, [User]);

//     const fetchUserRole = async () => {
//         const userRole = await getRole();
//         if (userRole) {
//             if (userRole == "user") {
//                 navigate("/userDashbard", { replace: true });
//             } else {
//                 navigate("/AdminDashbard", { replace: true });
//             }
//         }
//     }

//     const COLORS = [colors.primary, colors.secondary, colors.warning];

//     const handleDismiss = () => {
//         setVisible(false);
//     };

//     const handleVotingClick = () => {
//         setShowVoting(true);
//     };
//     const handleVotingCloseClick = () => {
//         setShowVoting(false);
//     }
//     const handleLogout = async () => {
//         try {
//             enqueueSnackbar("Log out successfully", { variant: "success" });
//             const response = await apiUtility.get('/user/logout');
//             localStorage.clear();
//             navigate('/login', { replace: true });
//         } catch (error) {
//         }
//     }
//     const handleAttendanceClick = () => {
//         setShowAttendance(true);
//     };
//     const handleAttendanceCloseClick = () => {
//         setShowAttendance(false);
//     };

//     return (
//         <>
//             <Layout>
//                 <Header style={{ background: '#fff', padding: 0 }}>
//                     <label style={{
//                         marginLeft: '20px', fontSize: '20px',
//                         color: colors.primary, fontWeight: 'bold'
//                     }}>Ticketing User Dashboard</label>
//                     <Menu mode='vertical' style={{ float: 'right', justifyContent: 'center', alignItems: 'center' }}>                    
//                         <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
//                             <a onClick={handleLogout}>Logout</a>
//                         </Menu.Item>
//                     </Menu>
//                 </Header>
//                 {/* adding the margin left and right depend on the  */}
//                 <Content
//                     style={{
//                         paddingTop: "10px",
//                         height: '100vh',
//                         margin: 'auto',
//                         width: '80%'
//                     }}
//                     className='responsive-content'>
//                     {visible && (
//                         <Alert
//                             style={{ padding: 10, margin: 10 }}
//                             message="Welcome to the ticketing dashbarod. !"
//                             description="This dashbaoard help you to manage the "
//                             type="success"
//                             closable
//                             onClose={handleDismiss}
//                         />
//                     )}

//                     <Row gutter={16}>
//                         <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginTop: 10 }}>
//                             <Card title="UserInformation" bordered={false}>
//                                 {/* <Watermark content="Ticketing system"> */}
//                                 <p><strong>Name:</strong> {User.fullName}</p>
//                                 <p><strong>Amharic Name:</strong> {User.amharicName}</p>
//                                 <p><strong>Phone Number:</strong> {User.phoneNumber}</p>
//                                 <p><strong>Number Of Shares:</strong> {User.numberOfShare}</p>
//                                 <p><strong>Paid Amount:</strong> {User.paidAmount}</p>
//                                 <p><strong>Subscribed Amount:</strong> {User.subscribeAmount}</p>
//                                 <p><strong>UserID:</strong> {User.sh_id_ref}</p>
//                                 {/* </Watermark> */}
//                             </Card>
//                         </Col>

//                         <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginTop: 10 }}>
//                             <Card title="UserData" bordered={false}>
//                                 <div style={{
//                                     height: 270,
//                                     alignItems: 'center',
//                                     width: "100%",
//                                     justifyContent: "center",
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     textAlign: "center"
//                                 }}>
//                                     {/* <Pie {...pieConfig} /> */}
//                                     <PieChart width={300} height={270}>
//                                         {/* Pie Chart */}
//                                         <Pie
//                                             data={pieConfig}
//                                             innerRadius={60}
//                                             outerRadius={80}
//                                             fill="#8884d8"
//                                             paddingAngle={1}
//                                             dataKey="value"
//                                             label
//                                             markerHeight={2}
//                                         >
//                                             {pieConfig.map((entry, index) => (
//                                                 <Cell key={`cell-${index}`} style={{
//                                                     padding: 10,
//                                                     margin: 30
//                                                 }}
//                                                     fill={COLORS[index % COLORS.length]} />
//                                             ))}
//                                         </Pie>

//                                         {/* Legend */}
//                                         <Legend />

//                                         {/* Tooltip */}
//                                         <Tooltip />
//                                     </PieChart>
//                                 </div>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Content>
//                 <FooterPage />
//             </Layout>
//         </>
//     );
// };

import React, { useEffect, useState } from "react";
import {
    Layout,
    Menu,
    Button,
    Card,
    Alert,
    Row,
    Col,
    Modal,
    Form,
    Input,
    Table,
    message
} from "antd";
import {
    LogoutOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { apiUtility, getUser, getRole } from "../../utils/api";
import { FooterPage } from "../../Auth/FooterPage";

const { Header, Content } = Layout;

export const UserDashboardPage = () => {
    const [visible, setVisible] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchTickets();
    }, []);

    // 🟢 Fetch Tickets from API
    const fetchTickets = async () => {
        setLoading(true);
        try {
            const response = await apiUtility.get("/tickets"); // API Endpoint
            setTickets(response.data);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
        setLoading(false);
    };

    // 🟢 Handle New Ticket Submission
    const handleCreateTicket = async (values) => {
        try {
            const user = await getUser();
            values.createdBy = user.userName;
            console.log('value ', values);
            // return;
            const response = await apiUtility.post("ticket/create", values);
            if (response && response.status == "success") {
                message.success("Ticket created successfully!");
                setShowModal(false);
                form.resetFields();
                fetchTickets();
            } else {
                enqueueSnackbar(response.message, { variant: 'error' });
            }
        } catch (error) {
            console.error("Error creating ticket:", error);
            message.error("Failed to create ticket.");
        }
    };

    // 🟢 Handle Logout
    const handleLogout = async () => {
        try {
            enqueueSnackbar("Log out successfully", { variant: "success" });
            await apiUtility.get("/user/logout");
            localStorage.clear();
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // 🟢 Define Columns for Table
    const columns = [
        {
            title: "Ticket Number",
            dataIndex: "ticketNumber",
            key: "ticketNumber",
        },
        {
            title: "Title",
            dataIndex: "ticketTitle",
            key: "ticketTitle",
        },
        {
            title: "Description",
            dataIndex: "ticketDescription",
            key: "ticketDescription",
        },
        {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
        },
    ];

    return (
        <Layout>
            {/* 🟢 Header */}
            <Header style={{ background: "#fff", padding: 0 }}>
                <label
                    style={{
                        marginLeft: "20px",
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}
                >
                    Ticket Management Dashboard
                </label>
                <Menu mode="vertical" style={{ float: "right" }}>
                    <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Header>

            {/* 🟢 Content Section */}
            <Content
                style={{
                    padding: "20px",
                    height: "100vh",
                    margin: "auto",
                    width: "80%",
                }}
            >
                {/* 🟢 Welcome Alert */}
                {visible && (
                    <Alert
                        message="Welcome to the Ticket Management Dashboard!"
                        type="success"
                        closable
                        onClose={() => setVisible(false)}
                        style={{ marginBottom: 20 }}
                    />
                )}

                {/* 🟢 New Ticket Button */}
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setShowModal(true)}
                    style={{ marginBottom: 20 }}
                >
                    New Ticket
                </Button>

                {/* 🟢 Ticket Table */}
                <Table
                    columns={columns}
                    dataSource={tickets}
                    rowKey="ticketNumber"
                    loading={loading}
                    bordered
                />

                {/* 🟢 New Ticket Modal */}
                <Modal
                    title="Create New Ticket"
                    open={showModal}
                    onCancel={() => setShowModal(false)}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleCreateTicket}
                    >
                        <Form.Item
                            name="ticketNumber"
                            label="Ticket Number"
                            rules={[{ required: true, message: "Please enter the ticket Number" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="ticketTitle"
                            label="Ticket Title"
                            rules={[{ required: true, message: "Please enter the ticket title" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="ticketDescription"
                            label="Ticket Description"
                            rules={[{ required: true, message: "Please enter the ticket description" }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                Create Ticket
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>

            {/* 🟢 Footer */}
            <FooterPage />
        </Layout>
    );
};

