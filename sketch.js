var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFeed;
    var timeDate,cx;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
 
  database=firebase.database();
  timeDate = database.ref('FeedDate');
  lastFeed = database.ref('FeedTime');
var canv=createCanvas(window.innerWidth,window.innerHeight);
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  feed=createButton("Feed The Dog!");
  feed.position(650,95);
  feed.mousePressed(feedDog);
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  }
function draw() {
  background(46,139,87);
  foodObj.display();
  
let date = new Date();
timeDate.on("value",(data)=>{
  cx = data.val();
})
lastFeed.on("value",(data)=>{
   var ftime;
   if(date.getHours() >= 12)
   {
     ftime = data.val()+" PM"
   }
   else{
      ftime = data.val()+" AM";
   }
   fill('white');
textFont('Verdana');
textSize(20);
text("Last Feed : "+ftime+", "+cx,10,50); 

});
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
const date=new Date();
const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months=["January","February","March","April","May","June","July","August","September","October","November","December"]

function feedDog(){
var min;
if(date.getMinutes().toString().length === 1)
{
  min = "0"+date.getMinutes();
}
else
{
  min = date.getMinutes();
}
  dog.addImage(happyDog);
  
  let dbRoot=database.ref('/'); 
    dbRoot.update({FeedTime:(date.getHours()+":"+min)});
    dbRoot.update({FeedDate:days[date.getDay()]+", "+date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear()});
 
  foodS--;
  dbRoot.update({
    Food:foodS
  });

    
 }

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
 
}
