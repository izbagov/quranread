import React from 'react';
import s from './Footer.module.scss';

const Footer = () => (
  <footer className={`wrap ${s.footer}`}>
    <div className={s.left}>
      &copy; 2018 - <a href="/">QuranRead.ru</a> - Смысловой перевод Священного Корана
    </div>
    <div className={s.nav}>
      <a href="/about">О сайте</a>
      <a href="/contacts">Контакты</a>
      <a href="/tos">Соглашение</a>
    </div>
  </footer>
);

export default Footer;
