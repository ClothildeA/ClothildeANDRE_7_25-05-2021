const Posts = require('../models/Posts');
const fs = require('fs');

exports.getAll = (req, res)=>{
	Posts.getAllPosts()
	.then(posts => {
		res.status(200).json({ posts });
	})
	.catch(error => {res.status(403).json({ error })});
};

exports.getOne = (req, res)=>{
	Posts.getOnePost(parseInt(req.params.id))
	.then(post => {
		res.status(200).json({ post });
	})
	.catch(error => {res.status(403).json({ error })});
};

exports.posting = (req, res) => {

};

exports.likeHandler = (req, res) => {

};

exports.updateOne = (req, res) => {

};

exports.deleteOne = (req, res) => {

};