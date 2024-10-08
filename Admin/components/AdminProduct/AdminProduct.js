import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  paginationProduct,
} from "../../../../actions/ProductAction";
import { Link } from "react-router-dom";
import ListProduct from "./ListProduct";
import "./AdminProduct.css";
import { AppstoreAddOutlined} from "@ant-design/icons";

function AdminProduct(props) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.allProduct.currentPage);
  const { products } = useSelector((state) => state.allProduct.product);

  useEffect(() => {
    dispatch(paginationProduct(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="admin-product">
      <div className="admin-product-link">
        <Link to="/admin/product/create" className="add-product">
          <div className="sp">
          <AppstoreAddOutlined />
          <span>Sản Phẩm</span>
          </div>
        </Link>
        
      </div>

      {products ? (
        <ListProduct listProducts={products}></ListProduct>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default AdminProduct;
