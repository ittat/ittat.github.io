---
layout: post
title: 'smartisan U1编译CM13问题方案'
date: 2017-09-13
author: ittat
cover: ''
tags: Lineage Android complie CM
---

2017-09-13

## 问题一：

编译audio.primary.msm8916时报错

```
target arm C: audio.primary.msm8916 <= hardware/qcom/audio-caf/msm8916/hal/audio_hw.c
In file included from hardware/qcom/audio-caf/msm8916/hal/audio_hw.c:53:0:
hardware/qcom/audio-caf/msm8916/hal/audio_extn/audio_extn.h:402:1: warning: useless storage class specifier in empty declaration
 };
 ^
hardware/qcom/audio-caf/msm8916/hal/audio_hw.c: In function 'get_snd_codec_id':
hardware/qcom/audio-caf/msm8916/hal/audio_hw.c:431:14: error: 'SND_AUDIOCODEC_ALAC' undeclared (first use in this function)
         id = SND_AUDIOCODEC_ALAC;
              ^
hardware/qcom/audio-caf/msm8916/hal/audio_hw.c:431:14: note: each undeclared identifier is reported only once for each function it appears in
hardware/qcom/audio-caf/msm8916/hal/audio_hw.c:434:14: error: 'SND_AUDIOCODEC_APE' undeclared (first use in this function)
         id = SND_AUDIOCODEC_APE;
              ^

```
原因：
msm8916的audio-caf里面的audio_extn.h头文件没有定义并赋值SND_AUDIOCODEC_ALAC和SND_AUDIOCODEC_APE。
所以，抄袭msm8894的audio_extn.h头文件（为了不在报错，数值并不一定正常）。
在hardware/qcom/audio-caf/msm8916/hal/audio_extn/audio_extn.h加入：
```
#ifndef ALAC_OFFLOAD_ENABLED
#define AUDIO_FORMAT_ALAC 0x1C000000UL
#define SND_AUDIOCODEC_ALAC 0x00000019
#endif

#ifndef APE_OFFLOAD_ENABLED
#define AUDIO_FORMAT_APE 0x1D000000UL
#define SND_AUDIOCODEC_APE 0x00000020
#endif
```


## 问题二
```
hardware/qcom/media-caf/msm8916/mm-video-v4l2/vidc/vdec/src/omx_vdec_msm8974.cpp:4424:22: error: 'V4L2_CID_MPEG_VIDC_VIDEO_PRIORITY' was not declared in this scope
         control.id = V4L2_CID_MPEG_VIDC_VIDEO_PRIORITY;
                      ^
hardware/qcom/media-caf/msm8916/mm-video-v4l2/vidc/vdec/src/omx_vdec_msm8974.cpp:4426:29: error: 'V4L2_MPEG_VIDC_VIDEO_PRIORITY_REALTIME_ENABLE' was not declared in this scope
             control.value = V4L2_MPEG_VIDC_VIDEO_PRIORITY_REALTIME_ENABLE;
                             ^
hardware/qcom/media-caf/msm8916/mm-video-v4l2/vidc/vdec/src/omx_vdec_msm8974.cpp:4428:29: error: 'V4L2_MPEG_VIDC_VIDEO_PRIORITY_REALTIME_DISABLE' was not declared in this scope
             control.value = V4L2_MPEG_VIDC_VIDEO_PRIORITY_REALTIME_DISABLE;
                             ^
hardware/qcom/media-caf/msm8916/mm-video-v4l2/vidc/vdec/src/omx_vdec_msm8974.cpp:4441:22: error: 'V4L2_CID_MPEG_VIDC_VIDEO_OPERATING_RATE' was not declared in this scope
         control.id = V4L2_CID_MPEG_VIDC_VIDEO_OPERATING_RATE;

```
添加videodev2.h到/device/../../include/linux里面


## 问题三

```
hardware/qcom/media-caf/msm8916/mm-video-v4l2/vidc/vdec/src/omx_vdec_msm8974.cpp:1760:29: error: 'V4L2_PIX_FMT_H264_MVC' was not declared in this scope
         output_capability = V4L2_PIX_FMT_H264_MVC;
                             ^
hardware/qcom/media-caf/msm8916/mm-video-v4l2/vidc/vdec/src/omx_vdec_msm8974.cpp:1935:34: error: 'V4L2_PIX_FMT_H264_MVC' was not declared in this scope
         if (output_capability == V4L2_PIX_FMT_H264_MVC) {
                                  ^
hardware/qcom/media-caf/msm8916/mm-video-v4l2/vidc/vdec/src/omx_vdec_msm8974.cpp: In member function 'OMX_ERRORTYPE omx_vdec::fill_buffer_done(OMX_HANDLETYPE, OMX_BUFFERHEADERTYPE*)':
hardware/qcom/media-caf/msm8916/mm-video-v4l2/vidc/vdec/src/omx_vdec_msm8974.cpp:7228:38: error: 'V4L2_PIX_FMT_H264_MVC' was not declared in this scope
                 output_capability == V4L2_PIX_FMT_H264_MVC) &&
                                      ^
```

修改/device/../../include/linux/videodev2.h，添加：

```
#define V4L2_PIX_FMT_H264_MVC v4l2_fourcc('M', '2', '6', '4') /* H264 MVC */

```

## 问题四

```
hardware/qcom/media-caf/msm8916/mm-video-v4l2/vidc/vdec/src/omx_vdec_msm8974.cpp: In member function 'int omx_vdec::alloc_map_ion_memory(OMX_U32, OMX_U32, ion_allocation_data*, ion_fd_data*, int)':
hardware/qcom/media-caf/msm8916/mm-video-v4l2/vidc/vdec/src/omx_vdec_msm8974.cpp:8440:17: error: 'struct ion_allocation_data' has no member named 'heap_id_mask'
     alloc_data->heap_id_mask = ION_HEAP(ION_IOMMU_HEAP_ID);
                 ^
hardware/qcom/media-caf/msm8916/mm-video-v4l2/vidc/vdec/src/omx_vdec_msm8974.cpp:8442:21: error: 'struct ion_allocation_data' has no member named 'heap_id_mask'
         alloc_data->heap_id_mask = ION_HEAP(MEM_HEAP_ID);
                     ^

```
添加ion.h到/device/../../include/linux里面

## 问题五

```
hardware/qcom/display-caf/msm8916/libgralloc/framebuffer.cpp:354:19: error: 'metadata_op_get_ion_fd' was not declared in this scope
     metadata.op = metadata_op_get_ion_fd;
                   ^
hardware/qcom/display-caf/msm8916/libgralloc/framebuffer.cpp:361:22: error: 'union msmfb_metadata::<anonymous>' has no member named 'fbmem_ionfd'
     if(metadata.data.fbmem_ionfd < 0) {
                      ^
In file included from hardware/qcom/display-caf/msm8916/libgralloc/framebuffer.cpp:22:0:
hardware/qcom/display-caf/msm8916/libgralloc/framebuffer.cpp:363:55: error: 'union msmfb_metadata::<anonymous>' has no member named 'fbmem_ionfd'
                                         metadata.data.fbmem_ionfd);
                                                       ^
hardware/qcom/display-caf/msm8916/libgralloc/framebuffer.cpp:367:24: error: 'union msmfb_metadata::<anonymous>' has no member named 'fbmem_ionfd'
     fd = metadata.data.fbmem_ionfd;
                        ^

```
添加msm_mdp.h到/device/../../include/linux里面

## 问题六

```
bw_flag = MDSS_MAX_BW_LIMIT_CAMERA;
改为
bw_flag = 1;
``
## 问题七

```
hardware/qcom/display-caf/msm8916/libhdmi/hdmi.cpp:91:14: error: 'HDMI_EVFRMT_4096x2160p24_16_9' was not declared in this scope
     EDIDData(HDMI_EVFRMT_4096x2160p24_16_9, 4096, 2160, 24, 35),
              ^
```

这个4096x2160p24_16_9分辨率的在kernel头文件里没有定义，不过，这个应该是给电视机用的，U1用不上，简单粗暴，注释掉~_~

（不断更新）

