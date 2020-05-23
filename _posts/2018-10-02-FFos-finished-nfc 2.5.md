---
layout: post
title: ''
date: 2018-10-02
author: ittat
cover: ''
tags: FirefoxOS B2GOS
---

<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为博主打劫来的文章！！！未经允许可以随便转载。 May you do good and not evil.  May you share freely, never taking more than you give.					https://blog.csdn.net/hunter___/article/details/80442182				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-e2445db1a8.css">
						<div class="htmledit_views">
                <p>1.修改nfcd开关项</p><p>２.修改client 端配置文件，ro.nfc.enabled 的值。</p><p>总结，替换两个文件。</p><p>对比默认配置文件，<br></p><pre><code class="language-html">vimdiff out/target/product/mako/system/build.prop ~/project/nexus4/B2G/out/target/product/mako/system/build.prop </code></pre>修改生成build.prop的文件，通过deviceinfo.sh生成。<p></p><pre><code class="language-html">cp /home/munger/project/ffos-v2.2-mako/device/lge/mako/device.mk device/lge/mako/</code></pre><br><p><br></p><p><br></p>            </div>
                </div>
									
					<script>
						(function(){
							function setArticleH(btnReadmore,posi){
								var winH = $(window).height();
								var articleBox = $("div.article_content");
								var artH = articleBox.height();
								if(artH > winH*posi){
									articleBox.css({
										'height':winH*posi+'px',
										'overflow':'hidden'
									})
									btnReadmore.click(function(){
										articleBox.removeAttr("style");
										$(this).parent().remove();
									})
								}else{
									btnReadmore.parent().remove();
								}
							}
							var btnReadmore = $("#btn-readmore");
							if(btnReadmore.length>0){
								if(currentUserName){
									setArticleH(btnReadmore,3);
								}else{
									setArticleH(btnReadmore,1.2);
								}
							}
						})()
					</script>
					</article>
