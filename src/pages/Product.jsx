import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/ProductSlice";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";

const Product = () => {
  const dispatch = useDispatch();

  const { items, status, error } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const [searchParams] = useSearchParams();

  // ============================================================
  // FETCH PRODUCTS
  // ============================================================

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // ============================================================
  // CATEGORY FROM URL
  // Example:
  // /products?category=smartphones
  // ============================================================

  useEffect(() => {
    const urlCategory = searchParams.get("category");

    if (urlCategory) {
      setCategory(urlCategory);

      // Automatically open filters on mobile
      setShowFilters(true);
    }
  }, [searchParams]);

  // ============================================================
  // GET UNIQUE CATEGORIES
  // ============================================================

  const categories = useMemo(() => {
    return [...new Set(items.map((item) => item.category))];
  }, [items]);

  // ============================================================
  // SEARCH + CATEGORY + SORT
  // ============================================================

  const filteredProducts = useMemo(() => {
    let products = [...items];

    // ---------------- SEARCH ----------------

    if (search.trim()) {
      const searchText = search.toLowerCase().trim();

      products = products.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchText) ||
          item.description?.toLowerCase().includes(searchText) ||
          item.category?.toLowerCase().includes(searchText),
      );
    }

    // ---------------- CATEGORY ----------------

    if (category !== "all") {
      products = products.filter((item) => item.category === category);
    }

    // ---------------- SORT ----------------

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

  // ============================================================
  // CLEAR FILTERS
  // ============================================================

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSortBy("default");
  };

  // ============================================================
  // LOADING UI
  // ============================================================

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Loading Header */}
          <div className="mb-8">
            <div className="h-8 w-56 animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-3 h-4 w-80 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Loading Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="aspect-square animate-pulse bg-gray-200" />

                <div className="space-y-3 p-4 sm:p-5">
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

  // ============================================================
  // ERROR UI
  // ============================================================

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
            className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN UI
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* ======================================================
            TOOLBAR
        ====================================================== */}

        <div className="sticky top-0 z-20 mb-6 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-sm backdrop-blur">
          {/* ====================================================
              MOBILE FILTER HEADER
          ==================================================== */}

          <div className="flex items-center justify-between lg:hidden">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Product Filters
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                Search, category & sort
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((previous) => !previous)}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* ====================================================
              SEARCH + FILTERS

              Mobile:
              hidden when showFilters = false

              Desktop:
              always visible because lg:flex
          ==================================================== */}

          <div
            className={`
              ${showFilters ? "flex" : "hidden"}
              mt-4 flex-col gap-4
              lg:mt-0 lg:flex lg:flex-row
              lg:items-center lg:justify-between
            `}
          >
            {/* ==================================================
                SEARCH
            ================================================== */}

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

            {/* ==================================================
                FILTERS
            ================================================== */}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex">
              {/* CATEGORY */}

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="min-w-0 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium capitalize text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All Categories</option>

                {categories.map((cat) => (
                  <option key={cat} value={cat} className="capitalize">
                    {cat}
                  </option>
                ))}
              </select>

              {/* SORT */}

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="min-w-0 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="default">Sort By</option>

                <option value="price-low">Price: Low to High</option>

                <option value="price-high">Price: High to Low</option>

                <option value="rating">Highest Rated</option>

                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>

          {/* ====================================================
              RESULT INFORMATION
          ==================================================== */}

          <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
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

            {/* CLEAR FILTERS */}

            {(search || category !== "all" || sortBy !== "default") && (
              <button
                type="button"
                onClick={clearFilters}
                className="self-start font-semibold text-blue-600 hover:text-blue-700 sm:self-auto"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* ======================================================
            SELECTED CATEGORY
        ====================================================== */}

        {category !== "all" && (
          <div className="mb-5 flex items-center gap-2 text-sm text-gray-600">
            <span>Category:</span>

            <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold capitalize text-blue-700">
              {category}
            </span>
          </div>
        )}

        {/* ======================================================
            EMPTY STATE
        ====================================================== */}

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
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          /* ====================================================
              PRODUCT GRID
          ==================================================== */

          <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:p-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
