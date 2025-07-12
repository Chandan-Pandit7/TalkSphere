%Chat App%

- BackEnd Part

This is the backend authentication service for the Chat App. It provides endpoints for user sign-up, login, logout, password recovery, and profile updates.
The application uses JWT for secure authentication and authorization.

    🚀 Features

    ✅ User Authentication (Signup, Login, Logout)

    ✅ JWT-based Route Protection

    ✅ Password Recovery

    ✅ Profile Update with Cloudinary Image Upload

    ✅ Real-time Chat with Socket.io

    ✅ Modular Controller and Route Handling
    
   🧰 Tech Stack

    Backend: Node.js, Express.js

    Real-time: Socket.io

    Auth: JWT (JSON Web Tokens)

    Database: MongoDB + Mongoose

    Cloud: Cloudinary (for profile image upload)

    Environment: dotenv for config
    
    
project-root/
│
├── controllers/
│   ├── auth.controller.js        # Auth logic (signup, login, etc.)
│   └── message.controller.js     # Message logic (send/receive)
│
├── middlewares/
│   └── verifyJWT.middleware.js   # JWT verification middleware
│
├── routes/
│   ├── auth.routes.js            # Authentication routes
│   └── user.routes.js             # User Routes
│
├── models/
│   ├── message.model.js          # Message schema/model
│   └── user.model.js             # User schema/model 
│
├── utils/
│   ├── cloudinary.js             # Cloudinary config/upload helper
│   ├── generateToken.js          # JWT token generation
│   └── socket.js                 # Socket.io event handlers
│
├── index.js                      # App entry point (server, DB, socket init)
├── package.json
└── README.md                     

⚙️ Environment Variables

Create a .env file in the root:
PORT=4444
CORS_ORIGINS="http://localhost:5173"
DB_PATH="mongodb://127.0.0.1:27017"
DB_NAME="chatDB"
CLOUD_NAME='dm1cq6pgg'
CLOUD_API_KEY='637475614991124'
CLOUD_API_SECRET="gQPgaBXIHy2cHdyYDTf09JsWcWc"
JWT_SECRET_KEY="Anasduuasdkbkjbbabd badbadbadb_asdaww0122324sdasawdwrqnd"

🔐 Detailed Auth API Routes Documentation
1. User Signup

    Route: POST /signup

    Description: Registers a new user in the system.

    Request Body (JSON):
   {
      "username": "john_doe",
      "email": "john@example.com",
      "password": "strongpassword123"
    }
   
   Response (Success):
   {
      "message": "User registered successfully",
      "user": {
       "_id": "...",
        "username": "john_doe",
        "email": "john@example.com"
          },
      "token": "jwt_token_here"
   }

   2. User Login

    Route: POST /login

    Description: Authenticates user and returns JWT token.

    Request Body (JSON):
   {
      "email": "john@example.com",
      "password": "strongpassword123"
    }
   Response (Success):
   {
      "message": "Login successful",
      "token": "jwt_token_here",
      "user": {
        "_id": "...",
        "username": "john_doe",
        "email": "john@example.com"
          }
    }
   3. User Logout

    Route: POST /logout

    Description: Logs the user out by clearing or invalidating the token (implementation dependent).

    Request Body: (May or may not include token, based on how logout is implemented)

    Response:
   {
      "message": "Logout successful"
    }
4. Forgot Password

    Route: POST /forgot-password

    Description: Initiates password reset flow (usually via email).

    Request Body:
   {
      "email": "john@example.com"
    }
   Response:
   {
      "message": "Password reset link sent to your email"
    }
   
   5. JWT Token Check (Verify Auth)

    Route: GET /check

    Middleware: verifyjwt

    Description: Verifies if the user's JWT token is valid and returns user info.

    {
      "authenticated": true,
      "user": {
        "_id": "...",
        "username": "john_doe",
        "email": "john@example.com"
          }
    }







   



    
