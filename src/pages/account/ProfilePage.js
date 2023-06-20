import {Breadcrumb, Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import SidebarAccount from "./include/_inc_sidebar";
import "./../../assets/pages/account.scss";
import AuthApi from "../../api/AuthApi";
import Swal from 'sweetalert2';
function ProfilePage()
{
    const [user, setUser] = useState([]);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [cmnd, setCmnd] = useState('');
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');

    const getUser = async() => {
        try {
            let response = await AuthApi.getProfile();
            if(response.status === 'success')
            {
                setUser(response.data.user);
                setAddress(response.data.user.address);
                setPhone(response.data.user.phone);
                setName(response.data.user.name);
                setCmnd(response.data.user.cmnd);
                setSex(response.data.user.sex);
            }

            console.log('============ getProfile@response; ', response);
        } catch (e) {
            console.log("-----Expired");
        }
    }

    const updateProfile = async (event) => {
        event.preventDefault();
        let formData = {
            name: event.target.name.value,
            address: event.target.address.value,
            phone: event.target.phone.value,
            age : event.target.age.value,
            sex : event.target.sex.value,
            cmnd : event.target.cmnd.value
        }

        const response = await AuthApi.updateInfo(formData);
        console.log('------------------ updateProfile@response', response);

        if(response.status === 'success') {
            Swal.fire('Cập nhật thông tin thành công');
        }else {
            Swal.fire({
                title: 'Error!',
                text: 'Cập nhật thông tin thất bại',
                icon: 'error',
                // confirmButtonText: 'Cool'
            })
        }
    }

    useEffect(() => {
        getUser().then(r => {});
    }, []);


    return (
        <Container className="mt-3">
            <Row>
                <Col xl={2}><SidebarAccount/></Col>
                <Col xl={10}>
                    <div className='breadcrumbs'>
                        <Breadcrumb>
                            <Breadcrumb.Item to="/">Trang chủ</Breadcrumb.Item>
                            <Breadcrumb.Item>Tài khoản</Breadcrumb.Item>
                            <Breadcrumb.Item active>Cập nhật thông tin</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div style={{ margin:"20px 0"}}>
                        <Form onSubmit={updateProfile}>
                            <Row>
                                <Col xl={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control disabled type="text" value={user?.email || ''} placeholder="email" />
                                        <Form.Text className="text-muted">
                                            Email không được thay đổi
                                        </Form.Text>
                                    </Form.Group>
                                </Col>

                                <Col xl={6}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Họ tên</Form.Label>
                                        <Form.Control name="name"
                                                      onChange={(event) => setName(event.target.value)}
                                                      type="text" value={name || ''} placeholder="Họ tên" />
                                    </Form.Group>
                                </Col>
                                <Col xl={6}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control name="phone" type="text" required
                                                      onChange={(event) => setPhone(event.target.value)}
                                                      value={phone || ''} placeholder="09..." />
                                    </Form.Group>
                                </Col>
                                <Col xl={2}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Giới tính</Form.Label>
                                        <Form.Control name="sex"
                                                      value={sex || ''} required
                                                      onChange={(event) => setSex(event.target.value)}  type="text"
                                                      placeholder="nam" />
                                    </Form.Group>
                                </Col>
                                <Col xl={2}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Tuổi</Form.Label>
                                        <Form.Control name="age"
                                                      value={age || ''} required
                                                      onChange={(event) => setAge(event.target.value)}  type="number"
                                                      placeholder="19" />
                                    </Form.Group>
                                </Col>
                                <Col xl={2}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>CMND</Form.Label>
                                        <Form.Control name="cmnd"
                                                      value={cmnd || ''} required
                                                      onChange={(event) => setCmnd(event.target.value)}  type="text"
                                                      placeholder="187544212" />
                                    </Form.Group>
                                </Col>
                                <Col xl={6}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Địa chỉ</Form.Label>
                                        <Form.Control name="address"
                                                      value={address || ''} required
                                                      onChange={(event) => setAddress(event.target.value)}  type="text"
                                                      placeholder="Quỳnh Lưu - Nghệ An" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit">
                                Lưu thông tin
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage;
