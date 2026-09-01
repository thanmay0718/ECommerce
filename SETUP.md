# 🚀 Project Setup & Installation Guide

Complete step-by-step guide to get your E-Commerce application running from scratch.

---

## 📋 Prerequisites

### System Requirements

- **Operating System**: Windows, macOS, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: Minimum 5GB free space

### Required Software

1. **Java Development Kit (JDK) 21+**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Verify installation:
     ```bash
     java -version
     javac -version
     ```

2. **Node.js 18+ and npm 9+**
   - Download from: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

3. **Git**
   - Download from: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version
     ```

4. **PostgreSQL 12+** (Optional for development, required for production)
   - Download from: https://www.postgresql.org/download/
   - Or use Docker: `docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

5. **IDE/Editor** (Choose one)
   - Visual Studio Code (recommended)
   - IntelliJ IDEA
   - Eclipse

---

## 🎯 Step 1: Clone/Navigate to Project

### Option A: If cloning from Git

```bash
git clone <repository-url>
cd ECommerce
```

### Option B: If already have the project

```bash
cd path/to/ECommerce
```

---

## ⚙️ Step 2: Backend Setup

### 2.1 Navigate to Backend Directory

```bash
cd Backend
```

### 2.2 Verify Maven Installation

```bash
# Check if Maven wrapper exists
ls mvnw              # Linux/Mac
dir mvnw.cmd         # Windows

# Or check Maven is installed
mvn -version
```

### 2.3 Configure Database (Optional)

**For Development (H2 - In-Memory, No Setup Needed):**
The default configuration already uses H2. No action needed.

**For Production (PostgreSQL):**

1. **Create database and user:**

   ```sql
   CREATE DATABASE ecommerce_db;
   CREATE USER ecommerce_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;
   ```

2. **Edit `src/main/resources/application.properties`:**
   ```properties
   # PostgreSQL configuration
   spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
   spring.datasource.username=ecommerce_user
   spring.datasource.password=your_secure_password
   spring.datasource.driver-class-name=org.postgresql.Driver
   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
   spring.jpa.hibernate.ddl-auto=validate
   ```

### 2.4 Build Backend

**Windows:**

```bash
mvnw clean install
```

**Linux/Mac:**

```bash
./mvnw clean install
```

**Or use Maven directly (if installed):**

```bash
mvn clean install
```

### 2.5 Verify Build

Check that the build was successful. You should see:

```
[INFO] BUILD SUCCESS
```

The JAR file should be created at: `target/sb-ecom-0.0.1-SNAPSHOT.jar`

---

## 🎨 Step 3: Frontend Setup

### 3.1 Navigate to Frontend Directory

```bash
cd ../Frontend
```

### 3.2 Install Dependencies

```bash
npm install
```

This will install all packages from `package.json`. It may take 2-5 minutes.

### 3.3 Create Environment Configuration

Create a `.env` file in the Frontend directory:

```env
# Frontend Environment Variables

# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# App Configuration
VITE_APP_NAME=E-Commerce Store
VITE_APP_VERSION=1.0.0

# Optional: Development configuration
VITE_DEBUG=false
```

### 3.4 Verify Setup

```bash
# Check if all dependencies are installed
npm list

# This should show the installed packages without errors
```

---

## ▶️ Step 4: Run the Application

### Option A: Development Mode (Recommended)

**Terminal 1 - Start Backend:**

```bash
cd Backend

# Windows
mvnw spring-boot:run

# Linux/Mac
./mvnw spring-boot:run

# Or run JAR directly
java -jar target/sb-ecom-0.0.1-SNAPSHOT.jar
```

You should see:

```
Started SbEcomApplication in X.XXX seconds
```

The backend is running on: `http://localhost:8080`

**Terminal 2 - Start Frontend:**

```bash
cd Frontend
npm run dev
```

You should see:

```
VITE v<version> ready in <time> ms

➜  Local:   http://localhost:5173/
```

### Option B: Production Mode

**Build Frontend:**

```bash
cd Frontend
npm run build
```

This creates a production build in the `dist/` folder.

**Run Backend:**

```bash
cd Backend
java -Dspring.profiles.active=prod -jar target/sb-ecom-0.0.1-SNAPSHOT.jar
```

---

## ✅ Step 5: Verify Installation

### Check Backend

1. Open browser and go to: `http://localhost:8080/api`
2. Or use curl:
   ```bash
   curl http://localhost:8080/api
   ```

### Check Frontend

1. Open browser and go to: `http://localhost:5173`
2. You should see the e-commerce home page

### Check H2 Console (Development Only)

If using H2 database:

- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (leave empty)

---

## 🧪 Step 6: Test the Application

### Test User Registration

1. Go to `http://localhost:5173`
2. Click "Register"
3. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: Test@123456
4. Click "Register"

### Test User Login

1. Go to Login page
2. Enter credentials:
   - Email: john@example.com
   - Password: Test@123456
3. Click "Login"

### Test Shopping

1. Browse products
2. Add items to cart
3. Proceed to checkout
4. Add/select address
5. Review order
6. Place order

---

## 🛑 Step 7: Troubleshooting

### Backend Won't Start

**Problem**: Port 8080 is already in use

```bash
# Windows: Find and kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac: Find and kill process
lsof -i :8080
kill -9 <PID>

# Alternative: Change port in application.properties
server.port=8081
```

**Problem**: Java not found

```bash
# Verify Java installation
java -version

# Set JAVA_HOME if needed
# Windows: set JAVA_HOME=C:\Program Files\Java\jdk-21
# Linux/Mac: export JAVA_HOME=/usr/libexec/java_home -v 21
```

### Frontend Won't Start

**Problem**: Port 5173 already in use

```bash
# Use different port
npm run dev -- --port 5174
```

**Problem**: npm install failed

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Database Connection Issues

**Problem**: Cannot connect to PostgreSQL

```bash
# Check PostgreSQL is running
# Windows: Check services
# Linux: sudo service postgresql status
# Mac: brew services list

# Verify connection string
# Default: jdbc:postgresql://localhost:5432/ecommerce_db
# Check username and password
```

**Problem**: H2 database issues

```bash
# Clear H2 data
# Delete the database file (usually in user home directory)
# Restart the application
```

### API Connection Issues

**Problem**: Frontend cannot reach backend API

1. Verify backend is running on `http://localhost:8080`
2. Check `.env` file has correct API URL
3. Check CORS settings in backend
4. Check browser console for errors (F12)

---

## 📁 Project Directory Structure After Setup

```
ECommerce/
├── Backend/
│   ├── src/
│   ├── target/                    # Built files (created after mvn install)
│   ├── pom.xml
│   └── README.md
│
├── Frontend/
│   ├── src/
│   ├── node_modules/              # Dependencies (created after npm install)
│   ├── dist/                      # Production build (created after npm run build)
│   ├── .env                       # Environment config (create this)
│   ├── package.json
│   └── README.md
│
├── README.md
└── SETUP.md                       # This file
```

---

## 🔧 Essential Commands Reference

### Backend Commands

```bash
cd Backend

# Build project
mvnw clean install

# Run application
mvnw spring-boot:run

# Run tests
mvnw test

# Build JAR
mvnw clean package

# Run JAR
java -jar target/sb-ecom-0.0.1-SNAPSHOT.jar
```

### Frontend Commands

```bash
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Fix linter issues
npm run lint -- --fix
```

---

## 🌐 Access URLs

Once everything is running:

| Service     | URL                                         | Purpose                           |
| ----------- | ------------------------------------------- | --------------------------------- |
| Frontend    | `http://localhost:5173`                     | E-commerce UI                     |
| Backend API | `http://localhost:8080/api`                 | REST API                          |
| H2 Console  | `http://localhost:8080/h2-console`          | Database browser (dev only)       |
| Swagger UI  | `http://localhost:8080/api/swagger-ui.html` | API documentation (if configured) |

---

## 💡 Tips & Best Practices

1. **Use Environment Variables**: Store sensitive data (passwords, API keys) in `.env` files, not in code
2. **Keep Dependencies Updated**: Regularly run `npm update` and `mvn versions:display-dependency-updates`
3. **Version Control**: Use `.gitignore` to exclude build artifacts and node_modules
4. **Database Backups**: Before updating schema, backup your database
5. **Code Quality**: Run linter and tests before committing
6. **Documentation**: Keep README files updated with changes
7. **Security**: Never commit `.env` files with real credentials

---

## 📝 Next Steps

After successful setup:

1. **Explore the codebase** - Read component and service files
2. **Modify styling** - Customize colors and fonts in Tailwind/Material UI
3. **Add features** - Implement new functionality following existing patterns
4. **Deploy** - Deploy to cloud platforms (Vercel, Heroku, AWS, etc.)
5. **Monitor** - Set up logging and monitoring for production

---

## 🆘 Need Help?

### Check These Resources

1. **Backend Documentation**: See `Backend/README.md`
2. **Frontend Documentation**: See `Frontend/README.md`
3. **Main README**: See `README.md`
4. **Java/Spring Boot**: https://spring.io/projects/spring-boot
5. **React/Vite**: https://react.dev and https://vitejs.dev

### Common Issues

- **Build fails**: Make sure JDK 21+ is installed
- **Port conflicts**: Change port in configuration
- **Dependencies fail**: Clear cache and reinstall
- **API errors**: Check backend logs with increased logging

---

## ✨ You're All Set!

Congratulations! Your E-Commerce application is now ready to use. Start developing and enjoy building amazing features! 🎉

**Happy coding! 🚀**
