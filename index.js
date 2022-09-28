const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const cors = require('cors');
const bp = require('body-parser');
var validUrl = require('valid-url');
const URL = require('./models/URL');
const QRCode = require('qrcode')




const app = express();


app.set('view engine','ejs')
app.use(cors());
app.use(express.static('public'))
app.use(bp.json())
app.use(express.urlencoded({extended: true}));




    mongoose.connect('mongodb+srv://Sumit:2146255sb8@cluster0.0wij2.mongodb.net/phirlo_qr_generator',{useNewUrlParser:true,useUnifiedTopology:true},()=>{
        console.log("Database connected!");
    });

// Database connection



// Routes

app.get('/',async (req,res) => {
    res.render('index',{title:'URLY-url shortner'});
})

app.get('/:lid',async (req,res) => {
    const url = await URL.findOne({shorten_id:req.params.lid});
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
       return res.send({shorten_url:`https://phirlo-qrcode.herokuapp.com/${result.shorten_id}`});
   }
   else{
         return res.send({shorten_url:`https://phirlo-qrcode.herokuapp.com/${isExists.shorten_id}`});
   }
   
})

app.post("/qr/generate",async (req,res)=>{
    const {url,sno} = req.body;
    const isValid = validUrl.isUri(url)
    console.log(isValid);
    if(!isValid) {
        return res.status(400).json({error: 'Invalid URL'});
    }
    
        const qr = await QRCode.toFile(`./public/qr/${sno}.png`,url)
        return res.send({success:true});
    
})


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    
   
        console.log(`Server listen at ${port} & DB is also connected!`);
    
});


