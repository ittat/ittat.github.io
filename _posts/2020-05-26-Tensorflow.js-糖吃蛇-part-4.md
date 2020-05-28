
<html>
<head>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"> </script>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script src="../../../assets/js/tf/game.js"> </script>
<script src="../../../assets/js/tf/nn.js"> </script>
</head>
<body>
  <h1 style="text-align: center;"> Tensorflow.js part3 </h1>
  <h3 style="text-align: center;"> 看源码 </h3>
<canvas id="Canvas" width="80" height="80" style="border:1px solid #c3c3c3;"></canvas>
	<button type="button" id="startPredicting" onclick="starttrain()" >start train</button>
	<button type="button" id="stopPredicting" onclick="Predicting()" >Predicting</button>
  <button type="button" id="stopPredicting" onclick="StopPredicting()" >StopPredicting</button>
  <button type="button" id="stopPredicting" onclick="clearData()" >clearData</button>
	<button type="button" id="outputModel" onclick="outputModel()" >outputModel</button>
  <button type="button" id="downloadsModel" onclick="downloadsModel()" >downloadsModel</button>
  <input type="file" name="file" id="upload-json">
  <input type="file" name="file" id="upload-weights">
  <button type="button" id="sinputModelave" onclick="inputModel()" >inputModel</button>
  <input type="button" value="下载預訓練模型" onclick="Download()"/>
  <div id="download"></div>
  <p id="otl_score" ></p>
<script>
  const game = new Game(document.getElementById('Canvas'));
  const html_otl_score = document.getElementById('otl_score');
  game.init();
  var Predict = 0;
  var achieve = 0;
  var otl_score = 0;
  const nn = new Nn(4);
  nn.initModel();
  function recarddata(){
    document.onkeydown = function(event) {  //改变蛇方向
      if(event.keyCode >= 37 && event.keyCode <= 40){
        var code = event.keyCode - 37;
        var x = game.getInfo();
        var y = code;
        nn.addExample(x,y);
        if(game.next(code) == -5){
          return false;
        }
      }
    }
  }
  recarddata();
 function starttrain(){
     nn.train();
    // console.log(nn.train());
  }
function Predicting(){
    //使用方法名字执行方法
    Predict = 1;
    autoDo(); // 移动蛇
  }
function  StopPredicting(){
    Predict = 0;
}
function autoDo(){
    console.log('autoDo');
    var x = game.getInfo();
    var pre_y = nn.predict(x);
    // console.log('pre_y:'+pre_y);
    pre_y.array().then(array => {
      max = 0;
      diert =0;
      for(a=0;a<4;a++){
        if(max < array[0][a]){
          max = array[0][a];
          diert = a;
        }
      }
      var score = game.next(diert);
      otl_score += score;
      html_otl_score.innerHTML = otl_score;
      // if(score == 5){
        // ++achieve;
        // if(achieve == 40){
        // nn.train();
        // nn.clearData();
        // Predict = 0;
        // }
      // }
      // if(score != -5){
      //   nn.addExample(x,pre_y);
      // }
      // if(score == -5){
      //   nn.clearData();
      //   achieve = 0;
      // }
      if(Predict == 1){
        setTimeout("autoDo()","70");  
      }
    });
  }   
  function outputModel(){
    nn.downloadsModel();
  }
  function inputModel(){
    const uploadJSONInput = document.getElementById('upload-json');
    const uploadWeightsInput = document.getElementById('upload-weights');
    //  console.log('uploadJSONInput:'+uploadJSONInput.files[0]);
    nn.updateModel(uploadJSONInput,uploadWeightsInput);
  }
  function clearData(){
    nn.clearData();
  }
  function downloadsModel(){
    window.open("../../../assets/js/tf/nn.js");
  }
function Download(){
  var download = $("#download");
  download.append("<a id=\"down1\" href=\"../../../assets/js/tf/my-model.json\" target=\"_blank\" download=\"my-model.json\" style=\"display:none\">下载預訓練模型1</a>");
  download.append("<a id=\"down2\" href=\"../../../assets/js/tf/my-model.weights.bin\" target=\"_blank\" download=\"my-model.json\" style=\"display:none\">下载預訓練模型2</a>");
  console.log(download);
  $("#down1")[0].click();
  $("#down2")[0].click();
}

</script>
</body>
</html>