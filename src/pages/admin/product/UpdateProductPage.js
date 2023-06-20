import {Breadcrumb, Button, Col, Container, Form, Row} from "react-bootstrap";
import SidebarAdm from "../components/_inc_sidebar_adm";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import productAdminService from "../../../api/admin/productAdminService";
import categoryAdminService from "../../../api/admin/categoryAdminService";

function UpdateProductPage() {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [desc, setDesc] = useState('');
    const [status, setStatus] = useState(1);
    let [product, setProduct] = useState(1);
    const navigate = useNavigate();

    const findOneProductById = async () => {
        const response = await productAdminService.findById(id);
        if (response.status === 200) {
            console.log('---------- response.data', response.data);
            setProduct(response.data);
            setName(response.data.pro_name);
            setAvatar(response.data.pro_avatar);
            setDesc(response.data.pro_description);
            setStatus(response.data.pro_active);
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault();

        let newProduct = {...product};
        newProduct.pro_name = name;
        newProduct.pro_description = desc;
        newProduct.pro_discount_value = '0';

        console.log('---------- new product: ', newProduct);

        const results = await productAdminService.updateProduct(newProduct, id);
        console.log('---------- UPDATE: ', results)
        if (results.status === 200) {
            navigate("/admin/product/");
        }

    }

    useEffect(() => {
        findOneProductById().then(r => {});
    }, [id]);

    return (
        <>
            <Container>
                <Row className={'mt-2'}>
                    <Col xl={2}><SidebarAdm /></Col>
                    <Col xl={10}>
                        <div className='breabreadcrumb'>
                            <Breadcrumb>
                                <Breadcrumb.Item to="/">Trang chủ</Breadcrumb.Item>
                                <Breadcrumb.Item href="/admin">
                                    Admin
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>Product</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <Form onSubmit={updateProduct}>
                            <Row>
                                <Col xl={8}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Tên sản phẩm</Form.Label>
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
                                </Col>
                                <Col xl={3}>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Hiển thị"
                                        defaultChecked={status === 1 ? true : false}
                                        onChange={(event) => setStatus(event.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Button className={'mb-5'} variant="primary" type="submit">
                                Lưu
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UpdateProductPage;
