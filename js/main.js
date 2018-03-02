//Total number of clicks
var total = 0;
//Current number of pencils
var current = 0;
//Pencils/sec rate
var autoClick = 0;

var upgrades = [new Upgrade(10, 0, 1), 
                new Upgrade(50, 0, 5), 
                new Upgrade(100, 0, 10),
                new Upgrade(500, 0, 50)];

//Constructor for upgrades
function Upgrade(cost, count, power) {
    this.cost = cost;
    this.count = count;
    this.power = power;
}

//Function to start the timer and get upgrade counts
function initialize(){
    load();

    //Auto click every second
    setInterval(function() {
        current += autoClick;
        update();
    }, 1000)
}

function incriment(){
    total++;
    current++;
}

function doClick(){
    incriment();
    update();
}

//Updates numbers on screen
function update(){
    updateStats();
    updateUpgradeCount();
    updateUpgradeCost();
}

//Updates stats on screen
function updateStats(){
    var count1 = document.getElementById("total");
    count1.innerHTML = total;
    var count2 = document.getElementById("current");
    count2.innerHTML = current;
    var count3 = document.getElementById("auto");
    count3.innerHTML = autoClick;
}

//Updates upgrade count on screen
function updateUpgradeCount(){
    for(var i = 1; i < 5; i++){
        var id = "upgrade" + i + "count";
        var uCount = document.getElementById(id);
        uCount.innerHTML = upgrades[i-1].count;
    }
}

//Updates upgrade cost on screen
function updateUpgradeCost(){
    for(var i = 1; i < 5; i++){
        var id = "cost" + i;
        var uCost = document.getElementById(id);
        var temp = upgrades[i-1].cost
        uCost.innerHTML = temp;
    }
}

function buyUpgrade(num){
    if(current >= upgrades[num-1].cost){
        current -= upgrades[num-1].cost;
        autoClick += upgrades[num-1].power;
        upgrades[num-1].count++;
        calcCost(num);
    }
    update();
}

//TODO find better way to do this
function calcCost(num){
    var temp;
    switch(num){
        case 1:
            temp = Math.exp(upgrades[num-1].count) + 9;
            temp = Math.round(temp);
            upgrades[num-1].cost = temp;
            break;
    
        case 2:
            temp = Math.exp(upgrades[num-1].count) + 49;
            temp = Math.round(temp);
            upgrades[num-1].cost = temp;
            break;

        case 3:
            temp = Math.exp(upgrades[num-1].count) + 99;
            temp = Math.round(temp);
            upgrades[num-1].cost = temp;
            break;    

        case 4:
            temp = Math.exp(upgrades[num-1].count) + 499;
            temp = Math.round(temp);
            upgrades[num-1].cost = temp;
            break;
    }
}

function calcCostAll(){
    for(var i=1; i < 5; i++){
        calcCost(i);
    }
}

//Calculates autoClick
function calcAuto(){
    autoClick += upgrades[0].count * 1;
    autoClick += upgrades[1].count * 5;
    autoClick += upgrades[2].count * 20;
    autoClick += upgrades[3].count * 50;
}

//Save
//TODO see if can get working with loop (maybe recurrsion?)
function save(){
    document.cookie = "total=" + total;
    document.cookie = "current=" + current;
    document.cookie = "count1=" + upgrades[0].count;
    document.cookie = "count2=" + upgrades[1].count;
    document.cookie = "count3=" + upgrades[2].count;
    document.cookie = "count4=" + upgrades[3].count;
    //TODO add expire time
}

//Finds the value of cName in cookies
function getCookie(cName){
    var name = cName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getCount(){
    for(var i = 1; i < 5; i++){
        upgrades[i-1].count = getCookie("count" + i);
    }
}

//Loads the values from cookie
function load(){
    if(getCookie("total") != ""){
        total = getCookie("total");
        currnet = getCookie("current");
        //Need to get count first in order to calc auto and cost
        getCount();
        calcAuto();
        calcCostAll();
    }
}

window.onload=initialize();