const Post = require('../models/Post')

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt')
        return res.json(posts)
    },

    async store(req, res) {
        const { author, place, desctiption, hashtags } = req.body
        const { filename: image } = req.file

        const post = await Post.create({
            author, place, desctiption, hashtags, image
        })

        return res.json(post)
    },
}