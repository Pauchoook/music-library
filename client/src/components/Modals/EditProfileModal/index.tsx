import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { editUser } from '../../../store/reducers/user/ActionCreators';
import { ModalProps } from '../../../types/modal';
import { FormValuesEditUser } from '../../../types/user';
import DropdownMonth from '../../Dropdowns/Form/DrodownMonth';
import DropdownDays from '../../Dropdowns/Form/DropdownDays';
import DropdownYears from '../../Dropdowns/Form/DropdownYears';

interface ICurrentMonth {
  id: number;
  name: string;
}

const months = [
  { id: 1, name: 'Январь' },
  { id: 2, name: 'Февраль' },
  { id: 3, name: 'Март' },
  { id: 4, name: 'Апрель' },
  { id: 5, name: 'Май' },
  { id: 6, name: 'Июнь' },
  { id: 7, name: 'Июль' },
  { id: 8, name: 'Август' },
  { id: 9, name: 'Сентябрь' },
  { id: 10, name: 'Октябрь' },
  { id: 11, name: 'Ноябрь' },
  { id: 12, name: 'Декабрь' },
];

const EditProfileModal: React.FC<ModalProps> = ({ hideModal }) => {
  const { user, isLoading, error } = useAppSelector((state) => state.user);
  const idCurrentMonths = +user!.dateBirth.slice(4, 5) - 1;
  const [currentMonth, setCurrentMonth] = useState<ICurrentMonth | null>(months[idCurrentMonths]);
  const [currentDay, setCurrentDay] = useState<number>(+user!.dateBirth.slice(1, 2));
  const [currentYear, setCurrentYear] = useState<number>(+user!.dateBirth.slice(6, 10));
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesEditUser>();

  const onSubmit = (data: FormValuesEditUser) => {
    let dateBirth = '';

    if (currentMonth && currentDay && currentYear) {
      const day = `${currentDay < 10 ? '0' + currentDay : currentDay}`;
      const month = `${currentMonth?.id < 10 ? '0' + currentMonth.id : currentMonth.id}`;
      dateBirth = `${day}.${month}.${currentYear}`;
    }

    const newUser = {
      _id: user!._id,
      dateBirth,
      ...data
    }
    
    dispatch(editUser(newUser));

    if (!isLoading && !error) {
      hideModal();
    }
  };

  return (
    <div onClick={hideModal} className="modal modal-wrapper">
      <div onClick={(e) => e.stopPropagation()} className="modal__window">
        <button onClick={hideModal} className="modal__close">
          <svg
            className="modal__icon-close"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h3 className="modal__title">Edit profile</h3>
        <p className="modal__content">Music for everyone</p>
        <form onSubmit={handleSubmit(onSubmit)} action="#" className="form">
          <span className="form__global-error">{error && 'Произошла непредвиденная ошибка'}</span>
          <div className="form__item">
            <label htmlFor="username" className="form__label">
              {errors?.username?.message}
            </label>
            <input
              {...register('username', {
                required: 'Поле не может быть пустым',
                value: user?.username
              })}
              type="text"
              id="username"
              placeholder="Username"
              className="form__input"
            />
          </div>
          <div className="form__item">
            <input
              {...register('firstName', {
                value: user?.firstName
              })}
              type="text"
              id="firstName"
              placeholder="First name"
              className="form__input"
            />
          </div>
          <div className="form__item">
            <input
              {...register('lastName', {
                value: user?.lastName
              })}
              type="text"
              id="lastName"
              placeholder="Last name"
              className="form__input"
            />
          </div>
          <div className="form__item">
            <span className="form__date-title">Date of birth</span>
            <div className="form__date-wrapper">
              <DropdownMonth months={months} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
              <DropdownDays currentDay={currentDay} setCurrentDay={setCurrentDay} />
              <DropdownYears currentYear={currentYear} setCurrentYear={setCurrentYear} />
            </div>
          </div>
          <div className="form__gender">
            <input
              {...register('gender', {
                required: true,
              })}
              checked={user!.gender === 'men'}
              type="radio"
              value="men"
              id="gender-men"
              className="form__gender-input"
            />
            <label htmlFor="gender-men" className={!errors?.gender ? 'form__gender-item' : 'form__gender-item error'}>
              Men
            </label>
            <input
              {...register('gender', {
                required: true,
              })}
              checked={user!.gender === 'women'}
              value="women"
              type="radio"
              id="gender-women"
              className="form__gender-input"
            />
            <label htmlFor="gender-women" className={!errors?.gender ? 'form__gender-item' : 'form__gender-item error'}>
              Women
            </label>
          </div>
          <button type="submit" className="form__btn">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
