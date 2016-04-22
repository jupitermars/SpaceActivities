boil.Play = function(){};
var ship;
var time;
var cursors;
var enemy;
var fireButton;
var bullet;
var bulletImage;
var shotTime =0;
var enemyshottime = 0;
var enemysalive;
var enemybullet;
var lives;
boil.Play.prototype = {
    preload: function(){
     game.load.image('ship','Assets/Backgrounds/heroship1.png');
     game.load.image('background','Assets/Backgrounds/jupitar.png');
     game.load.spritesheet('enemy','Assets/Sprites/Alien 4.png',32,32);
     bulletImage =game.load.image('bullets','Assets/Sprites/Space bullet 6 ( alien 2 ).png');
    },
    create: function(){
        console.log('level1');
        time = 0;
        lives=5;
         game.physics.startSystem(Phaser.Physics.ARCADE);
         var bg =game.add.sprite(0, 0, 'background');
         bg.scale.setTo(2.5,2);
         enemys = game.add.group();
        enemys.enableBody = true;
        enemys.physicsBodyType = Phaser.Physics.ARCADE;
        game.add.tween(enemys).to( { x: 250 }, 3500, Phaser.Easing.Linear.None, true, 0, 1000, true);

        
        
        for (var y = 0; y < 3; y++)
        {
            for (var x = 0; x < 10; x++)
            {
                

                enemy = game.add.sprite(x * 40 + 30, y * 52 + 20, 'enemy');
                enemy.anchor.setTo(0.5, 0.5);
                enemy.scale.setTo(2.5,2.5);
                enemys.add(enemy);
                enemys.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3], 10, true);
                enemys.callAll('animations.play', 'animations', 'spin');
            }
        }
        
        ship = game.add.sprite(1000,800, 'ship');
        ship.scale.setTo(.45,.45);
        ship.anchor.setTo(0.5, 0.5);
        game.physics.enable(ship, Phaser.Physics.ARCADE);
        ship.body.bounce.set(.0);
        ship.body.collideWorldBounds = true;
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        
    },
    update: function(){
        if (game.time.now - enemyshottime > 1000){
            this.fireenemybullet();
        }
        if (cursors.left.isDown)
        {
            ship.body.velocity.x = -750;
        }
        else if (cursors.right.isDown)
        {
            ship.body.velocity.x = 750;
        }
        if (fireButton.isDown)
        {
            if (game.time.now - shotTime > 500){
                this.fireBullet();
            }
                
        }
        game.physics.arcade.overlap(bullet,enemys,this.overlaphandler);
        game.physics.arcade.overlap(enemybullet,ship,this.enemyHitsship);
    
    
    },
    overlaphandler : function(bullet,enemy){
        enemy.kill();
        bullet.kill();
        console.log('overlap')
        var healthyList = enemys.filter(function(child) {
            return child.alive 
        });
        if(healthyList.list.length <= 0){changeState('Level2')};
        
    },
    fireBullet: function() {
         bullet =game.add.sprite(ship.position.x - 5,ship.position.y -61 ,'bullets')
        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.body.velocity.y = -1000;
         shotTime =game.time.now
         
    },
    enemyHitsship : function(enemybullet,ship){
        enemybullet.kill();
        lives =lives-1
        if(lives <=0){
             changeState('GameOver')
             restartGame();
        }
        console.log('hitsship')
        
    },
    fireenemybullet: function(){
    
        
        var healthyList = enemys.filter(function(child) {
            return child.alive 
        });
        if(healthyList.list.length <= 0){return};
        console.log(healthyList)
        
        var number =getRandomInt(0,healthyList.list.length-1);       
        var shootingEnemy =healthyList.list[number];
        enemybullet =game.add.sprite(enemys.position.x+shootingEnemy.position.x-5,shootingEnemy.position.y+10,'bullets');
        game.physics.enable(enemybullet, Phaser.Physics.ARCADE);
        enemybullet.body.velocity.y =1000;
        enemyshottime =game.time.now;
        
    },
   
    
    
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function restartGame(){
    game.state.start('Play');
}

window.setInterval(increaseTime,1000);

function increaseTime(){
time++;

};