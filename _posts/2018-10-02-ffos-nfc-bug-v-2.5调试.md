<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为博主打劫来的文章！！！未经允许可以随便转载。 May you do good and not evil.  May you share freely, never taking more than you give.					https://blog.csdn.net/hunter___/article/details/80185850				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-e2445db1a8.css">
						<div class="htmledit_views">
                <p>android 参考：</p><p><a href="https://blog.csdn.net/zhulove86/article/details/69666400" rel="nofollow" target="_blank">https://blog.csdn.net/zhulove86/article/details/69666400</a><br></p><p><a href="https://blog.csdn.net/dearsq/article/details/50585287" rel="nofollow" target="_blank">https://blog.csdn.net/dearsq/article/details/50585287</a><br></p><p><a href="https://blog.csdn.net/brucexu1978/article/details/7188441" rel="nofollow" target="_blank">https://blog.csdn.net/brucexu1978/article/details/7188441</a><br></p><p><a href="https://blog.csdn.net/zy00000000001/article/details/70662352" rel="nofollow" target="_blank">https://blog.csdn.net/zy00000000001/article/details/70662352</a><br></p><p><br></p><p><br></p><p>2.5版的唯一Log，</p><p>Log：</p><p><img src="https://img-blog.csdn.net/20180503201743125?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""><br></p><p><br></p><p><br></p><p>351的Log在哪个文件？</p><p>可能性如下：唯一的线索<br></p><p><img src="https://img-blog.csdn.net/20180503201644224?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""></p><p><br></p><p></p><div><div dir="ltr"><span xml:lang="zh-cn" lang="zh-cn"><span>While creating services from category 'profile-after-change', could not create service for entry 'Nfc', contract ID '@mozilla.org/nfc;1'<br><br><br>在创建'更改后的配置文件'类别的服务时，无法为条目'Nfc'创建服务，合同标识'@ mozilla.org / nfc; 1'<br><br>卡在创建类别服务时，无法为nfc创建服务，如何才能创建。<br><br>先修复如下部分，nfcd----&gt;ipc/nfc通路<br><img src="https://img-blog.csdn.net/20180504085857263?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""><br><br><br>grep -rni "While creating services from category '.*', could not create service for entry "<br>gecko/xpcom/components/nsCategoryManager.cpp:809:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; LogMessage("While creating services from category '%s', could not create service for entry '%s', contract ID '%s'",<br><br><br></span></span><pre><code class="language-html">xpcom/components/nsCategoryManager.cpp:876:        LogMessage("While creating services from category '%s', service for entry '%s', contract ID '%s' does not implement nsIObserver.",
</code></pre>xpcom/components/nsCategoryManager.cpp:876:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; LogMessage("While creating services from category '%s', service for entry '%s', contract ID '%s' does not implement nsIObserver.",<br><br><img src="https://img-blog.csdn.net/20180504211631836?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""><br>grep -rn "nsCategoryManager.h"<br>grep -rni MOZILLA_XPCOMRT_API<br><br><br>system/nfcd/src/NfcIpcSocket.cpp<br>nfcinit<br><br>2.2版的添加错误log,<br>在Nfc.js里添加了console.log(),符号错误时报如下：<br><img src="https://img-blog.csdn.net/20180508110843521?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""><br><br>gaia setting nfc<br><img src="https://img-blog.csdn.net/20180508135611656?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""><br><br>正常打开开关<br><pre><code class="language-html">I/        ( 8979): halo,im 3,********** NfcService::SendCommand  ************* in gecko/dom/nfc/gonk/NfcService.cpp
I/        ( 8979): halo,im 3,********** NfcMessageHandler::Marshall  ************* in gecko/dom/nfc/gonk/NfcMessageHandler.cpp
I/        ( 8979): halo,im 3,**** posttonfcdaemon  ******in gecko/ipc/nfc/Nfc.cpp
I/        ( 8979): halo,im 3,********** sendNfcSocketDataTask ==&gt; public  ************* in gecko/ipc/nfc/Nfc.cpp
D/nfcd    (  173):  8 of bytes to be sent... data=0xb882fe2c ret=0
D/nfcd    (  173): void NfcIpcSocket::writeToIncomingQueue(uint8_t*, size_t) enter, data=0xb882fe2c, dataLen=8
D/nfcd    (  173): void MessageHandler::processRequest(const uint8_t*, size_t) enter data=0xb882fe2c, dataLen=8
D/nfcd    (  173): void* NfcService::eventLoop(): NFCService msg=15
D/nfcd    (  173): Enable NFC
D/NfcNci  (  173): initialize: level=PS-FULL (1)
D/NfcNci  (  173): initialize: desired screen-off state=0
I/BrcmNfcNfa(  173): NFC_TASK started.
I/USERIAL_LINUX(  173): USERIAL_Init
I/NfcNciHal(  173): HAL_NfcInitialize (): NFC_HAL_TASK id=0
I/BrcmNfcNfa(  173): nfa_dm_init ()
I/BrcmNfcNfa(  173): nfa_sys_register () id=1, enable_cplt_mask=0x0
I/BrcmNfcNfa(  173): nfa_ee_init ()
I/BrcmNfcNfa(  173): nfa_sys_register () id=2, enable_cplt_mask=0x4
I/BrcmNfcNfa(  173): nfa_sys_register () id=3, enable_cplt_mask=0xc
I/BrcmNfcNfa(  173): nfa_rw_init ()
I/BrcmNfcNfa(  173): nfa_sys_register () id=6, enable_cplt_mask=0x4c
I/BrcmNfcNfa(  173): nfa_ce_init ()
I/BrcmNfcNfa(  173): nfa_sys_register () id=7, enable_cplt_mask=0xcc
I/BrcmNfcNfa(  173): nfa_hci_init ()
I/BrcmNfcNfa(  173): nfa_sys_register () id=8, enable_cplt_mask=0x1cc
I/BrcmNfcNfa(  173): LLCP - llcp_init ()
I/BrcmNfcNfa(  173): num_rx_buff = 9, rx_congest_start = 6, rx_congest_end = 4, max_num_ll_rx_buff = 2
I/BrcmNfcNfa(  173): max_num_tx_buff = 21, max_num_ll_tx_buff = 6
I/BrcmNfcNfa(  173): LLCP_RegisterServer (): SAP:0x1, link_type:0x2, ServiceName:&lt;urn:nfc:sn:sdp&gt;
I/BrcmNfcNfa(  173): LLCP_RegisterServer (): Registered SAP = 0x01
I/BrcmNfcNfa(  173): NFA_Enable ()
I/BrcmNfcNfa(  173): NFC_SetTraceLevel () new_level = 1
I/USERIAL_LINUX(  173): USERIAL_Open(): enter
I/USERIAL_LINUX(  173): USERIAL_Open() device: /dev/bcm2079x-i2c port=5, uart_port=0 WAKE_DELAY(20) WRITE_DELAY(20) POWER_ON_DELAY(300) PRE_POWER_OFF_DELAY(10) POST_POWER_OFF_DELAY(0)
I/Settings( 9362): Content JS LOG: 如何改变下层nfc状态 
I/Settings( 9362):     at ni_onNfcStatusChanged (app://settings.gaiamobile.org/js/panels/root/low_priority_items.js:181:10)
I/USERIAL_LINUX(  173): USERIAL_Open(): exit
D/NfcNci  (  173): initialize: Active SE override: 0xF4
D/NfcNci  (  173): getEeInfo: enter; mbNewEE=1, mActualNumEe=5
D/NfcNci  (  173): getEeInfo: num EEs discovered: 2
D/NfcNci  (  173): getEeInfo: EE[0] Handle: 0x04f2  Status: Connected/Active  Num I/f: 1: (0x01, 0x00)  Num TLVs: 0
D/NfcNci  (  173): getEeInfo: EE[1] Handle: 0x04f4  Status: Connected/Active  Num I/f: 1: (0x80, 0x00)  Num TLVs: 1
D/NfcNci  (  173): getEeInfo: EE[1] TLV[0]  Tag: 0xa0  Len: 1  Values[]: 0x03  0xb6  0x74 ...
D/NfcNci  (  173): getEeInfo: exit; mActualNumEe=2, mNumEePresent=1
D/NfcNci  (  173): initialize: try ee register
D/NfcNci  (  173): nfaEeCallback: event=0x1
D/NfcNci  (  173): nfaEeCallback: NFA_EE_REGISTER_EVT; status=0
D/NfcNci  (  173): nfaEeCallback: event=0xD
D/NfcNci  (  173): nfaEeCallback: NFA_EE_DISCOVER_REQ_EVT; status=0x0; num ee=1
D/NfcNci  (  173): storeUiccInfo:  Status: 0   Num EE: 1
D/NfcNci  (  173): storeUiccInfo   EE[0] Handle: 0x04f4  techA: 0x04  techB: 0x04  techF: 0x00  techBprime: 0x00
D/NfcNci  (  173): initialize: Found HCI network, try hci register
D/NfcNci  (  173): nfaHciCallback: event=0x0
D/NfcNci  (  173): nfaHciCallback: NFA_HCI_REGISTER_EVT; status=0x0; handle=0x800
D/NfcNci  (  173): import: enter
D/NfcNci  (  173): deleteDatabase: default db size=0; sec elem db size=0
D/NfcNci  (  173): Failed to open /data/nfc/param/route.xml
D/NfcNci  (  173): doRegisterNdefTypeHandler
D/NfcNci  (  173): NfcTag::resetTechnologies
D/NfcNci  (  173): PeerToPeer::handleNfcOnOff: enter; is on=1
D/NfcNci  (  173): PeerToPeer::handleNfcOnOff: exit
D/NfcNci  (  173): ndefHandlerCallback: event=0, eventData=0xb678ae94
D/NfcNci  (  173): ndefHandlerCallback: NFA_NDEF_REGISTER_EVT; status=0x0; h=0x200
D/NfcNci  (  173): setLevel: level=PS-LOW-POWER (2)
D/NfcNci  (  173): setPowerOffSleepState: enter; sleep=1
D/NfcNci  (  173): setPowerOffSleepState: try power off
D/NfcNci  (  173): deviceManagementCallback: NFA_DM_PWR_MODE_CHANGE_EVT; status=0; device mgt power mode=DM-OFF (0)
D/NfcNci  (  173): setPowerOffSleepState: exit; return 1
D/nfcd    (  173): void SnepServer::start(): enter
D/NfcNci  (  173): PeerToPeer::registerServer: enter; service name: urn:nfc:sn:snep  handle: 17
D/NfcNci  (  173): PeerToPeer::registerServer: added new p2p server  index: 0  handle: 17  name: urn:nfc:sn:snep
D/NfcNci  (  173): P2pServer::registerWithStack: enter; service name: urn:nfc:sn:snep  handle: 17
D/NfcNci  (  173): P2pServer::registerWithStack: wait for listen-completion event
D/NfcNci  (  173): PeerToPeer::nfaServerCallback: NFA_P2P_REG_SERVER_EVT; handle: 0x0504; service sap=0x04  name: urn:nfc:sn:snep
D/NfcNci  (  173): PeerToPeer::registerServer: got new p2p server h=0x504
D/nfcd    (  173): void SnepServer::start(): exit
D/nfcd    (  173): void HandoverServer::start(): enter
D/NfcNci  (  173): PeerToPeer::registerServer: enter; service name: urn:nfc:sn:handover  handle: 18
D/NfcNci  (  173): PeerToPeer::registerServer: added new p2p server  index: 1  handle: 18  name: urn:nfc:sn:handover
D/NfcNci  (  173): P2pServer::registerWithStack: enter; service name: urn:nfc:sn:handover  handle: 18
D/NfcNci  (  173): P2pServer::registerWithStack: wait for listen-completion event
D/NfcNci  (  173): PeerToPeer::nfaServerCallback: NFA_P2P_REG_SERVER_EVT; handle: 0x0510; service sap=0x10  name: urn:nfc:sn:handover
D/NfcNci  (  173): PeerToPeer::registerServer: got new p2p server h=0x510
D/nfcd    (  173): void HandoverServer::start(): exit
D/NfcNci  (  173): setLevel: level=PS-FULL (1)
D/NfcNci  (  173): setPowerOffSleepState: enter; sleep=0
D/NfcNci  (  173): setPowerOffSleepState: try full power
I/NfcNci  (  173): halo,im 5 in ******accept************** system/nfcd/src/nci/LlcpServiceSocket.cpp*************
D/NfcNci  (  173): accept: enter
D/NfcNci  (  173): PeerToPeer::accept: enter; server handle: 18; conn handle: 19; maxInfoUnit: 128; recvWindow: 1
D/NfcNci  (  173): P2pServer::accept: serverHandle: 18; connHandle: 19; wait for incoming connection
I/NfcNci  (  173): halo,im 5 in ******accept************** system/nfcd/src/nci/LlcpServiceSocket.cpp*************
D/NfcNci  (  173): accept: enter
D/NfcNci  (  173): PeerToPeer::accept: enter; server handle: 17; conn handle: 20; maxInfoUnit: 248; recvWindow: 1
D/NfcNci  (  173): P2pServer::accept: serverHandle: 17; connHandle: 20; wait for incoming connection
I/USERIAL_LINUX(  173): USERIAL_Open(): enter
I/USERIAL_LINUX(  173): USERIAL_Open() device: /dev/bcm2079x-i2c port=5, uart_port=0 WAKE_DELAY(20) WRITE_DELAY(20) POWER_ON_DELAY(300) PRE_POWER_OFF_DELAY(10) POST_POWER_OFF_DELAY(0)
I/USERIAL_LINUX(  173): USERIAL_Open(): exit
E/Sensors (10835): sns_fsa_la.c(386):fsa: fflush failed, 9
E/Sensors (10835): sns_fsa_la.c(386):fsa: fflush failed, 9
E/Sensors (10835): sns_pwr.c(488):sns_pwr_boot: DSPS device open failed err 19
E/Sensors (10835): sns_init_la.c(301):Error 5 initializing sns_pwr_init
E/Sensors (10835): sns_main.c(1476):Exiting! sensor1_init failed with 5
D/NfcNci  (  173): deviceManagementCallback: NFA_DM_PWR_MODE_CHANGE_EVT; status=0; device mgt power mode=DM-FULL (4)
D/NfcNci  (  173): setPowerOffSleepState: exit; return 1
D/NfcNci  (  173): activate: enter;
D/NfcNci  (  173): getEeInfo: enter; mbNewEE=0, mActualNumEe=2
D/NfcNci  (  173): activate: override ee h=0x4F4
D/NfcNci  (  173): activate: h=0x4F4 already activated
D/NfcNci  (  173): activate: exit; active ee h=0x4F4
D/NfcNci  (  173): routeToSecureElement: enter
D/NfcNci  (  173): adjustRoutes: enter; selection=2
D/NfcNci  (  173): adjustProtocolRoutes: enter
D/NfcNci  (  173): adjustProtocolRoutes: delete route to host
D/NfcNci  (  173): nfaEeCallback: event=0x7
D/NfcNci  (  173): nfaEeCallback: NFA_EE_SET_PROTO_CFG_EVT; status=0x0
D/NfcNci  (  173): adjustProtocolRoutes: delete route to EE h=0x4F4
D/NfcNci  (  173): nfaEeCallback: event=0x7
D/NfcNci  (  173): nfaEeCallback: NFA_EE_SET_PROTO_CFG_EVT; status=0x0
D/NfcNci  (  173): adjustProtocolRoutes: route to default EE h=0x4F4
D/NfcNci  (  173): nfaEeCallback: event=0x7
D/NfcNci  (  173): nfaEeCallback: NFA_EE_SET_PROTO_CFG_EVT; status=0x0
D/NfcNci  (  173): adjustProtocolRoutes: exit
D/NfcNci  (  173): adjustTechnologyRoutes: enter
D/NfcNci  (  173): adjustTechnologyRoutes: delete route to host
D/NfcNci  (  173): nfaEeCallback: event=0x6
D/NfcNci  (  173): nfaEeCallback: NFA_EE_SET_TECH_CFG_EVT; status=0x0
D/NfcNci  (  173): adjustTechnologyRoutes: delete route to EE h=0x4F4
D/NfcNci  (  173): nfaEeCallback: event=0x6
D/NfcNci  (  173): nfaEeCallback: NFA_EE_SET_TECH_CFG_EVT; status=0x0
D/NfcNci  (  173): adjustTechnologyRoutes: route to default EE h=0x4F4
D/NfcNci  (  173): nfaEeCallback: event=0x6
D/NfcNci  (  173): nfaEeCallback: NFA_EE_SET_TECH_CFG_EVT; status=0x0
D/NfcNci  (  173): routeToSecureElement: start UICC listen; h=0x4F4; tech mask=0x1
D/NfcNci  (  173): setModeOn: (activated=0x2) : mCurrActivity=0x3
D/NfcNci  (  173): setLevel: level=PS-FULL (1)
D/NfcNci  (  173): PeerToPeer::enableP2pListening: enter isEnable: 1  mIsP2pListening: 0
D/NfcNci  (  173): PeerToPeer::enableP2pListening: exit; mIsP2pListening: 1
D/NfcNci  (  173): setModeOn: (activated=0x1) : mCurrActivity=0x3
D/nfcd    (  173): void NfcService::handleEnableResponse(NfcEvent*) mState=2
D/nfcd    (  173): void MessageHandler::processResponse(NfcResponseType, NfcErrorCode, void*) enter response=1001, error=0
D/nfcd    (  173): void NfcIpcSocket::writeToOutgoingQueue(uint8_t*, size_t) enter, data=0xb88751f8, dataLen=16
D/nfcd    (  173): Writing 16 bytes to gecko 
I/        ( 8979): halo,im 3,*********** receiveSocketData    ***************in gecko/ipc/nfc/Nfc.cpp
I/        ( 8979): halo,im 3,********** NfcMessageHandler::Unmarshall  ************* in gecko/dom/nfc/gonk/NfcMessageHandler.cpp
I/        ( 8979): halo,im 3,********** NfcService::DispatchNfcEvent  ************* in gecko/dom/nfc/gonk/NfcService.cpp
E/Sensors (10839): sns_fsa_la.c(386):fsa: fflush failed, 9
E/Sensors (10839): sns_fsa_la.c(386):fsa: fflush failed, 9
E/Sensors (10839): sns_pwr.c(488):sns_pwr_boot: DSPS device open failed err 1</code></pre><br>三&nbsp; 顺序梳理：<br><br>nfcservice::sendcommand<br><br><br>Nfc.js 里的Nfc()<br><img src="https://img-blog.csdn.net/20180510153800847?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""><br>接着定义Nfc.prototype下的原型，用到了sendcommand<br><img src="https://img-blog.csdn.net/20180510154228245?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""><br><br>也就是let mmm nfcService对象已经分装了sendcommand在里面了.<br><br><br>gecko/js/xpconnect/src/XPCShellImpl.cpp<br>变量定义，名称替换吗？<br><img src="https://img-blog.csdn.net/20180510160529864?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""><br><br>一个函数，<br><img src="https://img-blog.csdn.net/20180510160406536?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""><br></div></div><br><p><br></p><p><br></p><p>.idl文件定义接口C++到ＪＳ</p><p>grep -rn getService |grep -v \.js\: |grep -v \.html\: |grep -i getService<span class="MathJax_Preview" style="color: inherit; display: none;"></span><span class="MathJax" id="MathJax-Element-1-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot; />" role="presentation" style="position: relative;"><nobr aria-hidden="true"><span class="math" id="MathJax-Span-1" style="width: 0em; display: inline-block;"><span style="display: inline-block; position: relative; width: 0em; height: 0px; font-size: 122%;"><span style="position: absolute; clip: rect(3.845em, 1000em, 4.152em, -999.997em); top: -3.993em; left: 0em;"><span class="mrow" id="MathJax-Span-2"></span><span style="display: inline-block; width: 0px; height: 3.998em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.059em; border-left: 0px solid; width: 0px; height: 0.128em;"></span></span></nobr><span class="MJX_Assistive_MathML" role="presentation"><math xmlns="http://www.w3.org/1998/Math/MathML"></math></span></span><script type="math/tex" id="MathJax-Element-1"></script><br><br><br></p><p><img src="https://img-blog.csdn.net/20180510201052397?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""></p><p><br></p><p>接口</p><p><img src="https://img-blog.csdn.net/20180510203118280?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""></p><p><br></p><p><br></p><p>添加到Firefox OS<br></p><p>添加js 和manifest文件到</p><p><code><span style="color:#111111;background:#EEEEFF;">gecko/b2g/installer/package-manifest.in</span></code></p><p><code><span style="color:#111111;background:#EEEEFF;"></span></code><span style="color:#111111;background:#FDFDFD;"></span><img src="https://img-blog.csdn.net/20180511111806611?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""><br></p><p><img src="https://img-blog.csdn.net/20180511111712482?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1bnRlcl9fXw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""><br></p><p><br></p><p>开关打开前的log</p><pre><code class="language-html">./adblogcat.sh: line 5: [: nfc: unary operator expected
59:D/nfcd    (  173): void* NfcService::eventLoop(): NFCService started
357:I/        (  171): halo,im 3,********** NfcService::FactoryCreate  ************* in gecko/dom/nfc/gonk/NfcService.cpp
358:I/        (  171): halo ，去连接服务, *********  NfcConnector::create **********  in gecko/ipc/nfc/Nfc.cpp
359:I/        (  171): halo,im 3, **********  NfcConnector::CreateAddr *************in gecko/ipc/nfc/Nfc.cpp
360:D/nfcd    (  173): Socket connected
361:D/nfcd    (  173): void* NfcService::eventLoop(): NFCService msg=10
362:D/nfcd    (  173): processNotificaton notification=2000
363:D/nfcd    (  173): void NfcIpcSocket::writeToOutgoingQueue(uint8_t*, size_t) enter, data=0xb7ad5e68, dataLen=20
364:D/nfcd    (  173): Writing 20 bytes to gecko 
365:I/        (  171): halo,im 3,********** NfcService::Start  ************* in gecko/dom/nfc/gonk/NfcService.cpp:
410:I/        (  171): halo,im 3,***********  NfcConsumer::onConnectSuccess   ************in gecko/ipc/nfc/Nfc.cpp
411:I/        (  171): halo,im 3,*********** NfcConsumer::receiveSocketData    ***************in gecko/ipc/nfc/Nfc.cpp
412:I/        (  171): halo,im 3,********** NfcMessageHandler::Unmarshall  ************* in gecko/dom/nfc/gonk/NfcMessageHandler.cpp
419:I/        (  171): halo,im 3,********** NfcService::DispatchNfcEvent  ************* in gecko/dom/nfc/gonk/NfcService.cpp
439:I/Gecko   (  171): -*- SettingsService: settings 'handle' for nfc.debugging.enabled callback threw an exception, dropping: [Exception... "Component does not have requested interface [nsISettingsServiceCallback.handle]"  nsresult: "0x80004002 (NS_NOINTERFACE)"  location: "JS frame :: jar:file:///system/b2g/omni.ja!/components/SettingsService.js :: callHandle :: line 202"  data: no]

</code></pre><br><p>2.2&nbsp; disable nfcd log</p><pre><code class="language-html">350:I/        (  171): halo,im 3,********** NfcService::FactoryCreate  ************* in gecko/dom/nfc/gonk/NfcService.cpp:   File: ../../../gecko/dom/nfc/gonk/NfcService.cpp, Line: 287, Function: FactoryCreate
351:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:184, ******* Function:NfcConsumer ******
352:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
353:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
354:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
356:I/        (  171): halo,im 3,********** NfcService: File: ../../../gecko/dom/nfc/gonk/NfcService.cpp, Line: 274, Function: NfcService
357:I/        (  171): halo,im 3,********** NfcService::Start  ************* in gecko/dom/nfc/gonk/NfcService.cpp:
402:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
403:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
416:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
417:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
418:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
425:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
426:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
435:I/Gecko   (  171): -*- SettingsService: settings 'handle' for nfc.debugging.enabled callback threw an exception, dropping: [Exception... "Component does not have requested interface [nsISettingsServiceCallback.handle]"  nsresult: "0x80004002 (NS_NOINTERFACE)"  location: "JS frame :: jar:file:///system/b2g/omni.ja!/components/SettingsService.js :: callHandle :: line 202"  data: no]
491:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
492:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
493:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
495:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
496:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
615:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
616:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
617:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
619:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
620:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
692:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
693:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
694:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
696:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
697:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
2478:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
2479:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
2480:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
2482:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
2483:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
2524:I/        (  171): halo,im 3,********** NfcService::SendCommand  ************* in gecko/dom/nfc/gonk/NfcService.cpp
2525:I/        (  171): halo,im 3,********** NfcService: File: ../../../gecko/dom/nfc/gonk/NfcService.cpp, Line: 53, Function: assertIsNfcServiceThread
2526:I/        (  171): halo,nfc ,*** MessageHandler:Marshall入口， File: ../../../gecko/dom/nfc/gonk/NfcMessageHandler.cpp, Line: 43,******* Function: Marshall******
2527:I/        (  171): halo,nfc ,*** MessageHandler: File: ../../../gecko/dom/nfc/gonk/NfcMessageHandler.cpp, Line: 149,******* Function: ChangeRFStateRequest******
2528:W/GeckoConsole(  171): [JavaScript Error: "ReferenceError: console is not defined" {file: "jar:file:///system/b2g/omni.ja!/components/Nfc.js" line: 675}]
2529:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:203, ******* Function:PostToNfcDaemon ******
2530:I/        (  171): halo,im 3,********** class::SendNfcSocketDataTask ==&gt; public  ************* in gecko/ipc/nfc/Nfc.cpp
2531:I/Settings(  920): Content JS LOG: 如何改变下层nfc状态 
2532:I/Settings(  920):     at ni_onNfcStatusChanged (app://settings.gaiamobile.org/js/panels/root/low_priority_items.js:181:10)
2562:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
2563:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
2564:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
2566:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
2567:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
2633:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
2634:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
2635:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
2637:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
2638:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
2704:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
2705:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
2706:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
2708:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
2709:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
2780:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
2781:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
2782:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
2784:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
2785:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
2851:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
2852:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
2853:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
2855:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
2856:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
2922:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
2923:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
2924:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
2926:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
2927:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
2993:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
2994:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
2995:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
2997:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
2998:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
3064:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
3065:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
3066:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
3068:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
3069:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
3139:I/GeckoDump( 1277): NfcReadDemo init
3225:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
3226:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
3227:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
3229:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
3230:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
3296:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
3297:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
3298:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
3300:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
3301:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
3367:I/        (  171): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
3368:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
3369:I/        (  171): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
3371:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
3372:I/        (  171): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
</code></pre><br><p><br></p><p>没有打开开关的一个循环</p><pre><code class="language-html">821:I/        (  170): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
822:I/        (  170): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
823:I/        (  170): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
825:I/        (  170): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
826:I/        (  170): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
854:I/Gecko   (  170): -*- Nfc: Received message from content process: {"target":{},"name":"NFC:SetFocusApp","sync":false,"json":{"tabId":1,"isFocus":true},"data":{"tabId":1,"isFocus":true},"objects":{}}
872:I/Gecko   (  170): -*- Nfc: Received message from content process: {"target":{},"name":"NFC:AddEventListener","sync":false,"json":{"tabId":4},"data":{"tabId":4},"objects":{}}
873:I/Gecko   (  170): -*- Nfc: Received message from content process: {"target":{},"name":"NFC:QueryInfo","sync":true,"json":null,"data":null,"objects":{}}
874:I/Gecko   (  170): -*- Nfc: Received message from content process: {"target":{},"name":"NFC:SetFocusApp","sync":false,"json":{"tabId":1,"isFocus":false},"data":{"tabId":1,"isFocus":false},"objects":{}}
875:I/Gecko   (  170): -*- Nfc: Received message from content process: {"target":{},"name":"NFC:SetFocusApp","sync":false,"json":{"tabId":4,"isFocus":true},"data":{"tabId":4,"isFocus":true},"objects":{}}
924:I/        (  170): halo,nfc ,创建服务连接，往nfcd去，***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:90, ******* Function:Create ******
925:I/        (  170): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:154, ******* Function:SetUp ******
926:I/        (  170): halo,nfc ,***NfcConnector***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:119, ******* Function:CreateAddr ******
928:I/        (  170): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:234, ******* Function:OnConnectError ******
929:I/        (  170): halo,nfc ,***NfcConsumer***  File:../../../gecko/ipc/nfc/Nfc.cpp,****** Line:242, ******* Function:OnDisconnect ******
</code></pre><br><p>报错信息：Nfc.js出错时</p><pre><code class="language-html">./adblogcat.sh: line 5: [: nfc: unary operator expected
350:W/GeckoConsole(  171): [JavaScript Error: "SyntaxError: illegal character" {file: "jar:file:///system/b2g/omni.ja!/components/Nfc.js" line: 524 column: 47 source: "    let nfcMsgType = message.name + "Response";
352:I/GeckoConsole(  171): While creating services from category 'profile-after-change', could not create service for entry 'Nfc', contract ID '@mozilla.org/nfc;1'
353:I/Gecko   (  171): -*- NfcContentHelper: hahaha NfcContentHelper() in NfcContentHelper.js.
477:W/GeckoConsole(  171): [JavaScript Error: "TypeError: cpmm.sendSyncMessage(...)[0] is undefined" {file: "jar:file:///system/b2g/omni.ja!/components/NfcContentHelper.js" line: 98}]
478:W/GeckoConsole(  171): [JavaScript Error: "NS_ERROR_XPC_JAVASCRIPT_ERROR_WITH_DETAILS: [JavaScript Error: "cpmm.sendSyncMessage(...)[0] is undefined" {file: "jar:file:///system/b2g/omni.ja!/components/NfcContentHelper.js" line: 98}]'[JavaScript Error: "cpmm.sendSyncMessage(...)[0] is undefined" {file: "jar:file:///system/b2g/omni.ja!/components/NfcContentHelper.js" line: 98}]' when calling method: [nsINfcContentHelper::queryRFState]" {file: "jar:file:///system/b2g/omni.ja!/components/nsNfc.js" line: 382}]
518:W/GeckoConsole(  171): [JavaScript Error: "TypeError: cpmm.sendSyncMessage(...)[0] is undefined" {file: "jar:file:///system/b2g/omni.ja!/components/NfcContentHelper.js" line: 98}]
519:W/GeckoConsole(  171): [JavaScript Error: "NS_ERROR_XPC_JAVASCRIPT_ERROR_WITH_DETAILS: [JavaScript Error: "cpmm.sendSyncMessage(...)[0] is undefined" {file: "jar:file:///system/b2g/omni.ja!/components/NfcContentHelper.js" line: 98}]'[JavaScript Error: "cpmm.sendSyncMessage(...)[0] is undefined" {file: "jar:file:///system/b2g/omni.ja!/components/NfcContentHelper.js" line: 98}]' when calling method: [nsINfcContentHelper::queryRFState]" {file: "jar:file:///system/b2g/omni.ja!/components/nsNfc.js" line: 382}]
522:W/GeckoConsole(  171): [JavaScript Error: "TypeError: cpmm.sendSyncMessage(...)[0] is undefined" {file: "jar:file:///system/b2g/omni.ja!/components/NfcContentHelper.js" line: 98}]
523:W/GeckoConsole(  171): [JavaScript Error: "NS_ERROR_XPC_JAVASCRIPT_ERROR_WITH_DETAILS: [JavaScript Error: "cpmm.sendSyncMessage(...)[0] is undefined" {file: "jar:file:///system/b2g/omni.ja!/components/NfcContentHelper.js" line: 98}]'[JavaScript Error: "cpmm.sendSyncMessage(...)[0] is undefined" {file: "jar:file:///system/b2g/omni.ja!/components/NfcContentHelper.js" line: 98}]' when calling method: [nsINfcContentHelper::queryRFState]" {file: "jar:file:///system/b2g/omni.ja!/components/nsNfc.js" line: 382}]
2154:I/Gecko   (  859): -*- NfcContentHelper: hahaha NfcContentHelper() in NfcContentHelper.js.
2155:W/Settings(  859): [JavaScript Error: "TypeError: cpmm.sendSyncMessage(...)[0] is undefined" {file: "jar:file:///system/b2g/omni.ja!/components/NfcContentHelper.js" line: 98}]
2156:W/Settings(  859): [JavaScript Error: "NS_ERROR_XPC_JAVASCRIPT_ERROR_WITH_DETAILS: [JavaScript Error: "cpmm.sendSyncMessage(...)[0] is undefined" {file: "jar:file:///system/b2g/omni.ja!/components/NfcContentHelper.js" line: 98}]'[JavaScript Error: "cpmm.sendSyncMessage(...)[0] is undefined" {file: "jar:file:///system/b2g/omni.ja!/components/NfcContentHelper.js" line: 98}]' when calling method: [nsINfcContentHelper::queryRFState]" {file: "jar:file:///system/b2g/omni.ja!/components/nsNfc.js" line: 382}]

</code></pre><br><p><br></p><p><br></p><p><br></p>            </div>
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
