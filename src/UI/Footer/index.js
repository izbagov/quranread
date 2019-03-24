import React from 'react';
import s from './Footer.module.scss';

const Footer = () => (
  <footer className={s.footer}>
    <div className={`wrap ${s.wrap}`}>
      <div className={s.left}>
        &copy; 2018 - <a href="/">QuranRead.ru</a> - Смысловой перевод Священного Корана
      </div>
      <div className={s.nav}>
        <a href="/contacts">Обратная связь</a>
      </div>
    </div>
  </footer>
);

export default Footer;
