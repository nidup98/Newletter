const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require('request');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static-files"));


app.get("/", function(req, res){
  res.sendFile(__dirname  + "/signup.html");
});


app.post("/", function(req, res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  console.log(firstName, lastName, email);

  //make above data in form that will be readable by the mailchimp format which is jsonData
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName,
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  // console.log(jsonData);

  const chimpUrl = "https://us6.api.mailchimp.com/3.0/lists/b3a1e100ed";
  const options = {
    method: 'POST',
    auth: "nidup98:ae532a2a7072af235dd6f1ee02e92966-us6",
  }

  const request = https.request(chimpUrl, options, function(response){
    response.on('data', function(data){
      //console.log(JSON.parse(data));
      var statusCode = response.statusCode;
      if (statusCode == 200){
        res.sendFile(__dirname  + '/success.html');
      } res.sendFile(__dirname  + "/failure.html");
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure.html", function(req, res){
  res.redirect("/");
})

//Deploying the app to heroku
app.listen(process.evn.PORT || 3000, function(){
  console.log("Server running at port 3000");
});


// const express = require("express");
// const bodyParser = require("body-parser");
// const request = require("request");
//
// const app = express();
//
// //If we use the static method, we can use the relative
// //for instance, we can use path for style as css/style.css despite being inside static-files
//
// app.use(express.static("static-files")); //this specifies path to specifiy files
// app.use(bodyParser.urlencoded({extended: true}));
//
// app.get("/", function (req, res){
//   res.sendFile(__dirname + "/signup.html");
// });
//
// app.post("/", function (req, res){
//   var firstName = req.body.fname;
//   var lastName = req.body.lname;
//   var email = req.body.email;
//   console.log(firstName, lastName, email);
// });
//
// app.listen(3000, function () {
//   console.log("Server is running on port 3000");
// });

// const express = require("express");
// const bodyParser = require("body-parser");
// const request = require("request");
// const https = require("https");
//
// const app = express();
//
// app.use(bodyParser.urlencoded({extended: true}));
// //gives the relative path to the stataic files like images and css files
// app.use(express.static("static-files"));
//
// app.get('/', function(req,res){
//   res.sendFile(__dirname  + "/signup.html");
// });
//
// app.post("/", function(req, res){
//   const firstName = req.body.fname;
//   const lastName = req.body.lname;
//   const email = req.body.email;
//   const data = {
//     members: [{
//       email_address: email,
//       status: "subscribed",
//       merge_fields: {
//         FNAME: firstName,
//         LNAME: lastName,
//       }
//     }
//     ]
//   };
//   const jsonData = JSON.stringify(data)
//   const url = "https://us6.api.mailchimp.com/3.0/lists/b3a1e100ed";
//   const options = {
//     method: "POST",
//     auth: "nidup98:ae532a2a7072af235dd6f1ee02e92966-us6"
//   };
//
//   const request = https.request(url, options, function(response){
//     var statusCode = response.statusCode;
//     if(statusCode == 200){
//       res.sendFile(__dirname + "/success.html");
//     } else {
//       res.sendFile(__dirname + "/failure.html");
//     }
//     response.on("data", function(data){
//       console.log(JSON.parse(data));
//     })
//   });
//
//   //writing to the mailchimp server.
//   request.write(jsonData);
//   request.end();
//
// });
//
// app.post("/failure.html", function(req, res){
//   res.redirect("/");
// });
//
// app.listen(3000, function(){
//   console.log("server running at port 3000");
// });


//API key
//ae532a2a7072af235dd6f1ee02e92966-us6
//list id
//b3a1e100ed
