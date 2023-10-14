import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemStatus } from '../../api/ItemApi';
import { Button, Card, List, Space, Tooltip } from 'antd';
import ModalEditList from '../../components/ModalEditList/ModalEditList';
import { toast } from 'react-toastify';
import { loadItemsThunk } from './taskSlice';
import ModalDelete from '../../components/ModalDelete/ModalDelete';

const TaskList = ({ titleText, listType }) => {
  const tasks = useSelector((state) => state.task[listType]);
  const type = listType === 'completedItems';

  const [modalItem, setModalItem] = useState({});
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const dispatch = useDispatch();
  const notify = (text) => toast(text);

  const handleModalEdit = (item) => {
    setShowModalEdit(!showModalEdit);
    setModalItem(item);
  };

  const handleModalDelete = (item) => {
    setModalItem(item);
    setShowModalDelete(!showModalDelete);
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('task_id', task.id);
    e.dataTransfer.setData('current_completed', task.completed);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('task_id');
    const currentCompleted = e.dataTransfer.getData('current_completed');
    const newCompleted = currentCompleted === '1' ? '0' : '1';

    try {
      await updateItemStatus(taskId, newCompleted);
      dispatch(loadItemsThunk(tasks));
    } catch (error) {
      notify('Houve um erro ao atualizar o status da tarefa');
    }
  };

  return (
    <Card
      title={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <span>{titleText}</span>
        </div>
      }
      style={{ flex: 1 }}
    >
      <List
        className='my-scrollable-list'
        style={{ height: '60vh' }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '220px',
              }}
            >
              <Space direction='vertical' align='center'>
                <p style={{ margin: '0' }}>
                  <Tooltip title='Título da tarefa'>{task.title}</Tooltip>
                </p>
                <p
                  style={{
                    margin: '0',
                    maxWidth: '180px',
                    overflowWrap: 'break-word',
                    ...(type ? { textDecoration: 'line-through' } : {}),
                  }}
                >
                  <Tooltip title='Descrição da tarefa'>
                    {task.description}
                  </Tooltip>
                </p>
                <Space>
                  <Button type='primary' onClick={() => handleModalEdit(task)}>
                    Atualizar
                  </Button>
                  <Button danger onClick={() => handleModalDelete(task)}>
                    Deletar
                  </Button>
                </Space>
              </Space>
            </div>
          </List.Item>
        )}
      />
      {showModalDelete && (
        <ModalDelete
          itemId={modalItem.id}
          showModalDelete={showModalDelete}
          setShowModalDelete={setShowModalDelete}
        />
      )}
      {showModalEdit && (
        <ModalEditList
          item={modalItem}
          setShowModal={setShowModalEdit}
          listType={listType}
        />
      )}
    </Card>
  );
};

export default TaskList;
