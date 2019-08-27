---

layout: lucene
title: lucene实现全文检索
description: lucene实现全文检索
date: 2019-08-27
keywords: lucene
categories: lucene

---

## 基本介绍
该文档采用lucene7.6实现功能，使用ik-analyzer进行分词
添加依赖

```java
<properties>
     <lucene.version>7.6.0</lucene.version>
</properties>

<dependency>
          <groupId> org.apache.lucene</groupId>
          <artifactId>lucene-analyzers-common</artifactId>
          <version> ${lucene.version}</version>
     </dependency>

     <dependency>
          <groupId> org.apache.lucene</groupId>
          <artifactId>lucene-core</artifactId>
          <version> ${lucene.version}</version>
     </dependency>

     <dependency>
          <groupId> org.apache.lucene</groupId>
          <artifactId>lucene-highlighter</artifactId>
          <version> ${lucene.version}</version>
     </dependency>

     <dependency>
          <groupId> org.apache.lucene</groupId>
          <artifactId>lucene-queryparser</artifactId>
          <version> ${lucene.version}</version>
     </dependency>

     <dependency>
          <groupId>com.github.magese</groupId>
          <artifactId>ik-analyzer</artifactId>
          <version>${lucene.version}</version>
     </dependency>

```


## 生成索引
索引管理工具类

```java
import com.xhkjedu.util.GodComm;
import com.xhkjedu.vo.question.TQuestionBean;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.document.*;
import org.apache.lucene.document.Field.Store;
import org.apache.lucene.index.IndexOptions;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.BytesRef;
import org.wltea.analyzer.lucene.IKAnalyzer;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName IndexManagerUtils 索引管理工具类
 * Description TODO
 * Author WN
 * Date 2019/8/23 9:41
 **/
public class IndexManagerUtils {

    /**
     * 为指定目录下的文件创建索引,包括其下的所有子孙目录下的文件
     * @param indexSaveDir  ：创建好的索引保存目录
     * @throws IOException
     */
    public static void indexCreate(List<TQuestionBean> questions, String indexSaveDir) throws IOException {

        // 建立索引(lucene)保存目录
        Directory directory = null;
        try {
            directory = FSDirectory.open(Paths.get(indexSaveDir));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        /** 创建 Lucene 文档列表，用于保存多个 Docuemnt*/
        List<Document> docList = new ArrayList<Document>();

        for(int i=0;i<questions.size();i++){
            Document ldoc = new Document();
            TQuestionBean q = questions.get(i);
            ldoc.add(new StringField("testid",q.getTestid(),Store.YES));
            ldoc.add(new TextField("docHtml",q.getDocHtml(),Store.YES));
            ldoc.add(new StoredField("ctype",q.getCtype()));
            ldoc.add(new StoredField("typeTextId",q.getTypeTextId()));
            ldoc.add(new StoredField("typeTextName",q.getTypeTextName()));
            ldoc.add(new StoredField("complexity",q.getComplexity()));
            ldoc.add(new StringField("sourcename",q.getSourcename(),Store.YES));
            ldoc.add(new StringField("checkertime",q.getCheckertime(),Store.YES));
            //该设置用于排序
            ldoc.add(new SortedDocValuesField("checkertime",new BytesRef(q.getCheckertime().getBytes())));
            ldoc.add(new StoredField("scienceOrWord",q.getScienceOrWord()));
            ldoc.add(new StoredField("subjectid",q.getSubjectid()));

            docList.add(ldoc);
        }


        Analyzer analyzer = null;
        IndexWriterConfig config = null;
        /**将 Lucene 文档加入到 写索引 对象中*/
        for (int i = 0; i < docList.size(); i++) {

            analyzer = new IKAnalyzer();
            config = new IndexWriterConfig(analyzer);

            IndexWriter indexWriter = new IndexWriter(directory, config);
            indexWriter.addDocument(docList.get(i));
            indexWriter.commit();
            indexWriter.close();
        }
    }

    public static FieldType getFiletype(){
        //自定义类型
        FieldType fieldType = new FieldType();// 重构FieldType类
        fieldType.setIndexOptions(IndexOptions.NONE);// set 不索引
        fieldType.setStored(true);// set 是否存储
        fieldType.setTokenized(false);// set 是否分类
        fieldType.setOmitNorms(false);// set 是否可以设置权重

        return fieldType;
    }
}

````

## 搜索  
搜索包含指定查询、排序、分页

```java
import com.xhkjedu.vo.question.TQuestionBean;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.*;
import org.apache.lucene.search.highlight.*;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName IndexSearchUtils
 * Description TODO 索引搜索工具类
 * Author WN
 * Date 2019/8/23 15:43
 **/
public class IndexSearchUtils {
    /**
     * 索引查询
     *
     * @param indexDir  ：Lucene 索引文件所在目录
     * @param queryWord ：检索的内容，默认从文章内容进行查询
     * @throws Exception
     */
    public static List<TQuestionBean> indexSearch(String indexDir, String queryWord) throws Exception {
        List<TQuestionBean> lst = new ArrayList<>();
        if (indexDir == null || queryWord == null || "".equals(queryWord)) {
            return null;
        }
        /** 创建分词器
         * 1）创建索引 与 查询索引 所用的分词器必须一致
         */
        Analyzer analyzer = new StandardAnalyzer();

        /**创建查询对象(QueryParser)：QueryParser(String f, Analyzer a)
         *  第一个参数：默认搜索域，与创建索引时的域名称必须相同
         *  第二个参数：分词器
         * 默认搜索域作用：
         *  如果搜索语法parse(String query)中指定了域名，则从指定域中搜索
         *  如果搜索语法parse(String query)中只指定了查询关键字，则从默认搜索域中进行搜索
         */
        QueryParser queryParser = new QueryParser("docHtml", analyzer);

        /** parse 表示解析查询语法，查询语法为："域名:搜索的关键字"
         *  parse("fileName:web")：则从fileName域中进行检索 web 字符串
         * 如果为 parse("web")：则从默认搜索域 fileContext 中进行检索
         * 1)查询不区分大小写
         * 2)因为使用的是 StandardAnalyzer(标准分词器)，所以对英文效果很好，如果此时检索中文，基本是行不通的
         */
        Query query = queryParser.parse("docHtml:" + queryWord);
        //查询固定值
       // Query query = new TermQuery(new Term("checkertime", "2019-04-12 17:16:26"));

        /** 与创建 索引 和 Lucene 文档 时一样，指定 索引和文档 的目录
         * 即指定查询的索引库
         */
        Path path = Paths.get(indexDir);
        Directory dir = FSDirectory.open(path);

        /*** 创建 索引库读 对象
         * DirectoryReader 继承于org.apache.lucene.index.IndexReader
         * */
        DirectoryReader directoryReader = DirectoryReader.open(dir);

        /** 根据 索引对象创建 索引搜索对象
         **/
        IndexSearcher indexSearcher = new IndexSearcher(directoryReader);

        //排序
        SortField sortField = new SortField("checkertime",SortField.Type.STRING,true);
        Sort sort = new Sort(sortField);

        TermQuery tquery = null;

        /**search(Query query, int n) 搜索
         * 第一个参数：查询语句对象
         * 第二个参数：指定查询最多返回多少条数据，此处则表示返回个数最多10条
         */
        TopDocs topdocs = indexSearcher.search(query, 10,sort);
        System.out.println("查询结果总数：：：=====" + topdocs.totalHits);

        /**从搜索结果对象中获取结果集
         * 如果没有查询到值，则 ScoreDoc[] 数组大小为 0
         * */
        QueryScorer scorer=new QueryScorer(query);
        Fragmenter fragmenter=new SimpleSpanFragmenter(scorer);
        SimpleHTMLFormatter simpleHTMLFormatter=new SimpleHTMLFormatter("<b><font color='red'>","</font></b>");
        Highlighter highlighter=new Highlighter(simpleHTMLFormatter, scorer);
        highlighter.setTextFragmenter(fragmenter);

        ScoreDoc[] scoreDocs = topdocs.scoreDocs;

        ScoreDoc loopScoreDoc = null;
        for (int i = 0; i < scoreDocs.length; i++) {

            loopScoreDoc = scoreDocs[i];

            /**获取 文档 id 值
             * 这是 Lucene 存储时自动为每个文档分配的值，相当于 Mysql 的主键 id
             * */
            int docID = loopScoreDoc.doc;

            /**通过文档ID从硬盘中读取出对应的文档*/
            Document document = directoryReader.document(docID);

            /**get方法 获取对应域名的值
             * 如域名 key 值不存在，返回 null*/
            System.out.println("doc id：" + docID);
            System.out.println("testid:" + document.get("testid"));

            String dochtml = highlighter.getBestFragment(analyzer, "docHtml", document.get("docHtml"));

            TQuestionBean tq = new TQuestionBean();
            tq.setTestid(document.get("testid"));
            tq.setDocHtml(dochtml);
            tq.setCtype(Integer.parseInt(document.get("ctype")));
            tq.setTypeTextId(document.get("typeTextId"));
            tq.setTypeTextName(document.get("typeTextName"));
            tq.setComplexity(Integer.parseInt(document.get("complexity")));
            tq.setSourcename(document.get("sourcename"));
            tq.setCheckertime(document.get("checkertime"));
            tq.setScienceOrWord(Integer.parseInt(document.get("scienceOrWord")));
            tq.setSubjectid(Integer.parseInt(document.get("subjectid")));

            lst.add(tq);
        }
        directoryReader.close();
        return lst;
    }

     /**
     *获取符合条件的总条数
     */
    public static Integer indexSearchCount(String indexDir, String queryWord) throws Exception{
        Integer count = 0;

        if (indexDir == null || queryWord == null || "".equals(queryWord)) {
            return null;
        }

        Analyzer analyzer = new StandardAnalyzer();

        QueryParser queryParser = new QueryParser("docHtml", analyzer);
        Query query = queryParser.parse("docHtml:" + queryWord);

        //查询固定值
        //Query query = new TermQuery(new Term("checkertime", "2019-04-12 17:16:26"));

        Path path = Paths.get(indexDir);
        Directory dir = FSDirectory.open(path);
        DirectoryReader directoryReader = DirectoryReader.open(dir);

        IndexSearcher indexSearcher = new IndexSearcher(directoryReader);
        count = indexSearcher.count(query);
        directoryReader.close();
        return count;
    }

    public static List<TQuestionBean> indexSearchPage(String indexDir, String queryWord,Integer currpage,Integer pagesize) throws Exception {
        List<TQuestionBean> lst = new ArrayList<>();
        if (indexDir == null || queryWord == null || "".equals(queryWord)) {
            return null;
        }

        Analyzer analyzer = new StandardAnalyzer();
        QueryParser queryParser = new QueryParser("docHtml", analyzer);
       // Query query = queryParser.parse("docHtml:" + queryWord);
        //查询固定值
        Query query = new TermQuery(new Term("checkertime", "2019-04-12 17:16:26"));

        Path path = Paths.get(indexDir);
        Directory dir = FSDirectory.open(path);
        DirectoryReader directoryReader = DirectoryReader.open(dir);
        IndexSearcher indexSearcher = new IndexSearcher(directoryReader);

        SortField sortField = new SortField("checkertime",SortField.Type.STRING,true);
        Sort sort = new Sort(sortField);

        TermQuery tquery = null;

        /**search(Query query, int n) 搜索
         * 第一个参数：查询语句对象
         * 第二个参数：指定查询最多返回多少条数据，此处则表示返回个数最多10条
         */

        //获取上一页的最后一个元素
        ScoreDoc lastSd = getLastScoreDoc(currpage, pagesize, query, indexSearcher);
        //通过最后一个元素去搜索下一页的元素
        TopDocs topdocs = indexSearcher.searchAfter(lastSd,query, pagesize);

        /**从搜索结果对象中获取结果集
         * 如果没有查询到值，则 ScoreDoc[] 数组大小为 0
         * */
        QueryScorer scorer=new QueryScorer(query);
        Fragmenter fragmenter=new SimpleSpanFragmenter(scorer);
        SimpleHTMLFormatter simpleHTMLFormatter=new SimpleHTMLFormatter("<b><font color='red'>","</font></b>");
        Highlighter highlighter=new Highlighter(simpleHTMLFormatter, scorer);
        highlighter.setTextFragmenter(fragmenter);

        ScoreDoc[] scoreDocs = topdocs.scoreDocs;

        ScoreDoc loopScoreDoc = null;
        for (int i = 0; i < scoreDocs.length; i++) {

            loopScoreDoc = scoreDocs[i];

            /**获取 文档 id 值
             * 这是 Lucene 存储时自动为每个文档分配的值，相当于 Mysql 的主键 id
             * */
            int docID = loopScoreDoc.doc;

            /**通过文档ID从硬盘中读取出对应的文档*/
            Document document = directoryReader.document(docID);

            /**get方法 获取对应域名的值
             * 如域名 key 值不存在，返回 null*/
            System.out.println("doc id：" + docID);
            System.out.println("testid:" + document.get("testid"));

            String dochtml = highlighter.getBestFragment(analyzer, "docHtml", document.get("docHtml"));

            TQuestionBean tq = new TQuestionBean();
            tq.setTestid(document.get("testid"));
            tq.setDocHtml(dochtml);
            tq.setCtype(Integer.parseInt(document.get("ctype")));
            tq.setTypeTextId(document.get("typeTextId"));
            tq.setTypeTextName(document.get("typeTextName"));
            tq.setComplexity(Integer.parseInt(document.get("complexity")));
            tq.setSourcename(document.get("sourcename"));
            tq.setCheckertime(document.get("checkertime"));
            tq.setScienceOrWord(Integer.parseInt(document.get("scienceOrWord")));
            tq.setSubjectid(Integer.parseInt(document.get("subjectid")));
            lst.add(tq);
        }

        directoryReader.close();
        return lst;
    }

    /**
     * 根据页码和分页大小获取上一次的最后一个scoredocs
     * @param pageIndex
     * @param pageSize
     * @param query
     * @param searcher
     * @return
     * @throws IOException
     */
    private static ScoreDoc getLastScoreDoc(int pageIndex,int pageSize,Query query,IndexSearcher searcher) throws IOException {
        if (pageIndex == 1) return null;//如果是第一页就返回空
        int num = pageSize * (pageIndex - 1);//获取上一页的最后数量
        TopDocs tds = searcher.search(query, num);
        return tds.scoreDocs[num - 1];
    }

}

```
###
查询分为多种TermQuery（精确查询）、TermRangeQuery（查询一个范围）、PrefixQuery（前缀匹配查询）、WildcardQuery（通配符查询）、
BooleanQuery（多条件查询）、PhraseQuery（短语查询）、FuzzyQuery（模糊查询）、Queryparser（万能查询（上面的都可以用这个来查询到））
其中多条件查询
```java
BooleanQuery query = new BooleanQuery();
//创建第一个查询条件
Query query1 =new TermQuery(new Term("filename","apache"));
Query query2 = new TermQuery(new Term("content","apache"));
//组合查询条件
query.add(query1, Occur.MUST);
query.add(query2, Occur.MUST);
//执行查询
printResult(query, indexSearcher);

```
注：
Occur.MUST：必须满足此条件，相当于and
Occur.SHOULD：应该满足，但是不满足也可以，相当于or
Occur.MUST_NOT：必须不满足。相当于not