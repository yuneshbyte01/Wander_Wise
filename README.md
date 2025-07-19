# 🌄 WanderWise – Travel Recommendation App (Nepal Edition)

**WanderWise** is a personalized travel recommendation system focused on destinations across Nepal. Built with a modern RESTful backend and a responsive frontend, the application allows users to register, log in, and get destination suggestions based on their interests, budget, and travel season preferences.

---

## 🚀 Features

### ✅ General
- 🌍 Explore beautiful travel destinations in Nepal
- 🔍 Personalized recommendations based on user preferences
- 🖼️ Destination images (with Unsplash integration or direct URLs)
- 🌗 Dark mode toggle
- 🌐 Fully browser-based frontend (HTML/CSS/JS)

### ✅ Authentication
- 👤 User registration & login
- 🔐 JWT token-based authentication
- 🔓 Public vs protected route control
- 🚪 Logout functionality

### ✅ User Features
- ✏️ Update travel preferences (interests, budget, preferred season)
- 🧠 Get personalized destination suggestions
- 📜 View destination details
- 📷 View featured images

---

## 🛠️ Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Backend     | Spring Boot (Java)          |
| Database    | MySQL                       |
| Frontend    | HTML + CSS + JavaScript     |
| Security    | Spring Security + JWT       |
| Data Format | RESTful JSON APIs           |
| Build Tool  | Maven                       |

---

## 📂 Project Structure

```bash
├── src/
│   ├── main/
│   │   ├── java/com/yuneshtimsina/wanderwise/
│   │   │   ├── controller/         # REST endpoints
│   │   │   ├── service/            # Business logic
│   │   │   ├── repository/         # JPA interfaces
│   │   │   ├── model/              # Entities
│   │   │   └── security/           # JWT, config
│   │   └── resources/
│   │       ├── static/             # Frontend files
│   │       └── application.properties
└── README.md
```

---

## 🔮 Future Advancements

The following enhancements are planned for the next phase:

- ❤️ **Wishlist/Favorites**: Let users save destinations they love for later viewing.
- 🧭 **Search & Filter**: Allow filtering destinations by region, tags, or season.
- 🧍‍♂️ **Admin Panel (Basic)**: Admin-only interface to add/edit destinations and manage users.
- ☁️ **Deployment to Cloud**: Host the project publicly on Render or Railway for live access.

---

## ⚙️ Setup & Run (Local)

### 1. Clone Repository
```bash
git clone https://github.com/your-username/wanderwise.git
cd wanderwise
```

### 2. MySQL setup
Create a MySQL database:
```bash
CREATE DATABASE wanderwise_db;
```
Update your ```application.properties```:
```bash
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/wanderwise_db
    username: youruser
    password: yourpassword
```

### 3. Run the app
```bash
./mvnw spring-boot:run
```
Visit: ```http://localhost:8080/index.html```

---

## 🙋 About Me
- 👤 Yunesh Timsina
- Backend Developer • Spring Boot Enthusiast
- 📫 Connect with me on [LinkedIn](https://www.linkedin.com/in/yuneshtimsina/)

---

## 📌 License
This project is for educational & internship portfolio purposes.

