import React, { useEffect, useState } from 'react';
import { Layout, Button, Input, Image } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { logoutUser } from '../../api/LoginApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import d2wlogo from '../../images/d2wlogo.webp';
import { useLocation } from 'react-router-dom';
import './AppHeader.css';

import { filterItems, updateSearchTerm } from '../../actions/task/taskSlice';

const AppHeader = () => {
  const { Header } = Layout;
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listPage, setListPage] = useState(false);

  useEffect(() => {
    if (location.pathname === '/landing') {
      setListPage(true);
    }
  }, [location]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('user_id');
      localStorage.removeItem('access_token');
      navigate('/');
    } catch (error) {}
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    dispatch(updateSearchTerm(searchTerm));
    dispatch(filterItems(searchTerm));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Header
      className='header-container'
      style={{ padding: isMobile ? '0 10px 0 10px' : '0 40px 0 40px' }}
    >
      {isMobile ? null : <Image src={d2wlogo} alt='Logo' width={120} />}
      {listPage ? (
        <Input
          placeholder='Pesquisar'
          onChange={handleSearch}
          className={isMobile ? 'search-input-mobile' : 'search-input'}
        />
      ) : null}
      <Button
        type='primary'
        icon={<LogoutOutlined />}
        className='logout-button'
        onClick={handleLogout}
      >
        Sair
      </Button>
    </Header>
  );
};

export default AppHeader;
