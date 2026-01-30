import React from 'react';
import styles from './ErrorHandler.module.styl';
import { Responses500 } from '@consta/uikit/Responses500';
import { Responses403 } from '@consta/uikit/Responses403';
import { Responses503 } from '@consta/uikit/Responses503';
import { Responses404 } from '@consta/uikit/Responses404';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ErrorUrlEnum } from 'src/router/router';
import { Button } from '@consta/uikit/Button';

export interface ErrorHandlerProps {}

const ErrorHandler: React.FC<ErrorHandlerProps> = () => {
  const navigate = useNavigate();

  const btn = (
    <Button
      size="m"
      view="ghost"
      label="Вернуться назад"
      onClick={() => navigate(-1)}
    />
  );

  return (
    <div className={styles.root}>
      <Routes>
        <Route
          path={ErrorUrlEnum.ERROR_500}
          element={
            <Responses500
              className={styles.error}
              title="При обработке запроса произошла ошибка"
              description="Повторите попытку позже"
              actions={btn}
              size="l"
            />
          }
        />
        <Route
          path={ErrorUrlEnum.ERROR_403}
          element={
            <Responses403
              className={styles.error}
              title="Отказано в доступе"
              description=" "
              actions={btn}
              size="l"
            />
          }
        />
        <Route
          path={ErrorUrlEnum.ERROR_503}
          element={
            <Responses503
              className={styles.error}
              title="Технические работы"
              description=" "
              actions={btn}
              size="l"
            />
          }
        />

        <Route
          path={ErrorUrlEnum.ERROR_404}
          element={
            <Responses404
              className={styles.error}
              title="Такой страницы не существует"
              description=" "
              actions={btn}
              size="l"
            />
          }
        />
      </Routes>
    </div>
  );
};

export default ErrorHandler;
