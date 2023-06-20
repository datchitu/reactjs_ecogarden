import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import React, {useState} from "react";
import "./../../assets/pages/account.scss";
import AuthApi from "../../api/AuthApi";
import {useDispatch} from "react-redux";
import {setTokenLogin} from "../../store/AuthSlice";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

function ForgotPassword()
{
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const loginSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }


    const dispatch = useDispatch();

    const handleValidation = async (event)  => {
        let formIsValid = true;
        if (!email) {
            formIsValid = false;
            setEmailError(
                "Email phải có độ dài từ 5 đến 22 ký tự"
            );
            return false;
        } else {
            setEmailError("");
            formIsValid = true;
        }

        if (formIsValid === true) {
            let results = await AuthApi.forgotPassword({
                email: email,
            });

            console.log('------------- results ----------- ', results);
            if (results.status === 'success') {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: results.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (results.status ===  501) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: results.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }

    return (
        <Container className={'auth'}>
            <Row>
                <Col xl={12}>
                    <div className='breadcrumbs mt-2'>
                        <Breadcrumb>
                            <Breadcrumb.Item to="/">Trang chủ</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                Auth
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Quên mật khẩu</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </Col>
                <Col xl={{span: 4, offset: 4}}>
                    <form  onSubmit={loginSubmit} className="mb-5">
                        <div className="form-group mb-3">
                            <label>Email đăng nhập</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <small id="emailHelp" className="text-danger form-text">
                                {emailError}
                            </small>
                        </div>
                        <p className={'d-flex justify-content-between'}>
                            <Link to={`/auth/login`}>Đăng nhập</Link>
                            <p>Chưa có tài khoản?  <Link to={`/auth/register`}>Đăng ký</Link> </p>
                        </p>
                        <div className={'d-flex justify-content-between'}>
                            <button type="submit" className="btn btn-primary w-100">
                                Gủi thông tin
                            </button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default ForgotPassword;
