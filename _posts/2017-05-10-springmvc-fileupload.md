---

layout: post
title: springmvc文件上传
description: springmvc文件上传三种方式 
keywords:springmvc
categories: java

---

### springmvc中文件上传的三种方式 

## 

前端代码

	<form name="serForm" action="/SpringMVC006/fileUpload" method="post" enctype="multipart/form-data">
	<h1>采用流的方式上传文件</h1>
	<input type="file" name="file">
	<input type="submit" value="upload"/>
	</form>
	
	<form name="Form2" action="/SpringMVC006/fileUpload2" method="post"  enctype="multipart/form-data">
	<h1>采用multipart提供的file.transfer方法上传文件</h1>
	<input type="file" name="file">
	<input type="submit" value="upload"/>
	</form>
	
	<form name="Form2" action="/SpringMVC006/springUpload" method="post"  enctype="multipart/form-data">
	<h1>使用spring mvc提供的类的方法上传文件</h1>
	<input type="file" name="file">
	<input type="submit" value="upload"/>
	</form>

配置：

	<!-- 多部分文件上传 -->
    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
         <property name="maxUploadSize" value="104857600" />
         <property name="maxInMemorySize" value="4096" />
         <property name="defaultEncoding" value="UTF-8"></property>
    </bean>

后台处理

### 方法一：

```java

	/*
	 * 通过流的方式上传文件
	 * @RequestParam("file") 将name=file控件得到的文件封装成CommonsMultipartFile 对象
	 */
	@RequestMapping("fileUpload")
	public String  fileUpload(@RequestParam("file") CommonsMultipartFile file) throws IOException {
	    
		
	    //用来检测程序运行时间
	    long  startTime=System.currentTimeMillis();
	    System.out.println("fileName："+file.getOriginalFilename());
	    
		try {
			//获取输出流
			OutputStream os=new FileOutputStream("E:/"+new Date().getTime()+file.getOriginalFilename());
		    //获取输入流 CommonsMultipartFile 中可以直接得到文件的流
		    InputStream is=file.getInputStream();
		    int temp;
		    //一个一个字节的读取并写入
		    while((temp=is.read())!=(-1))
		    {
		    	os.write(temp);
		    }
		   os.flush();
		   os.close();
		   is.close();
		
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		long  endTime=System.currentTimeMillis();
		System.out.println("方法一的运行时间："+String.valueOf(endTime-startTime)+"ms");
		return "/success";	
	}
```

### 方法二：

```java
	/*
	 * 采用file.Transto 来保存上传的文件
	 */
	@RequestMapping("fileUpload2")
	public String  fileUpload2(@RequestParam("file") CommonsMultipartFile file) throws IOException {
		 long  startTime=System.currentTimeMillis();
		System.out.println("fileName："+file.getOriginalFilename());
		String path="E:/"+new Date().getTime()+file.getOriginalFilename();
		
		File newFile=new File(path);
		//通过CommonsMultipartFile的方法直接写文件（注意这个时候）
		file.transferTo(newFile);
		long  endTime=System.currentTimeMillis();
		System.out.println("方法二的运行时间："+String.valueOf(endTime-startTime)+"ms");
		return "/success";	
	}

```

方法三：

```java

	/*
	 *采用spring提供的上传文件的方法
	 */
	@RequestMapping("springUpload")
	public String  springUpload(HttpServletRequest request) throws IllegalStateException, IOException
	{
		 long  startTime=System.currentTimeMillis();
		 //将当前上下文初始化给  CommonsMutipartResolver （多部分解析器）
		CommonsMultipartResolver multipartResolver=new CommonsMultipartResolver(
				request.getSession().getServletContext());
		//检查form中是否有enctype="multipart/form-data"
		if(multipartResolver.isMultipart(request))
		{
			//将request变成多部分request
			MultipartHttpServletRequest multiRequest=(MultipartHttpServletRequest)request;
		   //获取multiRequest 中所有的文件名
			Iterator iter=multiRequest.getFileNames();
			
			while(iter.hasNext())
			{
				//一次遍历所有文件
				MultipartFile file=multiRequest.getFile(iter.next().toString());
				if(file!=null)
				{
					String path="E:/springUpload"+file.getOriginalFilename();
					//上传
					file.transferTo(new File(path));
				}
				
			}
		  
		}
		long  endTime=System.currentTimeMillis();
		System.out.println("方法三的运行时间："+String.valueOf(endTime-startTime)+"ms");
	return "/success";	
	}




```

##结果

第一次我用一个4M的文件：

fileName：test.rar
方法一的运行时间：14712ms
fileName：test.rar
方法二的运行时间：5ms
方法三的运行时间：4ms

 

第二次：我用一个50M的文件
方式一进度很慢，估计得要个5分钟

方法二的运行时间：67ms
方法三的运行时间：80ms

 
从测试结果我们可以看到：用springMVC自带的上传文件的方法要快的多！

对于测试二的结果：可能是方法三得挨个搜索，所以要慢点。不过一般情况下我们是方法三，因为他能提供给我们更多的方法


