---
anlayout: post
title: Mysql数据库死锁挂起的处理方法
description: Mysql数据库死锁挂起的处理方法
date: 2019-02-01
tags: 
	- mysql
	- 死锁
categories: mysql

---





## 死锁解决方法

MySQL在进行一些`alter table`等`DDL`操作时，如果该表上有未提交的事务则会出现 `Waiting for table metadata lock`，

而一旦出现`metadata lock`，该表上的`后续操作`都会被阻塞。



### 杀死后续的操作



1. 检查被占用的表：

   ```mysql
   show OPEN TABLES where In_use > 0;
   ```


2. 显示进程：

   ```mysql
   show processlist;
   ```

   找到正在运行sql的进程


3. 杀死挂起的进程即导致表锁死的进程：

    ```mysql
    kill 17909; ---17909是进程的id
    ```



### 杀死未提交的事务



使用管理员权限登录mysql数据库查看未提交的事务：

（如果不是管理员权限会报错：`Access denied; you need (at least one of) the PROCESS privilege(s) for this operation）`

```mysql
select trx_state, trx_started, trx_mysql_thread_id, trx_query from information_schema.innodb_trx;
```



这时会看到未提交的事务，有以下相关信息：

- `trx_state`: 事务状态，一般为RUNNING
- `trx_started`: 事务执行的起始时间，若时间较长，则要分析该事务是否合理
- `trx_mysql_thread_id`: MySQL的线程ID，`用于kill`
- `trx_query`: 事务中的sql



杀死线程ID，问题解决。

```mysql
kill 12345;
```

