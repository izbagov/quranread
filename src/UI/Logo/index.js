import React from 'react';
import LogoIcon from '../../assets/mushaf.svg';
import s from './Logo.module.scss';

const Logo = () => (
  <div className={s.parent}>
    <img src={LogoIcon} className={s.mushaf} alt="" />
    <div className={s.logo}>QuranRead.ru</div>
    <div className={s.ayat}>Читай во имя твоего Господа [96:1]</div>
  </div>
);

export default Logo;
