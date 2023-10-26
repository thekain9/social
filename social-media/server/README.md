**ADMIN CREDENTIALS 
USERNAME: manuelarias@admin
PASSWORD: 123456789

-----------------------------
Please create a ENV file with the following information:

MONGO_URL = 'mongodb+srv://dummyMERN:dummy123456@hyperiondev.zymaetg.mongodb.net/?retryWrites=true&w=majority'
JWT_SECRET = 'difficultstringtoguess'
PORT = 3002

------------------------------


# FoodieSocial - Share Your Food Adventures 🍔

FoodieSocial is a social media app dedicated to food lovers. It's a platform where users can upload mouthwatering pictures of food, share their culinary adventures, and exchange tips, recipes, and experiences with fellow food enthusiasts. Whether you're a passionate chef, a foodie on the hunt for the best local eats, or simply love sharing your homemade dishes, FoodieSocial is the perfect place to connect with others who share your passion for food.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Using FoodieSocial](#using-foodiesocial)
  - [Signing Up](#signing-up)
  - [Exploring Posts](#exploring-posts)
  - [Creating Your Own Posts](#creating-your-own-posts)
  - [Engaging with the Community](#engaging-with-the-community)
- [Dependencies](#dependencies)

## Getting Started

### Prerequisites
- Node.js: Ensure you have Node.js installed on your system.
- MongoDB: Install and set up a MongoDB database to store user data and posts.

### Installation
1. **Server Setup**
   - Navigate to the server directory.
   - Install server dependencies by running `npm install`.
   - Start the server using `npm start`.
   -Server will run on 'http://localhost:3002'

2. **Client Setup**
   - Navigate to the client directory.
   - Install client dependencies by running `npm install`.
   - Start the client using `npm start`.

3. **Running the Full Stack App**
   - With the server and client running, you can access the app by opening a web browser and visiting `http://localhost:3000`.

## Using FoodieSocial

### Signing Up
1. Create an account: Click the "Sign Up" button and fill in your details.
2. Profile Picture: Add a profile picture to make your account more personal.
3. Explore Posts: Discover exciting food posts from other users.
4. Share Your Creations: Share your culinary creations, recipes, or food adventures with the community.

### Exploring Posts
- **Homepage**: After logging in, you'll land on the homepage, where you can explore a feed of food posts from other users.
- **Interact**: Like, comment, and save posts to your collection.
- **Search**: Use the search feature to discover specific dishes, users, or locations.

### Creating Your Own Posts
- **Click**: Click the "Create Post" button to share your culinary masterpiece.
- **Upload**: Upload a photo of your food creation.
- **Description**: Add a description or recipe, and share your thoughts.
- **Post**: Click "POST" to share your food journey with the community.

### Engaging with the Community
- **Connect**: Follow other users and engage in conversations.
- **Like & Comment**: Show appreciation for posts by liking and commenting.
- **Save**: Save posts you want to revisit in the future.

## Dependencies

### Server
- Express.js: Web framework
- MongoDB: Database for user data and posts
- Multer: Middleware for file uploads
- JWT: Authentication
- Helmet: Security headers
- and more...

### Client
- React: Front-end library
- Material-UI: UI components
- React Router: Routing
- Redux Toolkit: State management
- Yup and Formik: Form handling
- and more...

