/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Form, Input, Button,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { mockRegisterUser } from './RegisterAPI';

export const validateRegisterUser = (username, firstName, lastName, password, callback) => {
  callback(!!(username && firstName && lastName && password));
};

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 4 },
};

const buttonLayout = {
  wrapperCol: { span: 4, offset: 2 },
};

function RegisterForm() {
  const [username, setUsername] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [valid, setValid] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    validateRegisterUser(username, firstName, lastName, password, setValid);
  }, [username, firstName, lastName, password]);
  const registerUser = React.useCallback(() => {
    const res = mockRegisterUser();
    if (res.success) {
      alert('Hooray! You just registered');
      history.push('/home');
    }
  }, []);

  return (
    <>
      <p>Please provide your personal information</p>
      <Form {...layout}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please enter your username!',
            },
          ]}
        >
          <Input onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please enter your first name!',
            },
          ]}
        >
          <Input onChange={(e) => setFirstName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please enter your last name!',
            },
          ]}
        >
          <Input onChange={(e) => setLastName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
          ]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item {...buttonLayout}>
          <Button disabled={!valid} block onClick={registerUser}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default RegisterForm;
