const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path")
// Example of a missing import
const extended = require('extended-module'); // Adjust the module name as needed


const MONGO_URL= 'mongodb://127.0.0.1:27017/wanderlust';

async function main (){
    await mongoose.connect(MONGO_URL);
}
main().then(()=>{
    console.log("connected to mongoDB");
})
.catch((err)=>{
    console.log(err);
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended}))

app.get("/",(req,res)=>{
    res.send("hellow world")
})

app.get("/listings",async(req,res)=>{
    const listings =await Listing.find({})
    res.render("./listings/index.ejs",{listings});
    })
 // New Route
 app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs")
  })
    //Show Route
    app.get("/listings/:id",async(req,res)=>{
        let {id} = req.params;
        const listing = await Listing.findById(id);
        res.render("listings/show.ejs",{listing});
    })
    // Create Route
    app.post("/listings/",async(req,res)=>{
        const  newlisting = new Listing (req.body.listing);
        await newlisting.save();
        res.redirect("/listings")
    })  
   //Edit route
   app.get("/listings/:id/edit",(req,res)=>{
    
   })
// app.get("/Testlisting",async(req,res)=>{
//     let samplelisting = new Listing({
//         title:"My New House",
//         description:"This is my new house",
//         price:3000,
//         location:"Mumbai ",
//         country:"india",
//     })
//     await samplelisting.save();
// console.log("sample was saved");
// res.send("suceesful testing");
// })



app.listen(3000,()=>{
    console.log("server is ruuning");
})