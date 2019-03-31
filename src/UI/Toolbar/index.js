import React from 'react';
import s from './Toolbar.module.scss';
import { ReactComponent as IconNav } from '../../assets/navigation.svg';
import Dropdown from '../Dropdown';
import ChapterListSimple from '../../components/ChapterList/Simple';

const Toolbar = () => {
  return (
    <div className={s.container}>
      <Dropdown dropdown={<ChapterListSimple />}>
        <div className={s.nav}>
          <IconNav style={{ width: 18, height: 18 }} />
          Навигация по сурам
        </div>
      </Dropdown>
    </div>
  );
};

export default Toolbar;
