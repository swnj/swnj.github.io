---

layout: post
title: linux fileupload 文件权限
description: linux fileupload 文件权限
keywords: linux fileupload
categories: linux

---

## javaweb项目在linux下文件上传不能创建目录的解决方法

### windows下文件上传

```java
		File targetFile = new File(filePath);
		File directory = new File(targetFile.getParent());
		directory.setWritable(true,false);
		if (!directory.exists()) {
			directory.mkdirs();
		}
		try {
			file.transferTo(targetFile);
		} catch (Exception e) {
			System.err.println("save upload file failure");
			e.printStackTrace();
		}
```
其中路径中的'/'尽量用File.separator来代替。

### linux下文件上传
以上这种写法在windows下是没有问题的。那么linux下就出现了问题，就是不能创建目录。linux系统下非root用户，因为权限的问题不能创建目录

这个是权限引起的；本身tomcat用root启动，可以对任何目录读写；但Java程序有个限制，Java程序默认只对Java程序自身所在目录有写的权限，对别的目录写文件要在代码里设置一下；
```java
	File directory = new File(targetFile.getParent());
	directory.setWritable(true,false);
```
setWritable这句就是设置可写权限的；加了这句即可。
其中linux下路径中的'/'用File.separator。