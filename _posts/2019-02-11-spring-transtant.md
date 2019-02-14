---

layout: post
title: spring 事务
description: spring事务
keywords: spring
categories: spring

---


## spring事务配置与问题

###spring配置事务
1. application.xml中配置

```java
<!-- 自动扫描dao和service包(自动注入)以及工具类util包  -->
    <context:component-scan base-package="com.xtest.dao.*,com.xtest.service.*,com.xtest.util.*"/>
    
	<!-- 指定扫描的包,避开包含@Controller注解的包 -->
    <context:component-scan base-package="com.xtest">           
 		<context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
	</context:component-scan>
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource" />
    </bean>   
    <tx:advice id="transactionAdvice" transaction-manager="transactionManager">
        <tx:attributes>
        	<tx:method name="sw*" propagation="REQUIRES_NEW" />
           <!-- <tx:method name="save*" propagation="REQUIRES_NEW" />
           <tx:method name="update*" propagation="REQUIRES_NEW" />
           <tx:method name="delete*" propagation="REQUIRES_NEW" />
           <tx:method name="get*" read-only="true" />
           <tx:method name="list*" read-only="true" /> -->
        </tx:attributes>
    </tx:advice>

 	<tx:annotation-driven transaction-manager="transactionManager" />  
    <aop:config>
        <aop:pointcut id="transactionPointcut" expression="execution(* com.xtest.service..*.*(..))" />
        <aop:advisor pointcut-ref="transactionPointcut" advice-ref="transactionAdvice" />
    </aop:config>

```  
 
2. spring.xml

```java
<!--  只扫描含@Controller注解的包,避免重复扫描 -->
   	<context:component-scan base-package="com.xtest.controller" use-default-filters="true" />
	<context:component-scan base-package="com.xtest">
		<context:include-filter type="annotation" expression="org.springframework.stereotype.Controller" />
 		<context:exclude-filter type="annotation" expression="org.springframework.stereotype.Service"/>
	</context:component-scan>
```
###事务异常不回滚

方案1.例如service层处理事务，那么service中的方法中不做异常捕获，或者在catch语句中最后增加throw new RuntimeException()语句，以便让aop捕获异常再去回滚，并且在service上层（webservice客户端，view层action）要继续捕获这个异常并处理
注意：当在dao层有try catch语句后增加throw new Exception()语句也不会发生回滚

方案2.在service层方法的catch语句中增加：TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();语句，手动回滚，这样上层就无需去处理异常




