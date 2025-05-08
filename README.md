# Furniture Marketplace Mobile App

A React Native mobile application for buying and selling furniture items. This app provides a seamless platform for users to list their furniture items, browse listings, and manage their marketplace activities.

## Features

- 🔐 User Authentication
  - Email/Password signup and login
  - Secure session management
  - User profile management

- 🏠 Home Screen
  - Browse furniture listings
  - Category-based filtering
  - Popular items section

- 📝 Listing Management
  - Create new listings with images
  - Set prices and descriptions
  - Manage active listings
  - Delete listings

- ❤️ Favorites
  - Save favorite listings
  - Quick access to saved items
  - Remove items from favorites

- 👤 User Profile
  - View and edit personal information
  - Manage listings
  - Access settings
  - View account details

## Tech Stack

### Frontend
- **Frontend Framework**: React Native
- **Navigation**: React Navigation
- **State Management**: React Context
- **API Communication**: Axios
- **Icons**: Expo Vector Icons
- **Image Handling**: Expo Image Picker

### Backend
- **Runtime**: Node.js with Express
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Image Processing**: Sharp
- **API Documentation**: Express Router

## Project Structure

```
├── client/                 # Frontend React Native app
│   ├── assets/            # Static assets like images
│   ├── screens/           # Screen components
│   ├── context/           # Context providers
│   ├── utils/             # Utility functions
│   └── App.tsx           # Root component
│
└── backend/               # Backend Express server
    ├── src/
    │   ├── controllers/   # Route controllers
    │   ├── routes/        # API routes
    │   ├── utils/         # Utility functions
    │   ├── types/        # Types used for data throughout the backend
    │   └── index.ts      # Server entry point
    └── package.json
```

## Backend API Documentation

### Authentication
All endpoints require authentication via Bearer token in the Authorization header.

### Listings Endpoints

#### GET /listings
- Returns all listings
- Requires authentication
- Response: Array of listing objects

#### GET /listings/listing/:id
- Returns a specific listing by ID
- Requires authentication
- Response: Single listing object

#### POST /listings
- Creates a new listing
- Requires authentication
- Multipart form data with:
  - file: Image file (max 5MB)
  - title: String
  - description: String
  - price: Number
  - category: String
- Response: Created listing object

#### PUT /listings/listing/:id
- Updates an existing listing
- Requires authentication
- Body: Listing update data
- Response: Updated listing object

#### DELETE /listings/listing/:id
- Deletes a listing
- Requires authentication
- Response: Success message

### User Listings

#### GET /listings/user
- Returns all listings created by the authenticated user
- Requires authentication
- Response: Array of listing objects

### Favorites

#### GET /listings/favorites
- Returns all favorite listings for the authenticated user
- Requires authentication
- Response: Array of listing objects

#### POST /listings/favorites/:id
- Adds a listing to favorites
- Requires authentication
- Response: Created favorite object

#### DELETE /listings/favorites/:id
- Removes a listing from favorites
- Requires authentication
- Response: Success message

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native development environment setup
- Expo CLI
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:

Create a `.env` file in the backend directory:
```
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create a `.env` file in the client directory:
```
API_URL=your_api_url_here
```

5. Start the backend server:
```bash
cd backend
npm start
```

6. Start the frontend development server:
```bash
cd client
npm start
```

7. Run on your preferred platform:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

