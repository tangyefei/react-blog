import React from 'react';
import '../../css/base.css';
import '../../css/detail.css';

import showdown  from "showdown";
import Utils from '../../js/utils';

import HtmlToReactParser from 'html-to-react';

class Detail extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      title: '',
      date: '',
      type: '',
      tags: '',
      content: ''
    }
  }

  componentDidMount() {
    const res = {"code":1,"body":{"id":21,"type":"tech","title":"[译]《CSS In Depth》第2章 使用相对单位","overview":"介绍了CSS3以来引入的相对的单位 并介绍了CSS中的变量的使用","created_at":"2020-02-02T16:00:00.000Z","tags":"CSS3, em, rem, vh, vw, CSS变量","content":"\n说明，内容来自[O'Reailly的电子版](https://learning.oreilly.com/library/view/css-in-depth/9781617293450/kindle_split_010.html#ch02)，只简练地翻译了该章的内容。\n\n\n## 1. 为什么要用相对单位\n\n\n在早期的软件开发中，我们明确知道设备大小，一个窗口可能是400px宽、300px高，因此开发者明确知道他们的按钮要设置为多大，以及他们之间的间距是多少，但是在Web开发中，情况就有所不同了。\n\n### 1.1 使用px设计的问题\n\n浏览器窗口可以用任意大小打开，并且还可以被调整大小，因此样式效果不能在创建网页的时候就被应用，而是需要根据浏览器在屏幕上的渲染进行计算。\n\n因此我们不能只针对理想状态下的屏幕大小书写CSS，而要考虑到网页和移动设备。\n\n很长一段时间内，设计师减低复杂度的做法是使用px的设计方案，即使用相对比较紧凑(比如800px)的容器大小，然后做居中展示。\n\n\n### 1.2 不再使用以px中心的设计\n\n随着设备制造商生产出更高分辨率的设备，px设计方式开始出现问题。不断涌现了类似于是否应该支持1024像素、是否应该支持1280像素的讨论，尤其伴随移动设备的出现，我们必须要开始考虑响应式设计：在CSS层面上做抽象。\n\n抽象，意味着更多的复杂度，你需要考虑常见大小也需要考虑特殊的兼容，比如设计稿中一行展示但实际放不下的内容应该怎么展示。\n\n相对单位就是CSS提供的处理此类抽象的工具。\n\n\n## 2. em 和 rem\n\n使用em来设置诸如 padding, height, width, 或 border-radius 这样的属性会很便利，因为他们的实际效果依赖于字体大小。\n\n\n```\n<span class=\"box box-small\">Small</span>\n<span class=\"box box-large\">Large</span>\n\n.box {\n  padding: 1em;\n  border-radius: 1em;\n  background-color: lightgray;\n}\n\n.box-small {\n  font-size: 12px;              \n}\n\n.box-large {\n  font-size: 18px;              \n}\n```\n\n\n### 2.1 使用em来定义字体大小\n\n定义大小为1.2em意味着什么呢？以为着它的大小是本应该大小的1.2倍。因此浏览器通常会先计算应该大小，然后在计算相乘的倍数。\n\n当你使用em单位在嵌套的元素上会产生意想不到的的效果，比如给ul设置了 font-size: 0.8em 那么对于 ul ul ul 可能就是三个0.8相乘的结果。\n\n### 2.2 使用rem来定义font-size\n\n我们可以使用伪类 :root 来标记html标签，它们是等价的。rem是可以理解为参照物为root的em。\n\n通过使用rem，我们简化了使用的单位的复杂度。但对于是否一味使用它，要取决具体场景，我的默认效果是：\n\n使用rem处理字体大小、px处理border，em用与padding、margin、border-radi等，必要时候使用百分比来处理宽度。\n\n\n\n## 3. 停止用px思考的方式\n\n为了方便设置界面的字体，我们会将html充值为0.625em，乘以16正好是10px。\n\n```\nhtml {\n  font-size: .625em;\n}\n```\n\n刚开始它确实很方便，但是会带来两个问题：\n\n1. 你不得不在一些使用默认字体大小的地放（比如14px）频繁设置1.4em。\n2. 这种用法其实还是在用px进行思考，哪怕你使用了em，最终还是转化成了px。\n\n在响应式应用中，你应该用一些有些”模糊“的值。无所谓你的1.2em最终会计算成多少px，你需要做的事情比继承而来的要略大一些，如果它看起来不好看，那么调小一些即可。\n\n当你使用em的时候，通常会被被”计算出来到底是多少像素“搞迷糊。我建议的是，你要挑战自己使用em的习惯，虽然需要一些时间练习 ，但是它是值得的。\n\n这并不是说你就不用px了，如果你跟设计师合作，你们不可避免地需要讨论各部分的具体的像素大小。在项目的开始，你同样需要声明注入段落、标题的基础的字体大小，px是最方便的讨论单位。\n\n### 3.1 设置合适的默认字体\n\n下面例子中，我们在跟节点上使用了em单位，并且在子节点的padding和border-radius使用了em单位，在字体大小使用了rem。\n\n\n```\n<div class=\"panel\">\n  <h2>Single-origin</h2>\n  <div class=\"panel-body\">\n    We have built partnerships with small farms around the world to\n    hand-select beans at the peak of season. We then carefully roast\n    in <a href=\"/batch-size\">small batches</a> to maximize their\n    potential.\n  </div>\n</div>\n```\n\n\n```\n:root {                    \n  font-size: 0.875em;      \n}\n\n.panel {\n  padding: 1em;                    \n  border-radius: 0.5em;            \n  border: 1px solid #999;          \n}\n\n.panel > h2 {\n  margin-top: 0;                   \n  font-size: 0.8rem;               \n  font-weight: bold;               \n  text-transform: uppercase;       \n}\n```\n\n### 3.2 让例子中的panel面板响应式\n\n通过使用媒体查询，我们可以让根节点的字体有不同的大小自适应。\n\n```\n:root {                            \n  font-size: 0.75em;               \n}                                  \n\n@media (min-width: 800px) {        \n  :root {                          \n    font-size: 0.875em;            \n  }                                \n}                                  \n\n@media (min-width: 1200px) {       \n  :root {                          \n    font-size: 1em;                \n  }                                \n}                \n```\n\n### 3.3 调整局部的大小\n\n在panel上，我们声明了1rem的字体大小，panel下的元素则相对panel使用em单位进行调整。\n\n对于特殊的panel，同样通过rem让它的基准更大一些。\n\n```\n.panel {\n  font-size: 1rem;               \n  padding: 1em;\n  border: 1px solid #999;\n  border-radius: 0.5em;\n}\n\n.panel > h2 {\n  margin-top: 0;\n  font-size: 0.8em;              \n  font-weight: bold;\n  text-transform: uppercase;\n}\n\n.panel.large {               \n  font-size: 1.2rem;\n}\n```\n\n\n## 4. viewport单位\n\n\nviewport的含义是浏览器的可见部分，通常不包括地址栏、滚动栏、状态栏。它有四个单位：\n\n- vh，视口高度的百分之一\n- vw，视口宽度的百分之一\n- vmin，视口宽度、高度中较小值的百分之一\n- vmax，视口宽度、高度中较大值的百分之一\n\n想要将一张大图展示在窗口中的时候，viewport单位显得尤其有用。通过高度设置为100vh，你可以让一张高度很高的图片完整显示在视口中。\n\n\n### 4.1 关于CSS3\n\nCSS标准出来后很长时间并没有什么改变，在CSS 2.1上有一些改变，但是没有最终通过标准，这时候浏览器产商已经基于自己的标准实现了这些特性，并添加了一些新的特性。\n\n因此CSS3中的3其实不是规范的版本号，而是一些不同的规范的集合体，这些具体的规范多以3位后缀，当然也有以4结尾的、以1结尾的，比如flexbox的版本就是1。\n\n大量改变发生2009到2013年间，rem、viewport相对单位就是在这时间引入的，这也意味着我们不是在特定版本的CSS上工作，因为它是一个动态发展的过程，浏览器都增加对新特性的支持，除非有特殊的市场因素，否则是不会有CSS4出现的。\n\n\n### 4.2 用vw来设置字体大小\n\n通常以为会用vh好vw来设置容器大小，但是其实用它来设置字体大小也是一个实用的技巧。\n\n比如设置为字体大小为2vw，因为这在1200px会等价于24px，在768px平板式设备会被计算成15px。\n\n当然它的问题在于在尤其大 或 尤其小的屏幕上的展示会并不那么友好。\n\n### 4.3 使用calc()\n\ncalc函数可以让你做基本的数学运算，通常对于混合使用不同单位尤其有用，它支持加减乘除，加、减运算符两边需要用空格间隔，好习惯是么给运算符两遍都用空格隔开。\n\n```\n:root {\n  font-size: calc(0.5em + 1vw);\n}\n```\n\n## 5. 使用属性不带单位 以及 line-height的介绍\n\n\n一些属性是不需要单位就可以使用的，比如line-height, z-index 和 font-weight (700等价于bold，400等价于normal)，同样可以直接使用0而不带任何单位，这是因为对0而言什么单位都是一样的结果。\n\nline-height的使用比较特殊，即可带单位也可以不带单位。可以看看下面两个例子中 about-us的line-height会是多少：\n\n```\nbody {\n  line-height: 1.2;               \n}\n\n.about-us {\n  font-size: 2em;\n}\n```\n\n\n例子1：`16px*2*1.2=38.4px`\n\n\n```\nbody {\n  line-height: 1.2em;             \n}\n\n.about-us {\n  font-size: 2em;                 \n}\n```\n\n例子2：`16px*1.2=19.2px，font-sise: 16*2=32px`\n\n它们的差别总结就是\n\n- 父元素line-height不带单位，会让子元素的line-height都以自己的font-size为标准\n- 父元素line-height带单位，会让子元素的line-height简单地继承自父元素\n\n\n\n## 6. 自定义属性\n\n在2015年，名为 Custom Properties for Cascading Variables 的规范进入了评审候选，该规范引入了变量的概念，让你可以使用变量、在带上下文的环境中书写样式。如果你使用过预处理器比如Sass或Less，或许以为它们很相似，事实上规范中的CSS变量会比预处理器更强大。\n\n如下是一个例子，变量通过`--`声明，通过`var`使用，当变量不存在时候可以修改第二个参数中的候补值。\n\n\n```\n:root {\n  --main-font: Helvetica, Arial, sans-serif;\n  --brand-color: #369;\n}\n\np {\n  font-family: var(--main-font, sans-serif);         \n  color: var(--brand-color, blue);               \n}\n```\n\n### 6.1 修改自定义属性\n\n先看我们需要实现的效果，上方的panel是默认效果，下方但是通过简单修改变量后的效果：\n\n\n![效果图](https://upload-images.jianshu.io/upload_images/134602-5adaaf7fa5f2b990.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n\n对于两段不同的CSS，后者可以修改前者定义的变量，从而达到效果的覆写：\n\n\n```\n<body>\n  <div class=\"panel\">                               \n    <h2>Single-origin</h2>\n    <div class=\"body\">\n      We have built partnerships with small farms\n      around the world to hand-select beans at the\n      peak of season. We then careful roast in\n      small batches to maximize their potential.\n    </div>\n  </div>\n\n  <aside class=\"dark\">                              \n    <div class=\"panel\">                             \n      <h2>Single-origin</h2>\n      <div class=\"body\">\n        We have built partnerships with small farms\n        around the world to hand-select beans at the\n        peak of season. We then careful roast in\n        small batches to maximize their potential.\n      </div>\n    </div>\n  </aside>\n</body>\n```\n\n\n\n\n```\n:root {\n  --main-bg: #fff;                       \n  --main-color: #000;                    \n}\n\n.panel {\n  font-size: 1rem;\n  padding: 1em;\n  border: 1px solid #999;\n  border-radius: 0.5em;\n  background-color: var(--main-bg);      \n  color: var(--main-color);              \n}\n\n.panel > h2 {\n  margin-top: 0;\n  font-size: 0.8em;\n  font-weight: bold;\n  text-transform: uppercase;\n}\n\n.dark {\n  margin-top: 2em;                   \n  padding: 1em;\n  background-color: #999;            \n  --main-bg: #333;                   \n  --main-color: #fff;                \n}\n```\n\n在panel中我们定义了白色的背景和黑色的字体，并且应用了我们的变量表示法。\n\n但在panel.dark中修改了变量，让背景变成灰色，字体变成白色。\n\n\n### 6.2 通过JavaScript修改动态属性\n\n我们可以通过JavaScript获取到CSS中的变量值，并且修改它：\n\n```\n<script type=\"text/javascript\">\n  var rootElement = document.documentElement;\n  var styles = getComputedStyle(rootElement);                 \n  var mainColor = styles.getPropertyValue('--main-bg');       \n  console.log(String(mainColor).trim());                      \n  \t\n rootElement.style.setProperty('--main-bg', '#cdf');            \n</script>\n```\n\n### 6.3 如何开始使用它\n\n需要注意的是，老式的浏览器会忽略CSS的变量用法，我们需要做一些兼容处理。\n\n```\ncolor: black;\ncolor: var(--main-color);\n```\n"}}
    const markdown = new showdown.Converter();
    const body = res.body;
  
    this.setState({
      title: body.title,
      date: Utils.format(body.created_at),
      type: Utils.map('ARTICLE_CATEGORY', body.type),
      tags: body.tags,
      content: markdown.makeHtml(body.content)
    })

  }
  render() {
    let {title, date, type, tags, content} = this.state;
    let Parser = HtmlToReactParser.Parser();
    debugger;
    let contentDOM = Parser.parse(content || '<span></span>');
    return (
      <div className="page detail-page">
        <div className="article-container">
          <div className="banner">
            <h2>{title}</h2>
            <div className="desc">{date}<span className="tags">{type}({tags})</span></div>
          </div>
          <div className="content">
            {contentDOM}
          </div>
        </div>
      </div>
    )
  }
}

export default Detail;