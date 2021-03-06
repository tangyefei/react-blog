import React from 'react';
import '../../css/base.css';
import './manage.css'
import { Link } from 'react-router-dom';
import Req from '../../js/request';

class Manage extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      articles:[],
    }
  }

  componentDidMount() {
    Req.getArticles().then(res => {
      if(res.ok) {
        // const res = {"code":1,"body":[{"id":22,"type":"tech","title":"扎实前端系列：简单却容易误解的事件流","created_at":"2020-02-11T16:00:00.000Z","tags":"javascript事件流","overview":"事件流的概念不复杂，却很容易误解。同样，如果你觉得自己掌握的清楚，可以尝试猜猜下面的几个例子的输出结果会是什么样。"},{"id":21,"type":"tech","title":"[译]《CSS In Depth》第2章 使用相对单位","created_at":"2020-02-02T16:00:00.000Z","tags":"CSS3, em, rem, vh, vw, CSS变量","overview":"介绍了CSS3以来引入的相对的单位 并介绍了CSS中的变量的使用"},{"id":20,"type":"tech","title":"扎实前端系列：JavaScript实现继承","created_at":"2019-12-19T16:00:00.000Z","tags":"JavaScript, 继承","overview":"本篇将介绍在JavaScript中如何实现继承"},{"id":19,"type":"tech","title":"经典递归的思路分析：\"N皇后\"和\"数独\"","created_at":"2019-12-13T16:00:00.000Z","tags":"算法","overview":"N皇后和数独经典算法题思路分析"},{"id":18,"type":"tech","title":"5分钟快速上手Google Analytics","created_at":"2019-10-25T16:00:00.000Z","tags":"analytics，访问统计","overview":"使用Analytics的入门介绍"},{"id":17,"type":"tech","title":"关于JavaScript编码你应该知道的","created_at":"2019-09-07T16:00:00.000Z","tags":"Unicode, 编码","overview":"介绍前端开发中应该具备的基础的编码知识"},{"id":15,"type":"tech","title":"HTML中如何给audio自定义样式","created_at":"2019-06-25T16:00:00.000Z","tags":"audio, css","overview":"引用mediaelement并覆写样式"},{"id":14,"type":"tech","title":"HTTP、HTTPS、HTTP/2的应用实践","created_at":"2019-06-12T16:00:00.000Z","tags":"http, https, http/2","overview":"不断学习和实践和HTTP、HTTPS、HTTP/2相关的知识点"},{"id":13,"type":"tech","title":"第23周技术周报","created_at":"2019-06-10T16:00:00.000Z","tags":"周报, flutter, vue数据侦听, 浏览器请求缓存","overview":"每周遇到的技术疑问和学习项的总结"},{"id":12,"type":"tech","title":"Flutter初探：环境配置","created_at":"2019-06-06T16:00:00.000Z","tags":"flutter","overview":"Flutter的Hello World"},{"id":11,"type":"tech","title":"记一个Vue.js中数据变动侦听不到的问题","created_at":"2019-06-03T16:00:00.000Z","tags":"vue, 数据侦听,双向绑定","overview":"Vue的双向绑定设置新的属性无法被侦听到 + 混合了多个对个变量引用同一对象的特殊情况"},{"id":10,"type":"tech","title":"第22周技术周报","created_at":"2019-06-01T16:00:00.000Z","tags":"keep-alive,EC2","overview":"周报"},{"id":9,"type":"tech","title":"第20周技术周报","created_at":"2019-05-26T16:00:00.000Z","tags":"vue.javascript","overview":"周报"},{"id":8,"type":"tech","title":"JavaScript事件流的实用总结","created_at":"2019-05-23T16:00:00.000Z","tags":"javascript,事件,冒泡,捕获","overview":"重点对冒泡和捕获的差异进行概括，并提供4个例子进行说明"},{"id":7,"type":"psy","title":"Vue项目中通过v-model封装ElementUI组件","created_at":"2019-05-22T16:00:00.000Z","tags":"vue，组件封装，vue","overview":"介绍v-model进行组件封装的思路 和 示例代码"},{"id":6,"type":"tech","title":" 第19周技术周报","created_at":"2019-05-18T16:00:00.000Z","tags":"javascript,内存泄漏","overview":"每周遇到的技术疑问和学习项的总结"},{"id":5,"type":"tech","title":"第18周技术周报","created_at":"2019-05-12T16:00:00.000Z","tags":"周报, css, webpack","overview":"每周遇到的技术疑问和学习项的总结"},{"id":4,"type":"tech","title":"JavaScript中的类型和判定方法的实用总结","created_at":"2019-05-02T16:00:00.000Z","tags":"JavaScript, 类型","overview":"面试常被人问起或者开发时候对使用哪个方法犹豫不定，看了这篇就都清楚。"},{"id":3,"type":"tech","title":"基于Webpack+Vued+Vue-Router搭建前端开发环境","created_at":"2019-04-26T16:00:00.000Z","tags":"webpack,vue","overview":"基于Webpack+Vued+Vue-Router搭建前端开发环境"},{"id":1,"type":"read","title":"从2018年起，每周阅读一本书","created_at":"2019-04-18T16:00:00.000Z","tags":"书单","overview":"我的读书列表"},{"id":2,"type":"psy","title":"价值判断怎么破坏你的生活?","created_at":"2019-03-25T16:00:00.000Z","tags":"价值判断,社交","overview":"为什么有的人很难按照自己所想去生活，并且在社交生活中表现的难以合群。"}]};
        this.setState({
          articles: res.body
        })
      }
    })
  }

  del(article) {
    let confirmed = window.confirm('确认要删除"' + article.title + '"吗？');
    if(confirmed) {
      Req.Admin.delArticle(article._id).then(res => {
        if(res.ok) {
          window.alert("删除成功");
          this.setState({
            articles: this.state.articles.filter(d => d._id != article._id)
          })
        }
      })
    }
  }

  render() {
    let {articles} = this.state;
    let articleComs = articles.map(d => 
    <li className="item" key={d._id}>
      {d.title}
      <span className="btn del-btn" onClick={e => this.del(d)}>delete</span>
      <span className="btn view-btn"><Link to={'/manage/edit/' + d._id}>view</Link></span>
    </li>);
    return (
      <div className="page manage-page">
        <h3>后台管理</h3>
        <div className="article-container">
          {articleComs}  
          <span className="btn add-btn"><Link to="/manage/add">add</Link></span>
        </div>
      </div>
    )
  }
}

export default Manage;