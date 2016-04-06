boil.win = function(){};

boil.win.prototype = {
    preload: function(){

    },
    create: function(){
        console.log('You win');
        game.stage.backgroundColor = '#735';
        game.input.onDown.add(function(){
            changeState('Play');
        }); 
    },
    update: function(){
        
    }
};