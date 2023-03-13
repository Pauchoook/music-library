import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../hooks/redux';
import { TrackApi } from '../../../store/services/TrackService';
import { ModalProps } from '../../../types/modal';
import { FormValuesTrack } from '../../../types/track';

const AddTrackModal: React.FC<ModalProps> = ({ hideModal }) => {
  const { user } = useAppSelector((state) => state.user);
  const [isPicture, setIsPicture] = useState<boolean>(false);
  const [isAudio, setIsAudio] = useState<boolean>(false);
  const [createTrack, {error, isSuccess}] = TrackApi.useCreateTrackMutation();
  const fileRef = useRef<HTMLImageElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesTrack>();

  const onSubmit = (data: FormValuesTrack) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('executor', data.executor);
    formData.append('picture', data.picture![0]);
    formData.append('audio', data.audio![0]);
    formData.append('owner', user!._id);

    createTrack(formData);
  };

  useEffect(() => {
    if (isSuccess && !error) {
      hideModal()
    }
  }, [isSuccess, error]);

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

  const onChangeAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const audio = e.target.files![0];

    reader.onload = function () {
      if (typeof reader.result === 'string' && audioRef.current) {
        audioRef.current.src = reader.result;
      }
    };

    setIsAudio(true);
    reader.readAsDataURL(audio);
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
        <h3 className="modal__title">Add a track</h3>
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
            <label htmlFor="executor" className="form__label">
              {errors?.picture?.message}
            </label>
            <div className="form__preview-file">{isPicture && <img ref={fileRef} className="form__img-file" />}</div>
            <input
              {...register('picture', {
                required: 'Выберите изображение',
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
          <div className="form__item-file">
            <label htmlFor="executor" className="form__label">
              {errors?.audio?.message}
            </label>
            <div className="form__preview-audio">{isAudio && <audio ref={audioRef} controls></audio>}</div>
            <input
              {...register('audio', {
                required: 'Выберите аудиофайл',
                onChange: onChangeAudio,
              })}
              type="file"
              id="audio"
              accept=".wav, .aiff, .ogg, .mp3"
              className="form__input-file"
            />
            <label htmlFor="audio" className="form__btn-file">
              Выбрать аудиофайл
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

export default AddTrackModal;
