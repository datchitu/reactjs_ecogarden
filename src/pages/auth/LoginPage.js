import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import React, {useState} from "react";
import "./../../assets/pages/account.scss";
import AuthApi from "../../api/AuthApi";
import {useDispatch} from "react-redux";
import {setTokenLogin} from "../../store/AuthSlice";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import process from "process";

const clientId = process.env.REACT_APP_KEY_GOOGLE;

function LoginPage()
{
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const loginSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }


    const dispatch = useDispatch();

    const handleValidation = async (event)  => {
        console.log('=============== CHECK');
        let formIsValid = true;
        if (!username) {
            formIsValid = false;
            setUsernameError(
                "Username phải có độ dài từ 5 đến 22 ký tự"
            );
            return false;
        } else {
            setUsernameError("");
            formIsValid = true;
        }

        if (!password.match(/^[a-z0-9]{5,22}$/)) {
            formIsValid = false;
            setPasswordError(
                "Password phải từ 5 đến 22 ký tự"
            );
            return false;
        } else {
            console.log('----------- password: ', password);
            setPasswordError("");
            formIsValid = true;
        }


        if (formIsValid === true) {
            let results = await AuthApi.login({
                email: username,
                password: password
            });

            console.log('------------- results ', results);
            if (results.status === 'success') {
                localStorage.setItem("user", JSON.stringify(results.data.user));
                localStorage.setItem("accessToken", results.data.token_info.accessToken);
                dispatch(setTokenLogin(results.data));
                window.location.href = '/';
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Đăng nhập thất bại? Mời bạn kiểm tra lại thông tin',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }

    const responseGoogle = async (response) => {
        let profile = response.profileObj;
        const account = {
            email: profile?.email,
            avatar: profile?.imageUrl,
            name: profile?.name,
            provider_id: profile?.googleId,
            provider: 'google'
        }

        // check thông tin
        // đủ thông tin => đăng nhập
        // chưa đủ update thông tin

        let results = await AuthApi.loginSocial(account);
        console.log('-------------- account results: ', results);

        if (results.status === 'success') {
            localStorage.setItem("user", JSON.stringify(results.data.user));
            localStorage.setItem("accessToken", results.data.token_info.accessToken);
            dispatch(setTokenLogin(results.data));
            window.location.href = '/';
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Đăng nhập thất bại? Mời bạn kiểm tra lại thông tin',
                showConfirmButton: false,
                timer: 1500
            })
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
                            <Breadcrumb.Item active>Đăng nhập</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </Col>
                <Col xl={{span: 4, offset: 4}}>
                    <form  onSubmit={loginSubmit} className="mb-5">
                        <div className="form-group mb-3">
                            <label>Tài khoản đăng nhập</label>
                            <input
                                type="email"
                                className="form-control"
                                name="username"
                                placeholder="Username"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <small id="emailHelp" className="text-danger form-text">
                                {usernameError}
                            </small>
                        </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <small className="text-danger form-text">
                                {passwordError}
                            </small>
                        </div>
                        <p className={'d-flex justify-content-between'}>
                            <Link to={`/auth/register`}>Đăng ký</Link>
                            <p>Quên mật khẩu  <Link to={`/auth/forgot-password`}>tại đây</Link> </p>
                        </p>
                       <div className={'d-flex justify-content-between'}>
                           <button type="submit" className="btn btn-primary w-100">
                               Đăng nhập
                           </button>
                       </div>
                        <div className={'mt-2'}>

                                <GoogleLogin
                                    clientId={clientId}
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className={'btn btn-danger w-100'}> Login Google </button>
                                    )}
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />

                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage;
