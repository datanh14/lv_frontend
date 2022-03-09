import { Button, Checkbox, Form, Input } from 'antd';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginFunction } from './LoginFunction';

interface DesktopHomePageProps {}
const LoginForm: FunctionComponent<DesktopHomePageProps> = ({}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const onFinish = (values) => {
    handleLoginFunction(values);
  };
  const history = useNavigate();
  const handleLoginFunction = React.useCallback(async (data) => {
    // console.log(data);
    setLoading(true);
    const request = LoginFunction({
      username: data.username,
      password: data.password,
    });
    const response = await request;
    console.log('response', response);
    if (response.data) {
      localStorage.setItem('token-key', response.data?.token);
      history('/partner/register');
    }

    setLoading(false);
    return () => {
      request.cancel();
    };
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Tài khoản'
          name='username'
          rules={[
            {
              required: true,
              message: 'Vui Lòng nhập lại tài khoản!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Mật khẩu'
          name='password'
          rules={[
            {
              required: true,
              message: 'Vui Lòng nhập lại mật khẩu!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
