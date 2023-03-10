const { urlencoded } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')


// express app
const app = express()

// connect to db and listen to request
const dbURI = 'mongodb+srv://peacelover336:<password>@cluster0.4cjha3a.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( result => app.listen('3000'))
    .catch(err => console.log(err))

//register view engine
app.set('view engine', 'ejs')
//middlewares
app.use(express.static('public'))
app.use(urlencoded({extended: true}))

//routes
app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'})
})
app.get('/about-us', (req, res)=>{
    res.redirect('/about')
})
app.get('/', (req, res)=> {
    res.redirect('/blogs')
})
//blog routes
app.use('/blogs', blogRoutes)

app.use((req, res)=>{
    res.status(404).render('404', {title: '404!'})
})