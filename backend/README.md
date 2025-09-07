# Resource Dumper Backend

## Overview

This is the backend API for the Resource Dumper project, a comprehensive web application designed to help users organize and manage various types of resources including images, PDFs, link collections, and notes.

## Features

- **User Authentication**: Secure registration and login system with JWT-based authentication
- **Resource Management**: API endpoints for creating, retrieving, and deleting resources
- **Section Organization**: API endpoints for creating and managing sections
- **File Storage**: Integration with Cloudinary for cloud-based file storage
- **Database**: MongoDB with Mongoose ODM for data persistence

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework for building the API
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling tool
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **Multer**: File upload handling
- **Cloudinary**: Cloud storage for files

## Project Structure

```
src/
├── configs/
│   ├── cloudinary.js    # Cloudinary configuration
│   └── db.js            # MongoDB connection setup
├── controllers/
│   ├── auth.controller.js     # Authentication logic
│   ├── resource.controller.js # Resource management
│   ├── section.controller.js  # Section management
│   └── user.controller.js     # User profile management
├── middleware/
│   ├── authMiddleware.js      # JWT authentication middleware
│   └── multer.js              # File upload middleware
├── models/
│   ├── resource.model.js      # Resource schemas with discriminators
│   ├── section.model.js       # Section schema
│   └── user.model.js          # User schema
├── routes/
│   ├── auth.route.js          # Authentication routes
│   ├── resource.route.js      # Resource routes
│   ├── section.route.js       # Section routes
│   └── user.route.js          # User routes
├── utils/
│   └── generateToken.js       # JWT token generation
└── server.js                  # Express app setup
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

## Setup and Installation

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

### Installation

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

## Database Models

### User Model

- **name**: String (required)
- **email**: String (required, unique)
- **password**: String (required, hashed)
- **collegeDetails**: Object
  - **collegeName**: String
  - **collegeAddress**: String
  - **universityName**: String
- **lastLogin**: Date

### Section Model

- **owner**: ObjectId (reference to User)
- **title**: String (required)
- **description**: String
- **resources**: Array of ObjectIds (references to Resources)
- **stats**: Object
  - **resourceCount**: Number
  - **storageUsed**: Number
- **visibility**: String (enum: "private", "public")

### Resource Model

Base Resource Schema:
- **owner**: ObjectId (reference to User)
- **section**: ObjectId (reference to Section, optional)
- **title**: String (required)
- **description**: String
- **cloudinary**: Object (for file resources)
  - **publicId**: String
  - **url**: String
  - **secureUrl**: String
  - **format**: String
  - **size**: Number
- **visibility**: String (enum: "private", "public")
- **views**: Number
- **downloads**: Number
- **tags**: Array of Strings

Resource Types (using Mongoose discriminators):
1. **Image**: Additional fields for image-specific metadata
2. **PDF**: Additional fields for PDF-specific metadata
3. **LinkSheet**: Array of links with titles and URLs
4. **Note**: Text content field

## Authentication Flow

1. User registers or logs in
2. Server validates credentials and issues a JWT token
3. Token is stored as an HTTP-only cookie
4. Protected routes check for valid token using the `protect` middleware
5. Token can be sent via cookie or Authorization header (Bearer token)

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.