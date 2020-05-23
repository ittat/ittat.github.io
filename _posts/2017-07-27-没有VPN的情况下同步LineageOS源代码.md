---
layout: post
title: '没有VPN的情况下同步LineageOS源代码'
date: 2017-08-27
author: ittat
cover: 'http://www.youbangsheji.com/UploadFiles/2017-01/sitemanager/2017011009013129096.jpg'
tags: Lineage Android complie
---

##在没有VPN的情况下同步LineageOS14.1源代码

# 在没有FQ的情况下同步lineageos的源代码前几天刚刚将lineage的14.1有代码同步到本地，.repo超过60个GB。唉，只能怪天朝的城墙太高了。

> lineage就如同一把好刀（不锈钢的噢），在城外叫的GitHub“练钢场”有这种lineage不锈钢原料购买，而刀模要在城外的Google“打铁铺”进口。 公元二十一世纪初，天朝开始“闭关锁城”，天朝下令封禁Google。于是就有了一群会翻墙的“码侠”出现了...

### 原理
在GitHub上的lineage OS库会除了会同步lineage的代码外，还会同步一些来自AOSP的源代码(在lineage库里的default.xml有定义），而恰好就是这些AOSP的同步源被墙了，所以我修改为国内清华大学镜像站的AOSP库来同步这些代码。

### 开始
工作环境： **Ubuntu 16** 
>  安装git 、curl 

```
sudo apt-get updatesudo apt-get upgradesudo apt-get install git curl
``` 
> 安装repo工具

```
curl https://dl-ssl.google.com/dl/googlesource/git-repo/repo > ~/bin/repo
chmod a+x ~/bin/repo 
```
>进入同步源码目录，初始化repo

```
repo init -u git://github.com/LineageOS/android.git -b cm-14.1
```
> 修改default.xml 的AOSP同步源

```
vim ./. repo/default.xml
```

找到的下面位置

```
<remote  name="aosp"
           fetch="https://android.googlesource.com"
           review="android-review.googlesource.com"
           revision="refs/tags/android-7.1.2_r29" />
```
将

```
fetch="https://android.googlesource.com"
```
改成

```
fetch="https://aosp.tuna.tsinghua.edu.cn"
```
 **OK**  
> 开始进入同步时间

```
repo sync -j10 -f
```

接下来，刷刷微博，看看书，睡觉，60多G，全速走你
