const express = require('express');
const router = express.Router()
const User = require('../data/user')
const profileData = require('../data/userprofile')
const firestoreDB = require('../init');

const userCollection = firestoreDB.collection("users")

// register
router.post('/register', async function(req, res) {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), 
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        });
        user.token = token;
        res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

// login
router.post('/login', async function(req, res) {
    // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

// get profile data
router.get('/:userId/profile', async function(req, resp) {
    const userId = req.params.userId
    console.log("UserId: " + userId)
     const responseUser = await userCollection.doc(userId).get()
     console.log(responseUser.data())
    profileData.data.profile = responseUser.data()
    resp.setHeader("Content-Type", "application/json");
    resp.status(200).json(profileData)
})

// get all users
router.get('/allUsers', async function(req, res) {
    try {
        const users = await User.find().exec();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
    }
});

// get user by id
router.get('/:userId', async function(req, res) {
    try {
        const userId = req.params.userId;
        const userDoc = await userCollection.doc(userId).get()
        console.log(userDoc.data())
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(userDoc.data());
    } catch(err) {
        console.log(err);
        res.status(404).json({"message": "User not found"})
    }
})

//save user
router.post('/save', async function(req, res) {
    console.log("Savinng user details: " + req.body.id)
    const user = {
        "id": req.body.id,
        "userId": req.body.userId,
        "name": req.body.name,
        "phoneNumber": req.body.phoneNumber,
        "profileImage": req.body.profileImage,
        "weight": req.body.weight,
        "age": req.body.age
    };
    try {
        // await user.save();
        firestoreDB.collection("users").doc(req.body.id).set(user);
        res.status(200).json({"success": true, "message":"User details saved"});
    } catch (err) {
        console.log(err);
        res.status(400).json({"success": false, "message":"Error in saving user details"});
    }
});

// updated user 
router.post('/update', async function(req, res) {
    console.log("Updating user details: " + req.body.id)
    try {
        const userDoc = await firestoreDB.collection("users").doc(req.body.id).get();
        console.log("Updating doc: " + userDoc.data())
            userDoc.ref.set({
                "userId": req.body.userId,
                "name": req.body.name,
                "phoneNumber": req.body.phoneNumber,
                "profileImage": req.body.profileImage,
                "email": req.body.email,
                "weight": req.body.weight,
                "age": req.body.age
            }, { merge: true })  
        
        res.setHeader("Content-Type", "application/json");
        const responseUser = await userCollection.doc(req.body.id).get()
        console.log(responseUser.data())
        res.status(200).json({"success": true, "data": responseUser.data()});
    } catch(err) {
        console.log(err)   
        res.status(400).json({"success": false, "message":"Error in saving user details"});
    }
});

module.exports = router;