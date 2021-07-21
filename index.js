const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const cors = require('cors');
const URL = require('./models/URL');
const bp = require('body-parser');
var validUrl = require('valid-url');



const app = express();


app.set('view engine','ejs')
app.use(cors());
app.use(express.static('public'))
app.use(bp.json())
app.use(express.urlencoded({extended: true}));




    mongoose.connect('mongodb+srv://admin-summit:2146255sb8@cluster0.fyuq8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/URLSHORTNER',{useNewUrlParser:true,useUnifiedTopology:true},()=>{
        console.log("Database connected!");
    });

// Database connection



// Routes

app.get('/',async (req,res) => {
    res.render('index',{title:'URLY-url shortner'});
})

app.get('/:uid',async (req,res) => {
    const url = await URL.findOne({shorten_id:req.params.uid});
    if(!url){
        return res.status(500).json({error:"Invalid Shorten URL!"});
    }
    res.redirect(url.url);
})
app.post('/',async (req,res) => {
    const {url} = req.body;
/// first validate the url
const isValid = validUrl.isUri(url)
console.log(isValid);
if(!isValid) {
    return res.status(400).json({error: 'Invalid URL'});
}
//check is there is same url present in database if yes give the shorten id of the url
   const isExists = await URL.findOne({url:url});
   if(!isExists) {
       const newURL = new URL({
           url,
           shorten_id:shortid.generate()
       })
       const result = await newURL.save();
       return res.send({shorten_url:`https://easyurly.herokuapp.com/${result.shorten_id}`});
   }
   
})


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    
   
        console.log(`Server listen at ${port} & DB is also connected!`);
    
})


