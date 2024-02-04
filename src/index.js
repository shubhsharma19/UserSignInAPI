// task 1 = create new endpoint for /signup ✅
// task 2 = make it so users can signup and a new token is generated for them 
// task 3 = make the data save into mongo db
// task 4 = make signin possible with token + make it find users from the db
// task 5 = if user doesnt exist return error 
// task 6 = if user exists return list of users in db
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { z } = require('zod');
const jwtPass = "12345";

const app = express();
const PORT = 3000;
mongoose.connect("mongodb+srv://admin:admin123@cluster0.lhwf1g5.mongodb.net/user_app");

// schema for input validation
const loginInputSchema = z.object({
  body: z.object({
    username: z.string().min(8),
    email: z.string().endsWith('@gmail.com') || 
    z.string().endsWith('.com'),
    password: z.string().min(8),
  }),
});

// mongoose schema
const User = mongoose.model('users', {
 username: String,
 email: String, 
 password: String 
});

// middleware for input validation
const validateUserInput = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body });
    next();
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
}

app.use(express.json(), validateUserInput(loginInputSchema));

// function to find if the user exists
async function userexists (email) {
  const existUser = await db.users.findOne({ email: email });
  return existUser;
}

app.post('/signup', (req, res) => {
  const { userName, email, password} = req.body;

  if (userexists(email)) {
    return res.status(403).json({
      message: "Account already exists, please sign in!",
    });
  } else {
    // create a new user
    const user = new User({
      username: userName,
      email: email,
      password: password,
    });
    // save the user
    user.save().then(() => console.log("Added User!"));
    const token = jwt.sign({ email }, jwtPass);
    // sending token to the user
    return res.status(200).json({
      message: "Signup successful!",
      token,
    });
  }
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!userexists(username, password)) {
    return res.status(403).json({
      message: "Wrong username or password!"
    })
  } else {
    // token creation 
    const token = jwt.sign({ username }, jwtPass);
    // sending token to the user
    return res.status(200).json({
      message: "LoggedIn successfully!",
      token
    });
  }
})

app.get('/users', (req, res) => {
  // getting the token from the user
  const token = req.headers.authorization;
  try {
    // verification of user
    const decoded = jwt.verify(token, jwtPass);
    const username = decoded.username;

    // return list of users other than this user
    const usersList = USERSDATA.filter(user => user.username !== username);
    return res.status(200).json({
      msg: "Welcome back " + req.body.username + "!",
      usersList
    });
  } catch (err) {
    return res.status(403).json({
      msg: "User not found or Invalid token"
    });
  }
})

// global error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    error: "Internal Server Error"
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at 3000`)
});
