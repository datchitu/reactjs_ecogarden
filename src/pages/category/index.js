import React, {  useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import ProductItem from '../../components/product/_inc_product_item';

import productService from "./../../api/productService";
import categoryService from "./../../api/categoryService";
import ProductItemLoadingCpn from '../../components/product/_inc_product_item_loading';
import SidebarSearch from "../../components/_inc_sidebar_search";

function CategoryPage() {
    const { slug } = useParams();

    const [categoryID, setCategoryId] = useState(null);
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(true);

    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);


    const getListsProducts = async (cateId = 0) => {
        if (categoryID) {
            let params = {
                category_id: categoryID,
                page_size: 8,
                page: currentPage + 1
            };

            const response = await productService.getListsProducts(params);
            if (response.data) {
                setProducts(response.data.products);
                setPageCount(response.data.meta.total_page);
                setCurrentPage(response.data.meta.page - 1);
                setLoadingProduct(false);
            }
        } else {

            let params = {
                category_id: cateId,
                page_size: 8,
                page: currentPage + 1
            };

            const response = await productService.getListsProducts(params);
            if (response.data) {
                setProducts(response.data.products);
                setPageCount(response.data.meta.total_page);
                setCurrentPage(response.data.meta.page - 1);
                setLoadingProduct(false);
            }
            console.log("--------------- CANNOT LOAD CATEGORY ID : ");
        }
    }

    const findOneCategoryBySlug = async () => {
        const response = await categoryService.findBySlug(slug);
        console.log('----------- category by slug', response.data);
        if (response.data) {
            setCategoryId(response.data.id);
            setLoadingProduct(true);
            setCategory(response.data);
            getListsProducts(response.data.id).then(r => {});
        }
    }

    // Invoke when user click to request another page.
    const handlePageChange = (selectedObject) => {
		setCurrentPage(selectedObject.selected);
        getListsProducts().then(r => {});
	};

    useEffect(() => {
        findOneCategoryBySlug().then(r => {});
    },[slug]);

    return (
        <div>
            <div style={{ background: 'rgb(245 245 250)' }}>
                <Container>
                    <Row>
                        <Col xs={3} className="mt-3">
                            <SidebarSearch category={category}/>
                        </Col>
                        <Col xs={9} className="mt-3">
                            <Row>
                                <Col><h1 className='heading-h1 mt-2 mb-2' >Sản phẩm mới nhât</h1></Col>
                            </Row>
                            <Row>
                                { loadingProduct === true ? (
                                    <>
                                        <ProductItemLoadingCpn count={10}  />
                                    </>
                                ) : (
                                    <>
                                        {products && products.map((product, index) => (
                                            <Col xs={3}  key={product.id}>
                                                <ProductItem  product={product} loading={loadingProduct} />
                                            </Col>
                                        ))}
                                        <div className='customer-paginate'>
                                            <ReactPaginate
                                                previousLabel="Trang trước"
                                                nextLabel="Trang sau"
                                                pageCount={pageCount}
                                                marginPagesDisplayed={2}
                                                // initialPage={currentPage}
                                                onPageChange={handlePageChange}
                                                containerClassName={'container'}
                                                previousLinkClassName={'page'}
                                                breakClassName={'page'}
                                                nextLinkClassName={'page'}
                                                pageClassName={'page'}
                                                disabledClassNae={'disabled'}
                                                activeClassName={'active'}
                                            />
                                        </div>
                                    </>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default CategoryPage;
