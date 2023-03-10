import React, { memo, useMemo } from 'react';
import arrows from '../../assets/img/arrow-up-down.svg';

interface DropdownYearsProps {
  currentYear: number;
  setCurrentYear: (year: number) => void;
}

const DropdownYears: React.FC<DropdownYearsProps> = memo(({ currentYear, setCurrentYear }) => {
  const changeYear = (year: number) => {
    setCurrentYear(year);
  };

  const renderYears = useMemo(():number[] => {
    const arr = [];
    for (let i = 2009; i >= 1902; i--) arr.push(i);
    return arr;
  }, []);

  return (
    <div className='dropdown form__dropdown'>
      <button type="button" className="form__dropdown-btn">
        <img src={arrows} className="form__dropdown-btn-arrow" />
        <span>{currentYear || 'year'}</span>
      </button>
      <div onClick={(e) => e.stopPropagation()} className="dropdown__item form__dropdown-item">
        <ul className="form__dropdown-list">
          {renderYears.map((item, index) => (
            <li
              key={index}
              onClick={() => changeYear(item)}
              className={item === currentYear ? 'form__dropdown-item-btn active' : 'form__dropdown-item-btn'}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default DropdownYears;
