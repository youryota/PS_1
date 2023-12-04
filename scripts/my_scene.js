// MyScene1クラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MyScene extends Phaser.Scene {
      constructor() {
        super({ key: 'MyScene' });
        this.hanakoMoveFlag = false; // hanakoの移動フラグを設定
        this.hanakoTimer = 0; // タイマーを初期化
    }

    // シーンの事前読み込み処理
    preload() {
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('sky', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
        //this.load.image('jori', 'assets/jori.png');
        this.load.image('hanako', 'assets/hanako.png');
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
        //const player1 = this.physics.add.sprite(350, 300, 'jori');
        // this.player1 = player1
        // this.text1 = this.add.text(600,400,'MyWorld').setFontSize(32).setColor('#FF0');
        this.hanako = this.physics.add.sprite(100, 100, 'hanako');
        this.time.addEvent({
            delay: 3000, // 3秒後に処理を実行
            callback: this.moveHanakoRandomly,
            callbackScope: this,
            loop: true // 繰り返し実行
        });
        this.physics.add.overlap(this.player, this.hanako, this.taroHitsHanako, null, this);
    }

    taroHitsHanako() {
        this.add.text(100, 150, '痛い！', { fontFamily: 'Meiryo', fontSize: '24px', fill: '#fff' });
        this.hanako.disableBody(true, true); // hanako の物理エンジンを停止
        this.stopProgram = true; // 追加：プログラム停止フラグをセット
    }

    moveHanakoRandomly() {
        const xPosition = Phaser.Math.Between(200, 400); // X座標をランダムに選択
        const yPosition = Phaser.Math.Between(100, 200); // Y座標をランダムに選択
        this.hanako.setPosition(xPosition, yPosition); // Hanakoオブジェクトの位置を更新
    }

    moveHanako() {
        this.input.keyboard.on('keydown-W', () => {
            // 'w'キーが押されたらHanakoオブジェクトを座標 (100～400, 100) に動的に配置する
            const xPosition = Phaser.Math.Between(100, 400); // X座標をランダムに選択
            this.hanako.setPosition(xPosition, 100); // Hanakoオブジェクトの位置を更新
        });
    }

    arrow_move(cursors, object){
       if(cursors.up.isDown){
            console.log("Up!!");
            object.setVelocityY(-200);// 上方向の速度を設定
            
        }else if(cursors.down.isDown){
            console.log("down!!");
            object.setVelocityY(200);// 下方向の速度を設定
    
        }else if(cursors.left.isDown){
            console.log("Left");
            object.setVelocityX(-200);
    
    
        }else if(cursors.right.isDown){
            console.log("Right!!");
            object.setVelocityX(200);
    
        }else{
            object.setVelocity(0,0);
        }
    }

    // arrow_move2(cursors, object){
    //     if(cursors.left.isDown){
    //         console.log("Left");
    //         object.setVelocityX(200);
    //     }else if(cursors.right.isDown){
    //         console.log("Right!!");
    //         object.setVelocityX(-200);
    //     }else{
    //         object.setVelocity(0,0);
    //     }

    //      // キーボードのイベントを設定する
    //      this.input.keyboard.on('keydown-A', () => {
    //         this.add.text(100, 50, 'Hello!');
    //     });

        // this.input.keyboard.on('keydown-S', () => {
        //     this.add.text(100, 50, 'Hey!');
        // });

        // this.input.keyboard.on('keydown-D', () => {
        //     // 文字列を消すために、すでに表示されているテキストを取得して破棄する
        //     this.children.each((child) => {
        //         if (child instanceof Phaser.GameObjects.Text) {
        //             child.destroy();
        //         }
        //     });
        // });
    //}
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
        //this.arrow_move2(cursors, this.player1);
        this.moveHanako();
    }

}