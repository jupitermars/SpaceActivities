boil.Play = function(){};
var ship;
var cursors;
var enemy;
var fireButton;
var bullet;
var bulletImage;
var shotTime =0;
var enemyshottime = 0;
var enemysalive =40;
var enemybullet;
boil.Play.prototype = {
    preload: function(){
     game.load.image('ship','Assets/Backgrounds/heroship1.png');
     game.load.image('background','Assets/Backgrounds/background1.png');
     game.load.image('enemy','Assets/Sprites/enemy 1.png');
     bulletImage =game.load.image('bullets','Assets/Sprites/space bullet 2 (3).png');
    },
    create: function(){
         game.physics.startSystem(Phaser.Physics.ARCADE);
         game.add.tileSprite(0, 0, 1000, 900, 'background');
         
        
        enemys = game.add.group();
        enemys.enableBody = true;
        enemys.physicsBodyType = Phaser.Physics.ARCADE;
        
        
        
        for (var y = 0; y < 4; y++)
        {
            for (var x = 0; x < 10; x++)
            {
                
                var enemy2 = game.add.sprite(x * 52 + 30, y * 52 + 20, 'enemy');
                enemy2.anchor.setTo(0.5, 0.5);
                enemy2.scale.setTo(.25,.25);
                enemys.add(enemy2)
                
            }
        }
        
        ship = game.add.sprite(1000,800, 'ship');
        ship.scale.setTo(.5,.5);
        ship.anchor.setTo(0.5, 0.5);
        game.physics.enable(ship, Phaser.Physics.ARCADE);
        ship.body.bounce.set(.75);
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
            ship.body.velocity.x = -1000;
        }
        else if (cursors.right.isDown)
        {
            ship.body.velocity.x = 1000;
        }
        if (fireButton.isDown)
        {
            if (game.time.now - shotTime > 900){
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
    },
    fireBullet: function() {
         bullet =game.add.sprite(ship.position.x - 5,ship.position.y -61 ,'bullets')
        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.body.velocity.y = -1000;
         shotTime =game.time.now
         
    },
    enemyHitship : function(enemybullet,ship){
        enemybullet.kill();
        ship.kill();
        console.log('hitsship')
        shipalive--
    },
    fireenemybullet: function(){
        console.log('firing')
        var random =Math.random()* enemysalive
        
         enemybullet =game.add.sprite(400,300,'bullets')
        game.physics.enable(enemybullet, Phaser.Physics.ARCADE);
        enemybullet.body.velocity.y = 1000;
        enemyshottime =game.time.now
    }
}


