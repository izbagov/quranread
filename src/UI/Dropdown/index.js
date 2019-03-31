import React, { useState } from 'react';
import s from './Dropdown.module.scss';

const Dropdown = ({ dropdown, children }) => {
  const [open, setOpen] = useState(false);
  const onClickDropdown = () => {
    setOpen(!open);
  };
  return (
    <div className={s.container}>
      {children && (
        <div className={s.heading} onClick={onClickDropdown}>
          {children}
        </div>
      )}

      {open && <div className={s.dropdown}>{dropdown}</div>}
    </div>
  );
};

export default Dropdown;
