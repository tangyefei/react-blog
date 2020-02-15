import React from 'react';
import { Link } from "react-router-dom";
import '../../css/base.css';
import './home.css';
import Req from '../../js/request';

class Home extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      guides: [
        {name: "http://book.tangyefei.cn/javascript-guide/_book/index.html", name: "JavaScript权威指南"},
        {name: "http://book.tangyefei.cn/es-6/_book/index.html", name: "ES6"},
        {name: "http://book.tangyefei.cn/head-first-vuejs/_book/index.html", name: "深入浅出Vue.js"},
        {name: "http://book.tangyefei.cn/flask-web-development/_book/index.html", name: "Flask Web Development"},
        {name: "http://book.tangyefei.cn/professional-javascript/_book/index.html", name: "深入浅出React和Redux"},
        {name: "http://book.tangyefei.cn/get-start-with-react-and-redux/_book/index.html", name: "JavaScript高级程序设计"},
        {name: "http://book.tangyefei.cn/regexp-in-10-minutes/_book/index.html", name: "正则表达式必知必会"},
        {name: "http://book.tangyefei.cn/react-action/_book/index.html", name: "极客时间：React实战进阶"},
        {name: "http://book.tangyefei.cn/winter-relearn-fe/_book/index.html", name: "极客时间：重学前端"},
        {name: "http://book.tangyefei.cn/play-webpack/_book/index.html", name: "极客时间：玩转Webpack"},
        {name: "http://book.tangyefei.cn/computer-composition-theory/_book/index.html", name: "极客时间：浏览器原理"},
        {name: "http://book.tangyefei.cn/browser-theory/_book/index.html", name: "极客时间：计算机组成原理"},
        {name: "http://book.tangyefei.cn/graphic-http/_book/index.html", name: "图解HTTP"},
        {name: "http://book.tangyefei.cn/flutter-action/_book/index.html", name: "Flutter实战"},
      ],
      books: [
        {title: "异类：不一样的成功启示录"}, {title: "我是你爸爸"}, {title: "被讨厌的勇气"}, {title: "运营之光2"}, {title: "小狗钱钱"}, {title: "信任的速度"}, {title: "鱼翅与花椒"}, {title: "投资最重要的事"}, {title: "随机漫步的傻瓜"}, {title: "能力陷阱"}, {title: "你的第一本保险指南"}, {title: "国富论"}, {title: "创业维艰"}, {title: "阿特拉斯耸耸肩"}, {title: "幸福之路"}, {title: "理性乐观派"}, {title: "最冷的冬天：美国人严重的朝鲜战争"}, {title: "怪诞行为学"}, {title: "银河帝国1：基地"}, {title: "生命不能承受之轻"}, {title: "奇迹男孩"}, {title: "从0到1"}, {title: "原则"}, {title: "这本书能让你睡得好"}, {title: "推拿"}, {title: "南京大屠杀"}, {title: "平衡的智慧"}, {title: "选择有灵魂的工作"}, {title: "达尔文传"}, {title: "投资异类"}, {title: "黑天鹅"}, {title: "斜杆青年"}, {title: "万物简史"}, {title: "富甲美国"}, {title: "自我关怀的力量"}, {title: "Mindset"}, {title: "Mavon Collin's Way"}
      ],
      articles: []
    }
  }

  componentDidMount() {
    Req.getArticles(res => {
      if(res.ok) {
        this.setState({
          articles: res.body
        })
      }
    })
  }
  render( ) {
    let {guides, books, articles}  = this.state;
    let guideComs = guides.map(d => <li key={d.name}><a href={d.href} target="_blank" className="tag">{d.name}</a></li>);
    let bookComs = books.map(d => <li key={d.title}><a className="tag">{d.title}</a></li>)
    let articleComs = articles.map(d => (
      <div className="article"><Link to={'/detail/' + d.id}><h3>{d.title}</h3></Link><p className="meta"><span className="created-date">{d.created_at}</span><span className="tag">{d.type}({d.tags})</span></p><div className="overview">{d.overview}</div></div>
    ))
    return (
      <div className="page home-page">
        <div className="intro">
          <span className="avatar"></span>
          <p><span>“</span> 蔑视命运。如果你确定了自己的标准，你对自己的生活会有大得多的控制。<span>”</span> &nbsp;&nbsp;&nbsp;《黑天鹅》</p>
          <h3>Yefei 前端工程师</h3>
        </div>
        <ul className="menus">
          <li><a href="http://tech.tangyefei.cn">技术</a></li>
          <li><a href="https://read.tangyefei.cn">读书</a></li>
        </ul>
        <ul className="sticky">
          <h3 style={{'marginBottom':'10px'}}>技术速查速看：</h3>
          {guideComs}
          <h3 style={{'marginBottom':'10px'}}>读过的4/5星的好书</h3>
          {bookComs}
        </ul>
        <div className="article-list-container">
          {articleComs}
        </div>
        <footer><a target="_blank" href="http://www.beian.miit.gov.cn" style={{
          paddingRight: "20px",
          verticalAlign: "-1px",
          textDecoration: "none"
        }}>备案号：湘ICP备19006605号-1</a> © Copyright 2019 Yefei Tang </footer>
      </div>
    )
  }
}

export default Home;