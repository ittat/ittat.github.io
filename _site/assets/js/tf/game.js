class Game {

  constructor(Canvas) {
    this.Canvas = Canvas.getContext("2d");
    this.CanvasX = 80;
    this.CanvasY = 80;
    this.init();
  }


  init() {
    this.y = 8;
    this.x = 8; 
    this.food_local = 0; //食物坐标
    this.size = 8; //蛇身单元大小
    this.direction = 2;   // 1 向上  2 向右   0 左   3下
    //清除畫布
    this.Canvas.clearRect(0,0, this.CanvasX, this.CanvasY);
    this.Canvas.fillStyle = "#006699";//内部填充颜色
    this.Canvas.strokeStyle = "#006699";//边框颜色
    this.Canvas.fillRect(this.x , this.y, this.size, this.size);//绘制矩形
    this.rand_frog();
  }

  next(direction){
    this.direction = direction;
    this.Canvas.clearRect(this.x, this.y, this.size, this.size);
    switch(this.direction){
      case 1:
        this.y -= this.size;
        break;
      case 2:
        this.x += this.size;
        break;
      case 0:
        this.x -= this.size;
        break;
      case 3:
        this.y += this.size;
        break;
    }
    if(this.x > this.CanvasX || this.y > this.CanvasY || this.x<0  || this.y<0){
        // alert("碰壁了.....");
        this.init();
        return -5;
    }else{
      return this.draw();
    }
  }

  draw(){
    this.Canvas.fillStyle = "#006699";//内部填充颜色
    this.Canvas.strokeStyle = "#006699";//边框颜色
    this.Canvas.fillRect(this.x, this.y, this.size, this.size);//绘制矩形
    if((this.food_local)==this.x && (this.food_local)==this.y){  	//吃食物
      this.rand_frog();
      return 5;
    }
    return 0;
  }

  rand_frog(){
    do{
    this.food_local = Math.ceil(Math.random()*(8 - 1) + 1);
    this.food_local *= 8;
    }while(this.food_local == this.x);
    this.Canvas.fillStyle = "#000000";//内部填充颜色
    this.Canvas.strokeStyle = "#000000";//边框颜色
    this.Canvas.fillRect(this.food_local, this.food_local,this.size, this.size);//绘制矩形
  }

//   0
//  1&2   --> 4
//   3    5
  getInfo(){
    var info = new Array(6)
    info[0] = this.y;
    info[1]= this.x;
    info[2] = this.CanvasX - this.x;
    info[3] = this.CanvasY - this.y;
    info[4] = this.food_local - this.x;
    info[5] = this.food_local - this.y;
    return info;
  }

}
