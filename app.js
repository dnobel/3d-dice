function rollDice() {
    const dice = [...document.querySelectorAll(".dice")];
    var promises = [];
    dice.forEach(die => {
        promises.push(rollDie(die));
    });
    Promise.all(promises).then(function (results) {
        var sum = results.reduce(function(a, b){
                return a + b;
        }, 0);
        console.log("Sum is "+ sum);        
        $('#sum').html(sum);
        $('.sum-container').css('visibility','visible');
    });
}

function rollDie(die) {
    return new Promise(function(resolve, reject) {
        let result = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        die.dataset.side = result;
        die.classList.toggle("reRoll");
        console.log(result); 
        setTimeout(function(){ 
            resolve(result);
        }, 1500);    
    });
}

function recalculateSum() {
    const dice = [...document.querySelectorAll(".dice")];
    var sum = dice.map(function (d) {
        return parseInt(d.dataset.side);
    }).reduce(function(a, b){
        return a + b;
    }, 0);
    console.log("Sum is "+ sum);
    $('#sum').html(sum);
    $('.sum-container').css('visibility','visible');
}

function createDices(numberOfDices) {
    $('.sum-container').css('visibility','hidden');
    $('.dice-list').empty();
    for (let i = 0; i < numberOfDices; i++) {
        const die = $($('template#dice').html()).clone().appendTo('.dice-list');
        die.click(function() {
            rollDie(die.get()[0]).then(function() {
                recalculateSum();
            }); 
        });
    }    
}

document.getElementById("roll-button").addEventListener("click", rollDice);

$("#dice-selector").change(function () {
    const numberOfDices = parseInt($( this ).val());
    createDices(numberOfDices);
});

$(function() {
      createDices(1);
});