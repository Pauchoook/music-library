import React, { memo } from 'react';
import arrows from '../../../assets/img/arrow-up-down.svg';

interface DropdownDaysProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
}

const DropdownDays: React.FC<DropdownDaysProps> = memo(({ currentDay, setCurrentDay }) => {
  const changeDay = (day: number) => {
    setCurrentDay(day);
  };

  return (
    <div className='dropdown form__dropdown'>
      <button type="button" className="form__dropdown-btn">
        <img src={arrows} className="form__dropdown-btn-arrow" />
        <span>{currentDay || 'Day'}</span>
      </button>
      <div className="dropdown__item form__dropdown-item">
        <ul onClick={(e) => e.stopPropagation()} className="form__dropdown-list">
          {new Array(31).fill(undefined).map((item, index) => (
            <li
              key={index}
              onClick={() => changeDay(index + 1)}
              className={index + 1 === currentDay ? 'form__dropdown-item-btn active' : 'form__dropdown-item-btn'}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default DropdownDays;
