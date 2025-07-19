# 🌄 WanderWise – Travel Recommendation App (Nepal Edition)

**WanderWise** is a personalized travel recommendation system focused on destinations across Nepal. Built with a modern Spring Boot backend and RESTful APIs, the application allows users to register, log in, and get destination suggestions based on their interests, budget, and travel season preferences.

---

## 🚀 Features

### ✅ Backend Features
- 🌍 RESTful API for travel destinations in Nepal
- 🔍 Personalized recommendations based on user preferences
- 🔐 JWT token-based authentication
- 👤 User registration & profile management
- 🗄️ MySQL database with JPA/Hibernate
- 🛡️ Spring Security integration

### ✅ API Endpoints
- `GET /api/destinations` - Get all destinations
- `GET /api/recommendations/{userId}` - Get personalized recommendations
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `PUT /api/users/{userId}` - Update user preferences
- `GET /api/health` - Health check

---

## 🛠️ Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Backend     | Spring Boot 3.5.3 (Java 17) |
| Database    | MySQL 8.0                   |
| Security    | Spring Security + JWT       |
| ORM         | JPA/Hibernate               |
| Build Tool  | Maven                       |
| API Format  | RESTful JSON APIs           |

---

## 📂 Project Structure

```
wanderwise/
├── backend/              ← Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/yuneshtimsina/wanderwise/
│   │   │   │   ├── controller/         # REST endpoints
│   │   │   │   ├── service/            # Business logic
│   │   │   │   ├── repository/         # JPA interfaces
│   │   │   │   ├── model/              # Entities
│   │   │   │   ├── dto/                # Data Transfer Objects
│   │   │   │   └── security/           # JWT, config, auth
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw
├── frontend/             ← Frontend (to be developed)
├── README.md
└── .gitignore
```

---

## ⚙️ Setup & Run (Backend)

### Prerequisites
- Java 17 or higher
- MySQL 8.0
- Maven (optional, wrapper included)

### 1. Clone Repository
```bash
git clone https://github.com/yuneshbyte01/Wander_Wise.git
cd Wander_Wise
```

### 2. Database Setup
Create a MySQL database:
```sql
CREATE DATABASE wanderwise;
```

### 3. Configure Database
Update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/wanderwise
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 4. Run Backend
```bash
cd backend
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 5. Test API
```bash
# Health check
curl http://localhost:8080/api/health

# Get destinations
curl http://localhost:8080/api/destinations
```

---

## 🔮 Future Enhancements

- ❤️ **Wishlist/Favorites**: Save favorite destinations
- 🧭 **Advanced Search & Filter**: Filter by region, tags, season
- 🧍‍♂️ **Admin Panel**: Manage destinations and users
- 📱 **Mobile App**: React Native or Flutter
- ☁️ **Cloud Deployment**: Deploy to AWS/Azure/GCP
- 🔍 **Elasticsearch**: Advanced search capabilities
- 📊 **Analytics**: User behavior and destination popularity

---

## 🧪 API Testing

### Authentication
```bash
# Register a new user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "interests": "trekking,culture",
    "budget": 50000,
    "preferredSeason": "Spring"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Destinations
```bash
# Get all destinations
curl http://localhost:8080/api/destinations

# Get recommendations (requires auth token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/recommendations/1
```

---

## 🐛 Troubleshooting

### Common Issues
1. **Port 8080 already in use**: Change port in `application.properties`
2. **Database connection failed**: Check MySQL service and credentials
3. **JWT token expired**: Re-login to get new token

### Logs
Check application logs for detailed error messages:
```bash
tail -f backend/logs/application.log
```

---

## 🙋 About Me
- 👤 **Yunesh Timsina**
- 🎓 Backend Developer • Spring Boot Enthusiast
- 🌐 [LinkedIn](https://www.linkedin.com/in/yuneshtimsina/)
- 📧 [GitHub](https://github.com/yuneshbyte01)

---

## 📄 License
This project is for educational & portfolio purposes.

---

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

**Happy Coding! 🚀**

