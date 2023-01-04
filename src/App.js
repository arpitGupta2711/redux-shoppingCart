import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
import { useSelect } from "@mui/base";
import { sendCartData,fetchData } from "./store/cart-actions";
// import { json } from "express";

let isFirstRender= true;
function App() {
  const notify= useSelector((state)=>state.ui.notification)
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cart = useSelector((state) => state.cart);
  const cartItemList = useSelector((state) => {
    // console.log(state.cart);
    return state.cart.itemsList;
  });
  console.log(cartItemList);

  useEffect(()=>{
  dispatch(fetchData())
  },[dispatch])
  useEffect(() => {
    if (isFirstRender) {
      isFirstRender=false;
      return;
    }
    if(cart.changed){
   dispatch(sendCartData(cart))

    }
  }, [cart,dispatch]);

  return (
    <div className="App">
    {notify&&<Notification type={notify.type} message={notify.message}/>}
      {isLoggedIn ? <Layout /> : <Auth />}
      {/* <Auth /> */}
      {/* <Layout /> */}
    </div>
  );
}

export default App;
