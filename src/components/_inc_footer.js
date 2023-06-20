import React, { Component } from 'react';

class FooterCpn extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="footer-widget">
                                <h3>Thông tin liên hệ</h3>
                                <div className="footer-widget-content">
                                    <p>Địa chỉ: Tỉnh lộ 887, ấp 2, xã Phú Nhuận, thành phố Bến Tre</p>
                                    <a href="mailto:ecogarden@gmail.com"  className="contact-link">ecogarden@gmail.com</a>
                                    <a href="tel:092554875" className="contact-link">092554875</a>
                                </div>
                            </div>
                        </div>
                        {/*<div className="col-sm-3">*/}
                        {/*    <div className="footer-widget">*/}
                        {/*        <h3>Latest Events</h3>*/}
                        {/*        <div className="footer-widget-content">*/}
                        {/*            <div className="media">*/}
                        {/*                <div className="media-left">*/}
                        {/*                    <a href={'/'}><img className="media-object" src="http://placehold.it/60x60"  alt={'eco garden'}/></a>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="col-sm-3">
                            <div className="footer-widget">
                                <h3>Giờ làm việc</h3>
                                <div className="footer-widget-content">
                                    <div className="open-time ">
                                        <ul className="opening-time">
                                            <li><span><i className="fa fa-check"></i></span><p><strong>Thứ 2 - Thứ 6 :</strong> 8h00 - 17h00</p></li>
                                            <li><span><i className="fa fa-check"></i></span><p><strong>Thứ 7, Chủ nhật:</strong> 7h00 - 19h00</p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="footer-widget">
                                <h3>Latest Events</h3>
                                <div className="footer-widget-content">
                                    <div className="images-gellary">
                                        <ul>
                                        {/*<li><a href="#"><img src="http://placehold.it/85x85" alt="Instagram 01" /></a></li>*/}
                                        {/*<li><a href="#"><img src="http://placehold.it/85x85" alt="Instagram 02" /></a></li>*/}
                                        {/*<li><a href="#"><img src="http://placehold.it/85x85" alt="Instagram 03" /></a></li>*/}
                                        {/*<li><a href="#"><img src="http://placehold.it/85x85" alt="Instagram 04" /></a></li>*/}
                                        {/*<li><a href="#"><img src="http://placehold.it/85x85" alt="Instagram 05" /></a></li>*/}
                                        {/*<li><a href="#"><img src="http://placehold.it/85x85" alt="Instagram 06" /></a></li>*/}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default FooterCpn;
