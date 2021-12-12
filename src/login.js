import React from 'react';
import 'antd/dist/antd.css';
import './login.css';
import { Form, Input, Button, Popconfirm, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from './App';
import axios from 'axios';


class LoginForm extends React.Component {
    
  state = {
    loginSuccess: false
  }
    render () {

  
      const onFinish = (values) => {
        let config = {
          headers: {
            // 'Content-Type': 'application/json'
          }
        }
        let data = {"username": values.username, "password": values.password}
        axios.post('http://localhost:8080/auth/login', data, config)
            .then(res => {
              console.log(res.data);
              localStorage.setItem('token', res.data.token)
              this.state.loginSuccess = true;
              this.setState(() => {
                console.log(this.state.loginSuccess);
                this.state.loginSuccess = true;
              });
            }).catch(error => {
              console.log(error.message);
            });
      };

      const { loginSuccess } = this.state;
      if (loginSuccess) {
        console.log("redirect");
        return <Link to='/abc'>return</Link>
      }
      return <Form 
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Tên đăng nhập không được để trông',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Mật khẩu không được để trống',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
  }
};

export default LoginForm;
