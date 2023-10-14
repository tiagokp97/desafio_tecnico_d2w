import React, { useState } from 'react';
import { Form, Input, Button, Image } from 'antd';
import { loginUser, registerUser } from '../../api/LoginApi';
import { useNavigate } from 'react-router-dom';
import organization from '../../images/organization.webp';
import organization_register from '../../images/organization_register.webp';
import './LoginForm.css';

const LoginForm = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (isRegisterMode) {
      const response = await registerUser(values.email, values.password);
      if (response && response.status === 201) {
        setIsRegisterMode(!isRegisterMode);
      }
    } else {
      const response = await loginUser(values.email, values.password);

      if (response && response.status === 200) {
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('access_token', response.data.access_token);
        navigate('/landing');
      }
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  return (
    <div className={isRegisterMode ? 'container-register' : 'container'}>
      <div className='image-side'>
        <Image
          preview={false}
          src={isRegisterMode ? organization_register : organization}
          alt='Logo'
        />
      </div>
      <div
        className={`form-side ${
          isRegisterMode ? 'animate-from-left' : 'animate-from-right'
        }`}
      >
        <h1 className='form-header'>
          {isRegisterMode ? 'Registre-se' : 'Login'}
        </h1>
        <Form
          name='login'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size={'large'}
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Por favor, insira seu email!' },
              { type: 'email', message: 'Insira um email válido!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Senha'
            name='password'
            rules={[
              { required: true, message: 'Por favor, insira sua senha!' },
              { min: 8, message: 'A senha deve ter pelo menos 8 caracteres!' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className='form-button'>
            <Button type='primary' htmlType='submit'>
              {isRegisterMode ? 'Registrar' : 'Entrar'}
            </Button>
          </Form.Item>
          <p className='form-button'>
            {isRegisterMode
              ? 'Já tem uma conta? '
              : 'Ainda não tem uma conta? '}
            <button onClick={toggleMode} className='form-link'>
              {isRegisterMode ? 'Voltar para o login' : 'Registrar'}
            </button>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
