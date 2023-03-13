import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import executor from '../../assets/img/men.jpg';
import './top-executors.scss';

const TopExecutors: React.FC = () => {
  return (
    <div className="top-executors">
      <h2 className="top-executors__title">Top performers of this month</h2>
      <span className="top-executors__content">Visible only to you</span>
      <Swiper className="top-executors__slider" spaceBetween={30} slidesPerView="auto" grabCursor={true}>
        <SwiperSlide className="top-executors__slide">
          <img src={executor} alt="Executor" className="top-executors__img" />
          <h4 className="top-executors__name">Oliver tree</h4>
          <span className="top-executors__role">Executor</span>
        </SwiperSlide>
        <SwiperSlide className="top-executors__slide">
          <img src={executor} alt="Executor" className="top-executors__img" />
          <h4 className="top-executors__name">Oliver tree</h4>
          <span className="top-executors__role">Executor</span>
        </SwiperSlide>
        <SwiperSlide className="top-executors__slide">
          <img src={executor} alt="Executor" className="top-executors__img" />
          <h4 className="top-executors__name">Oliver tree</h4>
          <span className="top-executors__role">Executor</span>
        </SwiperSlide>
        <SwiperSlide className="top-executors__slide">
          <img src={executor} alt="Executor" className="top-executors__img" />
          <h4 className="top-executors__name">Oliver tree</h4>
          <span className="top-executors__role">Executor</span>
        </SwiperSlide>
        <SwiperSlide className="top-executors__slide">
          <img src={executor} alt="Executor" className="top-executors__img" />
          <h4 className="top-executors__name">Oliver tree</h4>
          <span className="top-executors__role">Executor</span>
        </SwiperSlide>
        <SwiperSlide className="top-executors__slide">
          <img src={executor} alt="Executor" className="top-executors__img" />
          <h4 className="top-executors__name">Oliver tree</h4>
          <span className="top-executors__role">Executor</span>
        </SwiperSlide>
        <SwiperSlide className="top-executors__slide">
          <img src={executor} alt="Executor" className="top-executors__img" />
          <h4 className="top-executors__name">Oliver tree</h4>
          <span className="top-executors__role">Executor</span>
        </SwiperSlide>
        <SwiperSlide className="top-executors__slide">
          <img src={executor} alt="Executor" className="top-executors__img" />
          <h4 className="top-executors__name">Oliver tree</h4>
          <span className="top-executors__role">Executor</span>
        </SwiperSlide>
        <SwiperSlide className="top-executors__slide">
          <img src={executor} alt="Executor" className="top-executors__img" />
          <h4 className="top-executors__name">Oliver tree</h4>
          <span className="top-executors__role">Executor</span>
        </SwiperSlide>
        <SwiperSlide className="top-executors__slide">
          <img src={executor} alt="Executor" className="top-executors__img" />
          <h4 className="top-executors__name">Oliver tree</h4>
          <span className="top-executors__role">Executor</span>
        </SwiperSlide>
        <SwiperSlide className="top-executors__slide">
          <img src={executor} alt="Executor" className="top-executors__img" />
          <h4 className="top-executors__name">Oliver tree</h4>
          <span className="top-executors__role">Executor</span>
        </SwiperSlide>
        <SwiperSlide className="top-executors__slide">
          <img src={executor} alt="Executor" className="top-executors__img" />
          <h4 className="top-executors__name">Oliver tree</h4>
          <span className="top-executors__role">Executor</span>
        </SwiperSlide>
        <SwiperSlide className="top-executors__slide">
          <img src={executor} alt="Executor" className="top-executors__img" />
          <h4 className="top-executors__name">Oliver tree</h4>
          <span className="top-executors__role">Executor</span>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TopExecutors;
