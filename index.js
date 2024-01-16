const express = require('express')
const deploy = require('dotenv')
deploy.config();
const db = require('./config/db')
const Post = require('./models/Post')
const app = express();
const port = process.env.PORT || 1002;
app.use(express.json());
db().then(() => {
    console.log('successfully connected to database ')
}).catch(err =>
    console.log(err));
//to check if the api is working
app.get('/api/', (req, res) => {
    res.status(200).json({ message: "welcome to home page" })
})

//Fetching all posts
app.get('/api/posts', (req, res) => {
    Post.find({}).then((data) => {
        console.log(data)
        res.status(200).json({ data })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: "error" })
    })
})
//getting a specific post
app.get('/api/posts/:id', (req, res) => {
    let postid = req.params.id;
    Post.find({ _id: postid }).then((data) => {
        console.log(data)
        res.status(200).json({ data })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: "error" })
    })
})
//Creating a new post
app.post('/api/posts', (req, res) => {
    let newPost = new Post({
        title: req.body.title,
        description: req.body.description
    })
    newPost.save().then((data) => {
        res.status(200).json({ message: "post created successfully" })
    }).catch((err) => {
        res.status(500).json({ message: "error" })
    })
})
//Updating a specific post
app.put('/api/posts/:id', (req, res) => {
    let postid = req.params.id;
    let newInfo = {
        title:req.body.title,
        description:req.body.description
    }
    Post.findByIdAndUpdate(postid,newInfo).then((data)=>{
        res.status(200).json({ message: "post updated successfully" })
    }).catch(()=>{
        res.status(500).json({ message: "error" })
    })
})
app.delete('/api/posts/:id', (req, res) => {
    let postid = req.params.id;
    Post.findByIdAndDelete(postid).then((data)=>{
        res.status(200).json({ message: "post deleted successfully" })
    }).catch((err)=>{
        res.status(500).json({ message: "error" })
    })
})

app.listen(port, (err) => {
    if (!err) {
        console.log(`listening to the port ${port}`)
    }
})