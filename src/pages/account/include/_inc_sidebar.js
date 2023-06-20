import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";

const linksConfig = [
    {
        icon: '',
        name: 'Tổng quan',
        link: '/account/'
    },
    {
        icon: '',
        name: 'Thông tin cá nhân',
        link: '/account/profile/'
    },
    {
        icon: 'FaShoppingBag',
        name: 'Lịch sử đặt vé',
        link: '/account/order/'
    },
    {
        icon: 'FaShoppingBag',
        name: 'Đổi mật khẩu',
        link: '/account/change-password'
    },
]
function SidebarAccount() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    const getLinksSidebarUser = async () => {
        setLinks(linksConfig);
        setTimeout(function (){
            setLoading(false);
        }, 500)
    }
    useEffect(() => {
        getLinksSidebarUser().then(r => {});
    }, []);

    return (
        <>
            <ul className={'sidebar-user'}>
                { loading === true ? (
                    <Skeleton  count={5} />
                ) : (
                    <>
                        {links.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={item.link}>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </>
                ) }
            </ul>
        </>
    )
}

export default SidebarAccount;
