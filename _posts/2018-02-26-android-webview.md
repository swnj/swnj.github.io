---

layout: post
title: android webview 组件替换
description: android webview 组件替换
keywords: android webview
categories: android

---

## android自带webview替代

### 一 内置webview控件
用Android自带的WebView组件，做过一些较复杂应用的人应该都会发现，这个自带的组件很多时候真是让人无力吐嘈，主要理由有二：

Android中的WebView组件，内存泄漏的问题一直没有非常有效的解决方案，让程序猿们痛不欲生。
Android中的WebView组件，在4.4以前的版本是WebKit的内核，4.4以后才换成chromium的内核，同时鉴于Google版本帝的风格，因此也导致各个版本之间的运行效率参差不齐。而且即使是chromium内核的版本，也因为要考虑兼容以前的版本，而变得不是那么美好。

### 二 Crosswalk
Crosswalk是一款开源的web引擎。目前Crosswalk正式支持的移动操作系统包括Android和Tizen，在Android 4.0及以上的系统中使用Crosswalk的Web应用程序在HTML5方面可以有一致的体验，同时和系统的整合交互方面（比如启动画面、权限管理、应用切换、社交分享等等）可以做到类似原生应用。现在Crosswalk已经成为众多知名HTML5平台和应用的推荐引擎，包括Google Mobile Chrome App、Intel XDK、Famo.us和Construct2等等，未来的Cordova 4.0也计划集成Crosswalk。
据说是很流畅和强大，但是有一点是我暂时无法接受的，接入Crosswalk的话会导致APP的体积增大20M左右

### 三 TBS服务
由腾讯QQ浏览器团队出品。支持“共享X5内核模式”和“独立下载X5内核模式
>TBS(腾讯浏览服务)的优势
1) 速度快：相比系统webview的网页打开速度有30+%的提升；

2) 省流量：使用云端优化技术使流量节省20+%；

3) 更安全：安全问题可以在24小时内修复；

4) 更稳定：经过亿级用户的使用考验，CRASH率低于0.15%；

5) 兼容好：无系统内核的碎片化问题，更少的兼容性问题；

6) 体验优：支持夜间模式、适屏排版、字体设置等浏览增强功能；

7) 功能全：在Html5、ES6上有更完整支持；

8) 更强大：集成强大的视频播放器，支持视频格式远多于系统webview；

9) 视频和文件格式的支持x5内核多于系统内核

10) 防劫持是x5内核的一大亮点

 >运行环境

1)手机ROM版本高于或等于2.2版本

2)手机RAM大于500M，该RAM值通过手机 /proc/meminfo 文件的MemTotal动态获取

注：如果不满足上述条件，SDK会自动切换到系统WebView，SDK使用者不用关心该切换过程。
 >SDK尺寸指标

1)SDK提供的JAR包约250K




  