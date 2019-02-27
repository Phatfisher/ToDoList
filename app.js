const express = require("express"); 
const bodyParser = require("body-parser"); 
const quotes = require("inspirational-quotes");
const timer = require("node-get-time");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs'); 

let items = ["Eat", "Code", "Sleep"]; 
let workItems = [];

app.get("/", function(req, res){
    
    let today = new Date();
    let dayDescription ='"'+ quotes.getRandomQuote() + '"' ; 
    let options = {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day:'numeric'};
    let day = today.toLocaleDateString("en-US", options);
   
    res.render("list", 
    {
        listTitle: day, 
        DayDescription: dayDescription,
        newListItems: items
        
    });
    
});

app.get("/work", function(req,res){
    let dayDescription ='"'+ quotes.getRandomQuote() + '"' ; 
        

    res.render("list",{listTitle : "Work List",
    newListItems: workItems,
    DayDescription: dayDescription
    });
});
app.post("/work", function(request,response){
    let item = request.body.newItem;
    workItems.push(item);
    response.redirect("/work");
});

app.post("/", function(request, response){
    let item = request.body.newItem;

    if(request.body.list === "Work"){
        workItems.push(item);
        response.redirect("/work");
    }
    else
    {
        items.push(item);
        response.redirect("/");
    }
});

app.get("/about-me", function(req, res){
    res.render("about");
});

app.listen(3000, function(){
    console.log("Server started on port 3000"); 
});


