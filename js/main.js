//Total number of clicks
total = 0;
//Current number of pencils
current = 0;
//Pencils/sec rate
autoClick = 0;

//Constructor for upgrades
function Upgrade(name, cost, count, power) {
    this.name = name;
    this.cost = cost;
    this.count = count;
    this.power = power;
}

//Once saving is implimented will add this
function initialize(){
    //if save doesn't exist

    //Intial upgrade values
    upgrades = [new Upgrade("Upgrade1", 10, 0, 1), 
    new Upgrade("Upgrade2", 50, 0, 5), 
    new Upgrade("Upgrade3", 100, 0, 10),
    new Upgrade("Upgrade4", 500, 0, 50)];
}

//Auto click every second
setInterval(function() {
    current += autoClick;
    update();
}, 1000)

function doClick(){
    incriment();
    update();
}

function incriment(){
    total++;
    current++;
}

//Updates numbers on screen
function update(){
    updateStats();
    updateUpgradeCount();
    updateUpgradeCost();
}

//Updates stats
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

initialize();