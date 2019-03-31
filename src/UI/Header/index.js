import React from 'react';
import Logo from '../Logo';
// import Toolbar from '../Toolbar';
import s from './Header.module.scss';

const Header = () => (
  <header className={s.header}>
    <Logo />
  </header>
);

export default Header;
