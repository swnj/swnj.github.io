---

layout: post
title: spring4 和 spring3 出现的差异
description: spring4 和 spring3 出现的差异
keywords: spring
categories: spring

---


### spring4出现和spring3不同


第一处：springmvc配置json返回值
```java
springmvc4的配置
<!-- 启动Spring MVC的注解功能，完成请求和注解POJO的映射 -->
<bean class="org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter">
   <property name="messageConverters">
       <list>
           <bean class="org.springframework.http.converter.StringHttpMessageConverter">
               <property name="supportedMediaTypes" value="text/plain;charset=UTF-8" />
           </bean>
           <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
               <property name="supportedMediaTypes">
                   <list>
                       <value>application/json;charset=UTF-8</value>
                       <value>text/html;charset=UTF-8</value>
                   </list>
               </property>
           </bean>
       </list>
   </property>
</bean>

spring3的配置
<bean class="org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter">
    <property name="messageConverters">
        <list>
            <bean class="org.springframework.http.converter.StringHttpMessageConverter">
                <property name="supportedMediaTypes" value="text/plain;charset=UTF-8" />
            </bean>
            <bean class="org.springframework.http.converter.json.MappingJacksonHttpMessageConverter">
                <property name="supportedMediaTypes">
                    <list>
                        <value>application/json;charset=UTF-8</value>
                        <value>text/html;charset=UTF-8</value>
                    </list>
                </property>
            </bean>
        </list>
    </property>
</bean>
```
第二处：JdbcTemplate中queryForObject的参数不同
```java
spring4 示例代码
TSubject subject = null;
String sql = "select * from t_subject where levelid=? and classid=?";
RowMapper<TSubject> rm = BeanPropertyRowMapper.newInstance(TSubject.class);
subject = this.queryForObject(sql, new Object[]{levelid,classid},rm);

spring3 示例代码
TSubject subject = null;
String sql = "select * from t_subject where levelid=? and classid=?";
RowMapper<TSubject> rm=ParameterizedBeanPropertyRowMapper.newInstance(TSubject.class);
subject = this.queryForObject(sql, new Object[]{levelid,classid},rm);
```


