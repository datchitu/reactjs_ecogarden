import React, {useEffect, useState} from "react";
import {Badge, Breadcrumb, Button, Col, Container, Dropdown, DropdownButton, Form, Row, Table} from "react-bootstrap";
import SidebarAdm from "../components/_inc_sidebar_adm";
import Skeleton from "react-loading-skeleton";
import {Link, useSearchParams} from "react-router-dom";
import productAdminService from "../../../api/admin/productAdminService";
import ReactPaginate from "react-paginate";
import {PaginationControl} from "react-bootstrap-pagination-control";

const metaDefault = {
    page: 1,
    page_size: 10,
    total: 0,
    total_page: 0
}

function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({});
    let [searchParams, setSearchParams] = useSearchParams({});

    const getListsProducts = async () => {
        let params = {
            page_size: 20,
            page: page
        };
        setSearchParams(params);

        const response = await productAdminService.getListsProducts(params);
        if (response.status === 200) {
            setProducts(response.data);
            setMeta(response.meta);
            setLoading(false);
        }
    }

    const handleClickPage = async (currentPage) => {
        setPage(currentPage);
        let params = {...searchParams};
        params.page = currentPage;
        setSearchParams(params);
        await getListsProducts();
    }

    useEffect(() => {
        getListsProducts().then(r => {});
    }, [page]);
    return (
        <>
            <Container>
                <Row className={'mt-2'}>
                    <Col xl={2}><SidebarAdm/></Col>
                    <Col xl={10}>
                        <div className='breabreadcrumb'>
                            <Breadcrumb>
                                <Breadcrumb.Item to="/">Trang chủ</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    Admin
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>Product</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <h4>Danh sách sản phẩm</h4>
                        <Form className={''} method={'get'}>
                            <Row>
                                <Col xl={2}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Control name={'n'} type="text" placeholder="Enter name"/>
                                    </Form.Group>
                                </Col>
                                <Col xl={2}>
                                    <Button variant="primary" type="submit">
                                        Filter
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        {loading === true ? (
                            <>
                                <Skeleton count={20}/>
                            </>
                        ) : (
                            <>
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th style={{ width: "10px"}}>ID</th>
                                        <th style={{ width: "60px"}}>Avatar</th>
                                        <th style={{ width: "400px"}}>Name</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>#</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {products.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>
                                                <Link to={'/'} title={item.pro_name}>
                                                    <img src={item.pro_avatar} style={{width: '40px', height: '40px'}}/>
                                                </Link>
                                            </td>
                                            <td><span style={{ fontSize: '14px'}}>{item.pro_name}</span></td>
                                            <td>
                                                <Link to={`/`}>
                                                    Danh mục
                                                </Link>
                                            </td>
                                            <td>
                                                <Badge bg={item.pro_active === 1 ? 'success' : 'dark'}>
                                                    {item.pro_active === 1 ? 'Hiển thị' : 'Ẩn'}
                                                </Badge>
                                            </td>
                                            <td>
                                                <DropdownButton
                                                    className={'dropdown-button-customer'} size={'sm'}
                                                    variant={'Secondary'}
                                                    key={item.id} title="...">
                                                    <Link data-rr-ui-dropdown-item=""  role="button" tabIndex="0" className="dropdown-item"
                                                          to={`/admin/product/edit/${item.id}`}>Chỉnh sửa</Link>
                                                    <Dropdown.Item>Xoá</Dropdown.Item>
                                                </DropdownButton>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </>

                        )}
                    </Col>
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
                </Row>
            </Container>
        </>
    )
}

export default AdminProductPage;
