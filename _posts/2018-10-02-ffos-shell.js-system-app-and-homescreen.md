<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为博主打劫来的文章！！！未经允许可以随便转载。 May you do good and not evil.  May you share freely, never taking more than you give.					https://blog.csdn.net/hunter___/article/details/81227752				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-e2445db1a8.css">
						<div class="htmledit_views">
                <p>官方文档说shell.js 打开 system app,</p>

<p>shell.js</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180730091720502?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p>system app 打开homescreen ?</p>

<p>b2g.js 导入/打开system app?</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/2018073009000560?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p>&nbsp;system app 再往iframe里加载其他app,如hscr,</p>

<p>&nbsp;<img alt="" class="has" src="https://img-blog.csdn.net/20180730092420564?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p><a href="https://blog.csdn.net/zembers/article/details/48783737" rel="nofollow" target="_blank">https://blog.csdn.net/zembers/article/details/48783737</a></p>

<p>几个问题：</p>

<ol><li>
	<p>homeURL(b2g.system_startup_url):</p>

	<pre class="has" name="code"><code> app://system.gaiamobile.org/index.html

 "app:// for packaged app resources"</code></pre>
	</li>
	<li>
	<p>manifestURL:</p>

	<pre class="has" name="code"><code>app://system.gaiamobile.org/manifest.webapp

"app:// for packaged app resources"</code></pre>
	</li>
	<li>system app实际上是一个iframe</li>
</ol><pre class="has" name="code"><code>    let systemAppFrame =
      document.createElementNS('http://www.w3.org/1999/xhtml', 'html:iframe');</code></pre>

<p>该iframe是放在shell.html中id为”container”中：</p>

<pre class="has" name="code"><code> let container = document.getElementById('container');
 ...
 this.contentBrowser = container.appendChild(systemAppFrame);
 ...</code></pre>

<p>4.systemapp的iframe实际上有一系列属性:</p>

<pre class="has" name="code"><code>    systemAppFrame.setAttribute('id', 'systemapp');
    systemAppFrame.setAttribute('mozbrowser', 'true');
    systemAppFrame.setAttribute('mozapp', manifestURL);
    systemAppFrame.setAttribute('allowfullscreen', 'true');
    systemAppFrame.setAttribute('src', 'blank.html');</code></pre>

<p>system app的iframe里放的是 ‘blank.html’。其它属性：</p>

<pre class="has" name="code"><code>    mozbrowser： 
        An "iframe" is turned into a browser frame by setting the mozbrowser attribute

    mozapp:
        see [mozapp](https://wiki.mozilla.org/Security/Reviews/B2G/mozapp)</code></pre>

<p>system app刚开始加载的是</p>

<pre class="has" name="code"><code>'blank.html'，</code></pre>

<p>也就是没有界面的，之后开始加载</p>

<pre class="has" name="code"><code>homeURL，即"app://system.gaiamobile.org/index.html"</code></pre>

<p>“system.gaiamobile.org”，实际上就是gaia里的system app。该app负责系统ui的显示以及home应用的加载等工作。</p>

<p>问题是：</p>

<pre class="has" name="code"><code>b2g进程、system进程与Home进程的关系是什么样的? Home进程是如何创建出来的？</code></pre>

<p>system app 是个iframe,</p>

<p>&nbsp;</p>            </div>
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
