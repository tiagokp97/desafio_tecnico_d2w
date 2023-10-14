import { Button, Form, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { updateItem } from '../../api/ItemApi';
import { CloseOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loadItemsThunk } from '../../actions/task/taskSlice';
import EditActions from '../EditActions/EditActions';
import formateDate from '../../utils/utils';
import './ModalEditList.css';

function ModalEditList({ item, setShowModal, listType }) {
  const notify = (text) => toast(text);
  const dispatch = useDispatch();
  const [taskStatus, setTaskStatus] = useState(0);
  const creationDate = formateDate(item.created_at);
  const finishedData = formateDate(item.finished_at);
  const [updateForm] = Form.useForm();

  const handleUpdateItem = async (values) => {
    try {
      await updateItem({ ...item, ...values, completed: taskStatus });
      notify('Tarefa atualizada com sucesso!');
    } catch (error) {
      notify('Erro ao atualizar a tarefa!');
    }
    setShowModal(false);
    dispatch(loadItemsThunk());
  };

  useEffect(() => {
    updateForm.setFieldsValue({
      title: item.title,
      description: item.description,
    });
  }, [item, updateForm]);

  return (
    <Space direction='vertical' size='large' className='space-fixed'>
      <Form
        form={updateForm}
        onFinish={handleUpdateItem}
        layout={'vertical'}
        onFinishFailed={() =>
          notify('Por favor, preencha algum campo do formulário!')
        }
      >
        <p>Data de criação: {creationDate}</p>
        {item.completed === 1 ? (
          <p>Data de Finalização: {finishedData}</p>
        ) : null}

        <Form.Item
          label='Título'
          name='title'
          rules={[{ required: true, message: 'Por favor, insira o título!' }]}
        >
          <Input placeholder={item.title} />
        </Form.Item>

        <Form.Item label='Descrição' name='description'>
          <Input.TextArea
            className='my-scrollable-list'
            placeholder={item.description}
          />
        </Form.Item>

        <EditActions setTaskStatus={setTaskStatus} />

        <Button type='primary' htmlType='submit'>
          Atualizar tarefa
        </Button>

        <Button
          type='text'
          icon={<CloseOutlined />}
          onClick={() => setShowModal(false)}
          className='close-button'
        />
      </Form>
    </Space>
  );
}

export default ModalEditList;
