import React, { memo } from 'react';
import arrows from '../../../assets/img/arrow-up-down.svg';

// const months = [
//   { id: 1, name: 'Январь' },
//   { id: 2, name: 'Февраль' },
//   { id: 3, name: 'Март' },
//   { id: 4, name: 'Апрель' },
//   { id: 5, name: 'Май' },
//   { id: 6, name: 'Июнь' },
//   { id: 7, name: 'Июль' },
//   { id: 8, name: 'Август' },
//   { id: 9, name: 'Сентябрь' },
//   { id: 10, name: 'Октябрь' },
//   { id: 11, name: 'Ноябрь' },
//   { id: 12, name: 'Декабрь' },
// ];

interface DropdownMonthProps {
  months: ICurrentMonth[],
  currentMonth: ICurrentMonth | null;
  setCurrentMonth: (month: ICurrentMonth) => void;
}

interface ICurrentMonth {
  id: number;
  name: string;
}

const DropdownMonth: React.FC<DropdownMonthProps> = memo(({ months, setCurrentMonth, currentMonth }) => {
  const changeMonth = (month: ICurrentMonth) => {
    setCurrentMonth(month);
  };

  return (
    <div className="dropdown form__dropdown form__dropdown--big">
      <button type="button" className="form__dropdown-btn">
        <img src={arrows} className="form__dropdown-btn-arrow" />
        <span>{currentMonth ? currentMonth.name : 'Month'}</span>
      </button>
      <div className="dropdown__item form__dropdown-item">
        <ul onClick={(e) => e.stopPropagation()} className="form__dropdown-list">
          {months.map((month) => (
            <li
              key={month.id}
              onClick={() => changeMonth(month)}
              className={currentMonth?.id === month.id ? 'form__dropdown-item-btn active' : 'form__dropdown-item-btn'}
            >
              {month.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default DropdownMonth;
