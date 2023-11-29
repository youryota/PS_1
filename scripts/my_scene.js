
// MyScene1クラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MyScene extends Phaser.Scene {

    // シーンの事前読み込み処理
    preload() {
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('sky', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
        this.load.image('jori', 'assets/jori.png');
    }


    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(400, 300, 'sky');
        // const player = this.physics.add.sprite(400, 300, 'taro');
        // this.player = player
        // this.player.angle = 0;
        // this.player_direction = 1;
        const player = this.physics.add.sprite(400, 300, 'taro');
        this.player = player
        const player1 = this.physics.add.sprite(350, 300, 'jori');
        this.player1 = player1
    }

    arrow_move(cursors, object){
    
        if(cursors.left.isDown){
            console.log("Left");
            object.setVelocityX(-200);
    
    
        }else if(cursors.right.isDown){
            console.log("Right!!");
            object.setVelocityX(200);
    
        }else{
            object.setVelocity(0,0);
        }
    }

    arrow_move2(cursors, object){
    
        if(cursors.left.isDown){
            console.log("Left");
            object.setVelocityX(200);
    
    
        }else if(cursors.right.isDown){
            console.log("Right!!");
            object.setVelocityX(-200);
    
        }else{
            object.setVelocity(0,0);
        }
    }
    
  // 毎フレーム実行される繰り返し処理
    update() {
        // if (this.player.x >= D_WIDTH -230 || this.player.y >= D_HEIGHT) this.player_direction = -1;
        // if (this.player.x <= 0 || this.player.y <= 0) this.player_direction = 1;

        // if(this.player_direction == 1){
        //     this.player.setVelocity(100, -100);
        //     this.player.angle += 5;
        //     this.player.setAngle( this.player.angle );
        // }
        let cursors = this.input.keyboard.createCursorKeys();
        this.arrow_move(cursors, this.player);
        this.arrow_move2(cursors, this.player1);
    }

}