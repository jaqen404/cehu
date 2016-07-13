import React from 'react';
import AuthPage from './AuthPage.jsx';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import Paper from 'material-ui/Paper';

export default class JoinPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const confirm = this.refs.confirm.value;
    const errors = {};

    if (!email) {
      errors.email = '请填写邮箱';
    }
    if (!password) {
      errors.password = '请填写密码';
    }
    if (confirm !== password) {
      errors.confirm = '请确认您的密码';
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Accounts.createUser({
      email,
      password,
    }, err => {
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
        <h1>注册.</h1>
        <p>加入我们可以执行您自己的预测</p>
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
          <div>
            <input type="password" name="confirm" ref="confirm" placeholder="确认密码"/>
            <span  title="确认密码"></span>
          </div>
          <button type="submit" >注册</button>
        </form>
      </div>
    );

    const link = <Link to="/login">已有账号? 马上登录</Link>;

    return <AuthPage content={content} link={link}/>;
  }
}

JoinPage.contextTypes = {
  router: React.PropTypes.object,
};
