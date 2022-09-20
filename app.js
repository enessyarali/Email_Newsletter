const request = require("request");
const bodyParser = require("body-parser");
const express = require("express")
const https = require("https");
const { options } = require("request");
const { url } = require("inspector");
const { json } = require("express/lib/response");

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended : true}))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

   const data = {
       members : [{
           email_address : email,
           status : "subscribed",
           merge_fields : { 
               FNAME : firstname, 
               LNAME : lastname,
            }
       }]
   }
   const jsonData = JSON.stringify(data)
   const url = "https://us9.api.mailchimp.com/3.0/lists/31204abcf6"
   const options = {
       method : "POST",
        auth : "enes1:334957d3d7573082483a62591f4f381b-us9"
   }
    const request =  https.request(url, options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/succes.html")
        }else{
            res.sendFile(__dirname +"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
   })
  // request.write(jsonData)
   request.end()
})

app.post("/failure",function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000 ,function(){
    console.log("Server running at port 3000");
}) 

//API Key
//334957d3d7573082483a62591f4f381b-us9

//List ID
//31204abcf6