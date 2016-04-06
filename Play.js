boil.Play = function(){};
var ship;
var cursors;
var enemy;
var fireButton;
var bullet;
var bulletImage;
var shotTime =0;
var enemyshottime = 0;
var enemysalive =1;
var enemybullet;
var lives;
boil.Play.prototype = {
    preload: function(){
     game.load.image('ship','Assets/Backgrounds/heroship1.png');
     game.load.image('background','Assets/Backgrounds/background1.png');
     game.load.image('enemy','Assets/Sprites/enemy 1.png');
     bulletImage =game.load.image('bullets','Assets/Sprites/space bullet 2 (3).png');
    },
    create: function(){
        console.log('level1');
        lives=5101100;
         game.physics.startSystem(Phaser.Physics.ARCADE);
         game.add.tileSprite(0, 0, 1000, 900, 'background');
         
        
        enemys = game.add.group();
        enemys.enableBody = true;
        enemys.physicsBodyType = Phaser.Physics.ARCADE;
        
        
        
        for (var y = 0; y < 1; y++)
        {
            for (var x = 0; x < 1; x++)
            {
                
                var enemy2 = game.add.sprite(x * 40 + 30, y * 52 + 20, 'enemy');
                enemy2.anchor.setTo(0.5, 0.5);
                enemy2.scale.setTo(.20,.20);
                enemys.add(enemy2)
                enemy = game.add.sprite(x * 40 + 30, y * 52 + 20, 'enemy');
                enemy.anchor.setTo(0.5, 0.5);
                enemy.scale.setTo(.20,.20);
                enemys.add(enemy);
                
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
        if (game.time.now - enemyshottime > 500){
            this.fireenemybullet();
        }
        if (cursors.left.isDown)
        {
            ship.body.velocity.x = -850;
        }
        else if (cursors.right.isDown)
        {
            ship.body.velocity.x = 850;
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
        enemysalive--
        if(enemysalive == 0){
            game.state.start('Level2');
        }
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
        if(lives ==0){
             changeState('GameOver')
             restartGame();
        }
        console.log('hitsship')
        
    },
    fireenemybullet: function(){
        var healthyList = enemys.filter(function(child, index, children) {
            return child.alive 
        }, true);
        
        
        var number =getRandomInt(0,healthyList.list.length-1);
        var enemy =healthyList.list[number];
        enemybullet =game.add.sprite(enemy.x-5,enemy.y+10,'bullets');
        game.physics.enable(enemybullet, Phaser.Physics.ARCADE);
        enemybullet.body.velocity.y = 1000;
        enemyshottime =game.time.now;
        
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function restartGame(){
    game.sate.start('Play');
}
