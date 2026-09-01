# 🎯 Quick Reference Guide

Fast lookup for common commands and configurations.

---

## 🚀 Quick Start

### 1. Clone and Navigate

```bash
cd ECommerce
```

### 2. Backend Setup (2 minutes)

```bash
cd Backend
mvnw clean install
mvnw spring-boot:run
# Opens on http://localhost:8080
```

### 3. Frontend Setup (2 minutes)

```bash
cd Frontend
npm install
echo "VITE_API_BASE_URL=http://localhost:8080/api" > .env
npm run dev
# Opens on http://localhost:5173
```

---

## 📍 Project URLs

| Component       | URL                                | Notes                |
| --------------- | ---------------------------------- | -------------------- |
| **Frontend**    | `http://localhost:5173`            | React app            |
| **Backend**     | `http://localhost:8080`            | Spring Boot API      |
| **API Base**    | `http://localhost:8080/api`        | REST endpoints       |
| **H2 Database** | `http://localhost:8080/h2-console` | Dev database browser |

---

## 🛠️ Most Used Commands

### Backend (Java/Maven)

```bash
cd Backend

# Build
mvnw clean install

# Run
mvnw spring-boot:run

# Run tests
mvnw test

# Create JAR
mvnw clean package

# Run JAR
java -jar target/sb-ecom-0.0.1-SNAPSHOT.jar
```

### Frontend (React/Vite)

```bash
cd Frontend

# Install packages
npm install

# Development (live reload)
npm run dev

# Build production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

---

## 📁 Key Project Files

### Backend

| File                                                                 | Purpose             |
| -------------------------------------------------------------------- | ------------------- |
| `Backend/pom.xml`                                                    | Maven dependencies  |
| `Backend/src/main/resources/application.properties`                  | Config (dev)        |
| `Backend/src/main/resources/application-prod.properties`             | Config (production) |
| `Backend/src/main/java/com/ecommerce/sb_ecom/SbEcomApplication.java` | Entry point         |

### Frontend

| File                      | Purpose               |
| ------------------------- | --------------------- |
| `Frontend/package.json`   | npm dependencies      |
| `Frontend/.env`           | Environment variables |
| `Frontend/vite.config.js` | Vite configuration    |
| `Frontend/src/main.jsx`   | Entry point           |

---

## 🔗 API Endpoints

### Authentication

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
```

### Products

```
GET    /api/products
GET    /api/products/{id}
GET    /api/products/search?q=keyword
GET    /api/categories
```

### Cart

```
GET    /api/cart
POST   /api/cart/items
PUT    /api/cart/items/{id}
DELETE /api/cart/items/{id}
```

### Orders

```
GET    /api/orders
POST   /api/orders
GET    /api/orders/{id}
```

### Addresses

```
GET    /api/addresses
POST   /api/addresses
PUT    /api/addresses/{id}
DELETE /api/addresses/{id}
```

---

## 🔑 JWT Authentication

### Flow

1. User logs in → Get JWT token
2. Store token in localStorage
3. Add to request header: `Authorization: Bearer <token>`
4. Backend validates token
5. Return protected resource

### Token Format

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🗄️ Database Setup

### H2 (Development - Default)

- **Type**: In-memory database
- **No setup needed** - runs automatically
- **URL**: `jdbc:h2:mem:testdb`
- **Browser**: http://localhost:8080/h2-console

### PostgreSQL (Production)

**Setup:**

```sql
CREATE DATABASE ecommerce_db;
CREATE USER ecommerce_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;
```

**Configure in `application-prod.properties`:**

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=ecommerce_user
spring.datasource.password=password
```

---

## 🚨 Troubleshooting

### Port Already in Use

**Backend (8080):**

```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8080
kill -9 <PID>
```

**Frontend (5173):**

```bash
npm run dev -- --port 5174
```

### Clear Cache

**Backend:**

```bash
cd Backend
mvnw clean
rm -rf target
```

**Frontend:**

```bash
cd Frontend
rm -rf node_modules package-lock.json
npm install
```

### Database Issues

```bash
# Reset H2 database (dev)
# Just restart backend - H2 recreates automatically

# PostgreSQL connection failed
# Check: username, password, host, port, database name
```

---

## 📦 Dependencies Update

### Backend

```bash
cd Backend
mvnw versions:display-dependency-updates
mvnw versions:use-latest-versions
```

### Frontend

```bash
cd Frontend
npm outdated
npm update
```

---

## 🐛 Debugging

### Backend - IntelliJ IDEA

1. Set breakpoint (click line number)
2. Run with Debug (Shift + F9)
3. Step through code (F10/F11)

### Frontend - Browser DevTools

1. Press F12 to open DevTools
2. Go to Console/Sources tab
3. Set breakpoints and debug

### Redux DevTools

1. Install Redux DevTools browser extension
2. Open DevTools
3. See actions and state changes

---

## 🎨 Styling

### Tailwind CSS Classes

```jsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Flexbox
<div className="flex justify-between items-center">

// Spacing
<div className="p-4 m-2 my-6">

// Colors
<div className="bg-blue-500 text-white">
```

### Material UI

```jsx
import { Button, Card, Dialog } from "@mui/material";

<Button variant="contained" color="primary">
  Click me
</Button>;
```

---

## 🔐 Security Checklist

- [ ] Change JWT secret in production
- [ ] Use HTTPS in production
- [ ] Store credentials in environment variables
- [ ] Don't commit `.env` files
- [ ] Update dependencies regularly
- [ ] Use strong passwords (min 8 chars)
- [ ] Implement rate limiting
- [ ] Add CORS restrictions
- [ ] Validate all inputs
- [ ] Use SQL parameterized queries

---

## 📊 Performance Tips

### Backend

- Use pagination for large datasets
- Add caching with Redis
- Optimize database queries
- Use async processing for heavy tasks
- Monitor application logs

### Frontend

- Lazy load components
- Optimize images
- Code splitting with Vite
- Use React.memo for expensive components
- Minimize bundle size

---

## 🚀 Deployment

### Backend (Spring Boot)

```bash
mvnw clean package
java -jar target/sb-ecom-0.0.1-SNAPSHOT.jar
```

### Frontend (Vite)

```bash
npm run build
# Upload dist/ folder to hosting
```

### Platforms

- **Backend**: Heroku, AWS, DigitalOcean, Railway
- **Frontend**: Vercel, Netlify, GitHub Pages, AWS S3

---

## 📚 Documentation Links

| Resource      | Link                                   |
| ------------- | -------------------------------------- |
| Java          | https://docs.oracle.com/en/java/       |
| Spring Boot   | https://spring.io/projects/spring-boot |
| React         | https://react.dev                      |
| Vite          | https://vitejs.dev                     |
| Tailwind CSS  | https://tailwindcss.com                |
| Material UI   | https://mui.com                        |
| Redux Toolkit | https://redux-toolkit.js.org           |

---

## 💾 Environment Variables

### Frontend (`.env`)

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=E-Commerce
VITE_DEBUG=false
```

### Backend (`.properties`)

```properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.hibernate.ddl-auto=create-drop
jwt.secret=your-secret-key
jwt.expiration=86400000
```

---

## 🎯 Development Workflow

1. **Feature branch**: `git checkout -b feature/feature-name`
2. **Make changes**: Edit code
3. **Test locally**: Run dev servers
4. **Run tests**: `mvnw test` & `npm run test`
5. **Run linter**: `mvnw checkstyle:check` & `npm run lint`
6. **Commit**: `git commit -m "Add feature"`
7. **Push**: `git push origin feature/feature-name`
8. **Create PR**: Open pull request on GitHub

---

## ⚡ VSCode Extensions (Recommended)

- **Extension Pack for Java**
- **Spring Boot Extension Pack**
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Thunder Client** (API testing)
- **GitLens**
- **ESLint**
- **Prettier**

---

**Need more help? Check the detailed README files for each component!**
