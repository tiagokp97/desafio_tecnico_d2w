import { Modal } from 'antd';
import { deleteItem } from '../../api/ItemApi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loadItemsThunk } from '../../actions/task/taskSlice';
const ModalDelete = ({ itemId, setShowModalDelete, showModalDelete }) => {
  const dispatch = useDispatch();
  const notify = (text) => toast(text);

  const handleOk = async () => {
    try {
      await deleteItem(itemId);
      dispatch(loadItemsThunk());
      notify('Tarefa excluída com sucesso');
    } catch (error) {
      notify('Houve um erro para excluir a tarefa');
    }

    setShowModalDelete(!showModalDelete);
  };

  const handleCancel = () => {
    setShowModalDelete(false);
  };

  return (
    <Modal
      open={showModalDelete}
      title='Confirmação'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Tem certeza de que deseja excluir esta tarefa?</p>
    </Modal>
  );
};

export default ModalDelete;
