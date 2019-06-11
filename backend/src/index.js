const Express = require('express')
const mongoose = require('mongoose')

const app = Express()

mongoose.connect('mongodb+srv://curso-rs:curso-rs@cluster0-bvr0o.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true
})

app.use(require('./routes'))

app.listen(3333)