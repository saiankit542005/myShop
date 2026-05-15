import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../redux/Slice";

const Card = ({ item }) => {
  const dispatch = useDispatch();

  const cartSelector = useSelector((state) => state.apicart.items);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-64 hover:shadow-xl transition duration-300 border border-gray-200 flex flex-col justify-between">
      {/* Top Content */}
      <div>
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-40 object-cover rounded-lg"
        />

        <div className="mt-3">
          <h2 className="text-lg font-semibold line-clamp-1">{item.title}</h2>

          <p className="text-sm text-gray-600 line-clamp-2">
            {item.description}
          </p>

          <div className="flex justify-between items-center mt-2">
            <span className="text-green-600 font-bold">₹{item.price}</span>
            <span className="text-yellow-500 text-sm">⭐ {item.rating}</span>
          </div>
        </div>
      </div>

      {/* Button always bottom */}
      <div>
        {cartSelector.find((cartItem) => cartItem.id === item.id) ? (
          <button
            className="mt-3 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
            onClick={() => dispatch(removeItem(item))}
          >
            Remove from Cart
          </button>
        ) : (
          <button
            className="mt-3 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
            onClick={() => dispatch(addItem(item))}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
