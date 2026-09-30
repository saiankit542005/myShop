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

  // Keep local cart state synchronized with Redux
  useEffect(() => {
    setCartItems(
      cartSelector.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      })),
    );
  }, [cartSelector]);

  // Update quantity
  const manageQuantity = (id, quantity) => {
    const newQuantity = Math.max(1, Number(quantity) || 1);

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Increase quantity
  const increaseQuantity = (id, currentQuantity) => {
    manageQuantity(id, currentQuantity + 1);
  };

  // Decrease quantity
  const decreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity <= 1) return;

    manageQuantity(id, currentQuantity - 1);
  };

  // Remove item
  const handleRemove = (item) => {
    dispatch(removeItem(item));

    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== item.id),
    );

    toast.success(`${item.title} removed from cart`);
  };

  // Place order
  const handlePlaceOrder = () => {
    // Remove only cart data, not all localStorage data
    localStorage.removeItem("apicart");

    dispatch(clearAllItems());

    toast.success("Order placed successfully!");

    // Change this route if your actual route is different
    navigate("/products");
  };

  // Total number of products including quantities
  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  // Total cart price
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * 80)*(item.quantity || 1),
    0,
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6 border-b pb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Your Cart
        </h2>

        <div className="text-gray-600 font-medium">
          {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
        </div>
      </div>

      {/* ================= EMPTY CART ================= */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">🛒</div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Your cart is empty
          </h3>

          <p className="text-gray-500 mb-6">
            Add some products to your cart and they will appear here.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition active:scale-95"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* ================= CART ITEMS ================= */}
          <div className="space-y-4">
            {cartItems.map((item) => {
              const quantity = item.quantity || 1;
              const itemTotal = item.price * quantity * 80;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-lg transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        loading="lazy"
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border"
                      />

                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-gray-500 text-sm mt-1">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(item.price * 80)}
                          each
                        </p>

                        <p className="text-green-600 font-bold text-lg mt-1">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(itemTotal)}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      {/* QUANTITY */}
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id, quantity)}
                          disabled={quantity <= 1}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-bold transition"
                        >
                          −
                        </button>

                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) =>
                            manageQuantity(item.id, e.target.value)
                          }
                          className="w-14 h-10 text-center outline-none border-x"
                        />

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id, quantity)}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-lg font-bold transition"
                        >
                          +
                        </button>
                      </div>

                      {/* REMOVE */}
                      <button
                        type="button"
                        onClick={() => handleRemove(item)}
                        className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium active:scale-95 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= SUMMARY ================= */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-5 sm:p-6">
            <div className="flex justify-between text-gray-600 mb-3">
              <span>Items</span>
              <span>{totalQuantity}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-3">
              <span>Subtotal</span>
              <span>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(totalPrice)}
              </span>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">Total</span>

              <span className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(totalPrice)}
              </span>
            </div>

            {/* ================= ORDER BUTTON ================= */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg active:scale-[0.98] transition"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartList;
