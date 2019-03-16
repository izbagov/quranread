import React from 'react';
import s from './Logo.module.scss';

const Logo = () => (
  <div className={s.parent}>
    <div className={s.logo}>Quranic.ru</div>
    <div className={s.slogan}>Смысловой перевод Корана</div>
  </div>
);

export default Logo;
