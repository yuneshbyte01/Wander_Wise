# 🏔️ Wander Wise - Nepal Travel Recommendation App

A modern, AI-powered travel recommendation platform that helps users discover amazing destinations in Nepal based on their preferences, budget, and interests.

## 🌟 Features

- **Smart Recommendations**: AI-powered destination suggestions based on user preferences
- **Personal Wishlist**: Save and manage favorite destinations
- **Advanced Search**: Filter destinations by season, price, and activities
- **User Profiles**: Manage preferences and travel history
- **Responsive Design**: Beautiful UI that works on all devices
- **Secure Authentication**: JWT-based user authentication

## 📁 **Main README.md**

```markdown:README.md```
```
Wander_Wise/
├── backend/ # Spring Boot API
├── frontend/ # React.js Application
└── README.md # This file
```

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6+

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/wander-wise.git
cd wander-wise
```

### 2. Set Up Backend
```bash
cd backend
# Configure database in application.properties
mvn spring-boot:run
```
Backend will run on: http://localhost:8080

### 3. Set Up Frontend
```bash
cd frontend
npm install
npm start
```
Frontend will run on: http://localhost:3000

## 🛠️ Tech Stack

### Backend
- **Spring Boot 3.x** - Main framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database operations
- **MySQL** - Database
- **JWT** - Token-based authentication
- **Maven** - Dependency management

### Frontend
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Fetch API** - HTTP requests

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/{id}` - Get specific destination

### Recommendations
- `GET /api/recommendations/{userId}` - Get personalized recommendations

### Wishlist
- `GET /api/wishlist/{userId}` - Get user's wishlist
- `POST /api/wishlist/{userId}/{destinationId}` - Add to wishlist
- `DELETE /api/wishlist/{userId}/{destinationId}` - Remove from wishlist

### User Profile
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile

## 🔐 Environment Variables

### Backend (.env)
```env
DB_URL=jdbc:mysql://localhost:3306/wanderwise
DB_USERNAME=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8080/api
```

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
mvn clean package
java -jar target/wanderwise-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the build folder to your hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Backend Developer**: [Your Name]
- **Frontend Developer**: [Your Name]
- **UI/UX Designer**: [Your Name]

## 📞 Support

For support, email yuneshtimsina@gmail.com this repository.

---

Made with ❤️ for travelers exploring Nepal

