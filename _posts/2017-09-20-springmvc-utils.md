---

layout: post
title: springmvc工具说明
description: springmvc工具说明 
keywords:springmvc
categories: springmvc

---

### springmvc中工具说明 

## 


获取项目根目录：
	
	web.xml中配置

	<!-- 多部分文件上传 -->
    <context-param>  
        <param-name>webAppRootKey</param-name>   
        <param-value>tansungWeb.root</param-value>  
    </context-param>  
    <listener>   
        <listener-class>org.springframework.web.util.WebAppRootListener</listener-class>   
    </listener>

获取地址：
String tempUploadPath=System.getProperty("tansungWeb.root");//获取项目跟目录






