<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为博主打劫来的文章！！！未经允许可以随便转载。 May you do good and not evil.  May you share freely, never taking more than you give.					https://blog.csdn.net/hunter___/article/details/81195906				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-e2445db1a8.css">
						<div class="htmledit_views">
                <p>try to analyze b2g ,nuwa and content process.</p>

<p>自我疑惑问题记录与解答。。。</p>

<p>系统物理按键按下，固件（firmware）bootloader按需加载文件到内存？（加载内核进内存），kernel run脚本？启动init进程，解析init.rc，init.b2g.rc, init进程启动b2g进程，init同时?启动一些守护进程（deamon :rild ,vold）(init启动的？),b2g?init?启动系统服务（system service）对核心服务进行启动和初始化.</p>

<p>进程user: root ,system ,rido?wifi ,media?不由b2g管？b2g管的是哪些？？？看ppid可知。。</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180731093307199?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p>system/core/rootdir/init.rc</p>

<p>gonk-misc/init.b2g.rc</p>

<p>gonk-misc/b2g.sh</p>

<p>&nbsp;</p>

<p>init是init.cpp(system/core/init/init.cpp?)编译生成的二进制可执行文件？kernel 运行脚本(哪个？)，执行init(可执行文件)，解析init.rc</p>

<p>,init.b2g.rc(通过b2g.sh脚本，它做了很多事情，整体启动b2g进程),b2g.sh运行/system/b2g/b2g(可执行文件，由gecko/b2g/app/nsBrowserApp.cpp生成？？？也即是，哪里是b2g的入口)。b2g可执行文件运行libxul.so,(XPCOM初始化在哪做？？b2g如何在哪里指定去运行libxul,以及如何去运行b2g.js),libxul里包含了b2g.js(它去打开shell.html),shell.html （body 的id 为container）包含了shell.js(进gaia了)它创建systemAppFrame（iframe），然后将blank.html填充进iframe去,进入了system app,system app 开始做一系列工作，如启动gaia的核心应用。gaia/apps/system。这是上层通路做的事情，底层从b2g进来之后做了哪些事情呢，如xpcom的初始化等以及后续的一系列是如何支持的？</p>

<p>3678:gecko/b2g/chrome/moz.build:8:DEFINES['PACKAGE'] = 'b2g'？？？</p>

<p>&nbsp;</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180731094135528?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p>system/core/init/init.cpp:1104:&nbsp;&nbsp;&nbsp; init_parse_config_file("/init.rc");</p>

<p>gonk-misc/Android.mk:31:&nbsp;&nbsp; &nbsp;echo import /init.b2g.rc &gt; $@</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180731095007143?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p>system app</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180731102847448?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p><a href="https://www.cnblogs.com/jacklu/p/5317406.html" rel="nofollow" target="_blank">https://www.cnblogs.com/jacklu/p/5317406.html</a></p>

<p><a href="https://blog.csdn.net/qwe6112071/article/details/70473905" rel="nofollow" target="_blank">https://blog.csdn.net/qwe6112071/article/details/70473905</a></p>

<p><a href="https://blog.csdn.net/MrDing991124/article/details/78660847" rel="nofollow" target="_blank">https://blog.csdn.net/MrDing991124/article/details/78660847</a></p>

<p>&nbsp;</p>

<p>PID为0的进程为调度进程，该进程是内核的一部分，也称为系统进程；PID为1的进程为init进程，它是一个普通的用户进程，但是以超级用户特权运行；PID为2的进程是页守护进程，负责支持虚拟存储系统的分页操作。</p>

<p>Android 内核加载完成后，就会启动<code>init</code>进程,init进程是Android系统用户空间的第一个进程。init程序放在系统根目录下，init进程代码位于源码的目录“system/core/init”下面。</p>

<p>下面我们来分析init进程的启动过程</p>

<p><a href="https://blog.csdn.net/u012417380/article/details/78518408" rel="nofollow" target="_blank">https://blog.csdn.net/u012417380/article/details/78518408</a></p>

<p>进程init入口函数是main,具体实现文件的路径是：<br><code>system\core\init\init.c</code></p>

<p>&nbsp;</p>

<p>b2g进程只是init下的其中一个进程，还有其他很多进程。</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180725094253845?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p>init进程的子进程主要有哪些？分别做了哪些大块的工作？&nbsp;</p>

<p>启动Init进程，其实质是执行/sbin/init程序，即Init进程可以启动其它子进程，或启动shell，本质上是因为内核执行了可执行序/sbin/init.因此，可以说Init进程的作用只不过是可执行程序/sbin/init的作用.可以这样来理解，当执行可执行程序/sbin/init时，该程序就是一进程，名字是Init.当然，用户也可以根据需要编写自己的/sbin/init程序，或者传入命令行参数"init=xxxx"指定某个程序作为Init进程运行.在嵌入式领域内，一般来说多使用Busybox集成的Init程序.</p>

<p>内核启动的最后一步就是启动Init进程.该Init进程中，它主要做了以下几项工作:<br>
&nbsp;&nbsp;&nbsp;&lt;1&gt;读取系统初始化表格文件/etc/<a href="http://blog.csdn.net/xinyuan510214/article/details/50906768" rel="nofollow" target="_blank">inittab</a>.（<a href="http://blog.csdn.net/xinyuan510214/article/details/50906870" rel="nofollow" target="_blank">BusyBox init及inittabl文件</a>）<br>
&nbsp;&nbsp;&nbsp;&lt;2&gt;建立getty进程，在终端上显示login提示符，以等待用户的登录.<br>
&nbsp;&nbsp;&nbsp;&lt;3&gt;进程getty会调用exec以执行login程序.该程序将会核对用户账号和密码.<br>
&nbsp;&nbsp;&nbsp;&lt;4&gt;login程序会调用exec以执行shell命令解释器，也可执行X-windows.<br>
&nbsp;&nbsp;&nbsp;&lt;5&gt;shell命令解释器会读取系统环境配置脚本/etc/profile.</p>

<p>&nbsp;</p>

<p>init实际上就分为如下两个部分：<br>
（1）初始化<br>
初始化主要包括建立“dev”,”/proc”等目录，初始化属性，执行init.rc等初始化文件中的action等</p>

<p>（2）使用for循环，无限建立子进程的过程。（b2g进程就是其中之一）</p>

<p>在Linux系统中，init进程是所有进程的父进程。输入ps命令，所有进程都是由这个进程在for循环中创建的，如果这个进程崩溃，那么android系统无法正常运行</p>

<p><a href="https://blog.csdn.net/u012417380/article/details/78518408" rel="nofollow" target="_blank">https://blog.csdn.net/u012417380/article/details/78518408</a></p>

<p>&nbsp;</p>

<p>b2g进程的主要工作是什么？？？</p>

<p>init.b2g.rc</p>

<pre class="has" name="code"><code>import /init.bluetooth.rc

service gonksched /system/bin/gonksched
    class main
    user root

service fakeappops /system/bin/fakeappops
    class main
    user root

service b2g /system/bin/b2g.sh
    class main
    onrestart restart media

service rilproxy /system/bin/rilproxy
    class main
    socket rilproxy stream 660 radio radio
    user radio
    group radio system

service nfcd /system/bin/nfcd
    class main
    socket nfcd stream 660 nfc nfc
    user nfc
    group system
    enable
    oneshot

on boot
    exec /system/bin/rm -r /data/local/tmp
    exec /system/bin/mkdir -p /data/local/tmp
    # set RLIMIT_NOFILE to increase soft limit from 1024(default) to 2048.
    # Hard limit keeps default value(4096).
    setrlimit 7 2048 4096
    write /proc/sys/net/ipv6/conf/default/use_tempaddr 2
</code></pre>

<p>这个文件针对ffos，里面相应的服务进程等ffos”特有“，对于b2g相关的，则进一步进b2g.sh</p>

<p>这个文件的目的 是？？？</p>

<pre class="has" name="code"><code>#!/system/bin/sh
umask 0027
export TMPDIR=/data/local/tmp
mkdir -p $TMPDIR
chmod 1777 $TMPDIR
ulimit -n 8192

# Enable core dumps only on debug builds and if explicitly enabled
DEBUG=`getprop ro.debuggable`
if [ "$DEBUG" == "1" ]; then
  COREDUMP=`getprop persist.debug.coredump`

  if [ -n "$COREDUMP" ]; then
    if [ ! -d /data/core ]; then
      # applications need write/execute to generate core but not read
      mkdir /data/core
      chmod 0733 /data/core
      chown root:root /data/core
    fi
    echo "/data/core/%e.%p.%t.core" &gt; /proc/sys/kernel/core_pattern
    echo "1" &gt; /proc/sys/fs/suid_dumpable
  fi

  if [ "$COREDUMP" == "all" ]; then
    /system/bin/b2g-prlimit 0 core -1 -1
  elif [ "$COREDUMP" == "b2g" ]; then
    ulimit -c -1
  fi
fi

if [ ! -d /system/b2g ]; then

  log -p W "No /system/b2g directory. Attempting recovery."
  if [ -d /system/b2g.bak ]; then
    if ! mount -w -o remount /system; then
      log -p E "Failed to remount /system read-write"
    fi
    if ! mv /system/b2g.bak /system/b2g; then
      log -p E "Failed to rename /system/b2g.bak to /system/b2g"
    fi
    mount -r -o remount /system
    if [ -d /system/b2g ]; then
      log "Recovery successful."
    else
      log -p E "Recovery failed."
    fi
  else
    log -p E "Recovery failed: no /system/b2g.bak directory."
  fi
fi

if [ -z "$B2G_DIR" ]; then
  B2G_DIR="/system/b2g"
fi

LD_PRELOAD="$B2G_DIR/libmozglue.so"
if [ -f "$B2G_DIR/libdmd.so" ]; then
  echo "Running with DMD."
  LD_PRELOAD="$B2G_DIR/libdmd.so $LD_PRELOAD"
  export DMD="1"
fi
export LD_PRELOAD

export LD_LIBRARY_PATH=/vendor/lib:/system/lib:"$B2G_DIR"
export GRE_HOME="$B2G_DIR"

# Run in jar logging mode if needed.
JAR_LOG_ENABLED=`getprop moz.jar.log`
if [ "$JAR_LOG_ENABLED" = "1" ]; then
  export MOZ_JAR_LOG_FILE=/data/local/tmp/jarloader.log
fi

exec $COMMAND_PREFIX "$B2G_DIR/b2g"
</code></pre>

<p>&nbsp;</p>

<p>类比zygote进程与init进程</p>

<p><a href="https://blog.csdn.net/github_37610197/article/details/78456038" rel="nofollow" target="_blank">https://blog.csdn.net/github_37610197/article/details/78456038</a></p>

<p>如图，通过ps命令看到的init进程和守护进程之间的关系。<br><img alt="这里写图片描述" class="has" src="https://img-blog.csdn.net/20171106113430647?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM3NjEwMTk3/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast"></p>

<p>zygote进程生成系统服务器端和各种java应用程序进程。<br>
init进程在所有系统中通常具有固定的pid值（pid=1）,但启动其他进程时，不同系统赋予的pid值也有所不同。<br><img alt="这里写图片描述" class="has" src="https://img-blog.csdn.net/20171106113326808?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM3NjEwMTk3/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast"></p>

<p>相应的b2g也开启了gaia里面的重要进程,system app :<br>
init.rc启动了b2g进程，该进程是B2G OS的核心</p>

<h2 id="B2GOS（FireFoxOS）Architecture-4.2rild"><a name="t9" target="_blank"></a><a name="t8" target="_blank"></a></h2>

<h2 id="The_userspace_process_architecture"><a name="t1"></a>The userspace process architecture</h2>

<p>Now it's useful to take a high-level look at how the various components of B2G OS fit together and interact with one another. This diagram shows the primary userspace processes in B2G OS.</p>

<p><a href="https://developer.mozilla.org/en-US/files/3849/B2G%20userspace%20architecture.svg" rel="nofollow" target="_blank"><img alt="Userspace diagram" class="has" src="https://developer.mozilla.org/files/3849/B2G%20userspace%20architecture.svg"></a></p>

<p>&nbsp;</p>

<p>The <code>b2g</code> process is the primary system process. It runs with high privileges; it has access to most hardware devices. <code>b2g</code> communicates with the modem, draws to the display framebuffer, and talks to GPS, cameras, and other hardware features. Internally, <code>b2g</code> runs the Gecko layer (implemented by <code>libxul.so</code>). See <a href="https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/Architecture#Gecko" rel="nofollow" target="_blank">Gecko</a> for details on how the Gecko layer works, and how <code>b2g</code> communicates with it.</p>

<h3 id="b2g"><a name="t2"></a>b2g</h3>

<p>The <code>b2g</code> process may, in turn, spawn a number of low-rights <strong>content processes</strong>. These processes are where web applications and other web content are loaded. These processes communicate with the main Gecko server process through <a href="https://developer.mozilla.org/en-US/docs/IPDL" rel="nofollow" target="_blank">IPDL</a>, a message-passing system.</p>

<p>The <code>b2g</code> process runs libxul, which references <code>b2g/app/b2g.js</code> to get default preferences. From the preferences it will open the described HTML file <code>b2g/chrome/content/shell.html</code>, which is compiled within the <code>omni.ja</code> file. <code>shell.html</code> includes <code>b2g/chrome/content/shell.js</code> file, which triggers the Gaia <code>system</code> app.</p>

<p><s>init.b2g.rc 启动b2g服务（执行了b2g可执行文件？）,执行b2g.sh脚本???b2g.sh 做了什么？</s></p>

<p>init程序（进程）解析init.b2g.rc， 通过执行b2g.sh,执行了b2g可执行文件，从而启动了b2g服务？？？</p>

<p>b2g运行libxul.so? 里面的b2g.js开始运行？这个b2g.js(它是一个有1000+行配置信息的文件)会去获取默认首选项，会打开shell.html,</p>

<pre class="has" name="code"><code>// For the all MOZ_MULET ifdef conditions in this file: see bug 1174234

#ifndef MOZ_MULET
pref("toolkit.defaultChromeURI", "chrome://b2g/content/shell.html");
pref("browser.chromeURL", "chrome://b2g/content/");
#endif

#ifdef MOZ_MULET
// Set FxOS as the default homepage
// bug 1000122: this pref is fetched as a complex value,
// so that it can't be set a just a string.
// data: url is a workaround this.
pref("browser.startup.homepage", "data:text/plain,browser.startup.homepage=chrome://b2g/content/shell.html");
pref("b2g.is_mulet", true);
// Prevent having the firstrun page
pref("startup.homepage_welcome_url", "");
pref("browser.shell.checkDefaultBrowser", false);
// Automatically open devtools on the firefox os panel
pref("devtools.toolbox.host", "side");
pref("devtools.toolbox.sidebar.width", 800);
// Disable session store to ensure having only one tab opened
pref("browser.sessionstore.max_tabs_undo", 0);
pref("browser.sessionstore.max_windows_undo", 0);
pref("browser.sessionstore.restore_on_demand", false);
...</code></pre>

<p>&nbsp;</p>

<p>b2g可执行文件是由谁编译成的？它如何启动了system app,然后启动home screen？以下文件都承担了哪些作用？</p>

<p>b2g.js&nbsp; 打开(load?)shell.html</p>

<p>shell.html 里面引用了shell.js,settings.js,screen.js,runapp.js等</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180726154407549?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p>shell.js 打开system app,参看system app 分析（后面再写）。。。</p>

<p>runapp.js 对在屏幕上的app运行时进行加载？通过事件将应用数据？？传进去，再加载入iframe?</p>

<p>&nbsp;&nbsp;&nbsp; let service = Cc["@mozilla.org/commandlinehandler/general-startup;1?type=b2gcmds"].getService(Ci.nsISupports);</p>

<p>&nbsp;&nbsp;&nbsp; let appsService = Cc["@mozilla.org/AppsService;1"].getService(Ci.nsIAppsService);<br>
&nbsp;&nbsp;&nbsp; let currentApp = appsService.getAppByManifestURL(currentFrame.appManifestURL);</p>

<p>&nbsp;</p>

<p>settings.js 默认设置及setting app做出的改变？？homescreen 也在里面设定？应用主要在system app 里去处理了。</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180726210720965?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p>screen.js&nbsp; 屏幕尺寸大小（设备屏幕）？</p>

<p>&nbsp;</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180726114502727?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p>设备中的/system/b2g/</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180726113913787?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p>&nbsp;</p>

<p>(1)init 运行 /system/b2g/b2g,</p>

<p>（）b2g 运行 libxul，libxul 中有<code>(gecko)/b2g/app/b2g.js,</code></p>

<p>(2)shell.html</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

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
