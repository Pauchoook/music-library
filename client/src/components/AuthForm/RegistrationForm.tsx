import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { registration } from '../../store/reducers/user/ActionCreators';
import DropdownMonth from '../Dropdowns/Form/DrodownMonth';
import DropdownDays from '../Dropdowns/Form/DropdownDays';
import DropdownYears from '../Dropdowns/Form/DropdownYears';

interface FormValuesRegistration {
  email: string;
  password: string;
  username: string;
  gender: string;
  date: string;
};

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

interface RegistrationFormProps {
  openLogin: () => void;
  hide: () => void;
}

interface ICurrentMonth {
  id: number;
  name: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ openLogin, hide }) => {
  const [currentMonth, setCurrentMonth] = useState<ICurrentMonth | null>(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const { error, isAuth } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesRegistration>();

  const onSubmit = (data: FormValuesRegistration): void => {
    let dateBirth = '';

    if (currentMonth && currentDay && currentYear) {
      const day = `${currentDay < 10 ? '0' + currentDay : currentDay}`;
      const month = `${currentMonth.id < 10 ? '0' + currentMonth.id : currentMonth.id}`;
      dateBirth = `${day}.${month}.${currentYear}`;
    }

    dispatch(registration({ ...data, dateBirth }));
  };

  useEffect(() => {
    if (isAuth) hide();
  }, [isAuth]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="#" className="form">
      <span className="form__global-error">{error}</span>
      <div className="form__item">
        <label htmlFor="email" className="form__label">
          {errors?.email?.message}
        </label>
        <input
          {...register('email', {
            required: 'Поле не может быть пустым',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Неккоректный email',
            },
          })}
          type="email"
          id="email"
          placeholder="Email"
          className="form__input"
        />
      </div>
      <div className="form__item">
        <label htmlFor="password" className="form__label">
          {errors?.password?.message}
        </label>
        <input
          {...register('password', {
            required: 'Поле не может быть пустым',
            minLength: {
              value: 6,
              message: 'Пароль должен содержать минимум 6 символов',
            },
          })}
          type="password"
          id="password"
          placeholder="Password"
          className="form__input"
        />
      </div>
      <div className="form__item">
        <label htmlFor="username" className="form__label">
          {errors?.username?.message}
        </label>
        <input
          {...register('username', {
            required: 'Поле не может быть пустым',
          })}
          type="text"
          id="username"
          placeholder="Username"
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
        Register
      </button>
      <p className="form__footer-content">
        Already have an account? <span onClick={openLogin}>Log in</span>
      </p>
    </form>
  );
};

export default RegistrationForm;
