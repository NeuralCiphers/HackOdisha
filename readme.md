# Resource Dumper App

## Overview

Resource Dumper is a comprehensive web application designed to help users organize and manage various types of resources including images, PDFs, link collections, and notes. The application provides a structured way to categorize resources into sections, making it easy to store, retrieve, and share educational materials, research papers, reference links, and personal notes.

## Features

- **User Authentication**: Secure registration and login system with JWT-based authentication
- **Resource Management**: Upload, view, and delete different types of resources
  - Images (JPEG, PNG)
  - PDF documents
  - Link collections
  - Text notes
- **Section Organization**: Group related resources into customizable sections
- **Resource Statistics**: Track usage metrics for sections including storage used and resource counts
- **Access Control**: Control visibility of resources with private, public, and shared options
- **Responsive Design**: Fully responsive UI that works on desktop and mobile devices

## Tech Stack

### Backend
- **Node.js & Express**: RESTful API framework
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication and authorization
- **Bcrypt**: Password hashing
- **Multer**: File upload handling
- **Cloudinary**: Cloud storage for files

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **Vite**: Build tool and development server

## Project Structure

### Backend Structure

```
backend/
├── src/
│   ├── configs/
│   │   ├── cloudinary.js    # Cloudinary configuration
│   │   └── db.js            # MongoDB connection setup
│   ├── controllers/
│   │   ├── auth.controller.js     # Authentication logic
│   │   ├── resource.controller.js # Resource management
│   │   ├── section.controller.js  # Section management
│   │   └── user.controller.js     # User profile management
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT authentication middleware
│   │   └── multer.js              # File upload middleware
│   ├── models/
│   │   ├── resource.model.js      # Resource schemas with discriminators
│   │   ├── section.model.js       # Section schema
│   │   └── user.model.js          # User schema
│   ├── routes/
│   │   ├── auth.route.js          # Authentication routes
│   │   ├── resource.route.js      # Resource routes
│   │   ├── section.route.js       # Section routes
│   │   └── user.route.js          # User routes
│   ├── utils/
│   │   └── generateToken.js       # JWT token generation
│   └── server.js                  # Express app setup
├── .env                           # Environment variables
└── package.json                   # Dependencies and scripts
```

### Frontend Structure

```
frontend/
├── src/
│   ├── assets/                    # Static assets
│   ├── components/                 # Reusable UI components
│   │   ├── Footer.jsx             # Footer component
│   │   ├── LinkSheetModal.jsx     # Modal for creating link sheets
│   │   ├── Materials.jsx          # Materials display component
│   │   ├── Navbar.jsx             # Navigation bar component
│   │   ├── NoteModal.jsx          # Modal for creating notes
│   │   ├── ResourceCard.jsx       # Card component for resources
│   │   ├── SectionList.jsx        # Component for displaying sections
│   │   └── SectionModal.jsx       # Modal for creating sections
│   ├── loading/                   # Loading components
│   ├── pages/                     # Page components
│   │   ├── Home.jsx               # Home page
│   │   ├── Login.jsx              # Login/Register page
│   │   └── MyResources.jsx        # User resources page
│   ├── App.jsx                    # Main app component with routing
│   ├── App.css                    # App-specific styles
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Entry point
├── public/                        # Public assets
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies and scripts
```

## API Endpoints

### Authentication

#### Register a new user
- **URL**: `/api/v1/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: User details with JWT cookie

#### Login
- **URL**: `/api/v1/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: User details with JWT cookie

#### Logout
- **URL**: `/api/v1/auth/logout`
- **Method**: `POST`
- **Response**: Success message with cleared cookie

### User Profile

#### Get user profile
- **URL**: `/api/v1/users/me`
- **Method**: `GET`
- **Auth**: Required
- **Response**: User profile details

#### Update user profile
- **URL**: `/api/v1/users/update`
- **Method**: `PUT`
- **Auth**: Required
- **Body**:
  ```json
  {
    "name": "Updated Name",
    "collegeDetails": {
      "collegeName": "Example University",
      "collegeAddress": "123 Campus Drive",
      "universityName": "Example University System"
    }
  }
  ```
- **Response**: Updated user profile

### Sections

#### Create a section
- **URL**: `/api/v1/sections`
- **Method**: `POST`
- **Auth**: Required
- **Body**:
  ```json
  {
    "title": "Study Materials",
    "description": "Collection of study resources"
  }
  ```
- **Response**: Created section details

#### Get all sections
- **URL**: `/api/v1/sections`
- **Method**: `GET`
- **Auth**: Required
- **Response**: List of user's sections with resources

#### Get section by ID
- **URL**: `/api/v1/sections/:id`
- **Method**: `GET`
- **Auth**: Required
- **Response**: Section details with resources

#### Delete section
- **URL**: `/api/v1/sections/:id`
- **Method**: `DELETE`
- **Auth**: Required
- **Response**: Success message

### Resources

#### Create a resource
- **URL**: `/api/v1/resources`
- **Method**: `POST`
- **Auth**: Required
- **Content-Type**: `multipart/form-data`
- **Body**:
  - For Image/PDF:
    ```
    file: [File Upload]
    type: "Image" or "Pdf"
    title: "Resource Title"
    description: "Resource Description"
    sectionId: "section-id" (optional)
    ```
  - For LinkSheet:
    ```
    type: "LinkSheet"
    title: "Link Collection"
    description: "Useful links"
    links: [array of links]
    sectionId: "section-id" (optional)
    ```
  - For Note:
    ```
    type: "Note"
    title: "Note Title"
    description: "Note Description"
    content: "Note content text"
    sectionId: "section-id" (optional)
    ```
- **Response**: Created resource details

#### Get all resources
- **URL**: `/api/v1/resources`
- **Method**: `GET`
- **Auth**: Required
- **Response**: List of user's resources

#### Delete resource
- **URL**: `/api/v1/resources/:id`
- **Method**: `DELETE`
- **Auth**: Required
- **Response**: Success message

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

### Environment Variables
Create a `.env` file in the backend directory with the following variables:

```
PORT=3000
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/
DB_NAME=resource_dumper
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

### Installation and Setup

#### Backend Setup
1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd HO-My-Contributions/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run backend
   ```
5. The server will be running at `http://localhost:3000`

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd HO-My-Contributions/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The frontend will be running at `http://localhost:5173`

## Authentication Flow

1. User registers or logs in
2. Server validates credentials and issues a JWT token
3. Token is stored as an HTTP-only cookie
4. Protected routes check for valid token using the `protect` middleware
5. Token can be sent via cookie or Authorization header (Bearer token)

## Resource Types

The application uses Mongoose discriminators to handle different resource types:

1. **Image**: JPEG/PNG files with metadata
2. **PDF**: PDF documents with metadata
3. **LinkSheet**: Collection of links
4. **Note**: Text-based notes

## File Upload Process

1. Files are temporarily stored using Multer
2. Files are uploaded to Cloudinary
3. Local temporary files are removed
4. Cloudinary URLs and metadata are stored in the database

## Security Features

- Password hashing with bcrypt
- HTTP-only cookies for JWT
- Protected routes with authentication middleware
- File type validation
- File size limits (10MB)

## Frontend Features

- Responsive design with Tailwind CSS
- Client-side routing with React Router
- Resource type-specific rendering
- Modal-based forms for creating resources
- Section-based organization
- Resource visibility controls

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

