import React, { useEffect, useState } from 'react';
import { Button, Input, Form, Space, Card } from 'antd';
import { createItem } from '../../api/ItemApi';
import '../../global.css';
import { useDispatch } from 'react-redux';
import TaskList from '../../actions/task/TaskList';
import { loadItemsThunk } from '../../actions/task/taskSlice';
import { toast } from 'react-toastify';
import './CreateTask.css';

export default function CreateTask() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const notify = (text) => toast(text);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850);
  const [isBigScreen, setIsBigScreen] = useState(window.innerWidth > 1100);

  useEffect(() => {
    const loadItems = async () => {
      try {
        dispatch(loadItemsThunk());
      } catch (error) {
        notify('Erro ao renderizar sua lista');
      }
    };

    loadItems();
  }, [dispatch]);

  const handleCreateItem = async (values) => {
    const { title, description } = values;

    try {
      await createItem(title, description);
      form.resetFields();
      dispatch(loadItemsThunk());
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
      setIsBigScreen(window.innerWidth > 1100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Space
        className={`space-wrapper ${isMobile ? 'column-layout' : 'row-layout'}`}
        style={{
          backgroundImage:
            'url(https://data2win.com.br/wp-content/uploads/2022/01/servfun.png)',
          gap: isBigScreen ? '4%' : null,
        }}
      >
        <Card className='card-wrapper' title='Criar Tarefa'>
          <Form form={form} onFinish={handleCreateItem} layout={'vertical'}>
            <Form.Item
              label='Título'
              name='title'
              rules={[
                { required: true, message: 'Por favor, insira o título!' },
                {
                  min: 3,
                  message: 'O título deve ter pelo menos 3 caracteres',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label='Descrição' name='description'>
              <Input.TextArea
                className='textarea-no-resize'
                autoSize={{ minRows: 3 }}
              />
            </Form.Item>

            <Button type='primary' htmlType='submit'>
              Criar Tarefa
            </Button>
          </Form>
        </Card>
        <TaskList titleText='Lista de Tarefas' listType='incompletedItems' />
        <TaskList titleText='Tarefas finalizadas' listType='completedItems' />
      </Space>
    </>
  );
}
