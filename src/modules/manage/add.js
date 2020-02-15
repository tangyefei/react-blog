import React from 'react';
import showdown  from "showdown";
import HtmlToReactParser from 'html-to-react';
import '../../css/base.css';
import './add.css';
import Req from '../../js/request';

const debounce = function(action){
  setTimeout();
}
const markdown = new showdown.Converter();
const Parser = HtmlToReactParser.Parser();

class Add extends React.Component {
  constructor(...args) {
    super(...args)

    let params = args[0].match.params;

    this.state = {
      id: params.id,
      token: '',
      title: '',
      type: '',
      overview: '',
      created_at: '',
      tags: ''
    }
    this.syncMarkdownHtml = this.syncMarkdownHtml.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit() {
    let id = this.state.id;
    Req.saveArticle(this.state).then(res => {
      if(res.ok) {
        alert(id ? '新增成功' : '编辑成功');
        id = id || res.body.id;
        window.open(window.origin + '/#/detail/22', '_blank');
      }
    })
  }

  componentDidMount() {
    if(this.state.id) {
      Req.getArticle(this.state.id).then(res => {
        if(res.ok) {
          this.setState(res.body)
        }
      })
    }
  }

  syncMarkdownHtml(evt) {
    let content = evt.target.value;
    this.setState({
      content
    })
  }

  render() {
    let {id, content} = this.state;
    let contentDOM = Parser.parse(markdown.makeHtml(content)||'<span></span>');
  
    return (
      <div className="page view-page">
        <h3>{id?'编辑文章':'新增文章'}</h3>
        <form>
            <div>
              <input type="hidden" name="id" value={this.state.id}/>
              </div>
            <div>
              <label for="token">token：</label><input type="text" onChange={(e)=>{this.setState({token:e.target.value})}} name="token" value={this.state.token} placeolder="编辑仅管理员可见请输入token"/>
              </div>
            <div>
              <label for="title">标题：</label><input type="text" onChange={(e)=>{this.setState({title:e.target.value})}} name="title" value={this.state.title}/>
              </div>
            <div>
              <label for="tags">类型：</label>
              <select onChange={(e)=>{this.setState({type:e.target.value})}} name="type" value={this.state.type}>
                <option value="psy">心理</option>
                <option value="tech">技术</option>
                <option value="read">读书</option>
                <option value="travel">旅行</option>
              </select>
            </div>
            <div>
              <label for="title">日期：</label><input type="date" onChange={(e)=>{this.setState({created_at:e.target.value})}} name="created_at" value={this.state.created_at}/>
              </div>
            <div>
              <label for="overview">概述：</label><input type="text" onChange={(e)=>{this.setState({overview:e.target.value})}} name="overview" value={this.state.overview}/>
              </div>
            <div>
              <label for="tags">标签：</label><input type="text" onChange={(e)=>{this.setState({tags:e.target.value})}} name="tags" value={this.state.tags}/>
              </div>
            <div>
              <div className="form-content">
                <textarea className="markdown-editor" name="content" value={this.state.content} cols="30" rows="10" onChange={this.syncMarkdownHtml}></textarea>
                <div className="preview-panel">{contentDOM}</div>
              </div>
            </div>
            <div><input type="button" className="btn submit-btn" onClick={this.submit} value="submit"/></div>
        </form>
      </div>
    )
  }
}

export default Add;