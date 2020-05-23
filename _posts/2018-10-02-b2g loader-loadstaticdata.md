<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为博主打劫来的文章！！！未经允许可以随便转载。 May you do good and not evil.  May you share freely, never taking more than you give.					https://blog.csdn.net/hunter___/article/details/81941205				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-e2445db1a8.css">
						<div class="htmledit_views">
                <p>&nbsp;</p>

<p>sourcecode:(brief v)</p>

<pre class="has" name="code"><code>static bool
LoadStaticData(int argc, const char *argv[])
{
  bool ok = GetXPCOMPath(argv[0], xpcomPath, MAXPATHLEN);
  ok = LoadLibxul(xpcomPath);
  ok = GetDirnameSlash(xpcomPath, progDir, MAXPATHLEN);
  nsCOMPtr&lt;nsIFile&gt; appini = GetAppIni(argc, argv);
  const nsXREAppData *appData;
  if (appini) {//not get here 
    nsresult rv =XRE_CreateAppData(appini, const_cast&lt;nsXREAppData**&gt;(&amp;appData));
  } else {
    appData = &amp;sAppData;
  }
  XRE_ProcLoaderPreload(progDir, appData);
  return true;
}

</code></pre>

<p>&nbsp;</p>

<p>调用关系图：</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/201808231527095?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<pre class="has" name="code"><code>/B2GLoader.cpp:362, Fuc:main  argc:1, argv:/system/b2g/b2g
B2GLoader.cpp:199, Fuc:LoadStaticData  ----------------------------------
B2GLoader.cpp:200, Fuc:LoadStaticData  argc:1, argv:/system/b2g/b2g
/B2GLoader.cpp:72, Fuc:GetDirnameSlash  lastSlash:XPCOM_FILE_PATH_SEPARATOR[0]=47
/B2GLoader.cpp:74, Fuc:GetDirnameSlash  aPath=:/system/b2g/dummy
/B2GLoader.cpp:75, Fuc:GetDirnameSlash  lastSlash= /dummy
/B2GLoader.cpp:85, Fuc:GetDirnameSlash  aOutDir:/system/b2g/
/B2GLoader.cpp:86, Fuc:GetDirnameSlash  cpsz=12  NOTE:this is return value of this func
/B2GLoader.cpp:99, Fuc:GetXPCOMPath  len =GetDirnameSlash(...):12
/B2GLoader.cpp:106, Fuc:GetXPCOMPath  aOutPath:/system/b2g/libxul.so
/B2GLoader.cpp:107, Fuc:GetXPCOMPath  afterSlash:libxul.so
/B2GLoader.cpp:206, Fuc:LoadStaticData  call LoadLibxul</code></pre>

<p>(1)第一次调是getxpcompath--&gt;getdirnameslash</p>

<p>返回cpsz =12</p>

<p>(2)getxpcompath</p>

<p>调getdirnameslash ;得GetDirnameSlash&nbsp; aOutDir:/system/b2g/</p>

<p>afterslash = libxul.so</p>

<p>getdirnameslash第二次调是由loadstaticdata 调的</p>

<pre class="has" name="code"><code>B2GLoader.cpp:211, Fuc:LoadStaticData  call GetDirnameSlash
B2GLoader.cpp:72, Fuc:GetDirnameSlash  lastSlash:XPCOM_FILE_PATH_SEPARATOR[0]=47
B2GLoader.cpp:74, Fuc:GetDirnameSlash  aPath=:/system/b2g/libxul.so
B2GLoader.cpp:75, Fuc:GetDirnameSlash  lastSlash= /libxul.so
B2GLoader.cpp:85, Fuc:GetDirnameSlash  aOutDir:/system/b2g/
B2GLoader.cpp:86, Fuc:GetDirnameSlash  cpsz=12  NOTE:this is return value of this func
</code></pre>

<p>(2)loadlibxul()</p>

<pre class="has" name="code"><code>static bool
LoadLibxul(const char *aXPCOMPath)
{
  P_LOGI(SEPARATOR_LINE );
  nsresult rv;

  P_LOGI("call XPCOMGlueEnablePreload");
  XPCOMGlueEnablePreload();// xpcom/glue/standalone/nsXPCOMGlue.h
  P_LOGI("call XPCOMGlueStartup" );
  rv = XPCOMGlueStartup(aXPCOMPath);

  NS_ENSURE_SUCCESS(rv, false);

  P_LOGI("call XPCOMGlueLoadXULFunctions");
  rv = XPCOMGlueLoadXULFunctions(kXULFuncs);

  NS_ENSURE_SUCCESS(rv, false);

  return true;
}
</code></pre>

<p>&nbsp;</p>

<p>&nbsp;header file</p>

<pre class="has" name="code"><code>/**
 * The following functions are only available in the standalone glue.
 */
/**
 * Enabled preloading of dynamically loaded libraries
 */
extern "C" NS_HIDDEN_(void) XPCOMGlueEnablePreload();

/**
 * Initialize the XPCOM glue by dynamically linking against the XPCOM
 * shared library indicated by xpcomFile.
 */
extern "C" NS_HIDDEN_(nsresult) XPCOMGlueStartup(const char* aXPCOMFile);

/**
 * Dynamically load functions from libxul.
 *
 * @throws NS_ERROR_NOT_INITIALIZED if XPCOMGlueStartup() was not called or
 *         if the libxul DLL was not found.
 * @throws NS_ERROR_LOSS_OF_SIGNIFICANT_DATA if only some of the required
 *         functions were found.
 */
extern "C" NS_HIDDEN_(nsresult)
XPCOMGlueLoadXULFunctions(const nsDynamicFunctionLoad* aSymbols);</code></pre>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>GetDirnameSlash(const char *aPath, char *aOutDir, int aMaxLen)&nbsp; //用于剥离目录名</p>

<p>GetXPCOMPath(const char *aProgram, char *aOutPath, int aMaxLen) //用于获取XPCOM路径</p>

<p>&nbsp;</p>

<p>log信息：</p>

<p>gecko/b2g/app/B2GLoader.cpp:101, Fuc:GetXPCOMPath&nbsp; afterSlash:libxul.so</p>

<p>&nbsp;</p>

<pre class="has" name="code"><code>root@mako:/system/b2g # ls
Throbber-small.gif
application.ini
b2g
crashreporter.ini
defaults
dependentlibs.list
dictionaries
gmp-clearkey
libfreebl3.so
liblgpllibs.so
libmozglue.so
libmozsandbox.so
libnss3.so
libnssckbi.so
libsoftokn3.so
libxul.so
omni.ja
platform.ini
plugin-container
precomplete
removed-files
run-mozilla.sh
ua-update.json
root@mako:/system/b2g # cd b2g </code></pre>

<p>xpcomgluestartup()</p>

<pre class="has" name="code"><code>nsresult
XPCOMGlueStartup(const char* aXPCOMFile)
{
  P_LOGI("aXPCOMFile:%s",aXPCOMFile);
//nsXPCOMGlue.cpp:507, Fuc:XPCOMGlueStartup  aXPCOMFile:/system/b2g/libxul.so
  xpcomFunctions.version = XPCOM_GLUE_VERSION;
  xpcomFunctions.size    = sizeof(XPCOMFunctions);
  GetFrozenFunctionsFunc func = XPCOMGlueLoad(aXPCOMFile);

  nsresult rv = (*func)(&amp;xpcomFunctions, nullptr);
  if (NS_FAILED(rv)) {
    XPCOMGlueUnload();
    return rv;
  }

  return NS_OK;
}
</code></pre>

<p>&nbsp;</p>

<pre class="has" name="code"><code>root@mako:/system/b2g # cat dependentlibs.list                                 
libmozglue.so
libmozsandbox.so
libnss3.so
liblgpllibs.so
libxul.so
</code></pre>

<p>xpcomglueload()</p>

<p>进入libxul.so 去load function</p>

<pre class="has" name="code"><code>


nsXPCOMGlue.cpp:322, Fuc:XPCOMGlueLoad  ----------------------------------
nsXPCOMGlue.cpp:243, Fuc:ReadDependentCB  aDependentLib:/system/b2g/libmozglue.so
nsXPCOMGlue.cpp:243, Fuc:ReadDependentCB  aDependentLib:/system/b2g/libmozsandbox.so
nsXPCOMGlue.cpp:243, Fuc:ReadDependentCB  aDependentLib:/system/b2g/libnss3.so
nsXPCOMGlue.cpp:243, Fuc:ReadDependentCB  aDependentLib:/system/b2g/liblgpllibs.so
nsXPCOMGlue.cpp:243, Fuc:ReadDependentCB  aDependentLib:/system/b2g/libxul.so
nsXPCOMGlue.cpp:519, Fuc:XPCOMGlueStartup  after call XPCOMGlueLoad
B2GLoader.cpp:124, Fuc:LoadLibxul  call XPCOMGlueLoadXULFunctions</code></pre>

<p>&nbsp;</p>

<pre class="has" name="code"><code>static NSFuncPtr
GetSymbol(LibHandleType aLibHandle, const char* aSymbol)
{
  // Try to use |NSLookupSymbolInImage| since it is faster than searching
  // the global symbol table.  If we couldn't get a mach_header pointer
  // for the XPCOM dylib, then use |NSLookupAndBindSymbol| to search the
  // global symbol table (this shouldn't normally happen, unless the user
  // has called XPCOMGlueStartup(".") and relies on libxpcom.dylib
  // already being loaded).
  NSSymbol sym = nullptr;
  if (aLibHandle) {
    sym = NSLookupSymbolInImage(aLibHandle, aSymbol,
                                NSLOOKUPSYMBOLINIMAGE_OPTION_BIND |
                                NSLOOKUPSYMBOLINIMAGE_OPTION_RETURN_ON_ERROR);
  } else {
    if (NSIsSymbolNameDefined(aSymbol)) {
      sym = NSLookupAndBindSymbol(aSymbol);
    }
  }
  if (!sym) {
    return nullptr;
  }

  return (NSFuncPtr)NSAddressOfSymbol(sym);
}
// 从libxpcom.dylib中搜索获取函数名？？？</code></pre>

<p>&nbsp;</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180824140108708?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p>xpcomgetpath获取xpcom path即/system/b2g/libxul.so 再调xpcomdirslash用来slash出libxul.so。然后loadlibxul函数loadxulfunction, startup等 进一步初始化xpcom。</p>

<p>loadlibxul--&gt;xpcomgluestartup这个模块的主要函数是gluestartup和glueloadxulfunctions,前者的作用是通过动态链接的方式链接由xpcomfile指示的共享库来初始化xpcom glue。<br>
loadxulfunction则是传入一些funtionname，从libxul中动态加载function.</p>

<p>&nbsp;</p>

<p>LoadStaticData(int argc, const char *argv[])---&gt;XRE_ProcLoaderPreload---&gt;PreloadXPT</p>

<pre class="has" name="code"><code>/**
 * Preload static data of Gecko for B2G loader.
 *
 * This function is supposed to be called before XPCOM is initialized.
 * For now, this function preloads
 *  - XPT interface Information
 */
void
XRE_ProcLoaderPreload(const char* aProgramDir, const nsXREAppData* aAppData)
{
    P_LOGI(STA_LINE);
    void PreloadXPT(nsIFile *);

    nsresult rv;
    nsCOMPtr&lt;nsIFile&gt; omnijarFile;
    P_LOGI("call NS_NewNativeLocalFile--&gt;");
    P_LOGI("aProgramDir:%s,omnijarFile:%s",(char *)aProgramDir,(char *)omnijarFile);
    rv = NS_NewNativeLocalFile(nsCString(aProgramDir),
			       true,
			       getter_AddRefs(omnijarFile));
    MOZ_RELEASE_ASSERT(NS_SUCCEEDED(rv));
    P_LOGI("call Omnijar-&gt;AppendNative---&gt;");
    rv = omnijarFile-&gt;AppendNative(NS_LITERAL_CSTRING(NS_STRINGIFY(OMNIJAR_NAME)));
    MOZ_RELEASE_ASSERT(NS_SUCCEEDED(rv));

    /*
     * gAppData is required by nsXULAppInfo.  The manifest parser
     * evaluate flags with the information from nsXULAppInfo.
     */
    gAppData = aAppData;

    PreloadXPT(omnijarFile);

    gAppData = nullptr;
    P_LOGI(END_LINE);
}




/**
 * To load XPT Interface Information before the component manager is ready.
 *
 * With this function, B2G loader could XPT interface info. as earier
 * as possible to gain benefit of shared memory model of the kernel.
 */
/* static */ void
nsComponentManagerImpl::PreloadXPT(nsIFile* aFile)
{
  MOZ_ASSERT(!nsComponentManagerImpl::gComponentManager);
  FileLocation location(aFile, "chrome.manifest");

  DoRegisterManifest(NS_APP_LOCATION, location,
                     false, true /* aXPTOnly */);
}

</code></pre>

<p>log分析：</p>

<p>&nbsp;</p>

<pre class="has" name="code"><code>
gecko/b2g/app/B2GLoader.cpp:365, Fuc:main  ----------------------------------
gecko/b2g/app/B2GLoader.cpp:366, Fuc:main  argc:1, argv:/system/b2g/b2g
gecko/b2g/app/B2GLoader.cpp:203, Fuc:LoadStaticData  ----------------------------------
gecko/b2g/app/B2GLoader.cpp:204, Fuc:LoadStaticData  argc:1, argv:/system/b2g/b2g




///获取外层目录及路径
gecko/b2g/app/B2GLoader.cpp:206, Fuc:LoadStaticData  call GetXPCOMPath ---&gt;
/gecko/b2g/app/B2GLoader.cpp:93, Fuc:GetXPCOMPath  ----------------------------------
/gecko/b2g/app/B2GLoader.cpp:94, Fuc:GetXPCOMPath  aProgram:/system/b2g/b2g, aOutPath:
/gecko/b2g/app/B2GLoader.cpp:72, Fuc:GetDirnameSlash  lastSlash:XPCOM_FILE_PATH_SEPARATOR[0]=47
/gecko/b2g/app/B2GLoader.cpp:74, Fuc:GetDirnameSlash  aPath=:/system/b2g/dummy
/gecko/b2g/app/B2GLoader.cpp:75, Fuc:GetDirnameSlash  lastSlash= /dummy
/gecko/b2g/app/B2GLoader.cpp:85, Fuc:GetDirnameSlash  aOutDir:/system/b2g/
/gecko/b2g/app/B2GLoader.cpp:86, Fuc:GetDirnameSlash  cpsz=12  NOTE:this is return value of this func
/gecko/b2g/app/B2GLoader.cpp:101, Fuc:GetXPCOMPath  len =GetDirnameSlash(...):12
/gecko/b2g/app/B2GLoader.cpp:108, Fuc:GetXPCOMPath  aOutPath:/system/b2g/libxul.so
/gecko/b2g/app/B2GLoader.cpp:109, Fuc:GetXPCOMPath  afterSlash:libxul.so


//////////////////////////////////////////////////////////////////////
传入变量，获取.so dependentlibs.list 并读取， 地址
loadlibxul 调xpcomgluestartup, 开始加载库.
call xpcomglueloadxulfunction load核心函数。
dlopen 打开库，dlsym 获取函数。

///加载固定数据，分别是两个类型，一个是5个.so 一个是5个函数。
/gecko/b2g/app/B2GLoader.cpp:210, Fuc:LoadStaticData  call LoadLibxul ---&gt; 
/gecko/b2g/app/B2GLoader.cpp:116, Fuc:LoadLibxul  ----------------------------------
/gecko/b2g/app/B2GLoader.cpp:120, Fuc:LoadLibxul  aXPCOMPath:/system/b2g/libxul.so

///使可以加载那些库及函数
/gecko/b2g/app/B2GLoader.cpp:121, Fuc:LoadLibxul  call XPCOMGlueEnablePreload---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:474, Fuc:XPCOMGlueEnablePreload  ----------------------------------


///开始加载固定数据
/gecko/b2g/app/B2GLoader.cpp:124, Fuc:LoadLibxul  call XPCOMGlueStartup---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:525, Fuc:XPCOMGlueStartup  ----------------------------------
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:526, Fuc:XPCOMGlueStartup  aXPCOMFile:/system/b2g/libxul.so


//// xpcomglueload : get dependentlibs.list and load the 5 .so and load function nsgetfrozenfunction 
///load 5个.so库 并最后找出frozen 重要函数并返回其地址，供下一步load function 用。
///加载5个so库，目的是什么呢？供后面runprocess用，以节省时间空间？？？
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:537, Fuc:XPCOMGlueStartup  call XPCOMGlueLoad ---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:333, Fuc:XPCOMGlueLoad  ----------------------------------
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:356, Fuc:XPCOMGlueLoad  aXPCOMFile's lastSlash:/libxul.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:383, Fuc:XPCOMGlueLoad  cursor=xpcomDir:dependentlibs.list
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:389, Fuc:XPCOMGlueLoad  xpcomDir:/system/b2g/dependentlibs.list 
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:278, Fuc:TS_tfopen  TS_tfopen aPath:/system/b2g/dependentlibs.list 
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:424, Fuc:XPCOMGlueLoad  buffer:libmozglue.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:243, Fuc:ReadDependentCB  ----------------------------------
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:247, Fuc:ReadDependentCB  call GetLibHandle---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:200, Fuc:GetLibHandle  dlopen: /system/b2g/libmozglue.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:253, Fuc:ReadDependentCB  aDependentLib:/system/b2g/libmozglue.so, 1
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:424, Fuc:XPCOMGlueLoad  buffer:libmozsandbox.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:243, Fuc:ReadDependentCB  ----------------------------------
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:247, Fuc:ReadDependentCB  call GetLibHandle---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:200, Fuc:GetLibHandle  dlopen: /system/b2g/libmozsandbox.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:253, Fuc:ReadDependentCB  aDependentLib:/system/b2g/libmozsandbox.so, 1
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:424, Fuc:XPCOMGlueLoad  buffer:libnss3.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:243, Fuc:ReadDependentCB  ----------------------------------
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:247, Fuc:ReadDependentCB  call GetLibHandle---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:200, Fuc:GetLibHandle  dlopen: /system/b2g/libnss3.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:253, Fuc:ReadDependentCB  aDependentLib:/system/b2g/libnss3.so, 1
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:424, Fuc:XPCOMGlueLoad  buffer:liblgpllibs.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:243, Fuc:ReadDependentCB  ----------------------------------
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:247, Fuc:ReadDependentCB  call GetLibHandle---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:200, Fuc:GetLibHandle  dlopen: /system/b2g/liblgpllibs.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:253, Fuc:ReadDependentCB  aDependentLib:/system/b2g/liblgpllibs.so, 1
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:424, Fuc:XPCOMGlueLoad  buffer:libxul.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:243, Fuc:ReadDependentCB  ----------------------------------
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:247, Fuc:ReadDependentCB  call GetLibHandle---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:200, Fuc:GetLibHandle  dlopen: /system/b2g/libxul.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:253, Fuc:ReadDependentCB  aDependentLib:/system/b2g/libxul.so, 1
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:207, Fuc:GetSymbol  dlsym: NS_GetFrozenFunctions
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:439, Fuc:XPCOMGlueLoad  GetFrozenFunctionsFunc sys=:b3efc2fd




//// get funcs from libxul and save the address of func??? in where? in asymbols?? 获取函数地址,在哪里调用呢？只加载出来，并没取调用？
  有什么用？？？节省时间？内存？加快速度？算公共用的数据或函数
///加载公共用的函数，存好他们的地址，后面用？？？


///load 5个公用？？函数 返回（保存？）其地址
/gecko/b2g/app/B2GLoader.cpp:128, Fuc:LoadLibxul  call XPCOMGlueLoadXULFunctions---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:446, Fuc:XPCOMGlueLoadXULFunctions  ----------------------------------
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:451, Fuc:XPCOMGlueLoadXULFunctions  sTop-&gt;libHandle:libxul.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:454, Fuc:XPCOMGlueLoadXULFunctions  aSymbols-&gt;functionName:XRE_ProcLoaderServiceRun
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:457, Fuc:XPCOMGlueLoadXULFunctions  sTop-&gt;libHandle:libxul.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:458, Fuc:XPCOMGlueLoadXULFunctions  buffer:XRE_ProcLoaderServiceRun
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:459, Fuc:XPCOMGlueLoadXULFunctions  call GetSymbol(sTop-&gt;libHandle, buffer)---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:207, Fuc:GetSymbol  dlsym: XRE_ProcLoaderServiceRun
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:461, Fuc:XPCOMGlueLoadXULFunctions  result of GetSymbol: aSymbols-&gt;function:b405bf9d
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:465, Fuc:XPCOMGlueLoadXULFunctions  ++aSymbols:b6f41d70
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:454, Fuc:XPCOMGlueLoadXULFunctions  aSymbols-&gt;functionName:XRE_ProcLoaderClientInit
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:457, Fuc:XPCOMGlueLoadXULFunctions  sTop-&gt;libHandle:libxul.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:458, Fuc:XPCOMGlueLoadXULFunctions  buffer:XRE_ProcLoaderClientInit
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:459, Fuc:XPCOMGlueLoadXULFunctions  call GetSymbol(sTop-&gt;libHandle, buffer)---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:207, Fuc:GetSymbol  dlsym: XRE_ProcLoaderClientInit
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:461, Fuc:XPCOMGlueLoadXULFunctions  result of GetSymbol: aSymbols-&gt;function:b405989d
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:465, Fuc:XPCOMGlueLoadXULFunctions  ++aSymbols:b6f41d78
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:454, Fuc:XPCOMGlueLoadXULFunctions  aSymbols-&gt;functionName:XRE_ProcLoaderPreload
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:457, Fuc:XPCOMGlueLoadXULFunctions  sTop-&gt;libHandle:libxul.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:458, Fuc:XPCOMGlueLoadXULFunctions  buffer:XRE_ProcLoaderPreload
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:459, Fuc:XPCOMGlueLoadXULFunctions  call GetSymbol(sTop-&gt;libHandle, buffer)---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:207, Fuc:GetSymbol  dlsym: XRE_ProcLoaderPreload
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:461, Fuc:XPCOMGlueLoadXULFunctions  result of GetSymbol: aSymbols-&gt;function:b4e5a3ad
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:465, Fuc:XPCOMGlueLoadXULFunctions  ++aSymbols:b6f41d80
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:454, Fuc:XPCOMGlueLoadXULFunctions  aSymbols-&gt;functionName:XRE_CreateAppData
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:457, Fuc:XPCOMGlueLoadXULFunctions  sTop-&gt;libHandle:libxul.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:458, Fuc:XPCOMGlueLoadXULFunctions  buffer:XRE_CreateAppData
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:459, Fuc:XPCOMGlueLoadXULFunctions  call GetSymbol(sTop-&gt;libHandle, buffer)---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:207, Fuc:GetSymbol  dlsym: XRE_CreateAppData
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:461, Fuc:XPCOMGlueLoadXULFunctions  result of GetSymbol: aSymbols-&gt;function:b4e5c8f1
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:465, Fuc:XPCOMGlueLoadXULFunctions  ++aSymbols:b6f41d88
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:454, Fuc:XPCOMGlueLoadXULFunctions  aSymbols-&gt;functionName:XRE_GetFileFromPath
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:457, Fuc:XPCOMGlueLoadXULFunctions  sTop-&gt;libHandle:libxul.so
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:458, Fuc:XPCOMGlueLoadXULFunctions  buffer:XRE_GetFileFromPath
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:459, Fuc:XPCOMGlueLoadXULFunctions  call GetSymbol(sTop-&gt;libHandle, buffer)---&gt;
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:207, Fuc:GetSymbol  dlsym: XRE_GetFileFromPath
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:461, Fuc:XPCOMGlueLoadXULFunctions  result of GetSymbol: aSymbols-&gt;function:b4e54705
/../gecko/xpcom/glue/standalone/nsXPCOMGlue.cpp:465, Fuc:XPCOMGlueLoadXULFunctions  ++aSymbols:b6f41d90



///目的又是什么？在上面不是已经获取了路径了吗？目的是剥离出外面的目录，什么的目的是获取整个路径？
/gecko/b2g/app/B2GLoader.cpp:215, Fuc:LoadStaticData  call GetDirnameSlash ---&gt;
/gecko/b2g/app/B2GLoader.cpp:72, Fuc:GetDirnameSlash  lastSlash:XPCOM_FILE_PATH_SEPARATOR[0]=47
/gecko/b2g/app/B2GLoader.cpp:74, Fuc:GetDirnameSlash  aPath=:/system/b2g/libxul.so
/gecko/b2g/app/B2GLoader.cpp:75, Fuc:GetDirnameSlash  lastSlash= /libxul.so
/gecko/b2g/app/B2GLoader.cpp:85, Fuc:GetDirnameSlash  aOutDir:/system/b2g/
/gecko/b2g/app/B2GLoader.cpp:86, Fuc:GetDirnameSlash  cpsz=12  NOTE:this is return value of this func



///没多少用吧？是关于firefox.exe 的，应该是为支持exe的代码。
/gecko/b2g/app/B2GLoader.cpp:163, Fuc:GetAppIni  ----------------------------------
/gecko/b2g/app/B2GLoader.cpp:164, Fuc:GetAppIni  argv0=/system/b2g/b2g
/gecko/b2g/app/B2GLoader.cpp:165, Fuc:GetAppIni  argv1=(null)
/gecko/b2g/app/B2GLoader.cpp:166, Fuc:GetAppIni  argv2=_=/system/b2g/b2g
/gecko/b2g/app/B2GLoader.cpp:167, Fuc:GetAppIni  argv3=EMULATED_STORAGE_SOURCE=/mnt/shell/emulated
/gecko/b2g/app/B2GLoader.cpp:168, Fuc:GetAppIni  argv4=LD_LIBRARY_PATH=/vendor/lib:/system/lib:/system/b2g
/gecko/b2g/app/B2GLoader.cpp:175, Fuc:GetAppIni  appDataFile:getenv('XUL_APP_FILE'): =(null)

/gecko/b2g/app/B2GLoader.cpp:221, Fuc:LoadStaticData  want value of appini:----------------------------------
/gecko/b2g/app/B2GLoader.cpp:229, Fuc:LoadStaticData  appData:@



///??? 加载xpt 接口文件
/gecko/b2g/app/B2GLoader.cpp:232, Fuc:LoadStaticData  call XRE_ProcLoaderServiceRun ---&gt;



后面就到Runprocesses 后面继续分析Runprocesses

</code></pre>

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
