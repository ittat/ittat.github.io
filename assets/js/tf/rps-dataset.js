class RPSDataset {
  constructor() {
    this.labels = []
  }


//labels 推入labels ， addExample合并成xs數組
//keep可以保證tf變量不被dispose？？
addExample(example, label) {
    if (this.xs == null) {
      this.xs = tf.keep(example);
      this.labels.push(label);
    } else {
      const oldX = this.xs;
      //concat 连接两个或多个数组
      this.xs = tf.keep(oldX.concat(example, 0));
      this.labels.push(label);
      oldX.dispose();
    }
  }
  

  //分類數目？？
  //將labels[n] = 0、1、2  --> ys = {[1,0,0],[0,1,0],[0,0,1],...} ??
  encodeLabels(numClasses) {
    for (var i = 0; i < this.labels.length; i++) {
      if (this.ys == null) {
        //？？？？？？？？？？？？？？？？？？？？？？？？？？
        //tf.oneHot (indices, depth, onValue?, offValue?)
        //indices = tf.tensor1d
        //depth = numClasses
        //
        //tf.tensor1d([3.01]).toInt() = [3]
        //tf.oneHot(4, 5) = [0,0,0,0,1]
        //
        //oldY.concat(y, 0) = [oldY, y, 0] ?? 0是幹嗎的？？？
        //
        this.ys = tf.keep(tf.tidy(
            () => {return tf.oneHot(
                tf.tensor1d([this.labels[i]]).toInt(), numClasses)}));
      } else {
        const y = tf.tidy(
            () => {return tf.oneHot(
                tf.tensor1d([this.labels[i]]).toInt(), numClasses)});
        const oldY = this.ys;
        this.ys = tf.keep(oldY.concat(y, 0));
        oldY.dispose();
        y.dispose();
      }
    }
  }
}
