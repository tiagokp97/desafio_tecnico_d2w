import { Button, Space } from 'antd';
import React, { useState } from 'react';

export default function EditActions({ setTaskStatus }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (completed) => {
    setTaskStatus(completed);
    setSelectedButton(completed);
  };

  return (
    <Space style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
      <Button
        type={selectedButton === 0 ? 'primary' : 'default'}
        onClick={() => handleClick(0)}
      >
        Em andamento
      </Button>
      <Button
        type={selectedButton === 1 ? 'primary' : 'default'}
        onClick={() => handleClick(1)}
      >
        Finalizado
      </Button>
    </Space>
  );
}
