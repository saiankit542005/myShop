import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../redux/Slice";

const Card = ({ item }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.apicart.items);

  const isInCart = cartItems.some(
    (cartItem) => cartItem.id === item.id
  );

  return (
    <div className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl">

      {/* ================= IMAGE ================= */}
      <div className="relative overflow-hidden bg-gray-100">

        <img
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Rating */}
        <div className="absolute right-2 top-2 rounded-full bg-white/95 px-1.5 py-1 text-[10px] font-semibold text-gray-800 shadow-sm sm:right-3 sm:top-3 sm:px-2.5 sm:text-xs">
          ⭐ {Number(item.rating).toFixed(1)}
        </div>

        {/* Discount */}
        {item.discountPercentage > 0 && (
          <div className="absolute left-2 top-2 rounded-full bg-red-500 px-1.5 py-1 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:px-2.5 sm:text-xs">
            {Math.round(item.discountPercentage)}% OFF
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-4">

        {/* Category */}
        {item.category && (
          <p className="mb-1.5 truncate text-[9px] font-bold uppercase tracking-wide text-blue-600 sm:mb-2 sm:text-xs">
            {item.category}
          </p>
        )}

        {/* Title */}
        <h2 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-5 text-gray-900 sm:min-h-[3.5rem] sm:text-lg sm:leading-6">
          {item.title}
        </h2>

        {/* ================= PRICE + STOCK ================= */}
        <div className="mt-2 flex flex-col gap-1 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">

          {/* Price */}
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-green-600 sm:text-xl">
              ₹{item.price}
            </p>

            {item.discountPercentage > 0 && (
              <p className="hidden truncate text-[10px] text-gray-400 sm:block sm:text-xs">
                Limited-time offer
              </p>
            )}
          </div>

          {/* Stock */}
          {item.stock !== undefined && (
            <span
              className={`truncate text-[10px] font-medium sm:text-xs ${
                item.stock > 10
                  ? "text-green-600"
                  : item.stock > 0
                    ? "text-orange-500"
                    : "text-red-500"
              }`}
            >
              {item.stock > 0
                ? `${item.stock} left`
                : "Out of stock"}
            </span>
          )}
        </div>

        {/* ================= CART BUTTON ================= */}
        <div className="mt-auto pt-3 sm:pt-5">

          {isInCart ? (
            <button
              type="button"
              onClick={() => dispatch(removeItem(item))}
              className="w-full rounded-lg bg-red-500 px-2 py-2 text-[11px] font-semibold text-white transition hover:bg-red-600 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
            >
              Remove
            </button>
          ) : (
            <button
              type="button"
              disabled={item.stock === 0}
              onClick={() => dispatch(addItem(item))}
              className={`w-full rounded-lg px-2 py-2 text-[11px] font-semibold text-white transition active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-offset-1 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm ${
                item.stock === 0
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400"
              }`}
            >
              {item.stock === 0
                ? "Out of Stock"
                : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;