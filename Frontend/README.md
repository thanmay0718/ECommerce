# 🎨 Frontend - E-Commerce UI

A modern, responsive React-based user interface for the e-commerce platform built with Vite, Redux Toolkit, and Material UI.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Available Scripts](#available-scripts)
6. [Component Architecture](#component-architecture)
7. [State Management](#state-management)
8. [Styling](#styling)
9. [Routing](#routing)
10. [Best Practices](#best-practices)

---

## 🎯 Overview

The frontend is a Single Page Application (SPA) that provides a seamless shopping experience. It communicates with the backend via REST APIs and manages application state using Redux Toolkit.

**Key Characteristics:**

- ⚡ Fast development with Vite
- 🎨 Beautiful UI with Material UI & Tailwind CSS
- 🔄 Predictable state management with Redux
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion

---

## 🛠️ Tech Stack

| Tool              | Version | Purpose                 |
| ----------------- | ------- | ----------------------- |
| React             | 19.x    | UI Library              |
| Vite              | Latest  | Build tool & Dev server |
| Redux Toolkit     | 2.12.x  | State management        |
| Material UI (MUI) | 9.x     | Component library       |
| Tailwind CSS      | 4.3.x   | Utility CSS             |
| React Router      | 7.x     | Routing                 |
| Axios             | 1.16.x  | HTTP requests           |
| Framer Motion     | 13.x    | Animations              |
| React Hook Form   | 7.x     | Form handling           |
| Hot Toast         | 2.x     | Notifications           |
| Swiper            | 12.x    | Carousel/Slider         |

---

## 📁 Project Structure

```
Frontend/
├── public/                        # Static files
│   └── [images, favicon, etc.]
│
├── src/
│   ├── api/
│   │   └── api.js                # Axios instance & API endpoints
│   │
│   ├── assets/
│   │   └── sliders/              # Image assets for sliders
│   │
│   ├── components/
│   │   ├── About.jsx             # About page
│   │   ├── Contact.jsx           # Contact page
│   │   ├── PrivateRoute.jsx      # Protected route wrapper
│   │   ├── Products.jsx          # Main products page
│   │   │
│   │   ├── auth/                 # Authentication components
│   │   │   ├── LogIn.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── cart/                 # Shopping cart components
│   │   │   ├── Cart.jsx
│   │   │   ├── ItemContent.jsx
│   │   │   └── SetQuantity.jsx
│   │   │
│   │   ├── checkout/             # Checkout flow components
│   │   │   ├── AddAddressForm.jsx
│   │   │   ├── AddressInfo.jsx
│   │   │   ├── AddressInfoModal.jsx
│   │   │   ├── AddressList.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── CheckoutSummary.jsx
│   │   │   ├── DeleteModal.jsx
│   │   │   ├── OrderReview.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   └── PaymentMethod.jsx
│   │   │
│   │   ├── home/                 # Home page components
│   │   │   ├── HeroBanner.jsx
│   │   │   └── Home.jsx
│   │   │
│   │   ├── products/             # Product display components
│   │   │   ├── Filter.jsx
│   │   │   └── Products.jsx
│   │   │
│   │   └── shared/               # Reusable UI components
│   │       ├── BackDrop.jsx
│   │       ├── BackendOffline.jsx
│   │       ├── InputField.jsx
│   │       ├── Loader.jsx
│   │       ├── NavBar.jsx
│   │       ├── Paginations.jsx
│   │       ├── ProductCard.jsx
│   │       ├── ProductViewModal.jsx
│   │       ├── Skeleton.jsx
│   │       ├── Spinners.jsx
│   │       └── Status.jsx
│   │
│   ├── context/
│   │   └── ThemeContext.jsx      # Theme provider (dark/light mode)
│   │
│   ├── hooks/
│   │   └── useProductFilter.js   # Custom hook for product filtering
│   │
│   ├── store/                    # Redux store
│   │   ├── actions/
│   │   │   └── index.js          # Redux actions
│   │   │
│   │   └── reducers/
│   │       ├── authReducer.js    # Auth state
│   │       ├── cartReducer.js    # Cart state
│   │       ├── errorReducer.js   # Error state
│   │       ├── ProductReducer.js # Products state
│   │       └── store.js          # Store configuration
│   │
│   ├── utils/
│   │   ├── constant.js           # Constants & config values
│   │   ├── formatPrice.js        # Price formatting utility
│   │   ├── truncateText.js       # Text truncation utility
│   │   └── index.js              # General utilities
│   │
│   ├── App.css                   # Global styles
│   ├── App.jsx                   # Root component
│   ├── index.css                 # Global CSS
│   └── main.jsx                  # Application entry point
│
├── .env                          # Environment variables (create this file)
├── .eslintrc.config.js           # ESLint configuration
├── eslint.config.js              # ESLint rules
├── index.html                    # HTML entry point
├── package.json                  # Dependencies & scripts
├── vite.config.js                # Vite configuration
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Installation

1. **Navigate to Frontend directory:**

   ```bash
   cd Frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file in Frontend root:**

   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_APP_NAME=E-Commerce Store
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

---

## 📜 Available Scripts

### Development

```bash
npm run dev           # Start Vite development server with HMR
npm run build         # Build for production
npm run preview       # Preview production build locally
npm run lint          # Run ESLint to check code quality
```

---

## 🏗️ Component Architecture

### Component Hierarchy

```
<App>
  ├── <NavBar />
  ├── <Routes>
  │   ├── <Home />
  │   │   ├── <HeroBanner />
  │   │   └── <Products />
  │   ├── <Products />
  │   ├── <Cart />
  │   ├── <Checkout />
  │   │   ├── <AddressList />
  │   │   ├── <PaymentMethod />
  │   │   └── <CheckoutSummary />
  │   ├── <PrivateRoute>
  │   │   ├── <AuthRoutes />
  │   ├── <LogIn />
  │   ├── <Register />
  │   ├── <About />
  │   └── <Contact />
  └── <ToasterProvider />
```

### Key Components

#### Layout Components

- **NavBar**: Header with navigation, cart icon, user menu
- **Loader**: Full-page loading indicator
- **BackDrop**: Modal backdrop overlay

#### Authentication

- **LogIn**: User login form
- **Register**: User registration form
- **PrivateRoute**: Protected route wrapper

#### Product Features

- **Products**: Main product listing page
- **ProductCard**: Individual product card
- **ProductViewModal**: Product details modal
- **Filter**: Product filtering panel
- **Pagination**: Page navigation

#### Shopping

- **Cart**: Shopping cart display
- **ItemContent**: Cart item row
- **SetQuantity**: Quantity selector

#### Checkout Flow

- **Checkout**: Main checkout page
- **AddressList**: List of saved addresses
- **AddAddressForm**: Form to add new address
- **PaymentMethod**: Payment selection
- **OrderReview**: Order confirmation
- **OrderSuccess**: Success message after order

---

## 🔄 State Management (Redux)

### Store Structure

```
store/
├── authReducer
│   ├── user (current logged-in user)
│   ├── token (JWT token)
│   └── isAuthenticated (boolean)
│
├── cartReducer
│   ├── items (array of cart items)
│   ├── totalPrice (calculated total)
│   └── itemCount (number of items)
│
├── ProductReducer
│   ├── products (array of products)
│   ├── selectedProduct (product details)
│   ├── filters (active filters)
│   └── pagination (page info)
│
└── errorReducer
    ├── message (error message)
    └── type (error type)
```

### Redux Actions

Common actions:

```javascript
// Auth
(LOGIN, LOGOUT, REGISTER, UPDATE_USER);

// Cart
(ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART);

// Products
(FETCH_PRODUCTS, SET_FILTERS, SET_SELECTED_PRODUCT);

// Errors
(SET_ERROR, CLEAR_ERROR);
```

---

## 🎨 Styling

### Tailwind CSS + Material UI

The project uses a hybrid approach:

- **Material UI**: For complex components (dialogs, menus, date pickers)
- **Tailwind CSS**: For utility-based styling and layouts

### Global Styles

Edit `App.css` and `index.css` for global styling:

```css
:root {
  /* Define CSS variables for colors, spacing, etc. */
  --primary-color: #1976d2;
  --secondary-color: #dc004e;
}
```

### Dark Mode

Implement dark mode using ThemeContext:

```jsx
const { theme, toggleTheme } = useContext(ThemeContext);
```

---

## 🛣️ Routing

Routes are configured using React Router v7:

```javascript
- / → Home page
- /products → Products listing
- /product/:id → Product details
- /cart → Shopping cart
- /checkout → Checkout process
- /order-success → Order confirmation
- /login → Login page
- /register → Registration page
- /about → About page
- /contact → Contact page
```

Protected routes require authentication and use `<PrivateRoute>` wrapper.

---

## 🔧 Best Practices

### 1. Component Development

```javascript
// Use functional components with hooks
export const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Side effects here
  }, []);

  return <div>{/* JSX */}</div>;
};
```

### 2. Redux Usage

```javascript
// Use Redux Toolkit
import { useDispatch, useSelector } from "react-redux";

const MyComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.reducer.data);

  return <div>{data}</div>;
};
```

### 3. API Calls

```javascript
// Use Axios instance from api/api.js
import { api } from "../api/api";

const fetchData = async () => {
  try {
    const response = await api.get("/endpoint");
    // Handle response
  } catch (error) {
    // Handle error
  }
};
```

### 4. Error Handling

```javascript
// Use React Hot Toast for notifications
import toast from "react-hot-toast";

toast.success("Success message");
toast.error("Error message");
toast.loading("Loading...");
```

### 5. Code Organization

- Keep components small and focused
- Extract logic into custom hooks
- Use proper naming conventions
- Add JSDoc comments for functions
- Keep styles close to components

---

## 📱 Responsive Design

The project is fully responsive:

- **Mobile**: < 640px (Tailwind sm breakpoint)
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Use Tailwind breakpoints in className:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Content */}
</div>
```

---

## 🔍 Debugging

### Browser DevTools

1. Open Chrome DevTools (F12)
2. Navigate to Redux DevTools extension tab
3. Inspect state changes and actions

### Console Logging

```javascript
console.log("Debug info:", value);
```

### VS Code Debugger

Configure `.vscode/launch.json` for debugging.

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Material UI Components](https://mui.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)

---

## 🆘 Troubleshooting

### Port 5173 already in use

```bash
# Kill the process or use a different port
npm run dev -- --port 5174
```

### Dependencies issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Hot reload not working

- Restart the dev server
- Check Vite config
- Clear browser cache

---

## 📝 Notes

- Keep API base URL in `.env` file
- Don't commit `.env` files with sensitive data
- Use `.env.example` as template for environment variables
- Always test in multiple browsers

---

**Happy coding! 🚀**
