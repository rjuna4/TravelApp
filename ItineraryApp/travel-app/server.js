const { application } = require('express')
const express = require('express')
const app = express()
const port = 8082
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
//const User = require('../model/user.js')
//const userGroupsCreated = require('ItineraryApp/travel-app/models/groupsCreatedModel.js')
const bcrypt = require('bcryptjs')
const http = require('http')
const url = require('url')
const fs = require("fs")
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'epiurfgiwfbjw!@#^&&*%%dsfiuwqopqsm'
const querystring = require('querystring');
//import UserGroupsCreated from 'groupsCreatedModel'


  const userSchema = mongoose.Schema({
      fullName: {type: String, required: true, unique: false},
      emailAddress: {type: String, required: true, unique: true},
      username: {type: String, required: true, unique: true},
      password: {type: String},
      confirmPassword: {type: String}
  },
  { collection: 'User_Accounts'} 
  )
  
  const userModel = mongoose.model('UserSchema', userSchema)
  
  module.exports = userModel

  //mongodb://localhost:27017/travelitineraryaccounts

const morgan = require('morgan');
app.use(morgan('combined'));

mongoose.connect('mongodb+srv://PragyaK:772492@travelitineraryaccounts.yalqnry.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true
}, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("Successfully connected to database")
    }
})

app.get('/', (req, res) => {
    res.send("Hello World");
})


app.get('/hello', (req, res) => {
  res.send('Hi!')
}) 


app.get('/api/login', (req, res) => {
    res.send('This is the login page for GET requests');
  });



app.use(bodyParser.json())



app.post('/api/signup', async (req, res) => {
    console.log(req.body)
    //formData(req.body);
    
    const { fullName, emailAddress, username, password: plainTextPassword, confirmPassword } = req.body

    console.log("plain text password: " + plainTextPassword);
    console.log("confirm password: " + confirmPassword);

    // validates full name
    if (!fullName || typeof fullName !== 'string') {
        return res.json( {status: 'error', error: 'Invalid name'})
    }

    // validates username
    if (!username || typeof username !== 'string') {
        return res.json( {status: 'error', error: 'Invalid username'} )
    }

    // validates email address
    if (!emailAddress || typeof emailAddress !== 'string' || !emailAddress.includes('@')) {
        return res.json( {status: 'error', error: 'Invalid email address'} )
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json( { status: 'error', error: 'Invalid password'} )
    }

    if (plainTextPassword.length < 7) {
        return res.json( { status: 'error', error: 'Password is too short. Must be between 7-15 characters.'} )
    }

    if (plainTextPassword.length > 15) {
        return res.json( { status: 'error', error: 'Password is too long. Must be between 7-15 characters.'} )
    }

    if (plainTextPassword !== confirmPassword) {
        return res.json( { status: 'error', error: 'Passwords do not match.'})
    }

    
    const encryptedPassword = await bcrypt.hash(plainTextPassword, 10)
    console.log("encryptedPassword: " + encryptedPassword);


    const user = new userModel(req.body);
    const userId = user._id
    console.log("userId1: " + userId)
    try {
        /*
        const response = await 
        .create({
            fullName,
            emailAddress,
            username,
            plainTextPassword
        }) */
        await user.save();
        console.log("userId2: " + userId)

       // user = await userModel.findOne();
        console.log("user ", user)
        console.log("User saved successfully: ", res)
        console.log("response: " + res)

        const responseData = {
            user_id : userId
        }

        // const jsonContent = JSON.stringify(responseData)
    
        return res.json(responseData)

    } catch(error) {
        // duplicate key
        if (error.code === 11000) {
            return res.json( {status: 'error', error: 'Username or email address already in use' })
        }
        console.log("error: " + error)
        throw error
        
    }
})    

app.post('/api/login', async (req, res) => {
    console.log('inside login method')
    const { username, password } = req.body
    console.log('username: ', username)
    console.log('password: ', password)

try {
    const user = await userModel.findOne({ username, password }).lean()

    console.log('User found in the database:', user);

    if(!user) {
        return res.json({ status: "error", error: "Invalid username/password" })
    }
    console.log("test1")
    if(bcrypt.compare(password, user.password)) {
        // the username password combo is successful
        const payload = {
            id: user._id,
            username: user.username
        };

        console.log("JWT_SECRET in /api/login: ", JWT_SECRET);
        const token = jwt.sign(payload, JWT_SECRET);

        console.log("token: ", token)
        return res.json({ status: "ok", data: token, user_id: user._id })
    }
    console.log('Invalid username/password');
    res.json({ status: "error", data: "Invalid username/password" }) 
    } catch (error) {
    console.log("error", error)
    throw error
    }
    console.log("test2")
    res.json({status: "ok"})
})

function authenticateJWT(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log("JWT_SECRET in authenticateJWT: ", JWT_SECRET);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log("403 error: ", err);
            return res.status(403).json({ message: 'Forbidden'})
        }
        
        req.user = user
        next();
    })
}

app.use(authenticateJWT);


    



const userBookmarkSchema = mongoose.Schema({
    userId: {type: String, required: true, unique: false},
    title: {type: String, required: true},
    imageURL: {type: String, required: true}
},
{ collection: 'App_User_Bookmarks'} 
)


const bookmarkModel = mongoose.model('UserBookmark', userBookmarkSchema)
  
module.exports = bookmarkModel

app.post('/app/api/bookmarks', async (req, res) => {
    console.log('inside backend bookmark method');
    const { userId, title, imageURL} = req.body

    console.log("request body: ", req.body)

    console.log("userId: ", userId)
    console.log("title: ", title)
    console.log("imageURL: ", imageURL)
    
    if (!imageURL || !title || typeof title != 'string' || typeof imageURL != 'string' || !userId || typeof userId != 'string' ) {
        return res.json( { status: 'error', error: 'Invalid or empty data'})
    }

    const bookmark = new bookmarkModel(req.body);
    try {
        await bookmark.save();
        console.log("Bookmark saved successfully: ", res)
        console.log("response: " + res)
    } catch(error) {
        if (error.code === 11000) {
            return res.json( {status: 'error', error: 'Activity is already saved in bookmarks' })
        }
        console.log("error: " + error)
        throw error
        
    }
    
    res.json({status: "ok"})

})

const userProfileSchema = new mongoose.Schema({
    userId: {type: String, requied: true, unique: true},
    selectedProfilePicture: {type: String, required: true, unique: false},
    selectedHeaderPicture: {type: String, required: false, unique: false},
    gender: {type: String, required: true, unique: false},
    age: {type: Number, required: true},
    travelBucketList: [{listItem: {type: String, required: false}, 
        listItemPicture: {type: String, required: false}}],
    favoriteTravelPhotos: [{listItem: {type: String, required: false}, 
            listItemPicture: {type: String, required: false}}],
    }, { collection: 'User_Profiles' })

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile


app.post('/api/userProfiles', async (req, res) => {
    console.log('inside user profiles');
    const { userId, profileData } = req.body;
    const { selectedProfilePicture, selectedHeaderPicture, gender, age, travelBucketList, favoriteTravelPhotos} = profileData;

    console.log("request body: ", req.body)

    console.log("gender: ", gender);
    console.log("age: ", age);
    console.log("travelBucketList: ", travelBucketList);
    console.log("favoriteTravelPhotos: ", favoriteTravelPhotos);
    
    if (!userId || !selectedProfilePicture || !gender || !age || typeof userId != 'string' ||
        typeof gender != 'string' || typeof age != 'string' || !Array.isArray(travelBucketList)
        || !Array.isArray(favoriteTravelPhotos)) {
            return res.status(400).json( { status: 'error', error: 'Invalid or empty data'})
    }

    const userProfile = new UserProfile({
        userId,
        selectedProfilePicture,
        selectedHeaderPicture,
        gender,
        age,
        travelBucketList,
        favoriteTravelPhotos
    });
    try {
        await userProfile.save()
        .then(result => {
            console.log("Save result:", result);
            res.status(200).json({ status: 'ok' });
          })
        console.log("Profile info saved successfully: ", res)
        console.log("response: " + res)
    } catch(error) {
        if (error.code === 11000) {
            return res.status(400).json( {status: 'error', error: 'Profile info could not be saved' })
        }
        console.log("error: " + error)
        //throw error
        res.status(500).json({ status: 'error', error: 'Internal server error'})
    }
})

app.get('/api/userProfiles/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const userProfile = await UserProfile.find({ userId });
        res.status(200).json(userProfile);
    }  catch (error) {
        res.status(500).json({ error: "Internal server error"});
    }
})



const userCreatedGroupsSchema = new mongoose.Schema({
    userId: {type: String, required: true, unique: false},
    groupImageFilename: {type: String, required: true, unique: false },
    groupTitle: { type: String, required: true, unique: false },
    groupActivityDate: { type: String, required: true, unique: false},
    groupActivityTime: { type: String, required: true, unique: false},
  }, { collection: 'User_CreatedGroups' });
  
  const UserGroupsCreated = mongoose.model('UserGroup', userCreatedGroupsSchema);
  
  module.exports = UserGroupsCreated;


app.post('/api/createdGroups', async (req, res) => {
    console.log('inside created groups');
    const { userId, groupImageFilename, groupTitle, groupActivityDate, groupActivityTime} = req.body

    console.log("request body: ", req.body)

    console.log("userId: ", userId)
    console.log("groupImageFilename: ", groupImageFilename)
    console.log("groupTitle: ", groupTitle)
    console.log("groupActivityDate: ", groupActivityDate)
    console.log("groupActivityTime: ", groupActivityTime)

    if (!userId) {
        return res.status(400).json({ status: 'error', error: 'userId is required' });
    }
    
    if (!userId || !groupImageFilename || !groupTitle || !groupActivityDate || !groupActivityTime || typeof groupImageFilename != 'string' || 
        typeof groupTitle != 'string' || typeof groupActivityDate != 'string' || typeof groupActivityTime != 'string' || typeof userId != 'string') {
        return res.status(400).json( { status: 'error', error: 'Invalid or empty data'})
    }

    const createdGroup = new UserGroupsCreated({
        userId,
        groupImageFilename,
        groupTitle,
        groupActivityDate,
        groupActivityTime,
    });
    try {
        await createdGroup.save()
        .then(result => {
            console.log("Save result:", result);
            res.status(200).json({ status: 'ok' });
          })
        console.log("Group saved successfully: ", res)
        console.log("response: " + res)
    } catch(error) {
        if (error.code === 11000) {
            return res.status(400).json( {status: 'error', error: 'Group could not be saved' })
        }
        console.log("error: " + error)
        //throw error
        res.status(500).json({ status: 'error', error: 'Internal server error'})
    }
})

app.get('/api/createdGroups/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const userGroupsCreated = await UserGroupsCreated.find({ userId });
        res.status(200).json(userGroupsCreated);
    }  catch (error) {
        res.status(500).json({ error: "Internal server error"});
    }
})

app.delete('/api/createdGroups/:groupId', async (req, res) => {
    console.log("inside delete method for created groups");
    const groupId = req.params.groupId;
    console.log("groupId: ", groupId)
    try {
        const result = await UserGroupsCreated.findOneAndRemove({ _id: groupId });
        console.log("result: ", result);
        if (result) {
            res.status(200).json({ status: 'ok', message: 'Group deleted successfully'});
        } else {
            res.status(400).json({ status: 'error', message: 'Group not found'})
            console.log("Group not found")
        }
    } catch (error) {
        console.error("Error deleting serverside: ", error);
        res.status(500).json({ status: 'error', message: 'Internal server error'});
    }
})

app.put('/api/createdGroups/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const updatedGroupData = req.body;
    try {
        const updatedGroup = await UserGroupsCreated.findByIdAndUpdate(groupId, updatedGroupData, {new: true});
        if (updatedGroup) {
            res.status(200).json({ status: 'ok', group: updatedGroup })
        } else {
            res.status(404).json({ status: 'error', message: 'Group not found'});
        }
    } catch (error) {
        console.error("Error updating group: ", error);
        res.status(500).json({ status: 'error', message: 'Internal server error'})
    }
});


app.get('/app/api/:userId/bookmarks', async (req, res) => {
    console.log('inside get backend bookmark method');
    var user_id = req.params['userId']
    const bookmark = new bookmarkModel()
    console.log("userID: ", user_id)
    var jsonContent;
    try {
        const userBookmarks = await bookmarkModel.findById('6385988e9cc70af0c207f746')
        console.log("userBookmarks: ", userBookmarks)
        //const userBookmarks = bookmarkModel.find({ '_id': user_id }, {lean: true})
        //var userBookmarks;
        // bookmarkModel.findById('userId', user_id, { lean: true }, function (err, userBookmarks) {
        //     console.log("res", userBookmarks);
        // });
        //userBookmarks = await bookmarkModel.findById({'_id': user_id}).lean()
        
        console.log("userBookmarks", userBookmarks)
        if (!userBookmarks) {
            return res.json( { status: 'ok', message: 'No bookmarks found'})
        }
        jsonContent = JSON.stringify(userBookmarks);
    } catch(error) {
        console.log("error: " + error)
        return res.json( { status: 'error', error: 'System error, please try again later'} )
    }
    return jsonContent;

})


const userItinerarySchema = mongoose.Schema({
    userId: {type: String, required: true, unique: false},
    firstName: {type: String, required: true, unique: false},
    lastName: {type: String, required: true, unique: false},
	username: {type: String, required: true, unique: true},
	itineraryName: {type: String, required: true, unique: false},
    itineraryDescription: {type: String, required: false, unique: false},
	itineraryPlaces: [{
      placePictureURL: {type: String, required: true},
      placeLocation: {type: String, required: true},
      placeDescription: {type: String, required: false}
     }],
	itineraryDates: [{
      date: {type: String, required: true}
    }],
	itineraryTimes: [{
      time: {type: String, required: true}
    }],
  },{ collection: 'User_Itineraries'})

const UserItinerary = mongoose.model('UserItinerary', userItinerarySchema)
  
module.exports = UserItinerary

app.post('/api/userItineraries', async (req, res) => {
    console.log('inside user itineraries');
    const { userId, firstName, lastName, username, itineraryName, itineraryDescription, itineraryPlaces, itineraryDates, itineraryTimes} = req.body
    console.log("request body: ", req.body)
    
    if (!userId || !firstName || !lastName || !username || !itineraryName || !itineraryDescription || !itineraryPlaces 
        || !itineraryDates || !itineraryTimes || typeof userId != 'string' || typeof firstName != 'string' || 
        typeof lastName != 'string' || typeof username != 'string' || typeof itineraryName != 'string' ||
        typeof itineraryDescription != 'string' || typeof itineraryPlaces != [] || typeof itineraryDates != [] || 
        typeof itineraryTimes != []) {
            return res.status(400).json( { status: 'error', error: 'Invalid or empty data'})
    }

    const userItinerary = new UserItinerary({
        userId,
        firstName,
        lastName,
        username,
        itineraryName,
        itineraryDescription,
        itineraryPlaces,
        itineraryDates,
        itineraryTimes
    });
    try {
        await userItinerary.save()
        .then(result => {
            console.log("Save result:", result);
            res.status(200).json({ status: 'ok' });
          })
        console.log("Itinerary info saved successfully: ", res)
        console.log("response: " + res)
    } catch(error) {
        if (error.code === 11000) {
            return res.status(400).json( {status: 'error', error: 'Itinerary info could not be saved' })
        }
        console.log("error: " + error)
        //throw error
        res.status(500).json({ status: 'error', error: 'Internal server error'})
    }
})

app.get('/api/userItineraries/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const userItinerary = await UserItinerary.find({ userId });
        res.status(200).json(userItinerary);
    }  catch (error) {
        res.status(500).json({ error: "Internal server error"});
    }
})




app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
