import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { changeAvatar } from '../../../store/reducers/user/ActionCreators';
import { ModalProps } from '../../../types/modal';
import { FormValuesChangeAvatar } from '../../../types/user';

const AvatarModal: React.FC<ModalProps> = ({ hideModal }) => {
  const { user, error, isLoading } = useAppSelector((state) => state.user);
  const [isPicture, setIsPicture] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesChangeAvatar>();
  const fileRef = useRef<HTMLImageElement>(null);

  const onSubmit = (data: FormValuesChangeAvatar) => {
    const formData = new FormData();
    formData.append('avatar', data.avatar[0]);
    formData.append('id', user!._id);

    dispatch(changeAvatar(formData));

    if (!isLoading && !error) {
      hideModal();
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files![0];

    reader.onload = function () {
      if (typeof reader.result === 'string' && fileRef.current) {
        fileRef.current.src = reader.result;
      }
    };

    setIsPicture(true);
    reader.readAsDataURL(file);
  };

  return (
    <div>
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
          <h3 className="modal__title">Change Avatar</h3>
          <p className="modal__content">Music for everyone</p>
          <form onSubmit={handleSubmit(onSubmit)} action="#" className="form">
            <span className="form__global-error">{error}</span>
            <div className="form__item-file">
              <label htmlFor="avatar" className="form__label">
                {errors?.avatar?.message}
              </label>
              <div className="form__preview-file form__preview-file--big">
                {isPicture && <img ref={fileRef} className="form__img-file" />}
              </div>
              <input
                {...register('avatar', {
                  required: 'Выберите изображение',
                  onChange: onChangeFile,
                })}
                type="file"
                id="avatar"
                accept=".jpg, .jpeg, .png, .svg, .gif"
                className="form__input-file"
              />
              <label htmlFor="avatar" className="form__btn-file">
                Выбрать изображение
              </label>
            </div>
            <button type="submit" className="form__btn">
              Change
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AvatarModal;
