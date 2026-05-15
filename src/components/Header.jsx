import { useState } from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import { Menu, X,Search } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  // const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wide cursor-pointer">
          🛍️ MyShop
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-lg font-semibold">
          <Link to="/" className="hover:text-red-400 transition">
            Home
          </Link>
          <Link to="/product" className="hover:text-red-400 transition">
            Product
          </Link>

          {/* <div className="relative w-full max-w-sm">
            <Search
              className="absolute left-3 top-2.5 text-gray-500"
              size={20}
            />

            <input
              type="search"
              placeholder="Search Products..."
              className="pl-10 pr-3 py-2 border border-white rounded-lg w-full outline-none bg-white text-black"
            />
          </div> */}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <AddToCart />

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-black/70 backdrop-blur-lg transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-bold">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:text-red-400"
          >
            Home
          </Link>

          <Link
            to="/product"
            onClick={() => setOpen(false)}
            className="hover:text-red-400"
          >
            Product
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
