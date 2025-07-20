# 🏔️ Wander Wise - Backend API

Spring Boot REST API for the Wander Wise travel recommendation platform.

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.6+

### 1. Database Setup
```sql
CREATE DATABASE wanderwise;
USE wanderwise;
```

### 2. Configuration
Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/wanderwise
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=your_jwt_secret_key
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

The API will be available at: http://localhost:8080

## 📁 Project Structure

```
src/main/java/com/yuneshtimsina/wanderwise/
├── controller/           # REST Controllers
│   ├── AuthController.java
│   ├── DestinationController.java
│   ├── RecommendationController.java
│   ├── UserController.java
│   └── WishlistController.java
├── model/               # Entity Classes
│   ├── User.java
│   ├── Destination.java
│   └── WishlistItem.java
├── repository/          # Data Access Layer
│   ├── UserRepository.java
│   ├── DestinationRepository.java
│   └── WishlistRepository.java
├── service/            # Business Logic
│   ├── UserService.java
│   ├── DestinationService.java
│   ├── RecommendationService.java
│   └── WishlistService.java
├── dto/               # Data Transfer Objects
│   ├── UserRequestDTO.java
│   ├── UserResponseDTO.java
│   ├── RecommendationDTO.java
│   └── WishlistResponseDTO.java
├── security/          # Security Configuration
│   ├── SecurityConfig.java
│   ├── JwtUtil.java
│   ├── JwtAuthenticationFilter.java
│   └── CustomUserDetailsService.java
└── WanderwiseApplication.java
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "interests": "hiking, photography",
  "budget": 50000,
  "preferredSeason": "spring"
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response includes JWT token:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "userName": "John Doe"
}
```

##  API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |

### Destinations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/destinations` | Get all destinations |
| GET | `/api/destinations/{id}` | Get specific destination |
| POST | `/api/destinations` | Create destination (ADMIN) |
| PUT | `/api/destinations/{id}` | Update destination (ADMIN) |
| DELETE | `/api/destinations/{id}` | Delete destination (ADMIN) |

### Recommendations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recommendations/{userId}` | Get personalized recommendations |

### Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wishlist/{userId}` | Get user's wishlist |
| POST | `/api/wishlist/{userId}/{destinationId}` | Add to wishlist |
| DELETE | `/api/wishlist/{userId}/{destinationId}` | Remove from wishlist |
| GET | `/api/wishlist/{userId}/check/{destinationId}` | Check wishlist status |
| DELETE | `/api/wishlist/{userId}/clear` | Clear wishlist |

### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/{id}` | Get user profile |
| PUT | `/api/users/{id}` | Update user profile |

## ️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    interests TEXT,
    budget DECIMAL(10,2),
    preferred_season VARCHAR(50),
    role VARCHAR(20) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Destinations Table
```sql
CREATE TABLE destinations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    place VARCHAR(255) NOT NULL,
    description TEXT,
    average_cost DECIMAL(10,2),
    best_season VARCHAR(50),
    tags TEXT,
    image_url VARCHAR(500)
);
```

### Wishlist Items Table
```sql
CREATE TABLE wishlist_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    destination_id BIGINT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (destination_id) REFERENCES destinations(id),
    UNIQUE KEY unique_user_destination (user_id, destination_id)
);
```

##  Configuration

### Application Properties
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/wanderwise
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Configuration
jwt.secret=your_jwt_secret_key_here
jwt.expiration=86400000

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

## 🧪 Testing

### Run Tests
```bash
mvn test
```

### Test Coverage
```bash
mvn jacoco:report
```

## 🚀 Deployment

### Build JAR
```bash
mvn clean package
```

### Run JAR
```bash
java -jar target/wanderwise-0.0.1-SNAPSHOT.jar
```

### Docker Deployment
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/wanderwise-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 🔍 Monitoring

### Health Check
```http
GET /actuator/health
```

### Application Metrics
```http
GET /actuator/metrics
```

## 🛠️ Development

### Code Style
- Follow Java naming conventions
- Use meaningful variable names
- Add proper documentation
- Handle exceptions appropriately

### Best Practices
- Use DTOs for data transfer
- Implement proper validation
- Use transactions where needed
- Follow REST conventions
- Implement proper error handling

## 📞 Support

For backend-specific issues, create an issue in the repository or contact the backend team.

---

Built with Spring Boot ❤️