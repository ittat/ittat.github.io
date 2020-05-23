<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								            <div class="markdown_views">
							<!-- flowchart 箭头图标 勿删 -->
							<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><path stroke-linecap="round" d="M5,0 0,2.5 5,5z" id="raphael-marker-block" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path></svg>
							<p>Firefox OS的system应用启动是通过加载一个内部资源页</p>



<pre class="prettyprint" name="code"><code class="hljs avrasm has-numbering"><span class="hljs-label">chrome:</span>//b2g/content/shell<span class="hljs-preprocessor">.html</span></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li></ul></pre>

<p>来实现的，我们先看下这个文件的部分内容：</p>



<pre class="prettyprint" name="code"><code class="hljs xml has-numbering"><span class="hljs-doctype">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">html</span> <span class="hljs-attribute">xmlns</span>=<span class="hljs-value">"http://www.w3.org/1999/xhtml"</span>
      <span class="hljs-attribute">id</span>=<span class="hljs-value">"shell"</span>
      <span class="hljs-attribute">windowtype</span>=<span class="hljs-value">"navigator:browser"</span>
      &gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-title">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-title">link</span> <span class="hljs-attribute">rel</span>=<span class="hljs-value">"stylesheet"</span> <span class="hljs-attribute">href</span>=<span class="hljs-value">"shell.css"</span> <span class="hljs-attribute">type</span>=<span class="hljs-value">"text/css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">script</span> <span class="hljs-attribute">type</span>=<span class="hljs-value">"application/javascript;version=1.8"</span>
          <span class="hljs-attribute">src</span>=<span class="hljs-value">"chrome://b2g/content/settings.js"</span>&gt;</span><span class="javascript"> </span><span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-title">script</span> <span class="hljs-attribute">type</span>=<span class="hljs-value">"application/javascript;version=1.8"</span>
          <span class="hljs-attribute">src</span>=<span class="hljs-value">"chrome://b2g/content/shell.js"</span>&gt;</span><span class="javascript"> </span><span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- this file is only loaded on Gonk to manage ADB state --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-title">script</span> <span class="hljs-attribute">type</span>=<span class="hljs-value">"application/javascript;version=1.8"</span>
          <span class="hljs-attribute">src</span>=<span class="hljs-value">"chrome://b2g/content/devtools/adb.js"</span>&gt;</span><span class="javascript"> </span><span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- manages DevTools server state --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-title">script</span> <span class="hljs-attribute">type</span>=<span class="hljs-value">"application/javascript;version=1.8"</span>
          <span class="hljs-attribute">src</span>=<span class="hljs-value">"chrome://b2g/content/devtools/debugger.js"</span>&gt;</span><span class="javascript"> </span><span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-title">body</span> <span class="hljs-attribute">id</span>=<span class="hljs-value">"container"</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- The html:iframe containing the UI is created here. --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-title">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">html</span>&gt;</span></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li><li style="color: rgb(153, 153, 153);">19</li><li style="color: rgb(153, 153, 153);">20</li><li style="color: rgb(153, 153, 153);">21</li><li style="color: rgb(153, 153, 153);">22</li><li style="color: rgb(153, 153, 153);">23</li><li style="color: rgb(153, 153, 153);">24</li><li style="color: rgb(153, 153, 153);">25</li></ul></pre>

<p>该html加载时，主要加载以及运行两个js文件：</p>



<pre class="prettyprint" name="code"><code class="hljs xml has-numbering"><span class="hljs-tag">&lt;<span class="hljs-title">script</span> <span class="hljs-attribute">type</span>=<span class="hljs-value">"application/javascript;version=1.8"</span>
          <span class="hljs-attribute">src</span>=<span class="hljs-value">"chrome://b2g/content/settings.js"</span>&gt;</span><span class="javascript"> </span><span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">script</span> <span class="hljs-attribute">type</span>=<span class="hljs-value">"application/javascript;version=1.8"</span>
          <span class="hljs-attribute">src</span>=<span class="hljs-value">"chrome://b2g/content/shell.js"</span>&gt;</span><span class="javascript"> </span><span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li></ul></pre>

<p>shell.js中：</p>



<pre class="prettyprint" name="code"><code class="hljs javascript has-numbering">bootstrap: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
  <span class="hljs-comment">//...   </span>
  <span class="hljs-keyword">this</span>.start();
},

start: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shell_start</span><span class="hljs-params">()</span> {</span>
  <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">let</span> homeURL = <span class="hljs-keyword">this</span>.homeURL;
    <span class="hljs-keyword">if</span> (!homeURL) {
      <span class="hljs-keyword">let</span> msg = <span class="hljs-string">'Fatal error during startup: No homescreen found: try setting B2G_HOMESCREEN'</span>;
      alert(msg);
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">let</span> manifestURL = <span class="hljs-keyword">this</span>.manifestURL;
    <span class="hljs-comment">// &lt;html:iframe id="systemapp"</span>
    <span class="hljs-comment">//              mozbrowser="true" allowfullscreen="true"</span>
    <span class="hljs-comment">//              style="overflow: hidden; height: 100%; width: 100%; border: none;"</span>
    <span class="hljs-comment">//              src="data:text/html;charset=utf-8,%3C!DOCTYPE html&gt;%3Cbody style='background:black;'&gt;"/&gt;</span>
    <span class="hljs-keyword">let</span> systemAppFrame =
      document.createElementNS(<span class="hljs-string">'http://www.w3.org/1999/xhtml'</span>, <span class="hljs-string">'html:iframe'</span>);
    systemAppFrame.setAttribute(<span class="hljs-string">'id'</span>, <span class="hljs-string">'systemapp'</span>);
    systemAppFrame.setAttribute(<span class="hljs-string">'mozbrowser'</span>, <span class="hljs-string">'true'</span>);
    systemAppFrame.setAttribute(<span class="hljs-string">'mozapp'</span>, manifestURL);
    systemAppFrame.setAttribute(<span class="hljs-string">'allowfullscreen'</span>, <span class="hljs-string">'true'</span>);
    systemAppFrame.setAttribute(<span class="hljs-string">'src'</span>, <span class="hljs-string">'blank.html'</span>);
    <span class="hljs-keyword">let</span> container = document.getElementById(<span class="hljs-string">'container'</span>);
#ifdef MOZ_WIDGET_COCOA
    <span class="hljs-comment">// See shell.html</span>
    <span class="hljs-keyword">let</span> hotfix = document.getElementById(<span class="hljs-string">'placeholder'</span>);
    <span class="hljs-keyword">if</span> (hotfix) {
      container.removeChild(hotfix);
    }
#endif
    <span class="hljs-keyword">this</span>.contentBrowser = container.appendChild(systemAppFrame);

    systemAppFrame.contentWindow
                  .QueryInterface(Ci.nsIInterfaceRequestor)
                  .getInterface(Ci.nsIWebNavigation)
                  .sessionHistory = Cc[<span class="hljs-string">"@mozilla.org/browser/shistory;1"</span>]
                                      .createInstance(Ci.nsISHistory);

    <span class="hljs-keyword">this</span>.allowedAudioChannels = <span class="hljs-keyword">new</span> Map();
    <span class="hljs-keyword">let</span> audioChannels = systemAppFrame.allowedAudioChannels;
    audioChannels &amp;&amp; audioChannels.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(audioChannel)</span> {</span>
      <span class="hljs-keyword">this</span>.allowedAudioChannels.set(audioChannel.name, audioChannel);
      audioChannel.addEventListener(<span class="hljs-string">'activestatechanged'</span>, <span class="hljs-keyword">this</span>);
      <span class="hljs-comment">// Set all audio channels as unmuted by default</span>
      <span class="hljs-comment">// because some audio in System app will be played</span>
      <span class="hljs-comment">// before AudioChannelService[1] is Gaia is loaded.</span>
      <span class="hljs-comment">// [1]: https://github.com/mozilla-b2g/gaia/blob/master/apps/system/js/audio_channel_service.js</span>
      audioChannel.setMuted(<span class="hljs-literal">false</span>);
    }.bind(<span class="hljs-keyword">this</span>));

    <span class="hljs-comment">// On firefox mulet, shell.html is loaded in a tab</span>
    <span class="hljs-comment">// and we have to listen on the chrome event handler</span>
    <span class="hljs-comment">// to catch key events</span>
    <span class="hljs-keyword">let</span> chromeEventHandler = window.QueryInterface(Ci.nsIInterfaceRequestor)
                                   .getInterface(Ci.nsIWebNavigation)
                                   .QueryInterface(Ci.nsIDocShell)
                                   .chromeEventHandler || window;
    <span class="hljs-comment">// Capture all key events so we can filter out hardware buttons</span>
    <span class="hljs-comment">// And send them to Gaia via mozChromeEvents.</span>
    <span class="hljs-comment">// Ideally, hardware buttons wouldn't generate key events at all, or</span>
    <span class="hljs-comment">// if they did, they would use keycodes that conform to DOM 3 Events.</span>
    <span class="hljs-comment">// See discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=762362</span>
    chromeEventHandler.addEventListener(<span class="hljs-string">'keydown'</span>, <span class="hljs-keyword">this</span>, <span class="hljs-literal">true</span>);
    chromeEventHandler.addEventListener(<span class="hljs-string">'keyup'</span>, <span class="hljs-keyword">this</span>, <span class="hljs-literal">true</span>);

    window.addEventListener(<span class="hljs-string">'MozApplicationManifest'</span>, <span class="hljs-keyword">this</span>);
    window.addEventListener(<span class="hljs-string">'MozAfterPaint'</span>, <span class="hljs-keyword">this</span>);
    window.addEventListener(<span class="hljs-string">'sizemodechange'</span>, <span class="hljs-keyword">this</span>);
    window.addEventListener(<span class="hljs-string">'unload'</span>, <span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.contentBrowser.addEventListener(<span class="hljs-string">'mozbrowserloadstart'</span>, <span class="hljs-keyword">this</span>, <span class="hljs-literal">true</span>);
    <span class="hljs-keyword">this</span>.contentBrowser.addEventListener(<span class="hljs-string">'mozbrowserselectionstatechanged'</span>, <span class="hljs-keyword">this</span>, <span class="hljs-literal">true</span>);
    <span class="hljs-keyword">this</span>.contentBrowser.addEventListener(<span class="hljs-string">'mozbrowserscrollviewchange'</span>, <span class="hljs-keyword">this</span>, <span class="hljs-literal">true</span>);
    <span class="hljs-keyword">this</span>.contentBrowser.addEventListener(<span class="hljs-string">'mozbrowsercaretstatechanged'</span>, <span class="hljs-keyword">this</span>);

    CustomEventManager.init();
    WebappsHelper.init();
    UserAgentOverrides.init();
    CaptivePortalLoginHelper.init();

    <span class="hljs-keyword">this</span>.contentBrowser.src = homeURL;

},</code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li><li style="color: rgb(153, 153, 153);">19</li><li style="color: rgb(153, 153, 153);">20</li><li style="color: rgb(153, 153, 153);">21</li><li style="color: rgb(153, 153, 153);">22</li><li style="color: rgb(153, 153, 153);">23</li><li style="color: rgb(153, 153, 153);">24</li><li style="color: rgb(153, 153, 153);">25</li><li style="color: rgb(153, 153, 153);">26</li><li style="color: rgb(153, 153, 153);">27</li><li style="color: rgb(153, 153, 153);">28</li><li style="color: rgb(153, 153, 153);">29</li><li style="color: rgb(153, 153, 153);">30</li><li style="color: rgb(153, 153, 153);">31</li><li style="color: rgb(153, 153, 153);">32</li><li style="color: rgb(153, 153, 153);">33</li><li style="color: rgb(153, 153, 153);">34</li><li style="color: rgb(153, 153, 153);">35</li><li style="color: rgb(153, 153, 153);">36</li><li style="color: rgb(153, 153, 153);">37</li><li style="color: rgb(153, 153, 153);">38</li><li style="color: rgb(153, 153, 153);">39</li><li style="color: rgb(153, 153, 153);">40</li><li style="color: rgb(153, 153, 153);">41</li><li style="color: rgb(153, 153, 153);">42</li><li style="color: rgb(153, 153, 153);">43</li><li style="color: rgb(153, 153, 153);">44</li><li style="color: rgb(153, 153, 153);">45</li><li style="color: rgb(153, 153, 153);">46</li><li style="color: rgb(153, 153, 153);">47</li><li style="color: rgb(153, 153, 153);">48</li><li style="color: rgb(153, 153, 153);">49</li><li style="color: rgb(153, 153, 153);">50</li><li style="color: rgb(153, 153, 153);">51</li><li style="color: rgb(153, 153, 153);">52</li><li style="color: rgb(153, 153, 153);">53</li><li style="color: rgb(153, 153, 153);">54</li><li style="color: rgb(153, 153, 153);">55</li><li style="color: rgb(153, 153, 153);">56</li><li style="color: rgb(153, 153, 153);">57</li><li style="color: rgb(153, 153, 153);">58</li><li style="color: rgb(153, 153, 153);">59</li><li style="color: rgb(153, 153, 153);">60</li><li style="color: rgb(153, 153, 153);">61</li><li style="color: rgb(153, 153, 153);">62</li><li style="color: rgb(153, 153, 153);">63</li><li style="color: rgb(153, 153, 153);">64</li><li style="color: rgb(153, 153, 153);">65</li><li style="color: rgb(153, 153, 153);">66</li><li style="color: rgb(153, 153, 153);">67</li><li style="color: rgb(153, 153, 153);">68</li><li style="color: rgb(153, 153, 153);">69</li><li style="color: rgb(153, 153, 153);">70</li><li style="color: rgb(153, 153, 153);">71</li><li style="color: rgb(153, 153, 153);">72</li><li style="color: rgb(153, 153, 153);">73</li><li style="color: rgb(153, 153, 153);">74</li><li style="color: rgb(153, 153, 153);">75</li><li style="color: rgb(153, 153, 153);">76</li><li style="color: rgb(153, 153, 153);">77</li><li style="color: rgb(153, 153, 153);">78</li><li style="color: rgb(153, 153, 153);">79</li><li style="color: rgb(153, 153, 153);">80</li><li style="color: rgb(153, 153, 153);">81</li><li style="color: rgb(153, 153, 153);">82</li><li style="color: rgb(153, 153, 153);">83</li><li style="color: rgb(153, 153, 153);">84</li><li style="color: rgb(153, 153, 153);">85</li></ul></pre>

<p>几个问题：</p>

<ol>
<li><p>homeURL(b2g.system_startup_url):</p>

<pre class="prettyprint" name="code"><code class="hljs avrasm has-numbering"> app://system<span class="hljs-preprocessor">.gaiamobile</span><span class="hljs-preprocessor">.org</span>/index<span class="hljs-preprocessor">.html</span>

 <span class="hljs-string">"app:// for packaged app resources"</span></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li></ul></pre></li>
<li><p>manifestURL:</p>

<pre class="prettyprint" name="code"><code class="hljs avrasm has-numbering"><span class="hljs-label">app:</span>//system<span class="hljs-preprocessor">.gaiamobile</span><span class="hljs-preprocessor">.org</span>/manifest<span class="hljs-preprocessor">.webapp</span>

<span class="hljs-string">"app:// for packaged app resources"</span></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li></ul></pre></li>
<li>system app实际上是一个iframe</li>
</ol>



<pre class="prettyprint" name="code"><code class="hljs coffeescript has-numbering">    <span class="hljs-reserved">let</span> systemAppFrame =
      <span class="hljs-built_in">document</span>.createElementNS(<span class="hljs-string">'http://www.w3.org/1999/xhtml'</span>, <span class="hljs-string">'html:iframe'</span>);</code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li></ul></pre>

<p>该iframe是放在shell.html中id为”container”中：</p>



<pre class="prettyprint" name="code"><code class="hljs r has-numbering"> let container = document.getElementById(<span class="hljs-string">'container'</span>);
 <span class="hljs-keyword">...</span>
 this.contentBrowser = container.appendChild(systemAppFrame);
 <span class="hljs-keyword">...</span></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li></ul></pre>

<p>4.systemapp的iframe实际上有一系列属性:</p>

<pre class="prettyprint" name="code"><code class="hljs bash has-numbering">    systemAppFrame.setAttribute(<span class="hljs-string">'id'</span>, <span class="hljs-string">'systemapp'</span>);
    systemAppFrame.setAttribute(<span class="hljs-string">'mozbrowser'</span>, <span class="hljs-string">'true'</span>);
    systemAppFrame.setAttribute(<span class="hljs-string">'mozapp'</span>, manifestURL);
    systemAppFrame.setAttribute(<span class="hljs-string">'allowfullscreen'</span>, <span class="hljs-string">'true'</span>);
    systemAppFrame.setAttribute(<span class="hljs-string">'src'</span>, <span class="hljs-string">'blank.html'</span>);</code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li></ul></pre>

<p>system app的iframe里放的是  ‘blank.html’。其它属性：</p>



<pre class="prettyprint" name="code"><code class="hljs livecodeserver has-numbering">    mozbrowser： 
        An <span class="hljs-string">"iframe"</span> is turned <span class="hljs-keyword">into</span> <span class="hljs-operator">a</span> browser frame <span class="hljs-keyword">by</span> setting <span class="hljs-operator">the</span> mozbrowser attribute

    mozapp:
        see [mozapp](<span class="hljs-keyword">https</span>://wiki.mozilla.org/Security/Reviews/B2G/mozapp)</code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li></ul></pre>

<p>system app刚开始加载的是</p>



<pre class="prettyprint" name="code"><code class="hljs bash has-numbering"><span class="hljs-string">'blank.html'</span>，</code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li></ul></pre>

<p>也就是没有界面的，之后开始加载</p>

<pre class="prettyprint" name="code"><code class="hljs bash has-numbering">homeURL，即<span class="hljs-string">"app://system.gaiamobile.org/index.html"</span></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li></ul></pre>

<p>“system.gaiamobile.org”，实际上就是gaia里的system app。该app负责系统ui的显示以及home应用的加载等工作。</p>

<p>问题是：</p>



<pre class="prettyprint" name="code"><code class="hljs livecodeserver has-numbering">b2g进程、<span class="hljs-keyword">system</span>进程与Home进程的关系是什么样的? Home进程是如何创建出来的？</code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li></ul></pre>

<p>我们下节再说。</p>            </div>
						<link href="https://csdnimg.cn/release/phoenix/mdeditor/markdown_views-8cccb36679.css" rel="stylesheet">
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
