---

layout: post
title: spring 实现后端调用其他系统接口
description: spring 实现后端调用其他系统接口
keywords: spring
categories: spring

---


## spring实现后端调用其他系统接口

###后端调用其他系统接口的实现方式
1. HttpURLConnection

```java

	@Controller
	public class RestfulAction {

	 @Autowired
	 private UserService userService;

     // 修改
     @RequestMapping(value = "put/{param}", method = RequestMethod.PUT)     public @ResponseBody String put(@PathVariable String param) {
         return "put:" + param;
     }
	 // 查找
     @RequestMapping(value = "get/{param}", method = RequestMethod.GET)
     public @ResponseBody String get(@PathVariable String param) {
         return "get:" + param;
     }

	// HttpURLConnection 方式调用Restful接口
    // 调用接口
     @RequestMapping(value = "dealCon/{param}")
     public @ResponseBody String dealCon(@PathVariable String param) {
         try {
             String url = "http://localhost:8080/tao-manager-web/";
             url+=(param+"/xxx");
             URL restServiceURL = new URL(url);
             HttpURLConnection httpConnection = (HttpURLConnection) restServiceURL
                     .openConnection();
             //param 输入小写，转换成 GET POST DELETE PUT 
             httpConnection.setRequestMethod(param.toUpperCase());
 			//  httpConnection.setRequestProperty("Accept", "application/json");
             if("post".equals(param)){
                 //打开输出开关
                 httpConnection.setDoOutput(true);
 				// httpConnection.setDoInput(true);
                 
                 //传递参数
                 String input = "&id="+ URLEncoder.encode("abc", "UTF-8");
                 input+="&name="+ URLEncoder.encode("啊啊啊", "UTF-8");
                 OutputStream outputStream = httpConnection.getOutputStream();
                 outputStream.write(input.getBytes());
                 outputStream.flush();
             }
             if (httpConnection.getResponseCode() != 200) {
                 throw new RuntimeException(
                         "HTTP GET Request Failed with Error code : "
                                 + httpConnection.getResponseCode());
             }
             BufferedReader responseBuffer = new BufferedReader(
                     new InputStreamReader((httpConnection.getInputStream())));
             String output;
             System.out.println("Output from Server:  \n");
             while ((output = responseBuffer.readLine()) != null) {
                 System.out.println(output);
             }
             httpConnection.disconnect();
         } catch (MalformedURLException e) {
             e.printStackTrace();
         } catch (IOException e) {
             e.printStackTrace();
         }
         return "success";
     }

	}
 

```  
 
2. HttpClient实现

```java

 	@Controller
 	public class RestfulAction {
      
      @Autowired
      private UserService userService;
  
      // 修改
      @RequestMapping(value = "put/{param}", method = RequestMethod.PUT)
      public @ResponseBody String put(@PathVariable String param) {
          return "put:" + param;
      }
	 // 查找
      @RequestMapping(value = "get/{param}", method = RequestMethod.GET)
      public @ResponseBody User get(@PathVariable String param) {
          User u = new User();
          u.setName(param);
          u.setPassword(param);
          u.setEmail(param);
          u.setUsername("爱爱啊");
          return u;
      }

      @RequestMapping(value = "dealCon2/{param}")
      public @ResponseBody User dealCon2(@PathVariable String param) {
          User user = null;
          try {
              HttpClient client = HttpClients.createDefault();
              if("get".equals(param)){
                  HttpGet request = new HttpGet("http://localhost:8080/tao-manager-web/get/"
                          +"啊啊啊");
                  request.setHeader("Accept", "application/json");
                  HttpResponse response = client.execute(request);
                  HttpEntity entity = response.getEntity();
                  ObjectMapper mapper = new ObjectMapper();
                  user = mapper.readValue(entity.getContent(), User.class);
              }else if("post".equals(param)){
                  HttpPost request2 = new HttpPost("http://localhost:8080/tao-manager-web/post/xxx");
                  List<NameValuePair> nvps = new ArrayList<NameValuePair>();  
                  nvps.add(new BasicNameValuePair("id", "啊啊啊"));  
                  nvps.add(new BasicNameValuePair("name", "secret"));
                  UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(nvps, "GBK");
                 request2.setEntity(formEntity);
                 HttpResponse response2 = client.execute(request2);
                 HttpEntity entity = response2.getEntity();
                 ObjectMapper mapper = new ObjectMapper();
                 user = mapper.readValue(entity.getContent(), User.class);
             }else if("delete".equals(param)){
                 
             }else if("put".equals(param)){
                 
             }
         } catch (Exception e) {
             e.printStackTrace();
         }
         return user;
     }
```

3. Spring的RestTemplate

	springmvc.xml增加

```java

     <!-- 配置RestTemplate -->
     <!--Http client Factory -->
     <bean id="httpClientFactory"
         class="org.springframework.http.client.SimpleClientHttpRequestFactory">
         <property name="connectTimeout" value="10000" />
         <property name="readTimeout" value="10000" />
      </bean>
  
      <!--RestTemplate -->
     <bean id="restTemplate" class="org.springframework.web.client.RestTemplate">
         <constructor-arg ref="httpClientFactory" />
     </bean>
```

controller


```java
@Controller
 public class RestTemplateAction {
  
      @Autowired
      private RestTemplate template;
  
      @RequestMapping("RestTem")
      public @ResponseBody User RestTem(String method) {
          User user = null;
         //查找
         if ("get".equals(method)) {
             user = template.getForObject(
                     "http://localhost:8080/tao-manager-web/get/{id}",
                     User.class, "呜呜呜呜");
             
             //getForEntity与getForObject的区别是可以获取返回值和状态、头等信息
             ResponseEntity<User> re = template.
                     getForEntity("http://localhost:8080/tao-manager-web/get/{id}",
                     User.class, "呜呜呜呜");
             System.out.println(re.getStatusCode());
             System.out.println(re.getBody().getUsername());
             
         //新增
         } else if ("post".equals(method)) {
             HttpHeaders headers = new HttpHeaders();
             headers.add("X-Auth-Token", UUID.randomUUID().toString());
             MultiValueMap<String, String> postParameters = new LinkedMultiValueMap<String, String>();
             postParameters.add("id", "啊啊啊");
             postParameters.add("name", "部版本");
             HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<MultiValueMap<String, String>>(
                     postParameters, headers);
             user = template.postForObject(
                     "http://localhost:8080/tao-manager-web/post/aaa", requestEntity,
                     User.class);
         //删除
         } else if ("delete".equals(method)) {
             template.delete("http://localhost:8080/tao-manager-web/delete/{id}","aaa");
         //修改
         } else if ("put".equals(method)) {
             template.put("http://localhost:8080/tao-manager-web/put/{id}",null,"bbb");
         }
         return user;
 
     }
 }
```

4. Feign

我们可以使用JDK原生的 URLConnection、Apache 的 HTTP Client、Netty 异步 Http Client，Spring 的 RestTemplate 去实现服务间的调用。但是最方便、最优雅的方式是通过 Spring Cloud Open Feign 进行服务间的调用 Spring Cloud 对 Feign 进行了增强，使 Feign 支持 Spring Mvc 的注解，并整合了 Ribbon 等，从而让 Feign 的使用更加方便

此处以调用 Github API 查询服务为例

引入依赖
```java

	<dependency>
    	<groupId>org.springframework.cloud</groupId>
    	<artifactId>spring-cloud-starter-openfeign</artifactId>
	</dependency>
```

启动类加入如下注解：

```java

	/** 开启 Feign 扫描支持 */
	@EnableFeignClients 
```

Feign 接口编写

```java

	/**
 	* @Author：大漠知秋
 	* @Description：使用 Feign 访问 Github 查询 API
 	* @CreateDate：2:36 PM 2018/10/24
 	*/
	@FeignClient(name = "github-client", url = "https://api.github.com")
	public interface GitHubFeign {

    	@RequestMapping(
            value = "/search/repositories",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE
    	)
    	String searchRepo(@RequestParam("q") String q);
	}
```

Controller

```java

	/**
 	* @Author：大漠知秋
 	* @Description：使用 Feign 访问 Github 查询 API
 	* @CreateDate：2:42 PM 2018/10/24
 	*/
	@RestController
	@RequestMapping(
        value = "/github",
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE
	)
	public class GitHubController {

    	@Resource
    	private GitHubFeign gitHubFeign;

    	@RequestMapping(
            value = "/search/repositories",
            method = RequestMethod.GET
    	)
    	String searchRepo(@RequestParam("q") String q) {
    	    return gitHubFeign.searchRepo(q);
    	}

	}
```



