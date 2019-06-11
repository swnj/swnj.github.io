---
anlayout: post
title: Mysql修改数据存储路径
description: Mysql修改数据存储路径
date: 2019-02-13
tags: 
	- mysql
categories: mysql

---

## 查看空间占用

查看分区占用

```bash
df -T
```

查看子文件夹占用
```bash
du -sh *
```

比如查看mysql的占用  

```bash
du -sh /var/lib/mysql
```


## 迁移步骤

1、修改`/etc/sysconfig/selinux`文件：

```bash
#SELINUX=enforcing
SELINUX=disabled
```

重启服务器

可以通过`sestatus`命令查看当前selinux状态

2、停止Mysql

```bash
service mysqld stop
```

3、复制文件

```bash
mkdir /data/mysql
cp -rf /var/lib/mysql/* /data/mysql/
```

4、修改Mysql配置

```bash
vi /etc/my.cnf
```

修改为

```bash
datadir = /data/mysql	
socket = /data/mysql/mysql.sock
```

添加

```bash
[client]
socket=/data/mysql/mysql.sock 
```


5、授权

```bash
chown -R mysql:mysql /data/mysql
```

6、启动

```bash
service mysqld start
```


7、查看文件存储位置是否生效

在命令窗口，登录mysql后，使用如下命令：

```bash
show global variables like "%datadir%";
```



## 错误信息

unknown variable 'symbolic-links=0'



注释掉

```bash
symbolic-links=0
```

