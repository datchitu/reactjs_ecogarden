import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import React from "react";
import SidebarAccount from "./include/_inc_sidebar";
import "./../../assets/pages/account.scss";
function AccountPage()
{
    return (
        <Container className="mt-3">
            <Row>
                <Col xl={2}><SidebarAccount/></Col>
                <Col xl={10}>
                    <div className='breadcrumbs'>
                        <Breadcrumb>
                            <Breadcrumb.Item to="/">Trang chủ</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                Admin
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>User</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h2>Chào bạn</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default AccountPage;
