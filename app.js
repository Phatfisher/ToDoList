const express = require("express"); 
const bodyParser = require("body-parser"); 

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs'); 
var items = ["Pack Food", "Work", "Learn code", "Sleep"]; 

app.get("/", function(req, res){
    var today = new Date();
    var dayDescription = "Here's your todo list for today."; 
    var options = {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day:'numeric'};
    var day = today.toLocaleDateString("en-US", options);
   
    res.render("list", 
    {
        DAY: day, 
        DayDescription: dayDescription,
        newListItems: items
    })
    
});

app.post("/", function(request, response){
    var item = request.body.newItem;
    items.push(item);
    response.redirect("/");
});

app.listen(3000, function(){
    console.log("Server started on port 3000"); 
});