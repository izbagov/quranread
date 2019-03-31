import React from 'react';
import { Link } from 'react-router-dom';
import s from './Footer.module.scss';

const Footer = () => (
  <footer className={s.footer}>
    <div className={`wrap ${s.wrap}`}>
      <div className={s.left}>
        &copy; 2018 - <Link to="/">QuranRead.ru</Link> - Смысловой перевод Священного Корана
      </div>
      <div className={s.nav}>
        <Link to="/credits">Благодарность</Link>
        <Link to="/contacts">Обратная связь</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
