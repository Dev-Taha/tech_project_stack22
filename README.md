
# **Full-Stack Authentication and Role-Based Access Control**

This repository contains a **full-stack project** with a React frontend and a Spring Boot backend. The project implements **user authentication**, **role-based access control**, and **exception handling** with secure JWT integration.

---

## **Table of Contents**
- [Project Features](#project-features)
- [Tech Stack](#tech-stack)
- [Backend Features](#backend-features)
- [Frontend Features](#frontend-features)
- [Setup Instructions](#setup-instructions)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

---

## **Project Features**
- User authentication with **JWT tokens**.
- Role-based access control for users with specific permissions.
- Integration with **MySQL** database for secure data storage.
- Modular code structure with best practices for both backend and frontend.
- Responsive user interface for seamless user experience.

---

## **Tech Stack**

### **Backend**
- Language: **Java**
- Framework: **Spring Boot**
- Database: **MySQL**
- Security: **Spring Security**, **JWT**
- Build Tool: **Maven**

### **Frontend**
- Library: **React**
- Styling: **CSS/Material-UI**
- Icons: **React-Icons**

---

## **Backend Features**
- **User Authentication**: Secure login and registration using **JWT**.
- **Role Management**: Different user roles (e.g., Admin, User) with specific permissions.
- **Token Management**: Supports token refresh functionality for seamless user sessions.
- **Database**: User and role data stored in **MySQL**.
- **Exception Handling**: Comprehensive error handling for robust APIs.

### API Endpoints
- **User Endpoints**:
  - `POST /api/auth/register` - Register a new user.
  - `POST /api/auth/login` - Authenticate and retrieve a JWT token.
  - `POST /api/auth/refresh-token` - Generate a new token after expiry.
- **Role Management Endpoints**:
  - `GET /api/roles` - Fetch all roles.
  - `POST /api/roles` - Add a new role.

---

## **Frontend Features**
- **User-Friendly Interface**:
  - Login and signup forms with validation.
  - Role-based access features for users and admins.
- **Dynamic Components**: Built with reusable and modular React components.
- **Error Handling**: User-friendly error messages for failed actions.

---

## **Setup Instructions**

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/Dev-Taha/tech_project2.git
   cd tech_project2/back-end
   ```
2. Configure the database:
   - Update `application.properties` with your **MySQL** credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```
3. Build and run the project:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd tech_project2/front-end
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## **Future Improvements**
- Add **unit tests** and **integration tests** for APIs.
- Migrate to **PostgreSQL** or **MongoDB** for additional database flexibility.
- Add advanced features like **OAuth2 integration** and **email verification**.

---

## **Contributing**
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **Dev.Taha**
- [linkedIn profile](#www.linkedin.com/in/taha-al-shorafa-82676018a)


