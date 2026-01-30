import React, { FC } from 'react';
import styles from './LoaderComponent.module.styl';
import { Loader } from '@consta/uikit/Loader';
import classNames from 'classnames/bind';

export interface ILoaderComponent {
  fullHeight?: boolean;
  classname?: string;
}

const cx = classNames.bind(styles);

const LoaderComponent: FC<ILoaderComponent> = ({ fullHeight, classname }) => {
  return (
    <div className={cx('root', fullHeight, classname)}>
      <Loader />
    </div>
  );
};

export default LoaderComponent;
