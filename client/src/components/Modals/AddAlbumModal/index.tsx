import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../hooks/redux';
import { AlbumApi } from '../../../store/services/AlbumService';

interface AddAlbumModalProps {
  hideModal: () => void;
}

interface FormValuesAlbum {
  name: string;
  executor: string;
  picture: File[];
}

const AddAlbumModal: React.FC<AddAlbumModalProps> = ({ hideModal }) => {
  const { user } = useAppSelector((state) => state.user);
  const [isPicture, setIsPicture] = useState<boolean>(false);
  const [createAlbum, { }] = AlbumApi.useCreateAlbumMutation();
  const fileRef = useRef<any>(null);
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

    console.log(user!._id)

    createAlbum(formData);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files![0];

    reader.onload = function () {
      fileRef.current.src = reader.result;
    };

    setIsPicture(true);
    reader.readAsDataURL(file);

    console.log(file)
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
          {/* <span className='form__global-error'>{error && error}</span> */}
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
                onChange: onChangeFile
              })}
              type="file"
              id="picture"
              accept=".jpg, .jpeg, .png, .svg, .gif"
              className="form__input-file"
            />
            <label htmlFor="picture" className="form__btn-file">
              Выбрать файл
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
