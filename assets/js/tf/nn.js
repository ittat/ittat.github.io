class Nn {

  constructor(numClasses) {
    // let model;
    this.numClasses = numClasses;
    this.ys = null;
    this.xs = null;
    this.model = null;
    this.traindone = 0;
  }

initModel(){
  // define A model sequential --> layers --> compile
  this.model = tf.sequential({
    layers:[
      tf.layers.dense({units:100, activation:'relu',inputShape:[6]}),
      tf.layers.dense({units:600, activation:'relu'}),
      tf.layers.dense({units:500, activation:'relu'}),
      tf.layers.dense({units:500, activation:'relu'}),
      tf.layers.dense({units:400, activation:'relu'}),
      tf.layers.dense({units:300, activation:'relu'}),
      tf.layers.dense({units:200, activation:'relu'}),
      tf.layers.dense({units:100, activation:'relu'}),
      tf.layers.dense({units:80, activation:'relu'}),
      tf.layers.dense({units:40, activation:'relu'}),
      tf.layers.dense({units:20, activation:'relu'}),
      tf.layers.dense({units:4,   activation: 'softmax'}),
    ]
  });


  const optimizer = tf.train.adam(0.0001);
  this.model.compile({optimizer: optimizer, loss: 'categoricalCrossentropy'});
}

//定義model 基於mobilenet ？
//在 MobileNet 预测的基础上添加一个自定义的分类器
//可快速实现的CNN迁移学习方法
train() {
  let loss = 0;
  // console.log('this.xs: ' + this.xs);
  // console.log('this.ys: ' + this.ys);
  //訓練模型
  // fit()用于使用给定输入训练模型.
  // predict()用于实际预测.它为输入样本生成输出预测.
  // evaluate()用于评估已经训练过的模型.返回损失值&模型的度量值.
  //epochs 訓練輪數 10？
  //训练的核心方法是调用model.fit(x,y,config)方法。x是训练数据，y是训练的分类标签。config是可选项。
  if(this.traindone == 0){
      this.traindone = 1;
      this.model.fit(this.xs, this.ys, {
        epochs: 20,
        callbacks: {
          onBatchEnd: async (batch, logs) => {
            loss = logs.loss.toFixed(5);
            console.log('LOSS: ' + loss);
            }
          },
      }).then(()=>{
        console.log('train Done');
        this.traindone = 0;
      });
}

}


predict(example){
  // console.log('Pre_y: ' + this.model.predict(input));
  var temp_x = tf.tensor2d([example[0],example[1],example[2],example[3],example[4],example[5]],[1,6]);
  return this.model.predict(temp_x);
}

  //分類數目？？
  //將labels[n] = 0、1、2  --> ys = {[1,0,0],[0,1,0],[0,0,1],...} ??
encodeLabelsAndAddYs(numClasses,label) {
      if (this.ys == null) {
        //tf.oneHot (indices, depth, onValue?, offValue?)
        //indices = tf.tensor1d
        //depth = numClasses
        //
        //tf.tensor1d([3.01]).toInt() = [3]
        //tf.oneHot(4, 5) = [0,0,0,0,1]
        //
        //oldY.concat(y, 0) = [oldY, y, 0] ?? 0是幹嗎的？？？
        //
        this.ys = tf.keep(tf.tidy(() => {return tf.oneHot(tf.tensor1d([label]).toInt(), numClasses)}));
      } else {
        const y = tf.tidy(() => {return tf.oneHot(tf.tensor1d([label]).toInt(), numClasses)});
        this.ys =  tf.keep( tf.tidy(() =>{
          const oldY = this.ys;
          return oldY.concat(y,0);
        }));
      }

  }

//labels 推入labels ， addExample合并成xs數組
//keep可以保證tf變量不被dispose？？
//add example --> xs\yx
addExample(example, label) {
  var temp_x = tf.tensor2d([example[0],example[1],example[2],example[3],example[4],example[5]],[1,6]);
  if (this.xs == null) {
    this.xs = tf.keep(temp_x);
    // this.labels.push(label);
  } else {
    const oldX = this.xs;
    //concat 连接两个或多个数组
    this.xs = tf.keep(oldX.concat(temp_x),0);
    // this.labels.push(label);
    // oldX.dispose();
  }

  // console.log('this.xs: ' + this.xs);
  this.encodeLabelsAndAddYs(this.numClasses,label);
}

async downloadsModel() {
await this.model.save('downloads://my-model');
}

async localstorageModel() {
  await this.model.save('localstorage://my-model');
  }
async updateModel(uploadJSONInput,uploadWeightsInput) {
  // this.model = await tf.loadLayersModel('localstorage://my-model');
  this.model = await tf.loadLayersModel(tf.io.browserFiles(
    [uploadJSONInput.files[0], uploadWeightsInput.files[0]]));
    this.ys = null;
    this.xs = null;
    const optimizer = tf.train.adam(0.0001);
    this.model.compile({optimizer: optimizer, loss: 'categoricalCrossentropy'});
}

async updateModelFromlocalstorage() {
  await tf.loadLayersModel('localstorage://my-model');
  // this.clearData();
}

clearData() {
  this.ys = null;
  this.xs = null;
  }
}
