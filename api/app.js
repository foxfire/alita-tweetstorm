require('./jobs/mailJob');
const checkUser = require ('./services/checkUser');
const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require('body-parser');
      port = 3080;
const dbParams = require('./services/databaseConnector');
let collection;



async function main () {
    // Use connect method to connect to the server
    await dbParams.client.connect();
    const db = dbParams.client.db(dbParams.dbName)
    collection = await db.collection('participants');
    return 'done.'
}

main()
  .then(console.log)
  .catch(console.error);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../app/dist')));

app.get('/api/numberParticipants', async (req, res) => {
    console.log('api/numberParticipants called');
    res.json((await getnumberParticipants()).length);
});

app.post('/api/user', async (req, res) => {
    const user = [req.body.user];
    console.log('Adding user:::::', user);

    res.json(await insertParticipant (user));
})

app.post('/api/removeUser', (req, res) => {
    const user = req.body.user;
    console.log('Removing user:::::', user);
    removeParticipant (user);
    res.json("user removed");
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/build/index.html'));
});

async function getnumberParticipants () {
    return await collection.find({}).toArray();
}

async function getAllUsers () {
 return await collection.find({}).toArray();
}

async function insertParticipant (user) {
    user[0].twitterHandle = user[0].twitterHandle.replace(/\s/g, '').replace('@', '');
    userChecked = await checkUser.check(user[0]);
    
    if(user[0].twitterHandle != null && user[0].email != null &&
        user[0].twitterHandle != "" && user[0].email != "" && 
        userChecked && userChecked !="empty" &&
        validateEmail(user[0].email)) {
        await collection.insertMany(user);
        userChecked = "enlisted";
    } else if(user[0].twitterHandle == null || user[0].email == null || validateEmail(user[0].email) == false) {
        userChecked = "empty";
    }

    return userChecked;
}

async function removeParticipant (user) {
    if(user.twitterHandle != null && user.email != null) {
        await collection.deleteMany(user);
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

app.listen(port,"0.0.0.0", () => {
    console.log(`Server listening at the port::${port}`);
});

module.exports = collection;
