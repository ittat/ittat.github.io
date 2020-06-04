package com.example.wu.testapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private Button btnJsCallVideo;


    private void findViews() {
        btnJsCallVideo = (Button)findViewById( R.id.btn_js_video );

        btnJsCallVideo.setOnClickListener( this );
    }


    @Override
    public void onClick(View v) {
        if ( v == btnJsCallVideo ) {
            // Handle clicks for btnJsCallPhone
            Intent intent = new Intent(this,JsCallJavaVideoActivity.class);
            startActivity(intent);
        }
    }



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        findViews();
    }
}
