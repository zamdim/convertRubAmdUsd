import React, { useRef, useState } from 'react';
import styles from './HeaderComponent.module.styl';
import { useLocation, useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router/router';

import {
  Header as ConstaHeader,
  HeaderMenu,
  HeaderModule,
} from '@consta/uikit/Header';
import { Button } from '@consta/uikit/Button';
import { IconClose } from '@consta/uikit/IconClose';
import { IconHamburger } from '@consta/icons/IconHamburger';
import { Sidebar } from '@consta/uikit/Sidebar';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface TabItem {
  label: string;
  href?: string;
  active?: boolean;
  onClick?: React.EventHandler<React.MouseEvent>;
}

export interface IHeaderProps {}

const HeaderComponent: React.FC<IHeaderProps> = () => {
  const headerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const myLoc = location.pathname;

  const items: TabItem[] = [
    {
      label: 'Калькулятор',
      href: PublicRoutesEnum.CALCULATE,
      active: myLoc === PublicRoutesEnum.CALCULATE,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.CALCULATE);
      },
    },
  ];

  const headerTransition = (e: React.MouseEvent, patch: string) => {
    e.preventDefault();
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    navigate(patch);
  };

  const hamburger = isMenuOpen ? (
    <Button
      size="s"
      view="clear"
      iconLeft={IconClose}
      onClick={() => setIsMenuOpen(false)}
    />
  ) : (
    <Button
      size="s"
      view="clear"
      iconLeft={IconHamburger}
      onClick={() => setIsMenuOpen(true)}
    />
  );

  return (
    <div>
      <ConstaHeader
        className={styles.root}
        ref={headerRef}
        leftSide={
          <>
            <div className={styles.hamburger}>{hamburger}</div>
            <HeaderModule indent="s" className={styles.headerModule}>
              <HeaderMenu items={items} />
            </HeaderModule>
          </>
        }
      />
      )
      <Sidebar
        isOpen={isMenuOpen}
        position="left"
        rootClassName={cx('headerSidebar')}
        onClickOutside={() => setIsMenuOpen(false)}
      >
        <div className={styles.headerSidebarContent}>
          <HeaderMenu items={items} className={styles.sidebarHeaderMenu} />
        </div>
      </Sidebar>
    </div>
  );
};

export default HeaderComponent;
