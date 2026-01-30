import React from 'react';
import { Theme } from '@consta/uikit/Theme';
import { myDefaultPreset } from './utils/myDefaultPreset';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'src/router/AppRouter/AppRouter';
import HeaderComponent from 'src/components/HeaderComponent/HeaderComponent';

const AppWrapper = () => {
  return (
    <>
      <Theme preset={myDefaultPreset}>
        <BrowserRouter>
          <HeaderComponent />
          <AppRouter />
        </BrowserRouter>
      </Theme>
      <ToastContainer
        theme={'colored'}
        position={'bottom-left'}
        draggable={false}
        autoClose={3000}
      />
    </>
  );
};

export default AppWrapper;
