import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../hooks/redux';
import { AlbumApi } from '../../../store/services/AlbumService';
import { FormValuesAlbum } from '../../../types/album';
import { ModalProps } from '../../../types/modal';

const AddAlbumModal: React.FC<ModalProps> = ({ hideModal }) => {
  const { user } = useAppSelector((state) => state.user);
  const [isPicture, setIsPicture] = useState<boolean>(false);
  const [createAlbum, {error, isSuccess}] = AlbumApi.useCreateAlbumMutation();
  const fileRef = useRef<HTMLImageElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesAlbum>();

  const onSubmit = (data: FormValuesAlbum) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('executor', data.executor);
    formData.append('picture', data.picture[0]);
    formData.append('owner', user!._id);

    createAlbum(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      hideModal();
    }
  }, [isSuccess]);

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
    <div onClick={hideModal} className="modal">
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
        <h3 className="modal__title">Add a playlist</h3>
        <p className="modal__content">Music for everyone</p>
        <form onSubmit={handleSubmit(onSubmit)} action="#" className="form">
          <span className="form__global-error">{error && 'Произошла непредвиденная ошибка'}</span>
          <div className="form__item">
            <label htmlFor="name" className="form__label">
              {errors?.name?.message}
            </label>
            <input
              {...register('name', {
                required: 'Поле не может быть пустым',
              })}
              type="text"
              id="name"
              placeholder="Name"
              className="form__input"
            />
          </div>
          <div className="form__item">
            <label htmlFor="executor" className="form__label">
              {errors?.executor?.message}
            </label>
            <input
              {...register('executor', {
                required: 'Поле не может быть пустым',
              })}
              type="text"
              id="executor"
              placeholder="Executor"
              className="form__input"
            />
          </div>
          <div className="form__item-file">
            <div className="form__preview-file">{isPicture && <img ref={fileRef} className="form__img-file" />}</div>
            <input
              {...register('picture', {
                onChange: onChangeFile,
              })}
              type="file"
              id="picture"
              accept=".jpg, .jpeg, .png, .svg, .gif"
              className="form__input-file"
            />
            <label htmlFor="picture" className="form__btn-file">
              Выбрать изображение
            </label>
          </div>
          <button type="submit" className="form__btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAlbumModal;
