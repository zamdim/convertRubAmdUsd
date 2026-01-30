import React, { FC } from 'react';
import { Text } from '@consta/uikit/Text';
import { ResponsesImageEmptyBox } from '@consta/uikit/ResponsesEmptyBox';
import classNames from 'classnames/bind';
import styles from './noDataComponent.module.styl';

interface INoDataComponent {
  text: string;
  className?: string;
}

const cx = classNames.bind(styles);

const NoDataComponent: FC<INoDataComponent> = ({ text, className }) => {
  return (
    <div className={cx(styles.root, className)}>
      <Text size="xl" view="ghost" align={'center'} className={styles.content}>
        <ResponsesImageEmptyBox className={styles.image} />
        {text}
      </Text>
    </div>
  );
};

export default NoDataComponent;
