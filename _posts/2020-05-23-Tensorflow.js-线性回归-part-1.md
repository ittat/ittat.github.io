
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.7.0/dist/tf.min.js"></script>

<h1 style="text-align: center;"> Tensorflow.js 线性回归part1 </h1>
<h3 style="text-align: center;"> 看源码 </h3>
<div id="printf_result"></div>
<div id="printf_loss"></div>

<script type="module" > 
// import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest';
function printf_result(input){
  var out = document.getElementById("printf_result");
  var str_p = document.createElement("p");
  var str = document.createTextNode(input);
  str_p.appendChild(str);
  out.appendChild(str_p);
}
function printf_loss(input){
  var out = document.getElementById("printf_loss");
  out.innerHTML = input;
}
const x= tf.variable(tf.scalar(9));
const data_x = tf.tensor1d([1,2,3,4,5,6,7,8,9]);
const data_y = data_x.add(0);
const w = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
function f(x){
  return x.mul(w).add(b);
}
function loss(pre_y,y){
  return pre_y.sub(y).square().mean();
}
const learningRate=0.01;
const numIterations = 1000;
const optimizer = tf.train.sgd(learningRate);

// Train the model.
for (let i = 0; i < numIterations; i++) {
  optimizer.minimize(() => {
    const loss_r = loss(f(data_x), data_y);
    printf_loss(loss_r);
    return loss_r;
  });
}
printf_result('w:'+w);
printf_result('b:'+b);
printf_result('f:'+f(tf.scalar(18)));
// printf_result('test:'+ tf.oneHot(tf.tensor1d([0]).toInt(), 5));
// tf.tensor1d([1]).toInt()


</script>
