import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderPenddingByUser,
  getOrderShippingByUser,
  getOrderPaidByUser,
} from "../../../actions/OrderAction";

function MenuOrder(props) {
  const dispatch = useDispatch()
  const location = useLocation()

  const { userInfo } = useSelector((state) => state.userSignin);
  const { myOrdersPendding } = useSelector((state) => state.orderByUser);
  const { myOrdersShipping } = useSelector((state) => state.orderByUser);
  const { myOrdersPaid } = useSelector((state) => state.orderByUser);

  useEffect(() => {
    const getAllOrderPenddingAndShippingByUser = async () => {
      await dispatch(getOrderPenddingByUser(userInfo._id));
      await dispatch(getOrderPaidByUser(userInfo._id));

      dispatch(getOrderShippingByUser(userInfo._id));
    };

    getAllOrderPenddingAndShippingByUser();
  }, [dispatch]);

  return (
    <div className="myorder-menu">
      <div className={location.pathname === '/myOrder/allOrder' ? 'myorder-menu-item active' : 'myorder-menu-item'}>
        <Link to={'/myOrder/allOrder' }>Tất cả</Link>
      </div>
      <div className={location.pathname === '/myOrder/pendding' ? 'myorder-menu-item active' : 'myorder-menu-item'}>
        <Link to="/myOrder/pendding">Chờ xử lí</Link>
        {myOrdersPendding ? (
          <div className="myorder-menu-item-newPendding">
            {myOrdersPendding.length}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={location.pathname === '/myOrder/shipping' ? 'myorder-menu-item active' : 'myorder-menu-item'}>
        <Link to="/myOrder/shipping">Đang giao</Link>
        {myOrdersShipping ? (
          <div className="myorder-menu-item-newShipping">
            {myOrdersShipping.length}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={location.pathname === '/myOrder/paid' ? 'myorder-menu-item active' : 'myorder-menu-item'}>
        <Link to="/myOrder/paid">Đã giao</Link>
        {myOrdersPaid ? (
          <div className="myorder-menu-item-newShipping">
            {myOrdersPaid.length}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MenuOrder;
