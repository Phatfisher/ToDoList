const express = require("express"); 
const bodyParser = require("body-parser"); 
const quotes = require("inspirational-quotes");
const timer = require("node-get-time");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs'); 

let items = ["Eat", "Code", "Sleep"]; 

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
        DAY: day, 
        DayDescription: dayDescription,
        newListItems: items
    });
    
});

app.post("/", function(request, response){
    let item = request.body.newItem;
    items.push(item);
    response.redirect("/");
});

app.listen(3000, function(){
    console.log("Server started on port 3000"); 
});


