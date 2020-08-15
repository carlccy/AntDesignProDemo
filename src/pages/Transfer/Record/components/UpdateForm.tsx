import React from 'react';
import { Modal } from 'antd';

interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="Edit"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default UpdateForm;
