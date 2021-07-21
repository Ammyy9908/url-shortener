# url-shortener

### Installation:

 `$ git clone https://github.com/Ammyy9908/url-shortener.git`
 
 `$ cd url-shortener`
 
 `$ npm i`
 
 `$ npm run dev`
 
 ### Usage


open index.js
and provide the Mongodb Cloud database URL inside mongoose.connect() method inside <DB URL> field.


` mongoose.connect('<DB URL>/URLSHORTNER',{useNewUrlParser:true,useUnifiedTopology:true},()=>{
        console.log("Database connected!");
    });`
 
 after this go to terminal where this application running see there you see database connected.
    
    
Now goto http://loocalhost:3000 & try to add a long url inside the text field & hit Generate button at the bottom of page you recieve a shorten url just copy it and try to add in new tab of browser you will be redirected to original entered url using this shorten url.
