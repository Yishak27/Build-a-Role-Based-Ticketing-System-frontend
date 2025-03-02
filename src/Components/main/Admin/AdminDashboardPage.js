import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Card, Alert, Row, Col, Modal, Typography, Watermark } from 'antd';
import { PieChartOutlined, BarChartOutlined, UserOutlined, QrcodeOutlined, LogoutOutlined } from '@ant-design/icons';
import colors from '../../constant/colors';
// import { Pie } from '@ant-design/plots';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { apiUtility, getUser } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";
import { FooterPage } from '../../Auth/FooterPage';

const { Header, Content, Sider } = Layout;

export const AdminDashboardPage = () => {
    const [visible, setVisible] = useState(true);
    const [showAttendance, setShowAttendance] = useState(false);
    const [showVoting, setShowVoting] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [User, setShData] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getUser();
                setShData(data);
            } catch (error) {
            }
        }

        fetchData();
    }, []);

    const pieConfig = [
        { name: 'Subscribe Amount', value: User ? User.subscribeAmount : 0 },
        { name: 'Paid Amount', value: User ? User.paidAmount : 0 },
        {
            name: 'Remaining Amount', value: User ? User.subscribeAmount - User.paidAmount : 0
        },
    ];

    useEffect(() => {
    }, [User]);
    const COLORS = [colors.primary, colors.secondary, colors.warning];

    const handleDismiss = () => {
        setVisible(false);
    };

    const handleVotingClick = () => {
        setShowVoting(true);
    };
    const handleVotingCloseClick = () => {
        setShowVoting(false);
    }
    const handleLogout = async () => {
        try {
            enqueueSnackbar("Log out successfully", { variant: "success" });
            const response = await apiUtility.get('/user/signOut');
            localStorage.clear();
            navigate('/login', { replace: true });
        } catch (error) {
        }
    }
    const handleAttendanceClick = () => {
        setShowAttendance(true);
    };
    const handleAttendanceCloseClick = () => {
        setShowAttendance(false);
    };

    return (
        <>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <label style={{
                        marginLeft: '20px', fontSize: '20px',
                        color: colors.primary, fontWeight: 'bold'
                    }}>Ticketing Dashboard</label>
                    <Menu mode='vertical' style={{ float: 'right', justifyContent: 'center', alignItems: 'center' }}>
                        {/* <Menu.Item key="profile" icon={<QrcodeOutlined />}>
                        <a href="#profile">QR</a>
                    </Menu.Item> */}
                        <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
                            <a onClick={handleLogout}>Logout</a>
                        </Menu.Item>
                    </Menu>
                </Header>
                {/* adding the margin left and right depend on the  */}
                <Content
                    style={{
                        paddingTop: "10px",
                        height: '100vh',
                        margin: 'auto',
                        width: '80%'
                    }}
                    className='responsive-content'>
                    {visible && (
                        <Alert
                            style={{ padding: 10, margin: 10 }}
                            message="Welcome to the ticketing dashbarod. !"
                            description="This dashbaoard help you to manage the "
                            type="success"
                            closable
                            onClose={handleDismiss}
                        />
                    )}

                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginTop: 10 }}>
                            <Card title="UserInformation" bordered={false}>
                                {/* <Watermark content="Ticketing system"> */}
                                <p><strong>Name:</strong> {User.fullName}</p>
                                <p><strong>Amharic Name:</strong> {User.amharicName}</p>
                                <p><strong>Phone Number:</strong> {User.phoneNumber}</p>
                                <p><strong>Number Of Shares:</strong> {User.numberOfShare}</p>
                                <p><strong>Paid Amount:</strong> {User.paidAmount}</p>
                                <p><strong>Subscribed Amount:</strong> {User.subscribeAmount}</p>
                                <p><strong>UserID:</strong> {User.sh_id_ref}</p>
                                {/* </Watermark> */}
                            </Card>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginTop: 10 }}>
                            <Card title="UserData" bordered={false}>
                                <div style={{
                                    height: 270,
                                    alignItems: 'center',
                                    width: "100%",
                                    justifyContent: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    textAlign: "center"
                                }}>
                                    {/* <Pie {...pieConfig} /> */}
                                    <PieChart width={300} height={270}>
                                        {/* Pie Chart */}
                                        <Pie
                                            data={pieConfig}
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={1}
                                            dataKey="value"
                                            label
                                            markerHeight={2}
                                        >
                                            {pieConfig.map((entry, index) => (
                                                <Cell key={`cell-${index}`} style={{
                                                    padding: 10,
                                                    margin: 30
                                                }}
                                                    fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>

                                        {/* Legend */}
                                        <Legend />

                                        {/* Tooltip */}
                                        <Tooltip />
                                    </PieChart>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Content>
                <FooterPage />
            </Layout>
        </>
    );
};

