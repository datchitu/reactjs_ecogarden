import {Breadcrumb, Col, Container, Form, Row, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {FaTrash} from "react-icons/fa";
import {
    addToCart,
    decrementQuantity,
    incrementQuantity,
    removeAll,
    removeCartAll,
    removeItem
} from "../../store/CartSlice";
import Swal from "sweetalert2";
import CartApi from "../../api/CartService";
import formatPrice from "../../utils/util_price";
import AuthApi from "../../api/AuthApi";

function CartPage() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [typePay, setTypePay] = useState(1);
    const [user_id, setUserId] = useState(0);

    const navigate = useNavigate();

    const carts = useSelector((state) => state.cartReduce.listCart);
    let price_total = 0;

    const deleteCart = async (product) => {
        Swal.fire({
            title: 'Bạn có chắc chắn xoá sản phẩm trong giỏ hàng ko?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Xoá',
            denyButtonText: `Huỷ bỏ`,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeItem(product));
            }
        })
    }

    const handleChange = async (e) => {
        setTypePay(e.target.value);
    }

    const addOrder = async () => {
        let total = 0;
        let order = {};
        let transactions = [];

        // console.log('------------ TYPE: ', typePay);
        // return


        carts.forEach((item, index) => {
            transactions.push({
                product_id: item.id,
                name: item.name,
                quantity: item.quantity,
                discount_type: "money",
                discount_value: 0,
                discount: 0,
                price: item.price,
                total_price: item.price,
            });

            total += item.price * item.quantity;
        });

        order.name = name;
        order.phone = phone;
        // order.address = address;

        order.products = transactions;
        order.note = "System";
        order.order_type = typePay;
        order.total_money = total;
        order.user_id = user_id;

        console.log('--------------- order: ', order);
        const createCart = await CartApi.createOrder(order);
        console.log('--------------- createCart: ', createCart);
        if (createCart.status === "fail") {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Có lỗi xẩy ra, xin vui lòng kiểm tra lại : [${createCart.message}]`,
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (createCart.status === "success") {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Đặt vé thành công`,
                showConfirmButton: false,
                timer: 1500
            })
            if (createCart.data.link) {
                window.location.href = createCart.data.link;
            }
            dispatch(removeCartAll());
            navigate('/', { replace: true });
            return;
        }
        if (createCart.status === 200) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Đơn hàng được lưu thành công',
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(removeCartAll());
            navigate('/', { replace: true });
        } else {

        }

        if (createCart.status === 500 && createCart.message === "error") {
            console.log("Error create!!!");
        }
    }

    // tăng
    const increaseQty = async (product) => {
        // if (product.pro_number <= product.quantity) {
        //     Swal.fire({
        //         position: 'top-end',
        //         icon: 'error',
        //         title: 'Số lượng sản phẩm không đủ?',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        //     return false;
        // }

        const objProduct = {...product};
        objProduct.quantity +=  1;
        dispatch(incrementQuantity(objProduct))
    }

    // giảm
    const reduceQty = async (product) => {
        if (product.quantity === 1) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Số lượng qty >= 1?',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        }
        const objProduct = {...product};
        objProduct.quantity -=  1;
        dispatch(decrementQuantity(objProduct));
    }


    const getUser = async() => {
        try {
            let response = await AuthApi.getProfile();
            if(response.status === 'success')
            {
                console.log('------ user: ', response.data.user);
                setUserId(response.data.user.id);
            }
        } catch (e) {
            console.log("-----Expired");
        }
    }

    function getTotal() {
        carts.map((item) => {
            price_total += item.quantity * item.price;
        });
        return price_total.toLocaleString();
    }

    useEffect(() => {
        getUser().then(r => {});
    }, []);

    return(
        <>
            <Container>
                <Row>
                    <Col xl={{span: 6, offset: 3}} md={{span: 6, offset: 3}}>
                        <div className='' style={{ marginTop:"15px"}}>
                            <Breadcrumb>
                                <Breadcrumb.Item to="/">Trang chủ</Breadcrumb.Item>
                                <Breadcrumb.Item active>Thông tin vé và thanh toán</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <div className='list-carts'>
                                {carts && carts.map((item, index) => (
                                    <div className="items" key={index}>
                                        <div className="image">
                                            <Link to={`/san-pham/${item.slug}`}>
                                                <img src={item.avatar} />
                                            </Link>
                                            <span className='item-delete' onClick={() => deleteCart(item)}>
                                                <FaTrash /> Xoá
                                            </span>
                                        </div>
                                        <div className="info">
                                            <Link to={`/san-pham/${item.slug}`}>
                                                <h4>{item.name}</h4>
                                            </Link>
                                        </div>
                                        <div className="price">
                                            <span>{formatPrice(item.price)} đ x {item.quantity}</span> <span><sub className='discount'>{formatPrice(item.price)} đ</sub></span>
                                            <div className="box-qty-add-cart">
                                                <div className="box">
                                                    <button onClick={() => reduceQty(item)}>-</button>
                                                    <input type="number" readOnly value={item.quantity}  />
                                                    <button onClick={() => increaseQty(item)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className='total-cart'>
                                    <span>Tạm tính ({(carts && carts.length) ? carts.length : 0} vé)</span>
                                    <span>{getTotal()} vnđ</span>
                                </div>
                            </div>
                            <div className="info-guest">
                                <h5>Thông tin khách hàng</h5>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="text"  placeholder="Họ tên"  onChange={(event) => setName(event.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="phone" placeholder="Số điện thoại" onChange={(event) => setPhone(event.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Select onChange={handleChange}  size="md">
                                                <option value={1}>Thanh toán tại quầy</option>
                                                <option value={2}>Chuyển khoản</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <button type="submit" onClick={addOrder} className="btn btn-danger w-100 mb-5">Đặt vé</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CartPage;
