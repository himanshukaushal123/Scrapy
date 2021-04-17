const path = require('path')
const express = require("express")
const hbs=require('hbs')

const app = express()


//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public/dark')
const viewPath=path.join(__dirname,'../templates/views')
// const partialsPath=path.join(__dirname,'../templates/partials')

//setup handelbars engines and view location
app.set('view engine', 'hbs')
app.set('views',viewPath)
// hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render('index',{
        // title:'about me',
        // name:'amndrew'
    });


})

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.get("/resume", (req, res) => {
    res.render("resume");
})

app.get("/services", (req, res) => {
    res.render("services");
})

app.get("/testimonials", (req, res) => {
    res.render("testimonials");
})

app.get("/welcome", (req, res) => {
    res.render("welcome");
})
app.get("/works", (req, res) => {
    res.render("works");
})

//404 not found
app.get('*',(req,res)=>{
    res.render("404",{
        title:404,
        name:'Himanshu Kaushal',
        errorMessage:'Page not found'
    })
})

// }) 
app.listen(3000, () => {
    console.log(`server is up on port 3000!`)
})