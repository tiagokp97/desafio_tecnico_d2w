import { Footer } from 'antd/es/layout/layout';
import React from 'react';

const AppFooter = () => {
  return (
    <Footer
      style={{
        textAlign: 'center',
        backgroundColor: '#F7F7F7',
      }}
    >
      Desenvolvido por Tiago Pesch ©2023
      <br />
      <a
        href='https://github.com/tiagokp97?tab=repositories'
        target='_blank'
        rel='noopener noreferrer'
      >
        GitHub
      </a>
    </Footer>
  );
};

export default AppFooter;
