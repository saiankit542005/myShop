import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/ProductSlice";
import { useEffect } from "react";
import Card from "../components/Card";

const Product = () => {
  const dispatch = useDispatch(); 

  // ✅ Get all required state
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ Loading UI
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-600">Loading products...</p>
      </div>
    );
  }

  // ✅ Error UI
  if (status === "failed") {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        ❌ Error: {error}
      </div>
    );
  }

  // ✅ Products UI
  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-5 justify-center">
        {items && items.map((item) => <Card key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default Product;
