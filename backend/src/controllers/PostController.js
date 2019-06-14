const Post = require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

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

        const [ name ] = image.split('.')
        const fileName = `${post._id}.jpg`

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 80 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
        )

        post.image = fileName
        post.save()

        fs.unlinkSync(req.file.path)

        req.io.emit('post', post)

        return res.json(post)
    },

    async delete(req, res) {
        const post = await Post.findById(req.params.id)
        const imagePath = `${path.resolve(__dirname, '..', '..', 'uploads', 'resized', post.image)}`

        fs.unlinkSync(imagePath)

        post.delete()

        return res.send()
    }
}