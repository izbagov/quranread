import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/mushaf.svg';
import s from './Logo.module.scss';

const Logo = () => (
  <Link to="/" className={s.parent}>
    <img src={LogoIcon} className={s.mushaf} alt="" />
    <div className={s.logo}>QuranRead.ru</div>
    <div className={s.ayat}>Читай во имя твоего Господа [96:1]</div>
  </Link>
);

export default Logo;
