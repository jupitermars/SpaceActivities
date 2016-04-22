boil.Level5 = function(){};
var boss;
var bullet;
var bossHealth = 90;
var score
boil.Level5.prototype = {
    preload: function(){
     game.load.image('ship','Assets/Backgrounds/heroship1.png');
     game.load.image('background','Assets/Backgrounds/jupitar.png');
        game.load.spritesheet('boss','Assets/Sprites/Space Boss 1.png',50,50);
     bulletImage =game.load.image('bullets','Assets/Sprites/space bullet 3.png');
    },
    create: function(){
        lives =4;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        var bg =game.add.sprite(0, 0, 'background');
         bg.scale.setTo(2.5,2);
        boss = game.add.sprite(150,50,'boss');
        boss.enableBody = true;
        game.physics.enable(boss, Phaser.Physics.ARCADE);
        game.add.tween(boss).to( { x: 500 }, 1500, Phaser.Easing.Linear.None, true, 0, 1000, true);
        boss.scale.setTo(2,2)
        boss.animations.add('swirl',[0,1,2,3,4]);
        boss.animations.play('swirl',15,true);
        
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
            if (game.time.now - shotTime > 900){
                this.fireBullet();
            }
                
        }
                game.physics.arcade.overlap(bullet,boss,this.damageBoss);
                game.physics.arcade.overlap(enemybullet,ship,this.enemyHitsship);
    },
    fireBullet: function() {
        bullet =game.add.sprite(ship.position.x - 5,ship.position.y -61 ,'bullets')
        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.body.velocity.y = -1000;
        shotTime = game.time.now;   
    },
    damageBoss: function(){
        bossHealth--;
        if (bossHealth <= 0) {
            boss.kill();
            game.state.start('win');
        }
        console.log('bossdam');
    },
    fireenemybullet: function(){
        if(bossHealth <=0 ){
            return false
        }
        enemybullet =game.add.sprite(boss.position.x +50,boss.position.y +50 ,'bullets')
        game.physics.enable(enemybullet, Phaser.Physics.ARCADE);
        enemybullet.body.velocity.y = 1000;
        enemyshottime =game.time.now
        
    },
    enemyHitsship : function(enemybullet){
        enemybullet.kill();
        lives =lives-1
        if(lives <= 0){
             changeState('GameOver')
             restartGame();
        }
        console.log('hitsship')
        
    },
            
    
        
        
        
    

}