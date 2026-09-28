import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import AddToCart from "./AddToCart";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 text-white shadow-lg backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl shadow-lg shadow-blue-500/20">
              🛍️
            </div>

            <div>
              <h1 className="text-lg font-extrabold tracking-tight sm:text-xl">
                My<span className="text-blue-400">Shop</span>
              </h1>

              <p className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 sm:block">
                Shop smarter
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 md:flex">
            <Link
              to="/"
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                isActive("/")
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              to="/products"
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                isActive("/products")
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              Products
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <AddToCart />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10 md:hidden"
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-[85%] max-w-sm flex-col bg-slate-950 text-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
              🛍️
            </div>

            <div>
              <p className="font-bold">MyShop</p>
              <p className="text-xs text-slate-400">Shop smarter</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-1 flex-col px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Navigation
          </p>

          <nav className="space-y-2">
            <Link
              to="/"
              onClick={closeMenu}
              className={`flex items-center justify-between rounded-2xl px-4 py-4 transition ${
                isActive("/")
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Home size={20} />
                <span className="font-semibold">Home</span>
              </div>

              <ChevronRight size={18} />
            </Link>

            <Link
              to="/products"
              onClick={closeMenu}
              className={`flex items-center justify-between rounded-2xl px-4 py-4 transition ${
                isActive("/products")
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                <span className="font-semibold">Products</span>
              </div>

              <ChevronRight size={18} />
            </Link>
          </nav>

          {/* Mobile Cart */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Your Cart
            </p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">
                Shopping cart
              </span>

              <AddToCart />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-auto border-t border-white/10 pt-5">
            <p className="text-center text-xs text-slate-500">
              Happy shopping with MyShop 🛍️
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;