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
        this.load.image('jori', 'assets/jori.png');
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
        const player1 = this.physics.add.sprite(350, 300, 'jori');
        this.player1 = player1
        this.text1 = this.add.text(600,400,'MyWorld').setFontSize(32).setColor('#FF0');
        this.hanako = this.physics.add.sprite(100, 100, 'hanako');
    }

    moveHanako() {
        this.input.keyboard.on('keydown-W', () => {
            // 'w'キーが押されたらHanakoオブジェクトを座標 (100～400, 100) に動的に配置する
            const xPosition = Phaser.Math.Between(100, 400); // X座標をランダムに選択
            this.hanako.setPosition(xPosition, 100); // Hanakoオブジェクトの位置を更新
        });
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

         // キーボードのイベントを設定する
         this.input.keyboard.on('keydown-A', () => {
            this.add.text(100, 50, 'Hello!');
        });

        this.input.keyboard.on('keydown-S', () => {
            this.add.text(100, 50, 'Hey!');
        });

        // this.input.keyboard.on('keydown-D', () => {
        //     // 文字列を消すために、すでに表示されているテキストを取得して破棄する
        //     this.children.each((child) => {
        //         if (child instanceof Phaser.GameObjects.Text) {
        //             child.destroy();
        //         }
        //     });
        // });
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
        this.moveHanako();
    }

    update(time, delta) {
        let cursors = this.input.keyboard.createCursorKeys();
        this.arrow_move(cursors, this.player);
        this.arrow_move2(cursors, this.player1);
        this.moveHanako();

        // 3秒ごとにhanakoをランダムな位置に移動する
        this.hanakoTimer += delta; // 経過時間を加算
        if (this.hanakoTimer > 3000) { // 3000ミリ秒（＝3秒）経過したら
            this.hanakoMoveFlag = true; // フラグを立てる
            this.hanakoTimer = 0; // タイマーをリセット
        }

        // hanakoを移動するフラグが立っている場合にランダムな位置に配置する
        if (this.hanakoMoveFlag) {
            const xPosition = Phaser.Math.Between(200, 400); // X座標をランダムに選択
            const yPosition = Phaser.Math.Between(100, 200); // Y座標をランダムに選択
            this.hanako.setPosition(xPosition, yPosition); // hanakoの位置を更新
            this.hanakoMoveFlag = false; // フラグをリセット
        }

        // taroとhanakoの衝突判定
        this.physics.overlap(this.player, this.hanako, this.collisionHandler, null, this);
    }

    // taroとhanakoが衝突したときの処理
    collisionHandler(player, hanako) {
        hanako.disableBody(true, true); // hanakoの物理エンジンを停止
        this.add.text(100, 150, '痛い！', { fontFamily: 'Meiryo', fontSize: '24px', fill: '#ff0000' });
    }
}

