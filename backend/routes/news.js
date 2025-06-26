const express = require('express');
const fetchuser = require('../middleware/fetchUser')
const News  = require('../models/News');
const router = express.Router();


// doing the curd operation in the noyes section get data, update data, post data and delete data

// Route 1: get all the notes f a user Get: '/api/news/fetchfavnews' . Login required
router.get('/fetchfavnews', fetchuser, async (req, res) => {
    try {
        const news = await News .find({ user: req.user.id });
        res.json(news)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})


// Route 2: create a new  notes f a user post: '/api/news/addnews' . Login required
router.post('/addnews', fetchuser,  async (req, res) => {
   
    try {
        sucess = false
        let user = await News.findOne({ user: req.user.id, newsUrl: req.body.newsUrl });
        if (user) {
            return res.status(400).json({ sucess, errors: "News already exist" });
        }
        const { title, description, imgUrl,newsUrl,author,source } = req.body;

        const news = new News({
            title, description, imgUrl,newsUrl,author,source, user: req.user.id
        })
        const savednews = await news.save();

        res.json(savednews);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})




// Route 3: delete a   note f a user put: '/api/news/deletenews/:id' . Login required

router.delete('/deletenews/:id', fetchuser, async (req, res) => {

    try {

        // find the note to be deleted and delete it 
        let news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).send("not found");// news does not exist
        }
        if (news.user.toString() !== req.user.id) {
            return res.status(404).send("not found");// if user id is diiffernrt  user is trying to acess other user notes
        }

        news = await News.findByIdAndDelete(req.params.id);
        res.json({ "Sucess": "news has been deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router