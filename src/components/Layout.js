import React from "react";
import Header from "./Header";
import Products from "./Products";
import "./Layout.css";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";
const Layout = () => {
  const items = useSelector((state) => state.cart);
  let total = 0;
  items.itemsList.forEach((item) => {
    total += item.totalPrice;
  });
  // console.log(total);

  return (
    <React.Fragment>
      <div className="layout">
        <Header />
        <Products />
        {items.showCart&&<CartItems />}
        <div className="total-price">
          <h3>Total: ${total}</h3>
          <button className="orderBtn">Place Order</button>
        </div>{" "}
      </div>
    </React.Fragment>
  );
};

export default Layout;
