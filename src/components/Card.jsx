import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../redux/Slice";

const Card = ({ item }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.apicart.items);

  const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Rating */}
        <div className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-gray-800 shadow-sm">
          ⭐ {item.rating}
        </div>

        {/* Discount */}
        {item.discountPercentage && (
          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
            {Math.round(item.discountPercentage)}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Category */}
        {item.category && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
            {item.category}
          </p>
        )}

        {/* Title */}
        <h2 className="line-clamp-2 min-h-[3.5rem] text-base font-bold text-gray-900 sm:text-lg">
          {item.title}
        </h2>

        {/* Price & Stock */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-green-600">₹{item.price}</p>

            {item.discountPercentage && (
              <p className="text-xs text-gray-400">Limited-time offer</p>
            )}
          </div>

          {item.stock !== undefined && (
            <span
              className={`text-xs font-medium ${
                item.stock > 10
                  ? "text-green-600"
                  : item.stock > 0
                    ? "text-orange-500"
                    : "text-red-500"
              }`}
            >
              {item.stock > 0 ? `${item.stock} left` : "Out of stock"}
            </span>
          )}
        </div>

        {/* Cart Button */}
        <div className="mt-auto pt-5">
          {isInCart ? (
            <button
              type="button"
              onClick={() => dispatch(removeItem(item))}
              className="w-full rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              type="button"
              disabled={item.stock === 0}
              onClick={() => dispatch(addItem(item))}
              className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                item.stock === 0
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400"
              }`}
            >
              {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
