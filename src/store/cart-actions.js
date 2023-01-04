
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        "https://redux-http-e86ab-default-rtdb.firebaseio.com/cartItems.json"
      );
      const data = res && await res.json();
      return data;
    };
    try {
      const cartData = await fetchHandler();

      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
        console.log(err);
        dispatch(
            uiActions.showNotifications({
              open: true,
              message: "Sending request failed",
              type: "error",
            })
          );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotifications({
        open: true,
        message: "Sending request",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      const res = await fetch(
        "https://redux-http-e86ab-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      dispatch(
        uiActions.showNotifications({
          open: true,
          message: "Sent request to database succesfully",
          type: "success",
        })
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotifications({
          open: true,
          message: "Sending request failed",
          type: "error",
        })
      );
    }
  };
};
