import React from "react";
import "./btn-like.scss";

interface BtnLikeProps {
  onClick: () => void;
}

const BtnLike: React.FC<BtnLikeProps> = ({onClick}) => {
  return (
    <button onClick={onClick} className="btn-like">
      <svg className="btn-like__icon" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 19.5L8.9775 18.1332C3.57 13.2978 0 10.0984 0 6.19482C0 2.99537 2.541 0.5 5.775 0.5C7.602 0.5 9.3555 1.33869 10.5 2.65368C11.6445 1.33869 13.398 0.5 15.225 0.5C18.459 0.5 21 2.99537 21 6.19482C21 10.0984 17.43 13.2978 12.0225 18.1332L10.5 19.5Z" />
      </svg>
    </button>
  );
};

export default BtnLike;
