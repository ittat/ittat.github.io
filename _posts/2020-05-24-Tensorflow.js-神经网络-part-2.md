<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"> </script>
  <script src="../../../assets/js/tf/webcam.js"></script>
  <script src="../../../assets/js/tf/rps-dataset.js"></script>
  <!-- <script src="https://unpkg.com/@tensorflow-models/mobilenet"></script> -->
</head>
<body>
  <h1 style="text-align: center;"> Tensorflow.js 线性回归part1 </h1>
  <h3 style="text-align: center;"> 看源码 </h3>
	<div>
		<div>
			<video autoplay playsinline muted id="wc" width="224" height="224"></video>
		</div>
	</div>
	<button type="button" id="0" onclick="handleButton(this)" >Rock</button>
	<button type="button" id="1" onclick="handleButton(this)" >Paper</button>
	<button type="button" id="2" onclick="handleButton(this)" >Scissors</button>
	<div id="rocksamples">Rock Samples:</div>
	<div id="papersamples">Paper Samples:</div>
	<div id="scissorssamples">Scissors Samples:</div>
	<button type="button" id="train" onclick="doTraining()" >Train Network</button>
	<div id="dummy">Once training is complete, click 'Start Predicting' to see predictions, and 'Stop Predicting' to end</div>
	<button type="button" id="startPredicting" onclick="startPredicting()" >Start Predicting</button>
	<button type="button" id="stopPredicting" onclick="stopPredicting()" >Stop Predicting</button>
	<div id="prediction"></div>
</body>

<script>

let mobilenet;
let model;
const webcam = new Webcam(document.getElementById('wc'));
const dataset = new RPSDataset();
var rockSamples=0, paperSamples=0, scissorsSamples=0;
let isPredicting = false;


//範圍 tf.model  還 定義了mobilenet？
async function loadMobilenet() {
	//转换后的 Keras 模型的 API
	//https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json v2？？
	//tf.loadGraphModel("https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_075_96/feature_vector/3/default/1", { fromTFHub: true })
	//https://tfhub.dev/ 有現成模型
  const mobilenet = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
//   const mobilenet = mobilenet.load();
  const layer = mobilenet.getLayer('conv_pw_13_relu');
  return tf.model({inputs: mobilenet.inputs, outputs: layer.output});
}


//定義model 基於mobilenet ？
//在 MobileNet 预测的基础上添加一个自定义的分类器
//可快速实现的CNN迁移学习方法
async function train() {
  dataset.ys = null;
  dataset.encodeLabels(3);
  // define A model sequential --> layers --> compile
  model = tf.sequential({
    layers: [
      tf.layers.flatten({inputShape: mobilenet.outputs[0].shape.slice(1)}),
      tf.layers.dense({ units: 100, activation: 'relu'}),
      tf.layers.dense({ units: 3, activation: 'softmax'})
    ]
  });
  const optimizer = tf.train.adam(0.0001);
  model.compile({optimizer: optimizer, loss: 'categoricalCrossentropy'});


  let loss = 0;
  //訓練模型
  // fit()用于使用给定输入训练模型.
  // predict()用于实际预测.它为输入样本生成输出预测.
  // evaluate()用于评估已经训练过的模型.返回损失值&模型的度量值.
  //epochs 訓練輪數 10？
  //训练的核心方法是调用model.fit(x,y,config)方法。x是训练数据，y是训练的分类标签。config是可选项。
  model.fit(dataset.xs, dataset.ys);
}


function handleButton(elem){
	switch(elem.id){
		case "0":
			rockSamples++;
			document.getElementById("rocksamples").innerText = "Rock samples:" + rockSamples;
			break;
		case "1":
			paperSamples++;
			document.getElementById("papersamples").innerText = "Paper samples:" + paperSamples;
			break;
		case "2":
			scissorsSamples++;
			document.getElementById("scissorssamples").innerText = "Scissors samples:" + scissorsSamples;
			break;
	}
	label = parseInt(elem.id);//？
	const img = webcam.capture();
	// dataset.addExample(mobilenet.predict(img), label);

	const activation = mobilenet.infer(img, 'conv_preds');
    // Pass the intermediate activation to the label.
    dataset.addExample(activation, label);

}

async function predict() {
  while (isPredicting) {
    const predictedClass = tf.tidy(() => {
      const img = webcam.capture();
      const activation = mobilenet.predict(img);  //？
      const predictions = model.predict(activation);  //？
      return predictions.as1D().argMax();  //獲取最大概率的結果？
    });
    const classId = (await predictedClass.data())[0];
    var predictionText = "";
    switch(classId){
		case 0:
			predictionText = "I see Rock";
			break;
		case 1:
			predictionText = "I see Paper";
			break;
		case 2:
			predictionText = "I see Scissors";
			break;
	}
	document.getElementById("prediction").innerText = predictionText;
			
    
	predictedClass.dispose();
	//tf.nextFrame() 返回一个Promise，主要用于Web动画 ？？？
    await tf.nextFrame();
  }
}


function doTraining(){
	train();
}

function startPredicting(){
	isPredicting = true;
	predict();
}

function stopPredicting(){
	isPredicting = false;
	predict();
}

async function init(){
	await webcam.setup();
	mobilenet = await loadMobilenet();
	tf.tidy(() => mobilenet.predict(webcam.capture()));
		
}


init();

</script>
</html>
