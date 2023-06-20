import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import SidebarAccount from "./include/_inc_sidebar";
import "./../../assets/pages/account.scss";
import CartApi from "../../api/CartService";
import {Link} from "react-router-dom";
import {FaTrash} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import Moment from 'react-moment';
import AuthApi from "../../api/AuthApi";

function OrderPage()
{
    const [loadingOrder, setLoadingOrder] = useState(true);
    const [orders, setOrders] = useState([]);
    const [user_id, setUserId] =  useState(0);

    const getUser = async() => {
        try {
            let response = await AuthApi.getProfile();
            if(response.status === 'success')
            {
                setUserId(response.data.user.id)
                console.log('--------response.data.user.id: ', response.data.user.id);
                await getOrderList();
            }
        } catch (e) {
            console.log("-----Expired");
        }
    }

    const getOrderList = async () => {
        let page = 1;
        let page_size = 10;
        const response = await CartApi.getOrders(page, page_size, user_id);
        if (user_id)
        {
            console.log('--------------- response: ', response);
            if (response.status === 'success') {
                console.log('--------------- response.data.orders: ', response.data.orders);
                setLoadingOrder(false);
                setOrders(response.data.orders);
            }
        }else {
            console.log('---- cannot user id');
            setLoadingOrder(false);
        }
    }

    useEffect(() => {
        // getOrderList().then(r => {});
        getUser().then(r => {});
    }, [user_id]);

    return (
        <Container className="mt-3">
            <Row>
                <Col xl={2}><SidebarAccount/></Col>
                <Col xl={8}>
                    <div className='breadcrumbs'>
                        <Breadcrumb>
                            <Breadcrumb.Item to="/">Trang chủ</Breadcrumb.Item>
                            <Breadcrumb.Item active>Đơn hàng của bạn</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className={'list-orders'}>
                        { loadingOrder === true ? (
                            <div className="order-items">
                                <Skeleton count={5} />
                            </div>
                        ) : (
                            <>
                                {orders && orders.map((item, index) => (
                                    <div className="order-items" key={index}>
                                        <p className="item-header">
                                            <span><b style={{paddingRight: "4px"}}>Đơn hàng #{item.id}</b>
                                            Ngày tạo <Moment date={item.created_at}  format="YYYY/MM/DD"/></span>
                                            <span>{item.status_order.name}</span>
                                        </p>
                                        {item.transactions.length && (
                                            <>
                                                <div className='list-carts'>
                                                    {item.transactions.map((order, key) => (
                                                        <div className="items" key={key}>
                                                            <div className="image">
                                                                <Link to={`/san-pham/${order.name}`}>
                                                                    <img src={order.avatar} />
                                                                </Link>
                                                            </div>
                                                            <div className="info">
                                                                <Link to={`/san-pham/${order.name}`}>
                                                                    <h4>{order.name}</h4>
                                                                </Link>
                                                                {/*<span className='item-delete' >*/}
                                                                {/*    <FaTrash /> huỷ bỏ*/}
                                                                {/*</span>*/}
                                                            </div>
                                                            <div className="price">
                                                                <span>{order.quantity} x {order.price.toLocaleString()} đ</span>
                                                                {/*<span><sub className='discount'>20.000.000 đ</sub></span>*/}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                        </div>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderPage;
