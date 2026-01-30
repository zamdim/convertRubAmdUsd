import React from 'react';
import { Responses404 } from '@consta/uikit/Responses404';

// Styles
import cn from 'classnames/bind';
import styles from './Error404.module.styl';

const cx = cn.bind(styles);

export interface Error404Props {}

const Error404: React.FC<Error404Props> = () => (
  <div className={cx('Error404')}>
    <Responses404
      className={cx('Error404__error')}
      title="Такой страницы не существует"
      description=" "
      actions=" "
      size="l"
    />
  </div>
);

export default Error404;
