import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  CheckCircle2,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Zap,
} from "lucide-react";

import { fetchProducts } from "../redux/ProductSlice";
import Card from "../components/Card";

const Home = () => {
  const dispatch = useDispatch();

  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // -----------------------------
  // Dynamic statistics
  // -----------------------------

  const productCount = items.length;

  const categoryCount = useMemo(() => {
    return new Set(items.map((item) => item.category).filter(Boolean)).size;
  }, [items]);

  const averageRating = useMemo(() => {
    if (!items.length) return "0.0";

    const total = items.reduce(
      (sum, item) => sum + Number(item.rating || 0),
      0,
    );

    return (total / items.length).toFixed(1);
  }, [items]);

  // -----------------------------
  // Top rated products
  // -----------------------------

  const featuredProducts = useMemo(() => {
    return [...items]
      .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
      .slice(0, 8);
  }, [items]);

  // -----------------------------
  // Popular categories
  // -----------------------------

  const categories = useMemo(() => {
    const categoryMap = {};

    items.forEach((item) => {
      if (!item.category) return;

      categoryMap[item.category] = (categoryMap[item.category] || 0) + 1;
    });

    return Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [items]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        {/* Background decoration */}
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          {/* Hero Text */}

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur">
              <Sparkles size={16} />
              Discover something you’ll love
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Shop smarter.
              <span className="block text-blue-400">Live better.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Explore a curated collection of products, compare your favorites,
              and build your perfect cart with a smooth shopping experience.
            </p>

            {/* Search-style CTA */}

            <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              <Link
                to="/products"
                className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500"
              >
                <Search size={19} />
                Explore Products
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/products"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                <ShoppingBag size={18} />
                Shop Now
              </Link>
            </div>

            {/* Trust points */}

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-400" />
                Curated products
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-400" />
                Easy shopping
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-400" />
                Secure experience
              </div>
            </div>
          </div>

          {/* Hero Product Preview */}

          <div className="relative hidden lg:block">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />

            <div className="relative grid grid-cols-2 gap-4">
              {items.slice(0, 4).map((item, index) => (
                <Link
                  key={item.id}
                  to="/products"
                  className={`group overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/15 ${
                    index === 1 ? "translate-y-6" : ""
                  }`}
                >
                  <div className="overflow-hidden rounded-xl bg-white">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="px-2 pb-2 pt-3">
                    <p className="line-clamp-1 text-sm font-semibold">
                      {item.title}
                    </p>

                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-sm font-bold text-blue-300">
                        ₹{item.price}
                      </span>

                      <span className="flex items-center gap-1 text-xs text-yellow-300">
                        <Star size={12} fill="currentColor" />
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="-mt-7 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl md:grid-cols-4">
          <div className="border-b border-gray-100 p-5 text-center md:border-b-0 md:border-r">
            <p className="text-2xl font-black text-slate-900 sm:text-3xl">
              {productCount}+
            </p>

            <p className="mt-1 text-sm text-gray-500">Products</p>
          </div>

          <div className="border-b border-gray-100 p-5 text-center md:border-b-0 md:border-r">
            <p className="text-2xl font-black text-slate-900 sm:text-3xl">
              {categoryCount}
            </p>

            <p className="mt-1 text-sm text-gray-500">Categories</p>
          </div>

          <div className="border-r border-gray-100 p-5 text-center">
            <p className="flex items-center justify-center gap-1 text-2xl font-black text-slate-900 sm:text-3xl">
              {averageRating}
              <Star size={20} className="text-yellow-400" fill="currentColor" />
            </p>

            <p className="mt-1 text-sm text-gray-500">Avg. Rating</p>
          </div>

          <div className="p-5 text-center">
            <p className="text-2xl font-black text-slate-900 sm:text-3xl">
              24/7
            </p>

            <p className="mt-1 text-sm text-gray-500">Support</p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORIES
      ====================================================== */}

      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Shop by category
              </h2>

              <p className="mt-2 text-gray-500">
                Find products faster by exploring popular categories.
              </p>
            </div>

            <Link
              to="/products"
              className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex"
            >
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map(([category, count]) => (
              <Link
                key={category}
                to="/products"
                className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <ShoppingBag size={19} />
                </div>

                <h3 className="mt-4 line-clamp-1 text-sm font-bold capitalize text-gray-900">
                  {category}
                </h3>

                <p className="mt-1 text-xs text-gray-500">{count} products</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================
          FEATURED PRODUCTS
      ====================================================== */}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
                <Sparkles size={16} />
                Top picks
              </div>

              <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Featured Products
              </h2>

              <p className="mt-2 max-w-xl text-gray-500">
                Highly rated products selected from our collection.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
            >
              View all products
              <ArrowRight size={18} />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {featuredProducts.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center text-gray-500">
              Products will appear here once loaded.
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          BENEFITS
      ====================================================== */}

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Why MyShop
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              A better way to shop
            </h2>

            <p className="mt-3 text-gray-500">
              Designed around a simple, convenient and enjoyable shopping
              experience.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <Truck size={23} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Fast Delivery
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Get your favorite products delivered quickly and conveniently.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                <ShieldCheck size={23} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Secure Shopping
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Keep your shopping experience simple, reliable and secure.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 transition group-hover:bg-yellow-500 group-hover:text-white">
                <Zap size={23} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Smooth Experience
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Search, filter, sort and manage your cart with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-white blur-3xl" />
          <div className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <ShoppingBag size={27} />
          </div>

          <h2 className="mt-6 text-3xl font-black sm:text-4xl">
            Ready to find your next favorite?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-blue-100">
            Explore the full collection and discover products that fit your
            style.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Browse Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
