class MyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MyScene', active: true });
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
    }

    create() {
        this.add.image(D_WIDTH/2, D_HEIGHT/2, 'background');
        this.taro = this.add.image(D_WIDTH/2, D_HEIGHT/2, 'taro');
        this.text = this.add.text(10, 10, 'Scene 1').setFontSize(32).setColor('#ff0');
        this.taro.angle = 0; // taroの角度を初期化
        this.player_direction = 1;
    }

    update() {
        if (this.taro.x >= D_WIDTH - 230 || this.taro.y >= D_HEIGHT) this.player_direction = -1;
        if (this.taro.x <= 0 || this.taro.y <= 0) this.player_direction = 1;

        if (this.player_direction == 1) {
            this.taro.y += 5;
            this.taro.x += 5;
        } else {
            this.taro.y -= 5;
            this.taro.x -= 5;
        }

        this.taro.angle += 5; // 角度を5度ずつ増やす

        // 45度方向に移動
        const radian = Phaser.Math.DegToRad(this.taro.angle); // 角度をラジアンに変換
        const moveX = 5 * Math.cos(radian); // X方向の移動量
        const moveY = 5 * Math.sin(radian); // Y方向の移動量
        this.taro.x += moveX;
        this.taro.y += moveY;
    }
}
