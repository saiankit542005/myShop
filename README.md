# My-Shop 🛍️

My-Shop is a React-based e-commerce application focused on a clean product browsing and shopping-cart experience. **Redux Toolkit is used for centralized state management**, making it easier to manage product data and cart state across components.

- **Live Demo:** (https://my-shop-indol-one.vercel.app)

## Features

- Browse products fetched from an API
- Responsive product-card grid
- Add products to the shopping cart
- Remove products from the shopping cart
- Clear all cart items
- Cart item count displayed in the navigation area
- Cart state managed with Redux Toolkit
- Cart persistence using `localStorage`
- Client-side navigation with React Router
- Responsive UI styling with Tailwind CSS

## Tech Stack

- **React** – UI development
- **Redux Toolkit** – Global state management
- **React Redux** – Connecting React components with the Redux store
- **React Router** – Client-side routing and navigation
- **Tailwind CSS** – Styling and responsive layout
- **Axios / Fetch API** – API communication
- **localStorage** – Persisting cart data across page refreshes

## State Management with Redux Toolkit

Redux Toolkit is used to manage application state that needs to be accessed by multiple components.

The cart state follows a structure similar to:

```js
{
  apicart: {
    items: []
  }
}
```

### Cart Actions

The cart slice contains actions such as:

- `addItem(product)` – adds a product to the cart
- `removeItem(product)` – removes a product from the cart
- `clearAllItems()` – clears the cart

### Data Flow

```text
API
 ↓
Product data
 ↓
Product component
 ↓
Product Card
 ↓
User clicks "Add to Cart"
 ↓
dispatch(addItem(product))
 ↓
Redux Toolkit reducer
 ↓
state.apicart.items
 ↓
Cart UI updates
```

## Cart Persistence

The cart is also stored in browser `localStorage` so that the cart can be restored after a page refresh.

```text
Redux state
   ↕
localStorage
```

When the application starts, previously saved cart data can be loaded into the Redux initial state. When products are added or removed, the updated cart is saved back to `localStorage`.

## Project Structure

A typical structure for the project is:

```text
my-shop/
├── src/
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── CartList.jsx
│   │   ├── Header.jsx
│   │   └── AddToCart.jsx
│   ├── pages/
│   │   ├── Product.jsx
│   │   └── Cart.jsx
│   ├── redux/
│   │   ├── Store.js
│   │   ├── Productslice.js
│   │   └── Slice.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

> Adjust the folder names if your current project structure is different.

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd my-shop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Redux Toolkit Example

A cart reducer can be written using Redux Toolkit like this:

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "apicart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
    },

    clearAllItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearAllItems } = cartSlice.actions;
export default cartSlice.reducer;
```

Redux Toolkit uses **Immer internally**, so reducers can use code such as `state.items.push(...)` while Redux Toolkit produces the necessary immutable update safely.

## Using the Store in a Component

```jsx
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/Slice";

function Card({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.apicart.items);

  return (
    <button onClick={() => dispatch(addItem(product))}>
      Add to Cart
    </button>
  );
}
```

## Product API

The application can fetch product data from an external API such as DummyJSON and store the returned products in Redux state.

Example endpoint:

```text
https://dummyjson.com/products?limit=300
```

The application can then map over the product list and render reusable product cards.

## Learning Goals

This project demonstrates practical use of:

- React components and props
- React Hooks such as `useState`, `useEffect`, and `useSelector`
- Redux Toolkit slices and reducers
- `useDispatch` and `useSelector`
- API integration
- React Router navigation
- Conditional rendering
- Array methods such as `map`, `filter`, and `some`
- Persistent client-side storage with `localStorage`
- Responsive layouts with Tailwind CSS

## Future Improvements

- Product search and filtering
- Product details page
- Quantity controls in the cart
- Authentication
- Checkout flow
- Order history
- Better API error and loading states
- Backend integration for persistent user carts

## Author

**Ankit Saini**


- **GitHub:** (https://github.com/saiankit542005/myShop)
- **Live Demo:** (https://my-shop-indol-one.vercel.app/)
