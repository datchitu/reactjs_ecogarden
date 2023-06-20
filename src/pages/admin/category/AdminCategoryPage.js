import {Badge, Breadcrumb, Button, Col, Container, Dropdown, DropdownButton, Form, Row, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import SidebarAdm from "../components/_inc_sidebar_adm";
import categoryAdminService from "./../../../api/admin/categoryAdminService";
import Skeleton from "react-loading-skeleton";
import {Link, useSearchParams} from "react-router-dom";
import { PaginationControl } from 'react-bootstrap-pagination-control';

function AdminCategoryPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({});
    let [searchParams, setSearchParams] = useSearchParams({});

    const getListsCategories = async () => {
        let params = {
            page_size: 10,
            page: page
        };
        setSearchParams(params);
        const response = await categoryAdminService.getListsCategory(params);
        if (response.status === 200) {
            setCategories(response.data);
            setMeta(response.meta);
            setLoading(false);
        }
    }

    const handleClickPage = async (currentPage) => {
        setPage(currentPage);
        let params = {...searchParams};
        params.page = currentPage;
        setSearchParams(params);
        await getListsCategories();
    }

    const deleteCategory = async (id) => {
        const response = await categoryAdminService.deleteById(id);
        if (response.status === 200) {
            await getListsCategories();
        }
    }

    useEffect(() => {
        getListsCategories().then(r => {});
    }, [
        page
    ]);
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
                                <Breadcrumb.Item active>Category</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <h4>Danh sách danh mục</h4>
                        <Form className={''} method={'get'}>
                            <Row>
                                {/*<Col xl={2}>*/}
                                {/*    <Form.Group className="mb-3" controlId="formBasicName">*/}
                                {/*        <Form.Control name={'n'} type="text" placeholder="Enter name" />*/}
                                {/*    </Form.Group>*/}
                                {/*</Col>*/}
                                <Col xl={3}>
                                    {/*<Button variant="primary" type="submit">*/}
                                    {/*    Filter*/}
                                    {/*</Button>*/}
                                    <Link variant="danger" className={'btn btn-danger'} style={{ marginLeft: "5px"}} to={'/admin/category/create'}>Thêm mới</Link>
                                </Col>
                            </Row>
                        </Form>
                        { loading === true ? (
                            <>
                                <Skeleton count={20}/>
                            </>
                        ) : (
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Avatar</th>
                                    <th>Name</th>
                                    <th>Desc</th>
                                    <th>Status</th>
                                    <th>Hot</th>
                                    <th>#</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {categories.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>
                                                <Link to={'/'} title={item.c_name}>
                                                    <img src={item.c_avatar} style={{ width: '40px', height: '40px'}} />
                                                </Link>
                                            </td>
                                            <td>{item.c_name}</td>
                                            <td>{item.c_description}</td>
                                            <td>
                                                <Badge bg={item.c_status === 1 ? 'success' : 'dark'}>
                                                    {item.c_status === 1 ? 'Hiển thị' : 'Ẩn'}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Badge bg={item.c_hot === 1 ? 'success' : 'dark'}>
                                                    {item.c_hot === 1 ? 'Nổi bật' : 'Mặc định'}
                                                </Badge>
                                            </td>
                                            <td>
                                                <DropdownButton
                                                    className={'dropdown-button-customer'} size={'sm'}
                                                    variant={'Secondary'}
                                                    key={item.id} title="...">
                                                    <Link data-rr-ui-dropdown-item=""  role="button" tabIndex="0" className="dropdown-item"
                                                          to={`/admin/category/edit/${item.id}`}>Chỉnh sửa</Link>

                                                    <Dropdown.Item onClick={() => deleteCategory(item.id)}>Xoá</Dropdown.Item>
                                                </DropdownButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) }
                        <PaginationControl
                            page={page}
                            between={meta.total_page}
                            total={meta.total}
                            limit={meta.page_size}
                            changePage={(page) => {
                                handleClickPage(page)
                            }}
                            ellipsis={1}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AdminCategoryPage;
