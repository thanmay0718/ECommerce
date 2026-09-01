# 📊 Project Structure & Architecture

Comprehensive breakdown of the E-Commerce project organization and architecture patterns.

---

## 🏢 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     E-Commerce Application                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────┐            ┌────────────────────────┐   │
│  │   Frontend (SPA)   │            │   Backend (REST API)   │   │
│  │                    │◄──HTTP/JSON──►                      │   │
│  │  • React 19        │            │  • Spring Boot 4.0.2   │   │
│  │  • Redux Toolkit   │            │  • Spring Security     │   │
│  │  • Material UI     │            │  • Spring Data JPA     │   │
│  │  • Tailwind CSS    │            │  • Hibernate/JPA       │   │
│  │  • Vite            │            │                        │   │
│  └────────────────────┘            │  ┌─────────────────┐  │   │
│    Port: 5173                       │  │   PostgreSQL/   │  │   │
│                                     │  │   H2 Database   │  │   │
│                                     │  └─────────────────┘  │   │
│                                     │  Port: 8080            │   │
│                                     └────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Detailed Directory Structure

### Backend Project Layout

```
Backend/
│
├── src/
│   ├── main/
│   │   ├── java/com/ecommerce/sb_ecom/
│   │   │   ├── config/                    # Configuration Classes
│   │   │   │   ├── AppConfig.java         # Bean definitions
│   │   │   │   ├── AppConstants.java      # Static constants
│   │   │   │   ├── WebMvcConfig.java      # CORS & Web config
│   │   │   │   └── SecurityConfig.java    # Spring Security config
│   │   │   │
│   │   │   ├── Controller/                # REST Controllers (HTTP Layer)
│   │   │   │   ├── AuthController.java    # Authentication endpoints
│   │   │   │   ├── ProductController.java # Product endpoints
│   │   │   │   ├── CartController.java    # Shopping cart endpoints
│   │   │   │   ├── OrderController.java   # Order endpoints
│   │   │   │   ├── AddressController.java # Address management
│   │   │   │   ├── CategoryController.java# Category endpoints
│   │   │   │   └── [Other Controllers]
│   │   │   │
│   │   │   ├── exceptions/                # Exception Handling
│   │   │   │   ├── ApiException.java      # Custom API exception
│   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   ├── BadRequestException.java
│   │   │   │   ├── ValidationException.java
│   │   │   │   └── GlobalExceptionHandler.java  # Global error handler
│   │   │   │
│   │   │   ├── Model/                     # JPA Entities (Database Layer)
│   │   │   │   ├── User.java              # User entity
│   │   │   │   ├── Product.java           # Product entity
│   │   │   │   ├── Category.java          # Category entity
│   │   │   │   ├── Cart.java              # Cart entity
│   │   │   │   ├── CartItem.java          # Cart item entity
│   │   │   │   ├── Order.java             # Order entity
│   │   │   │   ├── OrderItem.java         # Order item entity
│   │   │   │   ├── Address.java           # Address entity
│   │   │   │   ├── Payment.java           # Payment entity
│   │   │   │   ├── Role.java              # User role entity
│   │   │   │   └── [Other Models]
│   │   │   │
│   │   │   ├── payload/                   # DTOs & Request/Response
│   │   │   │   ├── request/
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── RegisterRequest.java
│   │   │   │   │   ├── CreateProductRequest.java
│   │   │   │   │   └── [Other Requests]
│   │   │   │   │
│   │   │   │   ├── response/
│   │   │   │   │   ├── AuthResponse.java
│   │   │   │   │   ├── ProductResponse.java
│   │   │   │   │   ├── ApiResponse.java
│   │   │   │   │   └── [Other Responses]
│   │   │   │   │
│   │   │   │   └── dto/
│   │   │   │       ├── UserDTO.java
│   │   │   │       ├── ProductDTO.java
│   │   │   │       ├── OrderDTO.java
│   │   │   │       ├── AddressDTO.java
│   │   │   │       └── [Other DTOs]
│   │   │   │
│   │   │   ├── repositories/              # Spring Data Repositories (Data Access Layer)
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── ProductRepository.java
│   │   │   │   ├── CategoryRepository.java
│   │   │   │   ├── CartRepository.java
│   │   │   │   ├── OrderRepository.java
│   │   │   │   ├── AddressRepository.java
│   │   │   │   ├── RoleRepository.java
│   │   │   │   └── [Other Repositories]
│   │   │   │
│   │   │   ├── security/                  # Security Implementation
│   │   │   │   ├── JwtTokenProvider.java  # JWT token generation & validation
│   │   │   │   ├── JwtAuthFilter.java     # JWT authentication filter
│   │   │   │   ├── JwtAuthenticationEntryPoint.java
│   │   │   │   ├── CustomUserDetailsService.java
│   │   │   │   ├── CustomUserDetails.java
│   │   │   │   └── PasswordEncoder.java   # Password encryption
│   │   │   │
│   │   │   ├── service/                   # Business Logic Services (Service Layer)
│   │   │   │   ├── UserService.java       # User operations
│   │   │   │   ├── ProductService.java    # Product operations
│   │   │   │   ├── CartService.java       # Cart operations
│   │   │   │   ├── OrderService.java      # Order operations
│   │   │   │   ├── AddressService.java    # Address operations
│   │   │   │   ├── AuthService.java       # Authentication logic
│   │   │   │   ├── CategoryService.java   # Category operations
│   │   │   │   ├── PaymentService.java    # Payment processing
│   │   │   │   └── [Other Services]
│   │   │   │
│   │   │   ├── util/                      # Utility Classes & Helpers
│   │   │   │   ├── AppUtil.java           # General utilities
│   │   │   │   ├── DateUtil.java          # Date/time utilities
│   │   │   │   ├── ValidationUtil.java    # Validation helpers
│   │   │   │   ├── SecurityUtil.java      # Security utilities
│   │   │   │   ├── PaginationUtil.java    # Pagination helpers
│   │   │   │   └── Constants.java         # Global constants
│   │   │   │
│   │   │   └── SbEcomApplication.java     # Spring Boot Application Entry Point
│   │   │       └── main() method starts the application
│   │   │
│   │   └── resources/
│   │       ├── application.properties     # Development configuration
│   │       ├── application-prod.properties# Production configuration
│   │       ├── application-test.properties# Test configuration
│   │       ├── static/                    # Static files (CSS, JS, etc.)
│   │       └── templates/                 # Template files (if needed)
│   │
│   └── test/
│       └── java/com/ecommerce/sb_ecom/
│           ├── SbEcomApplicationTests.java
│           ├── controller/                # Controller integration tests
│           ├── service/                   # Service unit tests
│           └── repository/                # Repository tests
│
├── pom.xml                 # Maven project configuration & dependencies
├── mvnw                    # Maven wrapper script (Linux/Mac)
├── mvnw.cmd                # Maven wrapper script (Windows)
├── README.md               # Backend documentation
└── HELP.md                 # Spring Boot help
```

### Frontend Project Layout

```
Frontend/
│
├── public/                         # Public static assets (not processed)
│   ├── favicon.ico
│   ├── index.html                  # (Alternative entry point)
│   └── [other static files]
│
├── src/
│   ├── api/                        # API Integration Layer
│   │   └── api.js                  # Axios configuration & API client
│   │       ├── Base URL setup
│   │       ├── Interceptors
│   │       └── API endpoint definitions
│   │
│   ├── assets/                     # Media Files (images, fonts, etc.)
│   │   ├── sliders/                # Slider/carousel images
│   │   ├── icons/                  # SVG icons
│   │   ├── images/                 # General images
│   │   └── fonts/                  # Custom fonts
│   │
│   ├── components/                 # React Components
│   │   ├── About.jsx               # About page component
│   │   ├── Contact.jsx             # Contact page component
│   │   ├── PrivateRoute.jsx        # Protected route wrapper
│   │   ├── Products.jsx            # Main products page
│   │   │
│   │   ├── auth/                   # Authentication Components
│   │   │   ├── LogIn.jsx           # Login form & logic
│   │   │   └── Register.jsx        # Registration form & logic
│   │   │
│   │   ├── cart/                   # Shopping Cart Components
│   │   │   ├── Cart.jsx            # Cart display & logic
│   │   │   ├── ItemContent.jsx     # Individual cart item
│   │   │   └── SetQuantity.jsx     # Quantity selector
│   │   │
│   │   ├── checkout/               # Checkout Flow Components
│   │   │   ├── Checkout.jsx        # Checkout page orchestrator
│   │   │   ├── AddressList.jsx     # List of saved addresses
│   │   │   ├── AddAddressForm.jsx  # Add new address form
│   │   │   ├── AddressInfo.jsx     # Display address info
│   │   │   ├── AddressInfoModal.jsx# Address modal dialog
│   │   │   ├── DeleteModal.jsx     # Delete confirmation modal
│   │   │   ├── PaymentMethod.jsx   # Payment method selection
│   │   │   ├── CheckoutSummary.jsx # Order summary
│   │   │   ├── OrderReview.jsx     # Order review before confirmation
│   │   │   └── OrderSuccess.jsx    # Success message & order details
│   │   │
│   │   ├── home/                   # Home Page Components
│   │   │   ├── Home.jsx            # Home page layout
│   │   │   └── HeroBanner.jsx      # Hero banner section
│   │   │
│   │   ├── products/               # Product Display Components
│   │   │   ├── Products.jsx        # Products listing page
│   │   │   └── Filter.jsx          # Product filter sidebar
│   │   │
│   │   └── shared/                 # Reusable UI Components
│   │       ├── NavBar.jsx          # Navigation bar
│   │       ├── ProductCard.jsx     # Product card component
│   │       ├── ProductViewModal.jsx# Product details modal
│   │       ├── Loader.jsx          # Full page loader
│   │       ├── Spinners.jsx        # Loading spinners
│   │       ├── Skeleton.jsx        # Skeleton loader
│   │       ├── Paginations.jsx     # Pagination controls
│   │       ├── InputField.jsx      # Reusable input field
│   │       ├── BackDrop.jsx        # Modal backdrop
│   │       ├── BackendOffline.jsx  # Backend unavailable message
│   │       └── Status.jsx          # Status display component
│   │
│   ├── context/                    # React Context (Global State)
│   │   └── ThemeContext.jsx        # Theme context provider (light/dark mode)
│   │
│   ├── hooks/                      # Custom React Hooks
│   │   ├── useProductFilter.js     # Product filtering logic hook
│   │   ├── useFetch.js             # Data fetching hook
│   │   ├── useAuth.js              # Authentication hook
│   │   └── [Other custom hooks]
│   │
│   ├── store/                      # Redux Store & State Management
│   │   ├── store.js                # Redux store configuration
│   │   │
│   │   ├── actions/
│   │   │   └── index.js            # Redux action creators
│   │   │       ├── Auth actions
│   │   │       ├── Cart actions
│   │   │       ├── Product actions
│   │   │       └── Error actions
│   │   │
│   │   └── reducers/
│   │       ├── authReducer.js      # Authentication state reducer
│   │       │   └── user, token, isAuthenticated
│   │       ├── cartReducer.js      # Shopping cart state reducer
│   │       │   └── items, totalPrice, itemCount
│   │       ├── ProductReducer.js   # Products state reducer
│   │       │   └── products, filters, pagination
│   │       ├── errorReducer.js     # Error state reducer
│   │       │   └── message, type
│   │       └── store.js            # Store configuration
│   │
│   ├── utils/                      # Utility Functions
│   │   ├── constant.js             # Constants & configuration
│   │   ├── formatPrice.js          # Currency formatting
│   │   ├── truncateText.js         # Text truncation helper
│   │   ├── index.js                # General utilities
│   │   └── validators.js           # Form validation utilities
│   │
│   ├── App.jsx                     # Root React Component
│   │   └── Routing setup
│   │   └── Provider setup
│   │   └── Layout wrapper
│   │
│   ├── App.css                     # App global styles
│   ├── index.css                   # Global CSS (Tailwind imports)
│   ├── main.jsx                    # React application entry point
│   │   └── ReactDOM.render(<App />)
│   └── [Other component files]
│
├── .env                            # Environment variables (CREATE THIS)
├── .env.example                    # Environment template
├── .eslintrc.config.js             # ESLint configuration
├── eslint.config.js                # ESLint rules
├── .gitignore                      # Git ignore patterns
├── index.html                      # HTML entry point
├── package.json                    # npm dependencies & scripts
├── vite.config.js                  # Vite configuration
├── README.md                       # Frontend documentation
└── tailwind.config.js              # Tailwind CSS configuration
```

---

## 🏗️ Architectural Patterns

### Backend Architecture Layers

```
┌─────────────────────────────┐
│   Controller Layer          │  (HTTP Requests/Responses)
│   @RestController           │  Handles incoming API requests
├─────────────────────────────┤
│   Service Layer             │  (Business Logic)
│   @Service                  │  Implements business rules
├─────────────────────────────┤
│   Repository Layer          │  (Data Access)
│   Spring Data JPA           │  Database operations
├─────────────────────────────┤
│   Model/Entity Layer        │  (Data Structures)
│   @Entity, @Table           │  Database entities
├─────────────────────────────┤
│   Database                  │  (Persistence)
│   PostgreSQL / H2           │  Data storage
└─────────────────────────────┘
```

### Frontend Component Architecture

```
┌──────────────────────────────┐
│   App.jsx                    │  (Root Component)
│   Route Setup, Providers     │
├──────────────────────────────┤
│   Pages/Container Components │  (Smart Components)
│   Logic, Data Fetching       │
├──────────────────────────────┤
│   Components                 │  (Presentational)
│   UI Rendering               │
├──────────────────────────────┤
│   Redux Store                │  (Global State)
│   Reducers, Actions          │
├──────────────────────────────┤
│   Utilities & Hooks          │  (Logic & Helpers)
│   API calls, Validators      │
└──────────────────────────────┘
```

---

## 🔄 Data Flow

### User Registration Flow

```
Frontend                    Backend
   │                           │
   ├─ User fills form          │
   │                           │
   ├─ Click Register ─────────→ POST /api/auth/register
   │                           │
   │                      ┌────────────────┐
   │                      │ Validation     │
   │                      │ Hash Password  │
   │                      │ Save to DB     │
   │                      └────────────────┘
   │                           │
   │←───────── 201 Created ────┤
   │ (with token & user data)  │
   │                           │
   ├─ Store token in           │
   │  localStorage             │
   │                           │
   ├─ Redirect to home         │
   │                           │
```

### Shopping Flow

```
Frontend                    Backend
   │                           │
   ├─ Browse products ────────→ GET /api/products
   │←───────── Product list ───┤
   │                           │
   ├─ Click product ──────────→ GET /api/products/{id}
   │←───────── Details ────────┤
   │                           │
   ├─ Add to cart ────────────→ POST /api/cart/items
   │←───────── Success ────────┤
   │                           │
   ├─ Go to checkout ─────────→ GET /api/addresses
   │←─ Address list ──────────┤
   │                           │
   ├─ Place order ────────────→ POST /api/orders
   │←─ Order confirmation ────┤
   │                           │
```

---

## 📦 Key Technology Integration

### Spring Boot Integration

```
1. Spring Web        → REST API endpoints
2. Spring Security   → JWT authentication & authorization
3. Spring Data JPA   → Database operations
4. Spring Validation → Input validation
```

### React Integration

```
1. React Router      → Client-side routing
2. Redux Toolkit     → Global state management
3. Axios             → HTTP client for API calls
4. Material UI       → Pre-built components
5. Tailwind CSS      → Styling utility classes
```

---

## 🔐 Authentication & Authorization Flow

```
┌─────────────────────────────────────────────────┐
│            JWT Authentication Flow              │
├─────────────────────────────────────────────────┤
│                                                 │
│ 1. User Login                                   │
│    POST /api/auth/login with credentials       │
│                                                 │
│ 2. Backend Verification                        │
│    - Find user in database                      │
│    - Verify password with BCrypt                │
│    - Create JWT token with user claims          │
│                                                 │
│ 3. Token Return                                 │
│    Response: { token, user }                    │
│                                                 │
│ 4. Frontend Storage                             │
│    Save token in localStorage                   │
│                                                 │
│ 5. Subsequent Requests                          │
│    Add header: Authorization: Bearer <token>   │
│                                                 │
│ 6. Backend Validation                           │
│    - Extract token from header                  │
│    - Validate JWT signature                     │
│    - Extract user claims                        │
│    - Process request                            │
│                                                 │
│ 7. Protected Routes                             │
│    Frontend: <PrivateRoute>                     │
│    Backend: @PreAuthorize("isAuthenticated()") │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema Overview

### Main Tables

**Users**

- id (PK)
- firstName, lastName
- email (unique)
- password (hashed)
- role
- createdAt, updatedAt

**Products**

- id (PK)
- name, description
- price
- categoryId (FK)
- imageUrl
- stock
- createdAt, updatedAt

**Categories**

- id (PK)
- name, description
- createdAt, updatedAt

**Cart**

- id (PK)
- userId (FK)
- createdAt, updatedAt

**CartItems**

- id (PK)
- cartId (FK)
- productId (FK)
- quantity
- price

**Orders**

- id (PK)
- userId (FK)
- totalPrice
- status
- createdAt, updatedAt

**OrderItems**

- id (PK)
- orderId (FK)
- productId (FK)
- quantity
- price

**Addresses**

- id (PK)
- userId (FK)
- street, city, state, zipCode, country
- isDefault
- createdAt, updatedAt

---

## 🔄 Redux State Shape

```javascript
{
  auth: {
    user: {
      id: 1,
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "USER"
    },
    token: "eyJhbGciOiJIUzI1NiIs...",
    isAuthenticated: true,
    loading: false
  },

  cart: {
    items: [
      {
        id: 1,
        productId: 1,
        quantity: 2,
        price: 99.99
      }
    ],
    totalPrice: 199.98,
    itemCount: 2
  },

  products: {
    items: [
      {
        id: 1,
        name: "Product",
        price: 99.99,
        category: "Electronics"
      }
    ],
    selectedProduct: null,
    filters: {
      category: "",
      priceRange: [0, 1000],
      search: ""
    },
    pagination: {
      page: 1,
      totalPages: 5,
      size: 10
    },
    loading: false
  },

  error: {
    message: "",
    type: "",
    timestamp: null
  }
}
```

---

## 🔌 API Response Format

```javascript
// Success Response (200)
{
  "data": { /* response data */ },
  "message": "Operation successful",
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}

// Error Response (400/500)
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid input data",
    "details": { /* validation errors */ }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}

// Paginated Response
{
  "content": [ /* array of items */ ],
  "page": 1,
  "pageSize": 10,
  "totalElements": 100,
  "totalPages": 10,
  "hasNext": true
}
```

---

## 📊 Project Statistics

| Aspect                | Details                              |
| --------------------- | ------------------------------------ |
| **Backend**           | Java 21, Spring Boot 4.0.2           |
| **Frontend**          | React 19, Vite 4.x                   |
| **Database**          | PostgreSQL/H2                        |
| **State Management**  | Redux Toolkit 2.12.x                 |
| **UI Framework**      | Material UI 9.x + Tailwind CSS 4.3.x |
| **API Communication** | REST + JWT                           |
| **Authentication**    | JWT Token-based                      |

---

**This structure ensures scalability, maintainability, and clear separation of concerns!**
