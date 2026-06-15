import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllItems, removeItem } from "../redux/Slice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartList = () => {
  const cartSelector = useSelector((state) => state.apicart.items);
  const [cartItems, setCartItems] = useState(cartSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(cartSelector);
  }, [cartSelector]);

  const manageQuantity = (id, quan) => {
    const quantity = parseInt(quan) || 1;

    const cartTempItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );

    setCartItems(cartTempItems);
  };

  const handlePlaceOrder = () => {
    localStorage.clear();
    dispatch(clearAllItems());
    toast.success("Order placed successfully!");
    navigate("/product");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-6 border-b pb-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
          Your Cart Items
        </h2>

        <span className="font-semibold text-base sm:text-lg text-gray-600">
          {cartItems.length} items
        </span>
      </div>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        <div className="grid gap-4 sm:gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* LEFT SIDE */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <img
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl"
                    src={item.thumbnail}
                    alt={item.title}
                  />

                  <div className="text-center sm:text-left">
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {item.title}
                    </h1>

                    <span className="block text-lg font-bold text-green-600 mt-2">
                      $
                      {(
                        item.quantity
                          ? item.price * item.quantity
                          : item.price
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="number"
                    value={item.quantity || 1}
                    min="1"
                    onChange={(e) =>
                      manageQuantity(item.id, e.target.value)
                    }
                    className="border px-2 py-2 w-20 rounded text-center"
                  />

                  <button
                    className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 active:scale-95 transition"
                    onClick={() => dispatch(removeItem(item))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10 text-lg">
          Your cart is empty 🛒
        </div>
      )}

      {/* Total */}
      <div className="flex justify-center sm:justify-end font-bold mt-6 text-lg sm:text-xl text-gray-800">
        Total : $
        {cartItems
          .reduce(
            (sum, item) => sum + item.price * (item.quantity || 1),
            0
          )
          .toFixed(2)}
      </div>

      {/* Order Button */}
      {cartItems.length > 0 && (
        <div className="flex justify-center sm:justify-end mt-6">
          <button
            className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 active:scale-95 transition"
            onClick={handlePlaceOrder}
          >
            Order Placed
          </button>
        </div>
      )}
    </div>
  );
};

export default CartList;