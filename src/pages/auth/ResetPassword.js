import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import "./../../assets/pages/account.scss";
import AuthApi from "../../api/AuthApi";
import {useDispatch} from "react-redux";
import {setTokenLogin} from "../../store/AuthSlice";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";

function ResetPassword()
{
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");
    const [token, setTokken] = useState("");

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const navigate = useNavigate();

    const loginSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }

    const getToken = async () => {
        if (params.get('token')) {
            setTokken(params.get('token'))
        }
    }

    const dispatch = useDispatch();

    const handleValidation = async (event)  => {
        let formIsValid = true;
        if (!password) {
            formIsValid = false;
            setPasswordError(
                "Password phải có độ dài từ 5 đến 22 ký tự"
            );
            return false;
        } else {
            setPasswordError("");
            formIsValid = true;
        }

        if (!passwordConfirm) {
            formIsValid = false;
            setPasswordConfirmError(
                "Password confirm phải có độ dài từ 5 đến 22 ký tự"
            );
            return false;
        } else {
            setPasswordConfirmError("");
            formIsValid = true;
        }


        if (passwordConfirm != password) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Mật khẩu xác nhận không khớp',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        }

        if (formIsValid === true) {
            let results = await AuthApi.resetPassword({
                password: password,
                token: token
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

                navigate('/auth/login');

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

    useEffect(() => {
        getToken().then(r => {});
    },[params])

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
                            <Breadcrumb.Item active>Mật khẩu mới</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </Col>
                <Col xl={{span: 4, offset: 4}}>
                    <form  onSubmit={loginSubmit} className="mb-5">
                        <div className="form-group mb-3">
                            <label>Mật khẩu mới</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="******"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <small id="emailHelp" className="text-danger form-text">
                                {passwordError}
                            </small>
                        </div>
                        <div className="form-group mb-3">
                            <label>Mật khẩu mới</label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirm_password"
                                placeholder="******"
                                onChange={(event) => setPasswordConfirm(event.target.value)}
                            />
                            <small id="emailHelp" className="text-danger form-text">
                                {passwordConfirmError}
                            </small>
                        </div>
                        <p className={'d-flex justify-content-between'}>
                            <Link to={`/auth/register`}>Đăng ký</Link>
                        </p>
                        <div className={'d-flex justify-content-between'}>
                            <button type="submit" className="btn btn-primary w-100">
                                Xác nhận
                            </button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default ResetPassword;
