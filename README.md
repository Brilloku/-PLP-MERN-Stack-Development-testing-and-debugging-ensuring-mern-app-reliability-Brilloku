# Bug Tracker MERN Application

A full-stack bug tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- Create, read, update, and delete bugs
- Bug status tracking (Open, In Progress, Resolved)
- Responsive React frontend
- RESTful API backend
- MongoDB database
- Comprehensive testing suite
- Error handling and debugging capabilities

## Project Structure

```
mern-bug-tracker/
├── backend/
│   ├── models/
│   │   └── Bug.js
│   ├── routes/
│   │   └── bugs.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── tests/
│   │   ├── unit.test.js
│   │   └── integration.test.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BugForm.js
│   │   │   ├── BugList.js
│   │   │   ├── BugItem.js
│   │   │   └── ErrorBoundary.js
│   │   ├── __tests__/
│   │   │   ├── App.test.js
│   │   │   ├── BugForm.test.js
│   │   │   ├── BugList.test.js
│   │   │   └── BugItem.test.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   ├── package.json
│   └── public/
└── README.md
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd mern-bug-tracker/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/bug-tracker
   PORT=5000
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd mern-bug-tracker/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Testing

### Backend Tests

Run the backend tests:
```bash
cd mern-bug-tracker/backend
npm test
```

### Frontend Tests

Run the frontend tests:
```bash
cd mern-bug-tracker/frontend
npm test
```

## API Endpoints

- `GET /api/bugs` - Get all bugs
- `POST /api/bugs` - Create a new bug
- `PUT /api/bugs/:id` - Update a bug
- `DELETE /api/bugs/:id` - Delete a bug

## Debugging

### Backend Debugging

Use Node.js inspector for server-side debugging:
```bash
cd mern-bug-tracker/backend
node --inspect server.js
```

### Frontend Debugging

Use Chrome DevTools for client-side debugging. Open the browser console to view console logs and debug React components.

### Console Logs

The application includes intentional console logs for debugging purposes:
- Bug form submissions
- API errors
- Component state changes

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - Jest and Supertest for testing
  - CORS for cross-origin requests
  - dotenv for environment variables

- **Frontend:**
  - React
  - Axios for API calls
  - React Testing Library and Jest for testing
  - CSS for styling

## Error Handling

- Express error handling middleware
- React Error Boundaries for client-side error catching
- Validation for bug data
- Graceful error messages in the UI

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
