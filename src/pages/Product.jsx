import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/ProductSlice";
import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";

const Product = () => {
  const dispatch = useDispatch();

  const { items, status, error } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(items.map((item) => item.category))];

    return uniqueCategories;
  }, [items]);

  // Search + filter + sort
  const filteredProducts = useMemo(() => {
    let products = [...items];

    // Search
    if (search.trim()) {
      const searchText = search.toLowerCase();

      products = products.filter(
        (item) =>
          item.title.toLowerCase().includes(searchText) ||
          item.description.toLowerCase().includes(searchText) ||
          item.category?.toLowerCase().includes(searchText),
      );
    }

    // Category
    if (category !== "all") {
      products = products.filter((item) => item.category === category);
    }

    // Sort
    if (sortBy === "price-low") {
      products.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      products.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "name") {
      products.sort((a, b) => a.title.localeCompare(b.title));
    }

    return products;
  }, [items, search, category, sortBy]);

  // Loading UI
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="h-8 w-56 animate-pulse rounded-lg bg-gray-200" />
            <div className="mt-3 h-4 w-80 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="aspect-square animate-pulse bg-gray-200" />

                <div className="space-y-3 p-5">
                  <div className="h-5 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-10 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error UI
  if (status === "failed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl">
            ⚠️
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {error || "Unable to load products."}
          </p>

          <button
            onClick={() => dispatch(fetchProducts())}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="sticky top-0 z-20 mb-8 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex">
              {/* Category */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All Categories</option>

                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="default">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>

          {/* Result info */}
          <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {items.length}
              </span>{" "}
              products
            </p>

            {(search || category !== "all" || sortBy !== "default") && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                  setSortBy("default");
                }}
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <div>
              <div className="text-5xl">🔎</div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                No products found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or category filter.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                  setSortBy("default");
                }}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid  sm:gap-5 sm:p-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Product;
