const options = {
    1:[
        {label:"Bus", score : 100*4*270/10},
        {label:"Car", score : 300*4*270/10},
        {label:"Bike", score : 65*4*270/10},
        {label:"Walk", score : 0},
        {label:"Metro", score : 100*4*270/10},
    ],
    2:[
        {label:"Always", score : 20*365/10},
        {label:"Sometimes", score : 50*365/10},
        {label:"Never", score : 100*365/10},
    ],
    3:[
        {label:"Yes", score : 100*365/10},
        {label:"No", score : 0},
    ],
    4:[
        {label:"One", score : 50*365/10},
        {label:"Two", score : 100*365/10},
        {label:"Thrice Or More", score : 150*365/10},
    ],
    5:[
        {label:"Food", score : -5*365/10},
        {label:"Paper", score : -5*365/10},
        {label:"Tin Cans", score : -5*365/10},
        {label:"Plastic", score : -5*365/10},
        {label:"Glass", score : -5*365/10},
        {label:"None", score : 0},
    ]
};

start();
function start(key){
    if(key==1){
        localStorage.removeItem("answer");
    }
    let doms = document.getElementsByClassName("qna-container");
    key = Number(key);
    for (let i = 0; i < doms.length; i++) {
        doms[i].style.display = "none";
    }
    if(key>0 && key<7){
        doms[key-1].style.display = "block";
        document.querySelector(".hero-content").style.display = "none";
    }else{
        let lastScore = JSON.parse(localStorage.getItem("lastAnswer")||'{}');
        if(lastScore.allScore){
        }
        document.querySelector(".hero-content").style.display = "block";
    }
};

function choose(key, value){
    let answer = JSON.parse(localStorage.getItem("answer")||'{}');
    if(key==5){
        let fDom = document.getElementsByClassName("a-container")[key-1];
        let cDom = fDom.getElementsByClassName("title");
        answer[key] = answer[key]||[];
        let opIndex = answer[key].indexOf(value);
        if(opIndex!=-1){
            answer[key].splice(opIndex,1);
        }else{
            answer[key].push(value);
        }
        for (let i = 0; i < cDom.length; i++){
            if(answer[key].indexOf(cDom[i].innerText)==-1){
                cDom[i].classList.remove("choose_bubble");
            }else{
                cDom[i].classList.add("choose_bubble");
            }
        }
    }else{
        answer[key] = [value];
        this.start(key+1);
    }
    localStorage.setItem("answer",JSON.stringify(answer));
};

function submit(){
    let answer = JSON.parse(localStorage.getItem("answer")||'{}');
    let allScore = 0;
    for(let i in answer){
        if(i==5){
            for(let j = 0; j < answer[i].length; j++){
                allScore+= options[i].find(item=> item.label==answer[i][j]).score;
            }
        }else{
            allScore += options[i].find(item=>item.label==answer[i][0]).score;
        }
    }
    answer.allScore = allScore;
    console.log(answer);
    localStorage.setItem("lastAnswer",JSON.stringify(answer));
    this.start(6);
    
}

//----Result--------
const DifferenceAvg = document.querySelector("#diffavg");
const beh = document.querySelector(".beh");
const totalnumber = document.querySelector("#total");
const behave = document.querySelector("#behave");
const AllScore = document.querySelector("#AllScore");

//Calc the user score
let answer = JSON.parse(localStorage.getItem("answer") || '{}');
let allScore = 0;
for (let i in answer) {
    if(i==5){
        for (let j = 0; j < answer[i].length; j++){
            allScore += options[i].find(item=>item.label==answer[i][j]).score;
        }
    }else{
        allScore += options[i].find(item=>item.label==answer[i][0]).score;
    }
}

answer.allScore = allScore;
console.log(allScore);

function ShowAllScore(){
    AllScore.textContent = allScore/100;
}

ShowAllScore();

//Calculate trees number

const Co2OfTree = 22;
const AvgCo2 = 234;
let userSaveCo2 = AvgCo2 - allScore/100;

function calcTrees(){
    totalnumber.textContent = Math.abs(Math.round(userSaveCo2 / Co2OfTree));
}
calcTrees();


//display tree behaviour
let bad = 'Opps! You Killed';
let good = 'Hurray! You Saved';

function treeBeh() {
    if(userSaveCo2 > 0){
        behave.textContent = good;
    }else{
        behave.textContent = bad;
    }
}

treeBeh();


//Calc the diff of Co2 between user & avg 
const Percent = 100;

function calcDiffAvg(){
    DifferenceAvg.textContent = Math.abs(Math.round(((userSaveCo2) / AvgCo2) * Percent));
};

calcDiffAvg();

//Display Results
let high = '% Higher than Avgerage';
let low = '% Lower than Average';
let middle = '% equals To Average';

function calcOutcomes() {
    if(userSaveCo2 > 0){
        beh.textContent = low;
    }else if(userSaveCo2 < 0){
        beh.textContent = high;
    }else{
        beh.textContent = middle;
    }
};

calcOutcomes();