import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import AuthApi from "../api/AuthApi";
import {FaShoppingCart} from "react-icons/fa";
import {useSelector} from "react-redux";
function HeaderCpn()
{
    const [user, setUser] = useState([]);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const location = useLocation()

    const getUser = async() => {
        try {
            let response = await AuthApi.getProfile();
            console.log('----------- response:getProfile ', response);
            if(response.status === "success")
                setUser(response.data.user);

        } catch (e) {
            console.log("-----Expired");
        }
    }

    const cart = useSelector((state) => state.cartReduce.listCart);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = '/';
    }


    const clickSearch = (e) => {
        navigate(`/tat-ca-san-pham?keyword=${keyword}`)
    }

    const something=(event)=> {
        if (event.keyCode === 13) {
            navigate(`/tat-ca-san-pham?keyword=${keyword}`)
        }
    }


    useEffect(() => {
        getUser().then(r => {});
    }, []);

    return (
        <Navbar collapseOnSelect expand="lg"  className='header'>
            <Container>
                <Navbar.Brand>
                    <Link to={"/"}>
                        <img src={'https://ecogarden.lk/wp-content/uploads/2022/03/Eco-Garden-Hotels-and-Resorts-Logo-Dark.webp'}  alt={"eco garden"} style={{ width: "200px"}}/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={`/tat-ca-san-pham`} className='nav-item'>Tất cả dịch vụ</Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            name='keyword'
                            placeholder="Tìm kiếm"
                            className="me-2"
                            onKeyDown={(e) => something(e) }
                            onChange={(event) => setKeyword(event.target.value)}
                            aria-label="Search"
                        />
                        <Button variant="outline-success" onClick={clickSearch}>Search</Button>
                    </Form>
                    <Nav className='header-account'>
                        <Nav.Link >
                            {user && user.avatar ? (
                                <img src={user.avatar}
                                    alt='avatar'/>
                       ) : (
                           <img src='https://cdn.pixabay.com/photo/2020/08/05/13/30/eco-5465493_960_720.png'
                                    alt='logo'/>
                            )}
                        </Nav.Link>
                        <Link to={'/cart'} className={'icon-cart nav-link'}>
                            <FaShoppingCart /> <span>({cart ? cart.length : 0})</span>
                        </Link>
                        <NavDropdown title={(user && user.name) ? user.name : 'Tài khoản'} id="collasible-nav-dropdown">
                            {user && user.name ? (
                                <>
                                    <Link data-rr-ui-dropdown-item className={"dropdown-item"} role="button" to={`account/profile/`}>Cập nhật thông tin</Link>
                                    <Link data-rr-ui-dropdown-item className={"dropdown-item"} role="button" to={`account/order/`}>Lịch sử đơn hàng</Link>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logout}>Đăng xuất</NavDropdown.Item>
                                </>
                            ) : (
                                <Link data-rr-ui-dropdown-item className={"dropdown-item"} role="button" to={`auth/login`}>Đăng nhập</Link>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderCpn;

