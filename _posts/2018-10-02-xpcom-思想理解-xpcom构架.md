<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为博主打劫来的文章！！！未经允许可以随便转载。 May you do good and not evil.  May you share freely, never taking more than you give.					https://blog.csdn.net/hunter___/article/details/80562769				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-e2445db1a8.css">
						<div class="htmledit_views">
                <p>１．xpcom的思想核心，将接口与实现分开，接口写在固定的idl文件。具体的实现则是相应的c++或js文件。</p><p>这样的目的是使得所定义的接口可在全范围内使用，只要引了.idl？？？是这样吗？</p><p>２．所以创建一个xpcom 组件的方法是什么呢？？？</p><p>idl file. js implement file.这是实现部分？？？如何使用呢？？</p><p>通过xpcom.component.xxx来注册使用。所以以上文件只是实现用的。具体调用还得另一个文件来引用组件，通过语句来注册调用。</p><p>３．在idl 定义接口文件。</p><p>idl文件:接口定义文件。即你的这个xpcom有哪些接口。</p><p>.h文件：由xpidl工具对idl文件“编译”后生成。里面有.cpp的实现模版，专门供你来实现具体的功能。</p><p>.xpt文件:同.h文件，是xpidl工具通过.idl文件生成的xp type文件。里面包含了些什么？</p><p>.cpp文件:自己实现的xpcom 模块功能。那.js 方式的实现呢有吗？直接生成一个.xpt就完事？自己按照什么去写.js文件呢？应该是所有组件的实现是用Ｃ++,js ,c 来写，可以用C++或者js来调用，用的比较多的是js来调用，因为简单且与上层有关系。组件间也可以相互调用相关接口实现相关功能。<br></p><p>.manifest文件：定义了gecko 启动时去注册哪个xpcom组件。</p><p>.moz.build所以的这些编译都放在此文件中来“打包”进系统。<br></p><p>４．gecko与xpcom的关系</p><p>gecko is an engine of h5 js css webpages.可以理解成，gecko 是一堆xpcom　组件？？？。gecko 只是浏览器的内核（渲染引擎），其相关子功能模块用xpcom 来实现？？？所有？在源码目录中的表现形式怎样？<br></p><p><br></p><p>5.js 与xpcom 通过xpconnect 组件进行连接。</p><p>６．下层c++与js 的关系是什么，通过调用组件？组件有c++，js实现的,他们如何联系？</p><p><br></p><p>７．gecko 的整个架构是怎么样的？</p><p><br></p><p>８．xpcom 组件主要通过js 访问，因为访问方便，也可以通过c++来使用这些组件。xpcom组件则可以用c++来实现或者js 来实现？？？对的。开启浏览器时，manifest 会注册组件，所以无论js 还是c++实现的都可以用，只要查到那个接口就可以使用，就是插件而已？？？<br></p><p>copy some doc:<br></p><p>从其他类型的语言访问接口, 常常说成是接口被<em>反射(reflected)</em>到这种语言. 每一个被反射的接口必须提供相应的类型库（xpt）. 当前可以使用 C, C++, 和 JavaScript 来编写组件.<br></p><p><br></p><p>XPCOM 的目标是使软件的不同部分分别开发, 相互独立. 为了是应用的不同组件之间能够互操作, XPCOM 把组件的<em>实现</em>与<em>接口</em>(后面讨论<a href="https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XPCOM/Guide/Creating_components/An_Overview_of_XPCOM#%E6%8E%A5%E5%8F%A3" rel="nofollow" target="_blank">接口</a>)分开. 同时 XPCOM 还提供了加载和操纵这些组件的库和工具以及服务, 以帮助开发人员编写跨平台的代码和组件版本管理; 因此组件可以在不破坏应用或者重新生成应用的同时被替换被更新. 通过使用 XPCOM, 开发人员创建的组件可以在不同的应用中被重用, 或者替换当前应用中的组件以改变应用的功能.</p><p>XPCOM 不只提供组件软件开发的支持, 它同时提供一个开发平台的大多数功能的支持:</p><ul><li>组件管理</li><li>文件抽象</li><li>对象消息传递</li><li>内存管理</li></ul><p>我们将在后面的章节中详细讨论上面的条目, 但是现在, 仅仅把 XPCOM 想象成一个 <em>组件开发平台</em>, 它提供了上面的这些特性.</p><br><p>xpcshsell 是 Mozilla 内嵌的 XPCOM 工具, 它是 JavaScript 的命令行解释器.<br></p><p>XPCOM 强加的契约打开了一扇通往<em>二进制互操作</em>技术的大门. - 这是一种能够在运行时刻访问, 使用, 重用 XPCOM 组件的技术, 这种技术能够保证用某种语言编写的组件能够被其他的语言所访问.</p><p>JavaScript 是 Mozilla 浏览器的喉舌, 它把自己与 XPCOM 紧紧地绑定在一起. XPCOM 的这种<em>可扩展</em>能力 - 从 XPConnect 绑定的语言中访问组件的能力, 是 XPCOM 的一个关键属性.</p><p>Mozilla 并不能将所有的 API 都写成 XPCOM 组件的形式, 但是绝大多数浏览器的典型功能都是用 XPCOM 的组件形式实现的, 因此可以被嵌入和扩展.</p><p>一旦我们使用接口来获的了某个组件, 我们就可以询问该组件是否支持其他的接口. 这种基本服务由 <code>nsISupports</code> 接口提供, 会由所有的 XPCOM 组件继承; 它允许我们查询组件的接口, 并在接口之间进行切换; 它展现了 XPCOM 的<em>运行时刻确定类型</em>的能力. 它由 <code>QueryInterface</code> 方法实现, 我们将在后面<a href="https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XPCOM/Guide/Creating_components/cn/Creating_XPCOM_Components/%E4%BB%80%E4%B9%88%E6%98%AF_XPCOM%3F" rel="nofollow" target="_blank">什么是 XPCOM?</a>一章中介绍. <a href="https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XPCOM/Guide/Creating_components/cn/XPCOM_API_Reference" rel="nofollow" target="_blank">XPCOM API Reference</a> 中提供了完整的 XPCOM 组件的索引.</p><p>例子：<br></p><h4><strong>WebLock</strong> 组件</h4><p>现在我们把 <strong>WebLock</strong> 组件看成另一个 XPCOM 组件的例子. 在面向对象编程中, 通常是先设计接口 - 首先定义要提供的功能, 而不是考虑如何实现这些功能. 因此我们把实现这个组件的细节问题放到下一章, 这一章先考虑从外部如何看待这个组件. - 即定义 WebLock 组件的接口.</p><p><strong>IWebLock 接口</strong></p><table><thead><tr><th><code>lock</code></th>  <th>锁定浏览器到当前站点, 或者是磁盘上保存的某个白名单上的站点.</th></tr></thead><tbody><tr><td><code>unlock</code></td>  <td>解开浏览器锁定, 开放访问所有站点.</td></tr><tr><td><code>addSite</code></td>  <td>添加一个新的站点到白名单.</td></tr><tr><td><code>removeSite</code></td>  <td>从白名单上删除某个站点.</td></tr><tr><td><code>sites</code></td>  <td>枚举白名单上的站点.</td></tr></tbody></table><p>WebLock 组件就是要实现上面接口定义的功能. 它在浏览器启动的时候, 注册自己. 当用户或者管理员点击浏览器上的 weblock 图标时, 类厂会创建对象实例.</p><p>Mozilla 包含了 Gecko 提供的查找和显示组件信息的工具 -<em>XPCOM 组件观察器</em><a href="http://lxr.mozilla.org/" rel="nofollow" target="_blank">LXR</a>.</p><p>提供 XPCOM 组件信息的主要问题是, Mozilla 接口在不断的发展, 试图选择一个冻结的断面是困难的. 组件观察器的实现并没有考虑组件是否已被冻结, 在 LXR 中我们会发现, 被冻结的接口会在头部标记 <code>@status frozen</code>.</p><p><code>Components</code> 是用来控制到组件连接的JavaScript对象, 而<code>classes</code> 是一组所有你可以根据契约ID来查询的对象。为了在Javascript中实例化XPCOM组件，你创建一个新的<code>Component</code>对象同时传入你所需要查询的组件契约ID，返回的可能是一个singleton或者一个实例。</p><pre class="prettyprint" name="code"><code class="hljs avrasm has-numbering">var cmgr = Components<span class="hljs-preprocessor">.classes</span>[<span class="hljs-string">"@mozilla.org/cookiemanager;1"</span>]
                     <span class="hljs-preprocessor">.getService</span>()<span class="hljs-comment">;</span></code></pre><p><code>cookiemanager</code> 对象的结果提供组件的所有在IDL中编译好然后编译到类型库（.xpt）中的方法的入口。 使用CookieManager组件, 你可以写如下的代码来完成从系统中清除所有cookies的操作：</p><pre class="prettyprint" name="code"><code class="hljs avrasm has-numbering">cmgr = Components<span class="hljs-preprocessor">.classes</span>[<span class="hljs-string">"@mozilla.org/cookiemanager;1"</span>]
                 <span class="hljs-preprocessor">.getService</span>()<span class="hljs-comment">;</span>
cmgr = cmgr<span class="hljs-preprocessor">.QueryInterface</span>(Components<span class="hljs-preprocessor">.interfaces</span><span class="hljs-preprocessor">.nsICookieManager</span>)<span class="hljs-comment">;</span>

// delete all cookies
function trashEm() {
   cmgr<span class="hljs-preprocessor">.removeAll</span>()<span class="hljs-comment">;</span>
}</code></pre><p>这个例子所展示的另外一个关键的XPConnect特性的是可以在所有从XPCOM映射到javascript的对象上执行的<code>QueryInterface</code>方法。如同在C++中, 你可以使用这个方法询问给定对象的别的接口</p>            </div>
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
