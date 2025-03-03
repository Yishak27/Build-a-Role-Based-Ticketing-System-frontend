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
import colors from "../../constant/colors";

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
        fetchUserRole();
        fetchTickets();
    }, []);
    
    const fetchUserRole = async () => {
        const userRole = await getRole();
        if (userRole) {
            if (userRole == "admin") {
                navigate("/AdminDashbard", { replace: true });
            } else {
                navigate("/userDashbard", { replace: true });
            }
        }
    }
    
    const fetchTickets = async () => {
        setLoading(true);
        const user = await getUser();
        try {
            const response = await apiUtility.get(`ticket/getticket/${user.userName}`);
            if (response && response.data && response.status) {
                const data = response.data.data;
                setTickets(data);
            }
            console.log('data', tickets);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
        setLoading(false);
    };

    const handleCreateTicket = async (values) => {
        try {
            const user = await getUser();
            values.createdBy = user.userName;
            const response = await apiUtility.post("ticket/create", values);
            if (response && response.status == true) {
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

            <Content
                style={{
                    padding: "20px",
                    height: "100vh",
                    margin: "auto",
                    width: "80%",
                }}
            >
                {visible && (
                    <Alert
                        message="Welcome to the Ticket Management Dashboard!"
                        type="success"
                        closable
                        onClose={() => setVisible(false)}
                        style={{ marginBottom: 20 }}
                    />
                )}

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setShowModal(true)}
                    style={{ marginBottom: 20, background: colors.primary }}
                >
                    New Ticket
                </Button>

                <Table
                    columns={columns}
                    dataSource={tickets.length > 0 && tickets}
                    rowKey="ticketNumber"
                    loading={loading}
                    bordered
                />

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
                            <Button type="primary" htmlType="submit" style={{ width: "100%", background: colors.primary }}>
                                Create Ticket
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>

            <FooterPage />
        </Layout>
    );
};

