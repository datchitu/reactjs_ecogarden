import {Alert, Breadcrumb, Col, Container, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import CartApi from "../../api/CartService";

function SuccessPay() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const [statusPay, setStatusPay] = useState("success");


    const handlePostback = async () => {
        if (params.get('vnp_ResponseCode') === '00') {
            setStatusPay('success')
        } else {
            setStatusPay('danger')
        }
        const orderID = params.get('vnp_TxnRef');
        console.log('----------- OrderID: ', orderID);

        const update = await CartApi.updateOrderPaid(orderID);
        console.log('------------ update', update);
    }

    useEffect(() => {
        handlePostback().then(r => {});
    },[params])

    return(
        <>
            <Container>
                <Row>
                    <Col xl={{span: 6, offset: 3}} md={{span: 6, offset: 3}}>
                        <div className='' style={{ marginTop:"15px"}}>
                            <Breadcrumb>
                                <Breadcrumb.Item to="/">Trang chủ</Breadcrumb.Item>
                                <Breadcrumb.Item active>Thanh to</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xl={{span: 6, offset: 3}} md={{span: 6, offset: 3}}>
                        <Alert key={statusPay} variant={statusPay}>
                            Xác nhận thanh toán thành công !.
                        </Alert>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SuccessPay;
