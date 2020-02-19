import React from 'react';
import Req from '../../js/request';

class Login extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      username: '',
      password: ''
    }
    this.submit = this.submit.bind(this);
  }

  submit() {
    let {username, password} = this.state;
    Req.Auth.login({username, password}).then(res => {
      if(res.ok) {
        window.location.hash = '/'
      }
    })
  }

  render( ) {
    return (
      <div className="page login-page">
        <input type="text" onChange={e => this.setState({username: e.target.value})}/>
        <input type="password" onChange={e => this.setState({password: e.target.value})}/>
        <button onClick={this.submit}>登陆</button>
      </div>
    )
  }
}

export default Login;