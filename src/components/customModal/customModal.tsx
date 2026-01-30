import React, { ReactNode } from 'react';
import { Modal } from '@consta/uikit/Modal';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconClose } from '@consta/uikit/IconClose';
import cn from 'classnames/bind';
import styles from './customModal.module.styl';
import useScreenSize from 'src/hooks/useScreenSize';

interface IComponentProps {
  isOpen?: boolean;
  title: string; //Название
  titleDescription?: string; //Описание под названием
  onClose(): void; //Закрыть окно
  onSave?(): Promise<void> | any; //Успешное действие
  isReadonly?: boolean; // Для отображения, без действий сохранения
  isDelete?: boolean; //Модалка удаления (смена цвета кнопки
  actionLabels: [string, string?]; //Лейблы кнопок
  successDisabled?: boolean; //Дизейбл на сохранение
  isRequestLoading?: boolean;
  children?: ReactNode;
  isChangeActionButton?: boolean;
  isModal?: boolean;
  className?: string;
  contentClassname?: string;
  width?: number;
  isColFooter?: boolean;
  isHiddenClose?: boolean;
  rightContent?: React.ReactNode;
}

const cx = cn.bind(styles);

/**
 * Кастомизированное модальное окно. Использовать вместо Consta Modal
 * Параметр открытия модального окна,
 * @param isOpen,
 * Функция, отвечающая за закрытие модального окна для нижних кнопок,
 * @param  onClose
 * Функция отвечающая за выполнение какого-либо действия для нижних кнопок,
 * @param  onSave
 * Название модального окна,
 * @param title
 * Названия кнопок (передать в массиве две строки),
 * @param actionLabels,
 * Блок кнопки выполнения действия,
 * @param  successDisabled,
 * Сюда передать внутреннюю часть модального окна,
 * @param  children ,
 *  Флаг если одна кнопка,
 * @param  isReadonly,
 * Флаг для модального окна удаления
 * @param  isDelete
 * Поменять местами функции для кнопок,
 * @param  isChangeActionButton ,
 * Для задания ширины модальника
 * @param  isRequestLoading
 * Лоадер на кнопку сохранения
 * @param isModal
 * @param titleDescription
 * @param className
 * @param contentClassname
 * @param width
 * @param isColFooter
 * @param isHiddenClose
 * @param rightContent
 */
const CustomModal: React.FC<IComponentProps> = ({
  isOpen,
  title,
  onClose,
  onSave,
  isReadonly,
  actionLabels,
  successDisabled,
  isRequestLoading,
  children,
  isDelete,
  isChangeActionButton = false,
  isModal = true,
  titleDescription,
  className,
  contentClassname,
  width = 598,
  isColFooter,
  isHiddenClose,
  rightContent,
}) => {
  const [screenWidth] = useScreenSize();

  const calculateWidth =
    screenWidth - 32 < width ? 'calc(100vw - 32px)' : width;

  const childrenModal = () => (
    <section
      style={{
        width: calculateWidth,
      }}
      className={cx('container', className)}
    >
      <div
        style={{
          display: isHiddenClose ? 'block' : undefined,
        }}
        className={styles.header}
      >
        <div className={styles.title}>
          <Text
            align={isHiddenClose ? 'center' : undefined}
            size={isHiddenClose ? '3xl' : '2xl'}
          >
            {title}
          </Text>
          {titleDescription && (
            <Text size="s" view="secondary">
              {titleDescription}
            </Text>
          )}
        </div>
        {!isHiddenClose && (
          <Button
            view="clear"
            size="s"
            iconRight={IconClose}
            onClick={onClose}
            className={styles.iconClose}
          />
        )}
      </div>
      <div className={cx('content', contentClassname)}>{children}</div>

      {!isReadonly ? (
        <div className={isColFooter ? styles.footerCol : styles.footer}>
          <Button
            size="s"
            label={actionLabels[0]}
            view="ghost"
            onClick={isChangeActionButton ? onSave : onClose}
          />
          <Button
            size="s"
            className={cx(styles.button, {
              alertButton: isDelete,
            })}
            label={!isDelete ? actionLabels[1] : actionLabels?.[1] || 'Удалить'}
            disabled={successDisabled}
            onClick={isChangeActionButton ? onClose : onSave}
            loading={isRequestLoading}
          />
          {rightContent && (
            <div
              style={{
                position: 'absolute',
                background: '#FFFFFF',
                top: 50,
                left: width ? width + 40 : 510,
              }}
            >
              {rightContent}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.footer}>
          <Button
            size="s"
            className={cx(styles.button, {
              alertButton: isDelete,
            })}
            label={!isDelete ? actionLabels[0] : 'Удалить'}
            view="secondary"
            onClick={onClose}
            loading={isRequestLoading}
          />
        </div>
      )}
    </section>
  );
  return (
    <>
      {isModal ? (
        <Modal
          isOpen={isOpen}
          onEsc={onClose}
          onClickOutside={onClose}
          className={styles.modal}
        >
          {childrenModal()}
        </Modal>
      ) : (
        <>{childrenModal()}</>
      )}
    </>
  );
};

export default React.memo(CustomModal);
