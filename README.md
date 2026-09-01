# 🛒 E-Commerce Application

A modern, full-stack e-commerce platform with a clean separation between frontend and backend services.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
6. [Running the Project](#running-the-project)
7. [API Documentation](#api-documentation)
8. [Project Roadmap](#project-roadmap)

---

## 🎯 Project Overview

This is a full-stack e-commerce application built with modern web technologies. The project follows a microservices architecture pattern with a complete separation of concerns between the frontend and backend.

- **Frontend**: Interactive React-based UI with responsive design
- **Backend**: RESTful API built with Spring Boot
- **Database**: PostgreSQL (configured for production)
- **Authentication**: JWT-based security

---

## 🛠️ Tech Stack

### Frontend

| Technology    | Version | Purpose                 |
| ------------- | ------- | ----------------------- |
| React         | 19.x    | UI Framework            |
| Vite          | Latest  | Build tool & Dev server |
| Redux Toolkit | 2.12.x  | State management        |
| Material UI   | 9.x     | Component library       |
| Tailwind CSS  | 4.3.x   | Utility-first CSS       |
| React Router  | 7.x     | Client-side routing     |
| Axios         | 1.16.x  | HTTP client             |
| Framer Motion | 13.x    | Animations              |

### Backend

| Technology      | Version | Purpose                        |
| --------------- | ------- | ------------------------------ |
| Java            | 21      | Programming language           |
| Spring Boot     | 4.0.2   | Framework                      |
| Spring Security | Latest  | Authentication & Authorization |
| Spring Data JPA | Latest  | ORM & Data access              |
| PostgreSQL      | Latest  | Database                       |
| Maven           | Latest  | Build management               |
| Hibernate       | Latest  | Object-Relational Mapping      |

---

## 📁 Project Structure

```
ECommerce/
│
├── Frontend/                          # React Frontend Application
│   ├── public/                        # Static assets
│   ├── src/
│   │   ├── api/                       # API endpoints configuration
│   │   ├── assets/                    # Images, icons, media
│   │   ├── components/                # Reusable React components
│   │   │   ├── auth/                  # Authentication components
│   │   │   ├── cart/                  # Shopping cart components
│   │   │   ├── checkout/              # Checkout flow components
│   │   │   ├── home/                  # Home page components
│   │   │   ├── products/              # Product display components
│   │   │   └── shared/                # Shared UI components
│   │   ├── context/                   # React Context for theming
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── store/                     # Redux store
│   │   │   ├── actions/               # Redux actions
│   │   │   └── reducers/              # Redux reducers
│   │   ├── utils/                     # Utility functions
│   │   ├── App.jsx                    # Root component
│   │   └── main.jsx                   # Entry point
│   ├── package.json                   # Dependencies & scripts
│   ├── vite.config.js                 # Vite configuration
│   └── eslint.config.js               # Linting configuration
│
├── Backend/                           # Spring Boot Backend Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ecommerce/sb_ecom/
│   │   │   │   ├── config/            # Application configuration
│   │   │   │   ├── Controller/        # REST Controllers
│   │   │   │   ├── exceptions/        # Custom exceptions
│   │   │   │   ├── Model/             # JPA Entities
│   │   │   │   ├── payload/           # DTOs & Request/Response objects
│   │   │   │   ├── repositories/      # Spring Data repositories
│   │   │   │   ├── security/          # Security configuration & JWT
│   │   │   │   ├── service/           # Business logic services
│   │   │   │   ├── util/              # Utility classes
│   │   │   │   └── SbEcomApplication.java  # Entry point
│   │   │   └── resources/
│   │   │       ├── application.properties      # Development config
│   │   │       └── application-prod.properties # Production config
│   │   └── test/                      # Unit tests
│   ├── pom.xml                        # Maven dependencies
│   ├── mvnw                           # Maven wrapper (Linux/Mac)
│   ├── mvnw.cmd                       # Maven wrapper (Windows)
│   └── HELP.md                        # Backend documentation
│
├── README.md                          # This file
├── .gitignore                         # Git ignore patterns
└── .github/                           # GitHub configuration

```

---

## ✨ Features

### User & Authentication

- ✅ User registration with validation
- ✅ Email-based login
- ✅ JWT token-based authentication
- ✅ Secure password handling
- ✅ Role-based access control (RBAC)

### Product Management

- ✅ Product listing with pagination
- ✅ Advanced product filtering
- ✅ Product search functionality
- ✅ Product details view
- ✅ Product reviews and ratings (optional)

### Shopping Cart

- ✅ Add/remove items from cart
- ✅ Update item quantities
- ✅ Cart persistence
- ✅ Real-time cart updates
- ✅ Clear cart functionality

### Checkout & Orders

- ✅ Secure checkout flow
- ✅ Address management (add, edit, delete)
- ✅ Multiple payment method support
- ✅ Order review before confirmation
- ✅ Order placement and confirmation
- ✅ Order history tracking

### UI/UX

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Loading states and spinners
- ✅ Error handling and user feedback
- ✅ Toast notifications
- ✅ Modal dialogs for confirmations

---

## 🚀 Getting Started

### Prerequisites

**For Backend:**

- Java Development Kit (JDK) 21 or higher
- Maven 3.8+ or use the included Maven wrapper
- PostgreSQL 12+ (for production)

**For Frontend:**

- Node.js 18+ and npm 9+

### Backend Setup

1. **Navigate to Backend directory:**

   ```bash
   cd Backend
   ```

2. **Configure Database (Optional - for development use H2):**

   Edit `src/main/resources/application.properties`:

   ```properties
   # PostgreSQL configuration (for production)
   spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
   spring.datasource.username=postgres
   spring.datasource.password=your_password
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
   ```

3. **Build the project:**

   ```bash
   # Using Maven wrapper (Windows)
   mvnw clean install

   # Or using Maven directly
   maven clean install
   ```

4. **Run the application:**

   ```bash
   # Using Maven wrapper
   mvnw spring-boot:run

   # Or using Maven
   maven spring-boot:run

   # Or run the JAR file
   java -jar target/sb-ecom-0.0.1-SNAPSHOT.jar
   ```

   The backend will start on: `http://localhost:8080`

### Frontend Setup

1. **Navigate to Frontend directory:**

   ```bash
   cd Frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment configuration:**

   Create a `.env` file in the Frontend directory:

   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_APP_NAME=E-Commerce
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The frontend will start on: `http://localhost:5173`

---

## ▶️ Running the Project

### Development Mode (Full Stack)

**Terminal 1 - Backend:**

```bash
cd Backend
mvnw spring-boot:run
```

**Terminal 2 - Frontend:**

```bash
cd Frontend
npm run dev
```

**Access the application:**

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080/api`

### Production Build

**Backend:**

```bash
cd Backend
mvnw clean package
java -jar target/sb-ecom-0.0.1-SNAPSHOT.jar
```

**Frontend:**

```bash
cd Frontend
npm run build
npm run preview
```

---

## 📡 API Documentation

The backend exposes RESTful APIs with the following main endpoints:

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### Products

- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/search?query=keyword` - Search products
- `GET /api/categories` - Get all categories
- `GET /api/products/category/{categoryId}` - Get products by category

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/{itemId}` - Update cart item quantity
- `DELETE /api/cart/items/{itemId}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders

- `GET /api/orders` - Get user's order history
- `POST /api/orders` - Create new order
- `GET /api/orders/{orderId}` - Get order details

### Addresses

- `GET /api/addresses` - Get user's addresses
- `POST /api/addresses` - Add new address
- `PUT /api/addresses/{addressId}` - Update address
- `DELETE /api/addresses/{addressId}` - Delete address

---

## 🗺️ Project Roadmap

### Phase 1: Core Features (Completed)

- [x] User authentication
- [x] Product listing
- [x] Shopping cart
- [x] Checkout flow
- [x] Order management

### Phase 2: Enhancements (In Progress)

- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Payment gateway integration
- [ ] Email notifications

### Phase 3: Advanced Features (Planned)

- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Advanced search filters
- [ ] Recommendation engine
- [ ] Multi-currency support

---

## 📝 Notes

- **JWT Token**: Stored securely in localStorage on the frontend
- **CORS**: Configured to allow frontend requests from `http://localhost:5173`
- **Security**: Spring Security handles all backend authentication and authorization
- **Database**: Configure database connection in `application.properties` before production deployment

---

## 🤝 Contributing

To contribute to this project:

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature-name`
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author & Support

For questions or support, please reach out or check the individual component documentation.

**Happy coding! 🚀**

### Backend

- Java 21
- Spring Boot 4
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT

## Local Setup

### Frontend

```bash
cd Frontend
npm install
npm run dev -- --host 0.0.0.0
```

### Backend

```bash
cd Backend
./mvnw clean test
./mvnw spring-boot:run
```

## Production Notes

- Frontend should be served behind a web server or Vite dev server during development.
- Backend expects PostgreSQL configuration in the application properties.
- For deployment, the frontend and backend should be configured separately and exposed via their own endpoints.

## Repository Status

This repository is organized to keep the application clean, maintainable, and ready for professional GitHub use.
