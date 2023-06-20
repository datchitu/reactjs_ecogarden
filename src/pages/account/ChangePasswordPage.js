import {Breadcrumb, Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import SidebarAccount from "./include/_inc_sidebar";
import "./../../assets/pages/account.scss";
import AuthApi from "../../api/AuthApi";
import Swal from 'sweetalert2';
function ChangePasswordPage()
{
    const [user, setUser] = useState([]);

    const getUser = async() => {
        try {
            let response = await AuthApi.getProfile();
            if(response.status === 'success')
            {
                setUser(response.data.user);
            }

            console.log('============ getProfile@response; ', response);
        } catch (e) {
            console.log("-----Expired");
        }
    }

    const updatePassword = async (event) => {
        event.preventDefault();
        let formData = {
            password_confirm: event.target.password_confirm.value,
            password_old: event.target.password_old.value,
            password_new: event.target.password_new.value
        }
        if (!formData.password_confirm) {
            Swal.fire({
                title: 'Error!',
                text: 'Mật khẩu xác nhận không được để trống',
                icon: 'error',
            })
            return;
        }

        if (formData.password_confirm != formData.password_new) {
            Swal.fire({
                title: 'Error!',
                text: 'Mật khẩu xác nhận không khớp',
                icon: 'error',
            })
            return;
        }

        const response = await AuthApi.updatePassword({
            password_new: formData.password_new,
            password_old: formData.password_old
        });

        console.log('------------------ updatePassword@response', response);

        if(response.status === 'success') {
            Swal.fire('Cập nhật thông tin thành công');
        }else {
            Swal.fire({
                title: 'Error!',
                text: response.message,
                icon: 'error',
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
                        <Form onSubmit={updatePassword}>
                            <Row>
                                <Col xl={12}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Mật khẩu cũ</Form.Label>
                                        <Form.Control name="password_old"
                                                      // onChange={(event) => setName(event.target.value)}
                                                      type="password" required placeholder="******" />
                                    </Form.Group>
                                </Col>
                                <Col xl={12}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Mật khẩu mới</Form.Label>
                                        <Form.Control name="password_new" required
                                                      // onChange={(event) => setName(event.target.value)}
                                                      type="password" placeholder="******" />
                                    </Form.Group>
                                </Col>
                                <Col xl={12}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Xác nhận mật khẩu</Form.Label>
                                        <Form.Control name="password_confirm" required
                                                      // onChange={(event) => setName(event.target.value)}
                                                      type="password"  placeholder="******" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit">
                                Cập nhật
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ChangePasswordPage;
