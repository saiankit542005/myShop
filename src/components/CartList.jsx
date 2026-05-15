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
      item.id === id ? { ...item, quantity } : item,
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
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h2 className="text-3xl font-bold text-gray-800">Your Cart Items</h2>
        <span className="font-semibold text-lg text-gray-600">
          {cartItems.length} items
        </span>
      </div>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-6">
                {/* Image */}
                <img
                  className="w-28 h-28 object-cover rounded-xl"
                  src={item.thumbnail}
                  alt={item.title}
                />

                {/* Details */}
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h1>

                  <span className="block text-lg font-bold text-green-600 mt-2">
                    $
                    {(item.quantity
                      ? item.price * item.quantity
                      : item.price
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex items-center gap-4">
                {/* Quantity Input */}
                <input
                  type="number"
                  value={item.quantity || 1}
                  min="1"
                  onChange={(e) => manageQuantity(item.id, e.target.value)}
                  className="border px-2 py-1 w-16 rounded text-center"
                  placeholder="Enter Quantity"
                />

                {/* Remove Button */}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 active:scale-95 transition"
                  onClick={() => dispatch(removeItem(item))}
                >
                  Remove
                </button>
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
      <div className="flex justify-end font-bold mt-6 text-xl text-gray-800">
        Total : $
        {cartItems
          .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
          .toFixed(2)}
      </div>
      <div>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 active:scale-95 transition"
          onClick={handlePlaceOrder}
        >
          Order Placed
        </button>
      </div>
    </div>
  );
};

export default CartList;