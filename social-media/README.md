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
- [Testing](#testing)
- [API Keys](#api-keys)
- [Software Requirements](#software-requirements)
- [Styling Tools and Unique Features](#styling-tools-and-unique-features)
- [Screenshots](#screenshots)
- [Credits](#credits)
- [Contributing](#contributing)

**ADMIN CREDENTIALS**
- **USERNAME**: manuelarias@admin.com
- **PASSWORD**: 123456789

**Deployed on:** [www.gourmet-mern.online](www.gourmet-mern.online)
**GitHub Rep.:**[https://github.com/thekain9/social]

**Please create an ENV file with the following information:**

MONGO_URL = 'mongodb+srv://dummyMERN:dummy123456@hyperiondev.zymaetg.mongodb.net/?retryWrites=true&w=majority'
JWT_SECRET = 'difficultstringtoguess'
PORT = 3002

## Getting Started

### Prerequisites
- Node.js: Ensure you have Node.js installed on your system.
- MongoDB: Install and set up a MongoDB database to store user data and posts.

### Installation
1. **Server Setup**
   - Navigate to the server directory.
   - Install server dependencies by running `npm install`.
   - Start the server using `npm start`.
   - Server will run on 'http://localhost:3002'

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

## Testing
To appropriately test the application, you can use the following commands:
- Frontend: Navigate to the client directory and run `npm test`.
- Backend: Navigate to the server directory and run `npm test`.

## API Keys
This application uses API keys for [mention any third-party services that require API keys]. To use these features, follow the instructions in the [API Keys section of the documentation](#api-keys).

## Software Requirements

### User Stories
- As a food blogger, I want to be able to schedule my posts in advance, so I can maintain a consistent online presence and engage with my followers efficiently.
- As a restaurant owner, I want to showcase my daily specials and promotions on the platform, so - I can attract more customers and keep my regulars informed about our offerings.
- As a culinary enthusiast, I want to discover new recipes and cooking techniques shared by other users, so I can enhance my cooking skills and experiment with new dishes.
- As a travel foodie, I want to share my food discoveries from around the world, including photos and reviews, so I can inspire others to explore global cuisines and hidden gems.
- As a health-conscious user, I want to filter posts by dietary preferences (e.g., vegetarian, vegan, gluten-free), so I can easily find recipes and food recommendations that align with my dietary restrictions.

### Functional Requirements
- User Management:
      Registration, login, and profile management.
- Post Sharing and Interaction:
      Creating, liking, and commenting on posts.
- Search and Discovery:
      Search, explore posts, and follow users.
- Admin and Moderation:
      Admin tools and content moderation.
- Recipe Sharing:
      Structured recipe sharing and rating.

### Non-Functional Requirements
- Usability: The application is designed to be user-friendly.
- Reliability: The system is operational at least 90% of the time.
- Performance: The application is fast and responsive.
- Security: The system protects user data from exposure.

## Styling Tools and Unique Features
FoodieSocial uses Material-UI for its user interface. The application is designed for [mention target users, e.g., food enthusiasts], and it stands out from competitors through a powerful recipe-sharing platform.

## Credits
- A course from Pedro Machado (@PedroTechnologies) on YouTube.]

## Contributing
We welcome contributions from the community. To contribute to this project, follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Create a pull request with a clear description of your changes.

Please feel free to reach out if you have any questions or need further assistance with this project.
