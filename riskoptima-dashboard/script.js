let riskChart
let profitChart
let scenarioChart

function nextPage(){

document.getElementById("page1").classList.remove("active");
document.getElementById("page2").classList.add("active");

}

function prevPage(){

document.getElementById("page2").classList.remove("active");
document.getElementById("page1").classList.add("active");

}

function prevToCloud(){

document.getElementById("page3").classList.remove("active");
document.getElementById("page2").classList.add("active");

}



function runAnalysis(){

document.getElementById("page2").classList.remove("active");
document.getElementById("page3").classList.add("active");


let risk = Math.floor(Math.random()*100);

let efficiency = 60 + Math.floor(Math.random()*30);

let optimization = 15 + Math.floor(Math.random()*20);

let spend = document.querySelector('input[placeholder="e.g., 45000"]').value || 45000;

let savings = Math.floor(spend * (optimization/100));


// update cards

animateNumber("riskValue", risk, "");
animateNumber("efficiencyValue", efficiency, "");
animateNumber("optimizationValue", optimization, "");
document.getElementById("savingsValue").innerText = "$" + savings.toLocaleString();

document.getElementById("costEfficiency").innerText = efficiency + "% Efficient";
document.getElementById("efficiencyBar").style.width = efficiency + "%";



createRiskChart(risk);

createProfitChart();

createScenarioChart();

loadInsights();

}



function createRiskChart(score){

if(riskChart){
riskChart.destroy();
}

riskChart = new Chart(document.getElementById("riskChart"),{


type:"doughnut",

data:{
labels:["Risk","Safe"],
datasets:[{
data:[score,100-score],
backgroundColor:["#ff6b6b","#2ecc71"]
}]
},

options:{
responsive:true,
maintainAspectRatio:false,
cutout:"70%"
}

})

}



function createProfitChart(){

if(profitChart){
profitChart.destroy();
}

profitChart = new Chart(document.getElementById("profitChart"),{

type:"line",

data:{
labels:["2025","2026","2027","2028","2029"],
datasets:[{
label:"Projected Profit",
data:[10,20,35,50,70],
borderColor:"#4f6bed",
fill:false
}]
}

})

}



function createScenarioChart(){

if(scenarioChart){
scenarioChart.destroy();
}

scenarioChart = new Chart(document.getElementById("scenarioChart"),{

type:"bar",

data:{
labels:["Low","Medium","High"],
datasets:[{
label:"Risk Impact",
data:[20,50,80],
backgroundColor:["#2ecc71","#f1c40f","#e74c3c"]
}]
}

})

}



function loadInsights(){

let insights=[

{
title:"EC2 Optimization",
desc:"Several EC2 instances appear over-provisioned. Consider downsizing."
},

{
title:"Reserved Instances",
desc:"Switching to Reserved Instances could reduce compute costs by 35%."
},

{
title:"S3 Storage Policy",
desc:"Implement lifecycle rules to move old data to cheaper storage."
},

{
title:"CPU Utilization",
desc:"Average CPU utilization is low which indicates inefficient scaling."
},

{
title:"Serverless Efficiency",
desc:"Lambda usage indicates an opportunity to expand serverless architecture."
}

]

let container=document.getElementById("insightsContainer");

container.innerHTML="";

insights.forEach(item=>{

let card=document.createElement("div");
card.className="insight-card";

card.innerHTML=`

<div class="insight-title">${item.title}</div>
<div class="insight-desc">${item.desc}</div>

`;

container.appendChild(card);

})

}

function animateNumber(id, value, prefix=""){

let element = document.getElementById(id);
let start = 0;

let interval = setInterval(function(){

start++;

element.innerText = prefix + start;

if(start >= value){
clearInterval(interval);
element.innerText = prefix + value;
}

},20);

}