import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/ProductSlice";
import Card from "../components/Card";

const Home = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome To MyShop
          </h1>

          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Discover premium products at unbeatable prices. Shop your
            favorite items with a seamless experience.
          </p>

          <Link
            to="/product"
            className="inline-block bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white shadow rounded-xl p-5">
            <h2 className="text-3xl font-bold text-blue-600">1000+</h2>
            <p className="text-gray-500">Products</p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h2 className="text-3xl font-bold text-blue-600">500+</h2>
            <p className="text-gray-500">Customers</p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h2 className="text-3xl font-bold text-blue-600">24/7</h2>
            <p className="text-gray-500">Support</p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h2 className="text-3xl font-bold text-blue-600">Fast</h2>
            <p className="text-gray-500">Delivery</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Featured Products
        </h2>

        <p className="text-center text-gray-500 mb-10">
          Explore our most popular products
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {items &&
            items
              .slice(0, 8)
              .map((item) => <Card key={item.id} item={item} />)}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/product"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose MyShop?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Get your products delivered quickly and safely.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Multiple secure payment options for safe shopping.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Carefully selected products with guaranteed quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>

          <p className="text-blue-100 mb-8">
            Browse hundreds of products and find the best deals today.
          </p>

          <Link
            to="/product"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Explore Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;