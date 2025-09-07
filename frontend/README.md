# Resource Dumper Frontend

## Overview

This is the frontend application for the Resource Dumper project, a comprehensive web application designed to help users organize and manage various types of resources including images, PDFs, link collections, and notes.

## Features

- **User Authentication**: Login and registration interface
- **Resource Management**: Upload, view, and delete different types of resources
- **Section Organization**: Create and manage sections to organize resources
- **Resource Visibility**: Toggle resource visibility between public and private
- **Responsive Design**: Works on both desktop and mobile devices

## Tech Stack

- **React**: UI library for building the user interface
- **React Router**: For client-side routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: HTTP client for API requests
- **Vite**: Build tool and development server

## Project Structure

```
src/
├── assets/                    # Static assets
├── components/                 # Reusable UI components
│   ├── Footer.jsx             # Footer component
│   ├── LinkSheetModal.jsx     # Modal for creating link sheets
│   ├── Materials.jsx          # Materials display component
│   ├── Navbar.jsx             # Navigation bar component
│   ├── NoteModal.jsx          # Modal for creating notes
│   ├── ResourceCard.jsx       # Card component for resources
│   ├── SectionList.jsx        # Component for displaying sections
│   └── SectionModal.jsx       # Modal for creating sections
├── loading/                   # Loading components
├── pages/                     # Page components
│   ├── Home.jsx               # Home page
│   ├── Login.jsx              # Login/Register page
│   └── MyResources.jsx        # User resources page
├── App.jsx                    # Main app component with routing
├── App.css                    # App-specific styles
├── index.css                  # Global styles
└── main.jsx                   # Entry point
```

## Main Components

### Pages

- **Home.jsx**: Landing page with information about the application
- **Login.jsx**: Handles user authentication (login and registration)
- **MyResources.jsx**: Main dashboard for managing resources and sections

### Components

- **Navbar.jsx**: Navigation bar with links and user profile
- **Footer.jsx**: Page footer with links and information
- **ResourceCard.jsx**: Card component for displaying different resource types
- **SectionList.jsx**: Component for displaying sections and their resources
- **SectionModal.jsx**: Modal for creating and editing sections
- **LinkSheetModal.jsx**: Modal for creating link sheet resources
- **NoteModal.jsx**: Modal for creating note resources

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd HO-My-Contributions/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. The application will be available at `http://localhost:5173`

## Build for Production

To build the application for production, run:

```bash
npm run build
```

This will create a `dist` directory with the compiled assets.

## API Integration

The frontend communicates with the backend API using Axios. The API client is configured in `src/api.js` with the following features:

- Base URL configuration from environment variables
- Automatic inclusion of credentials for authentication
- Error handling middleware
- Organized API methods for different resource types

## Authentication Flow

1. User enters credentials on the Login page
2. Credentials are sent to the backend API
3. On successful authentication, a JWT token is stored as an HTTP-only cookie
4. Protected routes check for valid authentication
5. User profile information is fetched and stored in application state

## Resource Management

The application supports four types of resources:

1. **Images**: Upload and display image files
2. **PDFs**: Upload and display PDF documents
3. **Link Sheets**: Collections of links with titles and descriptions
4. **Notes**: Text-based notes with formatting

Each resource type has its own creation form and display component.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
