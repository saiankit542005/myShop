import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const AddToCart = () => {
  const cartSelector = useSelector((state) => state.apicart.items);
  console.log(cartSelector.length);

  return (
    <div className="p-5">
      <div className="relative w-12">
        <Link to="/cart">
          {" "}
         <ShoppingCart className="text-white w-10 h-11" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
            {cartSelector.length ? cartSelector.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AddToCart;
