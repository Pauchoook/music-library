import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login } from '../../store/reducers/user/ActionCreators';

export type FormValuesLogin = {
  email: string;
  password: string;
};

interface LoginFormProps {
  openRegistration: () => void;
  hide: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ openRegistration, hide }) => {
  const dispatch = useAppDispatch();
  const { isAuth, error } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesLogin>();

  const onSubmit = (data: FormValuesLogin): void => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isAuth) hide();
  }, [isAuth]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="#" className="form">
      <span className='form__global-error'>{error}</span>
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
      <button type="submit" className="form__btn">
        Log in
      </button>
      <p className="form__footer-content">
        Don't have an account yet? <span onClick={openRegistration}>Register</span>
      </p>
    </form>
  );
};

export default LoginForm;
