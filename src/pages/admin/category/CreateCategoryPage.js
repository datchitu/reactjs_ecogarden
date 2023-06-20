import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import categoryService from "../../../api/categoryService";
import categoryAdminService from "../../../api/admin/categoryAdminService";
import {Breadcrumb, Button, Col, Container, Form, Row} from "react-bootstrap";
import SidebarAdm from "../components/_inc_sidebar_adm";

function CreateCategoryPage()
{
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [desc, setDesc] = useState('');
    const [status, setStatus] = useState(1);
    const [hot, setHot] = useState(0);
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();

        let data = {
            c_name: name,
            c_avatar: avatar,
            c_description: desc,
            c_status: (status == 1 ) ? 1 : 0 ,
            c_hot: (hot == 1 ) ? 1 : 0 ,
        }
        console.log('--------- data: ', data);
        const results = await categoryAdminService.createCategory(data);
        console.log('---------- CREATE: ', results)
        if (results.status === 200) {
            navigate("/admin/category/");
        }
    }

    return (
        <>
            <Container>
                <Row className={'mt-2'}>
                    <Col xl={2}><SidebarAdm/></Col>
                    <Col xl={8} className={'pb-5'}>
                        <div className='breabreadcrumb'>
                            <Breadcrumb>
                                <Breadcrumb.Item to="/">Trang chủ</Breadcrumb.Item>
                                <Breadcrumb.Item href="/admin">
                                    Admin
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>Category</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <h4>Cập nhật</h4>
                        <Form onSubmit={loginSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    value={name}
                                    type="text" placeholder="Name"
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control
                                    as="textarea" rows={3}
                                    value={desc}
                                    onChange={(event) => setDesc(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Link ảnh</Form.Label>
                                <Form.Control
                                    type="text" placeholder="Link ảnh"
                                    value={avatar}
                                    onChange={(event) => setAvatar(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Hiển thị"
                                defaultChecked={status === 1 ? true : false}
                                onChange={(event) => setStatus(event.target.value)}
                            />
                            <Form.Check
                                type="switch"
                                id="hot-switch"
                                label="Chọn nổi bật"
                                defaultChecked={hot === 1 ? true : false}
                                onChange={(event) => setHot(event.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Lưu
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default CreateCategoryPage;
