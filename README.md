# Notes REST API

## 📌 Description

Notes REST API is a backend Express application for working with a notes collection.  
The project provides REST API endpoints for creating, reading, updating, deleting, filtering, sorting, and paginating notes.

The application uses a real MongoDB database connected through Mongoose.  
It also includes user authentication, password reset via email, avatar image upload, request validation, logging, and centralized error handling.

## 🚀 Deployed App

[View Deployed App](https://nodejs-hw-5-b1zc.onrender.com/)

## 🛠 Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- pino-http
- Celebrate
- Nodemailer
- Brevo SMTP
- Multer
- Cloudinary
- REST API
- Authentication

## ✨ Features

- Create notes
- Get all notes
- Get one note by ID
- Update notes
- Delete notes
- Filter notes
- Sort notes
- Pagination
- User registration and login
- Authentication
- Password reset via email
- Email sending with Nodemailer and Brevo SMTP
- Avatar image upload
- Image storage with Cloudinary
- File handling with Multer
- Request validation with Celebrate
- Logging with pino-http
- Centralized error handling
- MongoDB connection with Mongoose

## 📦 Installation

```bash
git clone https://github.com/AndriiT888/nodejs-hw.git
cd nodejs-hw
npm install
npm run dev


🔐 Environment Variables

Create a .env file in the root directory and add the required environment variables.
PORT=3000
MONGODB_USER=your_mongodb_user
MONGODB_PASSWORD=your_mongodb_password
MONGODB_URL=your_mongodb_url
MONGODB_DB=your_database_name
JWT_SECRET=your_jwt_secret

SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
SMTP_FROM=your_sender_email

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


👤 Author

Created by AndriiT888
