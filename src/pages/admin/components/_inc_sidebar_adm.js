import SidebarMenu from "react-bootstrap-sidebar-menu";
import {FaDatabase, FaList, FaShoppingBag, FaUser} from "react-icons/fa";
import {Link} from "react-router-dom";
import React from "react";

function SidebarAdm() {
    return (
        <>
            <SidebarMenu>
                <SidebarMenu.Body>
                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Icon>
                            <FaList />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title>
                            <Link to={`/admin/category`}>Category</Link>
                        </SidebarMenu.Nav.Title>
                    </SidebarMenu.Nav>
                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Icon>
                            <FaDatabase />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title>
                            <Link to={`/admin/product`}>Product</Link>
                        </SidebarMenu.Nav.Title>
                    </SidebarMenu.Nav>
                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Icon>
                            <FaUser />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title>
                            <Link to={`/admin/user`}>User</Link>
                        </SidebarMenu.Nav.Title>
                    </SidebarMenu.Nav>
                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Icon>
                            <FaShoppingBag />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title>
                            <Link to={`/admin/transaction`}>Transaction</Link>
                        </SidebarMenu.Nav.Title>
                    </SidebarMenu.Nav>
                </SidebarMenu.Body>
            </SidebarMenu>
        </>
    )
}

export default SidebarAdm;
