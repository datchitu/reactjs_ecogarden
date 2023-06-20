import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

class HomeSlideCpn extends Component {

    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={'/images/slide1.jpeg'}
                    alt="First slide"
                    style={{ height: "60vh", objectFit: "cover"}}
                    />
                    <Carousel.Caption>
                    <h3>Giá rẻ</h3>
                    <p>Nhanh tay đăng ký để được ưu đãi mới nhất</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    style={{ height: "60vh", objectFit: "cover"}}
                    src={'/images/slide2.jpeg'}
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Sale 50%</h3>
                    <p>Nhận liền tay, khởi sắc </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default HomeSlideCpn;
