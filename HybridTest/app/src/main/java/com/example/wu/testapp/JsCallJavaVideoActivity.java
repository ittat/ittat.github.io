package com.example.wu.testapp;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by wu on 2017/5/7.
 */
public class JsCallJavaVideoActivity  extends AppCompatActivity {
    private WebView webview;
    private WebSettings webSettings;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_js_call_java_video);
        webview = (WebView) findViewById(R.id.webview);
        //设置支持javaScript
        webSettings = webview.getSettings();
        //设置支持javaScript
        webSettings.setJavaScriptEnabled(true);
        //设置文字大小
        webSettings.setTextZoom(100);
        //不让从当前网页跳转到系统的浏览器中
        webview.setWebViewClient(new WebViewClient() {
            //当加载页面完成的时候回调
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
            }
        });

        //添加javaScript接口
        webview.addJavascriptInterface(new MyJavascriptInterface(), "Android");

        //可以加载网络的页面，也可以加载应用内置的页面
        webview.loadUrl("http://192.168.191.1:8080/JsCallJava.html");

    }


    class MyJavascriptInterface {
        //拨打电话
        @JavascriptInterface
        public void call(String video) {
            Intent intent = new Intent();//隐式意图
            intent.setDataAndType(Uri.parse(video),"video/*");
            startActivity(intent);
        }

        //加载联系人
        @JavascriptInterface
        public void showcontacts(){
            String json = "[{\"name\":\"LikeYou\",\"video\":\"http://192.168.191.1:8080/LikeYou.mp4\"}]";
            // 调用JS中的方法
            webview.loadUrl("javascript:show("+"'"+json+"'"+")");
        }
    }
}
