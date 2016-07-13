import { Meteor } from 'meteor/meteor';
import React from 'react';
import AuthPage from './AuthPage.jsx';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const errors = {};

    if (!email) {
      errors.email = '请填写邮箱';
    }
    if (!password) {
      errors.password = '请填写密码';
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      }
      this.context.router.push('/');
    });
  }

  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);

    const content = (
      <div>
        <h1>登录.</h1>
        <p>登录后可以查看自己的预测</p>
        <form onSubmit={this.onSubmit}>
          <div>
            {errorMessages.map(msg => (
              <div key={msg}>{msg}</div>
            ))}
          </div>
          <div>
            <input type="email" name="email" ref="email" placeholder="邮箱"/>
            <span title="邮箱"></span>
          </div>
          <div>
            <input type="password" name="password" ref="password" placeholder="密码"/>
            <span title="密码"></span>
          </div>
          <button type="submit">登录</button>
        </form>
      </div>  
    );

    const link = <Link to="/register" className="link-auth-alt">还没有账号? 马上注册.</Link>;

    return <AuthPage content={content} link={link}/>;
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.object,
};
