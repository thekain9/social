import mongoose from "mongoose";
// Create an array of unique ObjectId instances for user IDs, I created 8 just to start with, 
//the social media has some dummy users. 
const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

// Define an array of user objects
export const users = [
  {
    _id: userIds[0],
    firstName: "Mark",
    lastName: "Smith",
    email: "mark_smith@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    friends: [],
    location: "London, UK",
    occupation: "Broker",
    viewedProfile: 14561,
    impressions: 888822,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Juan",
    lastName: "Ruiz",
    email: "juan_ruiz@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    friends: [],
    location: "London, UK",
    occupation: "Chef",
    viewedProfile: 12351,
    impressions: 55555,
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Clara",
    lastName: "Arias",
    email: "claras@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    friends: [],
    location: "Berlin, Germany",
    occupation: "Data Scientist",
    viewedProfile: 45468,
    impressions: 19986,
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Dylan",
    lastName: "Mooney",
    email: "whatchadoing@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p6.jpeg",
    friends: [],
    location: "Cork, Ireland",
    occupation: "Teacher",
    viewedProfile: 41024,
    impressions: 55316,
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Luis",
    lastName: "Fernandez",
    email: "luisfer@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p5.jpeg",
    friends: [],
    location: "Barcelona, Spain",
    occupation: "Designer",
    viewedProfile: 40212,
    impressions: 7758,
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    firstName: "Harvey",
    lastName: "Parker",
    email: "parker.h@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p7.jpeg",
    friends: [],
    location: "Amsterdam, Netherlands",
    occupation: "Journalist",
    viewedProfile: 976,
    impressions: 4658,
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
  {
    _id: userIds[6],
    firstName: "Pedro",
    lastName: "Pereira",
    email: "ppereira@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p8.jpeg",
    friends: [],
    location: "Chicago, IL",
    occupation: "Doctor",
    viewedProfile: 1510,
    impressions: 77579,
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
  },
  {
    _id: userIds[7],
    firstName: "Marie",
    lastName: "Durin",
    email: "durinmarie@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p9.jpeg",
    friends: [],
    location: "Paris, France",
    occupation: "Marketing Executive",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
];


//-------------------------------------------------
export const posts = [
    {
      _id: new mongoose.Types.ObjectId(),
      userId: userIds[1],
      firstName: "Gustav",
      lastName: "Schmidt",
      location: "Berlin, Germany",
      description: "My specialty is traditional German dishes. Love sharing my sauerkraut recipes!",
      picturePath: "post1.jpeg",
      userPicturePath: "p3.jpeg",
      likes: new Map([
        [userIds[0], true],
        [userIds[2], true],
        [userIds[3], true],
        [userIds[4], true],
      ]),
      comments: [
        "That schnitzel recipe was divine!",
        "Would love to know your secret ingredient for the potato salad!",
        "Your bratwurst photo made me so hungry!",
      ],
    },
    {
      _id: new mongoose.Types.ObjectId(),
      userId: userIds[3],
      firstName: "Isabelle",
      lastName: "Moreau",
      location: "Lyon, France",
      description: "French pastry enthusiast! Sharing my macaron adventures.",
      picturePath: "post2.jpeg",
      userPicturePath: "p6.jpeg",
      likes: new Map([
        [userIds[7], true],
        [userIds[4], true],
        [userIds[1], true],
        [userIds[2], true],
      ]),
      comments: [
        "Your croissant folding technique is impeccable.",
        "Could you share the recipe for the chocolate éclairs?",
        "That tart looks heavenly!",
        "Your mille-feuille presentation is on point!",
      ],
    },
    {
      _id: new mongoose.Types.ObjectId(),
      userId: userIds[4],
      firstName: "Lucia",
      lastName: "Bianchi",
      location: "Florence, Italy",
      description: "Avid lover of all things pasta. Sharing my family's age-old Italian recipes.",
      picturePath: "post3.jpeg",
      userPicturePath: "p5.jpeg",
      likes: new Map([
        [userIds[1], true],
        [userIds[6], true],
        [userIds[3], true],
        [userIds[5], true],
      ]),
      comments: [
        "Your spaghetti carbonara is to die for!",
        "I tried your risotto recipe and it was a hit at my dinner party!",
        "The tiramisu was such a treat!",
        "Looking forward to more of your pizza variations.",
      ],
    },
    {
      _id: new mongoose.Types.ObjectId(),
      userId: userIds[5],
      firstName: "Alvaro",
      lastName: "García",
      location: "Barcelona, Spain",
      description: "Exploring the rich tapestry of Spanish cuisine, one tapa at a time.",
      picturePath: "post4.jpeg",
      userPicturePath: "p7.jpeg",
      likes: new Map([
        [userIds[1], true],
        [userIds[6], true],
        [userIds[3], true],
      ]),
      comments: [
        "Your paella looks so authentic!",
        "I've been looking for a good gazpacho recipe. Yours was refreshing!",
        "Churros and chocolate, my favorite!",
        "Can't wait to try the flan recipe you posted.",
      ],
    },
    {
      _id: new mongoose.Types.ObjectId(),
      userId: userIds[6],
      firstName: "Sofia",
      lastName: "Papadopoulos",
      location: "Athens, Greece",
      description: "Journeying through Greek cuisine. Moussaka, baklava, and beyond!",
      picturePath: "post5.jpeg",
      userPicturePath: "p8.jpeg",
      likes: new Map([
        [userIds[1], true],
        [userIds[3], true],
        [userIds[5], true],
        [userIds[7], true],
      ]),
      comments: [
        "I adore your spanakopita recipe!",
        "That baklava was the sweetest thing I've ever tasted.",
        "Loved the flavors in the lamb souvlaki.",
        "Your Greek salad is a summer staple for me now.",
      ],
    },
    {
      _id: new mongoose.Types.ObjectId(),
      userId: userIds[7],
      firstName: "Eva",
      lastName: "Lund",
      location: "Stockholm, Sweden",
      description: "Discovering the comfort of Scandinavian dishes. Warm, hearty, and delightful.",
      picturePath: "post6.jpeg",
      userPicturePath: "p9.jpeg",
      likes: new Map([
        [userIds[1], true],
        [userIds[2], true],
      ]),
      comments: [
        "Your meatball recipe was just like my Swedish grandmother used to make!",
        "The cinnamon buns were a hit at my coffee morning.",
        "I appreciate the vegan twists on traditional dishes.",
        "Looking forward to your take on gravlax.",
      ],
    },
  ];
  