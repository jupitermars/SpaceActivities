boil.win = function(){};

boil.win.prototype = {
    preload: function(){

    },
    create: function(){
        console.log('You win');
        game.stage.backgroundColor = '#780';
        game.input.onDown.add(function(){
            changeState('Play');
        }); 
    console.log('score ' + time)
    
    
    },
    update: function(){
        
    }
};