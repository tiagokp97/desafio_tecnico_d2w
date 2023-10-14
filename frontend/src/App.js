import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Routes from "./routes/routes";
import { ConfigProvider, Layout } from "antd";
import AppHeader from "./components/Header/AppHeader";
import AppFooter from "./components/Footer/AppFooter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from "./store/store"

const AppWrapper = () => {
  const location = useLocation();
  return <App location={location} />;
};



function App({ location }) {

  const { Content } = Layout;
  const isHomePage = location.pathname === '/'
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: '#E64D00',
              algorithm: true,
            },
            Input: {
              colorPrimary: '#E64D00',
              algorithm: true,
            }
          },
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Layout style={{ minHeight: '100vh', backgroundColor: isHomePage ? 'white' : '#F7F7F7' }}>
          <AppHeader />
          <Content>
            <Routes />
          </Content>
          <AppFooter />
        </Layout>
      </ConfigProvider>
    </Provider>


  );
}

const MainApp = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default MainApp;