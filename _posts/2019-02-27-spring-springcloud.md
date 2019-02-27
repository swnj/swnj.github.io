---

layout: post
title: springcloud 系列
description: springcloud 系列
keywords: spring
categories: spring

---

### spring Cloud简介
Spring Cloud是一个基于Spring Boot实现的云应用开发工具，它为基于JVM的云应用开发中涉及的配置管理、服务发现、断路器、智能路由、微代理、控制总线、全局锁、决策竞选、分布式会话和集群状态管理等操作提供了一种简单的开发方式

### Spring Cloud的核心功能
+ 分布式/版本化配置
+ 服务注册和发现
+ 路由
+ 服务和服务之间的调用
+ 负载均衡
+ 断路器
+ 分布式消息传递

![](https://i.imgur.com/gHHrXvR.png)

通过这张图，我们来了解一下各组件配置使用运行流程：

1、请求统一通过API网关（Zuul）来访问内部服务.

2、网关接收到请求后，从注册中心（Eureka）获取可用服务

3、由Ribbon进行均衡负载后，分发到后端具体实例

4、微服务之间通过Feign进行通信处理业务

5、Hystrix负责处理服务超时熔断

6、Turbine监控服务间的调用和熔断相关指标

### Spring Cloud子项目介绍
+ Spring Cloud Config：配置管理开发工具包，可以让你把配置放到远程服务器，目前支持本地存储、Git以及Subversion。
+ Spring Cloud Bus：事件、消息总线，用于在集群（例如，配置变化事件）中传播状态变化，可与+ Spring Cloud Config联合实现热部署。
+ Spring Cloud Netflix：针对多种Netflix组件提供的开发工具包，其中包括Eureka、Hystrix、Zuul、Archaius等。
+ Netflix Eureka：云端负载均衡，一个基于 REST 的服务，用于定位服务，以实现云端的负载均衡和中间层服务器的故障转移。
+ Netflix Hystrix：容错管理工具，旨在通过控制服务和第三方库的节点,从而对延迟和故障提供更强大的容错能力。
+ Netflix Zuul：边缘服务工具，是提供动态路由，监控，弹性，安全等的边缘服务。
+ Netflix Archaius：配置管理API，包含一系列配置管理API，提供动态类型化属性、线程安全配置操作、轮询框架、回调机制等功能。
+ Spring Cloud for Cloud Foundry：通过Oauth2协议绑定服务到CloudFoundry，CloudFoundry是VMware推出的开源PaaS云平台。
+ Spring Cloud Sleuth：日志收集工具包，封装了Dapper,Zipkin和HTrace操作。
+ Spring Cloud Data Flow：大数据操作工具，通过命令行方式操作数据流。
+ Spring Cloud Security：安全工具包，为你的应用程序添加安全控制，主要是指OAuth2。
+ Spring Cloud Consul：封装了Consul操作，consul是一个服务发现与配置工具，与Docker容器可以无缝集成。
+ Spring Cloud Zookeeper：操作Zookeeper的工具包，用于使用zookeeper方式的服务注册和发现。
+ Spring Cloud Stream：数据流操作开发包，封装了与Redis,Rabbit、Kafka等发送接收消息。
+ Spring Cloud CLI：基于 Spring Boot CLI，可以让你以命令行方式快速建立云组件。

### Spring Cloud基本组件了解

1 配置服务

![](https://i.imgur.com/KV4zfeu.png)

2 服务发现

![](https://i.imgur.com/yvzgAja.png)

3 路由网关

![](https://i.imgur.com/vVWbYT0.png)

4 负载均衡

![](https://i.imgur.com/w8vPpKT.png)

5 断路器  
![](https://i.imgur.com/ZCmlfjM.png)