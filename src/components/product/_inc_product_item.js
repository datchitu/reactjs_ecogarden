import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import formatPrice from "../../utils/util_price";

function ProductItem({product, loading}) {
    return (
        (loading === true ? (
            <div>
                Loading
            </div>
        ) : (
            <div className='product-item mb-3'>
                <Link to={`/san-pham/${product.slug}`} className='product-item-image'>
                    <img src={product.avatar}  alt={product.name}/>
                </Link>
                <h3 className='product-item-title'>
                    <Link to={`/san-pham/${product.slug}`}>{product.name}</Link>
                </h3>
                <p className='product-item-start'>
                    <span><span>4.5 </span> <FaStar className='start' /> </span> <span>|</span>  <span>Đã bán 120</span>
                </p>
                { product.sale > 0 ? (
                    <p className='product-item-price'>
                        <span className='sale'>120.000 <sup>đ</sup> <sub>-5</sub></span>
                    </p>
                ) : (
                    <p className='product-item-price'>
                        <span className='price'>{formatPrice(product.price)}<sup>đ</sup></span>
                    </p>
                )}
            </div>
        ))
    );
}

export default ProductItem;
