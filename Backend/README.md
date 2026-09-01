# 🚀 Backend - E-Commerce API

A robust REST API built with Spring Boot for the e-commerce platform, featuring JWT authentication, JPA/Hibernate ORM, and comprehensive business logic.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Database Configuration](#database-configuration)
6. [API Endpoints](#api-endpoints)
7. [Authentication](#authentication)
8. [Architecture](#architecture)
9. [Running & Testing](#running--testing)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The backend provides a complete REST API for the e-commerce platform. It handles:

- User authentication and authorization
- Product management and search
- Shopping cart operations
- Order processing
- Address management
- Payment integration points

**Key Characteristics:**

- 🔐 JWT-based authentication
- 📦 Entity-based ORM with Hibernate/JPA
- 🗃️ PostgreSQL database support
- ✅ Input validation with Spring Validation
- 🛡️ Spring Security for access control
- 📝 Comprehensive error handling

---

## 🛠️ Tech Stack

| Technology      | Version | Purpose                        |
| --------------- | ------- | ------------------------------ |
| Java            | 21      | Programming language           |
| Spring Boot     | 4.0.2   | Web framework                  |
| Spring Security | Latest  | Authentication & Authorization |
| Spring Data JPA | Latest  | ORM & Data access              |
| Hibernate       | Latest  | Object-Relational Mapping      |
| PostgreSQL      | 12+     | Database                       |
| Maven           | 3.8+    | Build management               |
| JUnit           | Latest  | Unit testing                   |
| Mockito         | Latest  | Mocking framework              |

---

## 📁 Project Structure

```
Backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/ecommerce/sb_ecom/
│   │   │       ├── config/                # Application configuration
│   │   │       │   ├── AppConfig.java     # Bean configurations
│   │   │       │   ├── AppConstants.java  # Application constants
│   │   │       │   └── WebMvcConfig.java  # CORS & Web config
│   │   │       │
│   │   │       ├── Controller/            # REST Controllers
│   │   │       │   ├── AddressController.java
│   │   │       │   ├── AuthController.java
│   │   │       │   ├── CartController.java
│   │   │       │   ├── CategoryController.java
│   │   │       │   ├── OrderController.java
│   │   │       │   ├── ProductController.java
│   │   │       │   └── [Other Controllers]
│   │   │       │
│   │   │       ├── exceptions/            # Custom Exceptions
│   │   │       │   ├── ApiException.java
│   │   │       │   ├── ResourceNotFoundException.java
│   │   │       │   ├── BadRequestException.java
│   │   │       │   └── ExceptionHandler.java
│   │   │       │
│   │   │       ├── Model/                 # JPA Entities
│   │   │       │   ├── User.java
│   │   │       │   ├── Product.java
│   │   │       │   ├── Category.java
│   │   │       │   ├── Cart.java
│   │   │       │   ├── Order.java
│   │   │       │   ├── Address.java
│   │   │       │   ├── Payment.java
│   │   │       │   └── [Other Models]
│   │   │       │
│   │   │       ├── payload/              # DTO & Request/Response
│   │   │       │   ├── AddressDTO.java
│   │   │       │   ├── ProductDTO.java
│   │   │       │   ├── OrderDTO.java
│   │   │       │   ├── LoginRequest.java
│   │   │       │   ├── RegisterRequest.java
│   │   │       │   ├── ApiResponse.java
│   │   │       │   └── [Other DTOs]
│   │   │       │
│   │   │       ├── repositories/         # Spring Data Repositories
│   │   │       │   ├── UserRepository.java
│   │   │       │   ├── ProductRepository.java
│   │   │       │   ├── CategoryRepository.java
│   │   │       │   ├── CartRepository.java
│   │   │       │   ├── OrderRepository.java
│   │   │       │   ├── AddressRepository.java
│   │   │       │   └── [Other Repositories]
│   │   │       │
│   │   │       ├── security/             # Security Configuration
│   │   │       │   ├── JwtTokenProvider.java    # JWT token generation
│   │   │       │   ├── JwtAuthFilter.java       # JWT filter
│   │   │       │   ├── SecurityConfig.java      # Security beans
│   │   │       │   ├── CustomUserDetails.java   # User details service
│   │   │       │   └── [Other Security classes]
│   │   │       │
│   │   │       ├── service/              # Business Logic Services
│   │   │       │   ├── UserService.java
│   │   │       │   ├── ProductService.java
│   │   │       │   ├── CartService.java
│   │   │       │   ├── OrderService.java
│   │   │       │   ├── AddressService.java
│   │   │       │   ├── AuthService.java
│   │   │       │   ├── CategoryService.java
│   │   │       │   └── [Other Services]
│   │   │       │
│   │   │       ├── util/                 # Utility Classes
│   │   │       │   ├── AppUtil.java      # General utilities
│   │   │       │   ├── DateUtil.java     # Date/Time utilities
│   │   │       │   ├── ValidationUtil.java # Validation helpers
│   │   │       │   └── Constants.java
│   │   │       │
│   │   │       └── SbEcomApplication.java # Main entry point
│   │   │
│   │   └── resources/
│   │       ├── application.properties      # Development config
│   │       ├── application-prod.properties # Production config
│   │       ├── application-test.properties # Test config
│   │       ├── static/                    # Static resources
│   │       └── templates/                 # Templates (if needed)
│   │
│   └── test/
│       └── java/
│           └── com/ecommerce/sb_ecom/
│               ├── SbEcomApplicationTests.java
│               ├── service/               # Service tests
│               ├── controller/            # Controller tests
│               └── repository/            # Repository tests
│
├── pom.xml                 # Maven dependencies
├── mvnw                    # Maven wrapper (Linux/Mac)
├── mvnw.cmd                # Maven wrapper (Windows)
├── HELP.md                 # Spring Boot help
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 21+**

  ```bash
  java -version  # Verify installation
  ```

- **Maven 3.8+** (or use Maven wrapper)

  ```bash
  mvn -version   # Verify installation
  ```

- **PostgreSQL 12+** (for production, H2 for development)

- **Git**

### Installation Steps

1. **Navigate to Backend directory:**

   ```bash
   cd Backend
   ```

2. **Clean and build project:**

   ```bash
   # Using Maven wrapper (Windows)
   mvnw clean install

   # Or using Maven directly
   mvn clean install
   ```

3. **Configure application properties (optional):**

   Edit `src/main/resources/application.properties`:

   ```properties
   # Server
   server.port=8080

   # Database (H2 for development)
   spring.datasource.url=jdbc:h2:mem:testdb
   spring.datasource.driver-class-name=org.h2.Driver
   spring.h2.console.enabled=true

   # JPA
   spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
   spring.jpa.hibernate.ddl-auto=create-drop
   spring.jpa.show-sql=true

   # JWT
   jwt.secret=your-secret-key-here-change-in-production
   jwt.expiration=86400000

   # Logging
   logging.level.root=INFO
   ```

4. **For PostgreSQL (Production):**

   Edit `src/main/resources/application-prod.properties`:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
   spring.datasource.username=postgres
   spring.datasource.password=your_password
   spring.datasource.driver-class-name=org.postgresql.Driver
   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
   spring.jpa.hibernate.ddl-auto=validate
   ```

---

## 🗃️ Database Configuration

### Development Setup (H2 In-Memory)

Default configuration uses H2 in-memory database (no setup required):

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true
```

Access H2 Console: `http://localhost:8080/h2-console`

### Production Setup (PostgreSQL)

1. **Create PostgreSQL database:**

   ```sql
   CREATE DATABASE ecommerce_db;
   CREATE USER ecommerce_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;
   ```

2. **Update properties file:**

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
   spring.datasource.username=ecommerce_user
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=validate
   ```

3. **Run migrations (if applicable):**
   ```bash
   mvnw flyway:migrate
   ```

### Database Schema

Entities are automatically mapped:

- **User**: User accounts with roles
- **Product**: Product information
- **Category**: Product categories
- **Cart**: Shopping cart items
- **Order**: Customer orders
- **OrderItem**: Items in an order
- **Address**: Saved addresses
- **Payment**: Payment information

---

## 📡 API Endpoints

### Authentication Endpoints

```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
POST   /api/auth/refresh       - Refresh JWT token
GET    /api/auth/profile       - Get current user profile
```

### Product Endpoints

```
GET    /api/products           - Get all products (paginated)
GET    /api/products/{id}      - Get product by ID
GET    /api/products/search    - Search products
GET    /api/categories         - Get all categories
GET    /api/products/category/{categoryId} - Get products by category
```

### Cart Endpoints

```
GET    /api/cart               - Get user's cart
POST   /api/cart/items         - Add item to cart
PUT    /api/cart/items/{id}    - Update item quantity
DELETE /api/cart/items/{id}    - Remove item from cart
DELETE /api/cart/clear         - Clear entire cart
```

### Order Endpoints

```
GET    /api/orders             - Get user's orders
POST   /api/orders             - Create new order
GET    /api/orders/{id}        - Get order details
PUT    /api/orders/{id}/status - Update order status
```

### Address Endpoints

```
GET    /api/addresses          - Get user's addresses
POST   /api/addresses          - Add new address
PUT    /api/addresses/{id}     - Update address
DELETE /api/addresses/{id}     - Delete address
```

### Request/Response Examples

#### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

#### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

#### Response (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER"
  }
}
```

---

## 🔐 Authentication

### JWT Token Implementation

1. **Token Generation:**
   - Generated on successful login
   - Valid for 24 hours (configurable)
   - Stored in user's localStorage on frontend

2. **Token Usage:**

   ```
   Authorization: Bearer <token>
   ```

3. **Token Refresh:**
   - Use refresh endpoint to get new token before expiration
   - Implement token rotation for security

4. **Security:**
   ```properties
   jwt.secret=your-super-secret-key-256-bits-min
   jwt.expiration=86400000  # 24 hours in milliseconds
   ```

### User Roles

- **ADMIN**: Full system access
- **USER**: Regular customer access
- **MODERATOR**: Content moderation access

---

## 🏗️ Architecture

### Layered Architecture

```
┌─────────────────────────┐
│   REST Controllers      │  (Handles HTTP requests)
├─────────────────────────┤
│   Service Layer         │  (Business logic)
├─────────────────────────┤
│   Repository Layer      │  (Data access)
├─────────────────────────┤
│   Entity/Model Layer    │  (JPA entities)
├─────────────────────────┤
│   Database              │  (PostgreSQL/H2)
└─────────────────────────┘
```

### Design Patterns Used

1. **DTO Pattern**: Separate DTOs from entities
2. **Repository Pattern**: Abstract data access
3. **Service Pattern**: Encapsulate business logic
4. **Dependency Injection**: Spring IoC container
5. **Exception Handling**: Global exception handler
6. **Validation**: Bean validation annotations

---

## ▶️ Running & Testing

### Run Application

**Development Mode:**

```bash
# Using Maven wrapper
mvnw spring-boot:run

# Or using Maven
mvn spring-boot:run

# Or run JAR directly
java -jar target/sb-ecom-0.0.1-SNAPSHOT.jar
```

**Production Mode:**

```bash
java -Dspring.profiles.active=prod -jar target/sb-ecom-0.0.1-SNAPSHOT.jar
```

Application starts at: `http://localhost:8080`

### Run Tests

```bash
# Run all tests
mvnw test

# Run specific test class
mvnw test -Dtest=UserServiceTest

# Run tests with coverage
mvnw test jacoco:report
```

### Test Structure

```
src/test/java/
├── service/
│   ├── UserServiceTest.java
│   ├── ProductServiceTest.java
│   └── OrderServiceTest.java
├── controller/
│   ├── AuthControllerTest.java
│   └── ProductControllerTest.java
└── repository/
    └── UserRepositoryTest.java
```

---

## 🛡️ Security Best Practices

1. **Change Default Credentials:**

   ```properties
   jwt.secret=generate-strong-random-key-in-production
   ```

2. **HTTPS Only in Production:**

   ```properties
   server.ssl.enabled=true
   server.ssl.key-store=classpath:keystore.jks
   ```

3. **CORS Configuration:**

   ```java
   // Restrict to frontend domain in production
   allowed.origins=https://yourdomain.com
   ```

4. **Database Connection:**
   - Use environment variables for credentials
   - Never commit credentials in code
   - Use connection pooling (HikariCP)

5. **Logging:**
   - Don't log sensitive data (passwords, tokens)
   - Use appropriate log levels per environment

---

## 🔧 Configuration Files

### application.properties (Development)

```properties
# Server
server.port=8080
server.servlet.context-path=/api

# Database
spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true

# JPA
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# Logging
logging.level.root=INFO
logging.level.com.ecommerce=DEBUG
```

### application-prod.properties (Production)

```properties
# Server
server.port=8080
server.servlet.context-path=/api

# Database
spring.datasource.url=jdbc:postgresql://prod-db:5432/ecommerce
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}

# JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Logging
logging.level.root=WARN
```

---

## 📚 Key Dependencies (from pom.xml)

```xml
<!-- Spring Boot Starters -->
spring-boot-starter-web          <!-- REST APIs -->
spring-boot-starter-security     <!-- Security -->
spring-boot-starter-data-jpa     <!-- Database -->
spring-boot-starter-validation   <!-- Validation -->

<!-- Database -->
spring-boot-starter-data-jpa
jakarta.persistence-api

<!-- JWT -->
jjwt (or other JWT library)

<!-- Testing -->
spring-boot-starter-test
junit-jupiter
mockito
```

---

## 🆘 Troubleshooting

### Port 8080 Already in Use

```bash
# Change port in application.properties
server.port=8081

# Or kill process on Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Database Connection Issues

```
Error: jdbc:postgresql://localhost:5432/ecommerce_db

Solution:
1. Verify PostgreSQL is running
2. Check connection string in properties
3. Verify username/password
4. Ensure database exists
```

### Maven Build Failures

```bash
# Clear Maven cache
mvn clean
rm -rf ~/.m2/repository

# Rebuild
mvn clean install -U
```

### JWT Token Errors

- Ensure `jwt.secret` is set in properties
- Check token expiration time
- Verify Authorization header format: `Bearer <token>`

---

## 📝 Notes

- Application uses Spring Boot 4.0.2 (latest)
- Java 21 features can be used
- Entity mappings are automatically created from classes
- All timestamps use UTC timezone
- Use `@Transactional` for multi-step operations

---

## 🔗 Useful Links

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Docs](https://spring.io/projects/spring-security)
- [Spring Data JPA Guide](https://spring.io/projects/spring-data-jpa)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Introduction](https://jwt.io/introduction)

---

**Happy coding! 🚀**
