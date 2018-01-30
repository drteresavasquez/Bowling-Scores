console.log("main.js");

let scoreButtons = [...Array(11).keys()];
let scoreCount = [];
let actualScore = [];

scoreButtons.forEach(function (item) {
    $(".btn-group").append(
        `<button id="btn${item}" type="button" onclick="getNumber(${item})" value="${item}" class="btn btn-secondary">${item}</button>`
    );
});

function getNumber(score) {
    if ($(`#btn${score}`).val() === "10" && scoreCount.length === 0){
        scoreCount.push(10);
        scoreCount.push(0);
    }else if($(`#btn${score}`).val() === "10" && scoreCount.length === 20){
        scoreCount.push(10);
    }else if(scoreCount.length === 20 && (scoreCount[18] + scoreCount[19]) >= 10){
        scoreCount.push(Number($(`#btn${score}`).val()));
        console.log("Real Score:",realScore());
    }else if(scoreCount.length < 20){
        scoreCount.push(Number($(`#btn${score}`).val()));
    }else{
        console.log("Real Normy:",realScore());
    }
    checkForTens();

    console.log(scoreCount);
    let currentScore = scoreCount.reduce((a, b) => a + b);
    $(".currentScore").html(`<h2>${currentScore}</h2>`);
}

function checkForTens(){
        if (scoreCount[scoreCount.length - 1] === 10 && scoreCount.length%2 !== 0 && scoreCount.length < 19) {
            scoreCount.push(0);
        }        
}

function realScore(){
    for(i=0; i<21; i++){
        if((i+1)%2 === 0 && scoreCount[i-1]===10 && i<19){
            actualScore.push(scoreCount[i-1]+scoreCount[i+1]+scoreCount[i+2]+ scoreCount[i+3]);
        }else if(((i+1)%2 === 0 && scoreCount[i-1]===10) && i > 19){
            actualScore.push(scoreCount[i-1]+scoreCount[i]+scoreCount[i+1]);
        }
        else if((i+1)%2 === 0 && (scoreCount[i] + scoreCount[i-1]) === 10){
            actualScore.push(scoreCount[i-1]+scoreCount[i]+scoreCount[i+1]);
        }
        else if((i+1)%2 === 0 && (scoreCount[i] + scoreCount[i-1]) !== 10){
            actualScore.push(scoreCount[i]+scoreCount[i-1]);
        }
    }
    return actualScore;
}

// USE THIS FOR LOGIC IN MULTIPLE STRIKES
// if(scoreCount[i-1]===10 && scoreCount[i+1]===10)




// NEW GAME POSSIBILITIES
// $("#add-game").click(function(){
//     $(".btn-toolbar").append(function(){
//         scoreButtons.forEach(function(item){
//             $(".btn-group").append(
//                 `<button id="btn${item}" type="button" onclick="getNumber(${item})" value="${item}" class="btn btn-secondary">${item}</button>`
//             );
//         });
//     }
// );
// });