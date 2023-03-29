import React from 'react'

interface PlayerNavProps {
  pause: boolean;
  changeTrackPrev: () => void;
  play: () => void;
  changeTrackNext: () => void;
}

const PlayerNav: React.FC<PlayerNavProps> = ({pause, changeTrackPrev, play, changeTrackNext}) => {
  return (
    <div className="player__nav">
    <button onClick={changeTrackPrev} className="player__switch">
      <svg className="player__icon-switch" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.4655 5.74175L22.4654 5.7418L10.5188 14.3413L10.5186 14.3414C9.7499 14.8944 9.7499 16.1033 10.5186 16.6563L10.5188 16.6564L22.4653 25.2569L22.4655 5.74175ZM22.4655 5.74175C23.296 5.14371 24.5 5.73429 24.5 6.89933M22.4655 5.74175L24.5 6.89933M24.5 6.89933V24.1001C24.5 25.2636 23.2966 25.8545 22.4655 25.257L24.5 6.89933ZM5.69444 5.5C5.77893 5.5 5.88889 5.57954 5.88889 5.72917V25.2708C5.88889 25.3393 5.86277 25.4003 5.82342 25.4416C5.78486 25.4821 5.73793 25.5 5.69444 25.5C5.65096 25.5 5.60402 25.4821 5.56547 25.4416C5.52612 25.4003 5.5 25.3393 5.5 25.2708V5.72917C5.5 5.57954 5.60996 5.5 5.69444 5.5Z"
          stroke="#E12D48"
        />
      </svg>
    </button>
    <button onClick={play} className="player__btn-play">
      {!pause ? (
        <svg
          className="player__icon-pause"
          width="17"
          height="20"
          viewBox="0 0 17 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="5" height="20" rx="2.5" fill="white" />
          <rect x="12" width="5" height="20" rx="2.5" fill="white" />
        </svg>
      ) : (
        <svg className="player__icon-play" viewBox="0 0 11 13" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.58854 12.7319C1.24132 12.9576 0.889583 12.9704 0.533333 12.7704C0.177778 12.5711 0 12.2631 0 11.8464V1.0652C0 0.648531 0.177778 0.340198 0.533333 0.140198C0.889583 -0.0591078 1.24132 -0.0459133 1.58854 0.179781L10.0781 5.57041C10.3906 5.77874 10.5469 6.07388 10.5469 6.45582C10.5469 6.83777 10.3906 7.13291 10.0781 7.34124L1.58854 12.7319Z"
          />
        </svg>
      )}
    </button>
    <button onClick={changeTrackNext} className="player__switch">
      <svg className="player__icon-switch" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.53448 5.74175L7.53456 5.7418L19.4812 14.3413L19.4814 14.3414C20.2501 14.8944 20.2501 16.1033 19.4814 16.6563L19.4812 16.6564L7.53474 25.2569L7.53448 5.74175ZM7.53448 5.74175C6.704 5.14371 5.5 5.73429 5.5 6.89933M7.53448 5.74175L5.5 6.89933M5.5 6.89933V24.1001C5.5 25.2636 6.70337 25.8545 7.53453 25.257L5.5 6.89933ZM24.3056 5.5C24.2211 5.5 24.1111 5.57954 24.1111 5.72917V25.2708C24.1111 25.3393 24.1372 25.4003 24.1766 25.4416C24.2151 25.4821 24.2621 25.5 24.3056 25.5C24.349 25.5 24.396 25.4821 24.4345 25.4416C24.4739 25.4003 24.5 25.3393 24.5 25.2708V5.72917C24.5 5.57954 24.39 5.5 24.3056 5.5Z"
          stroke="#E12D48"
        />
      </svg>
    </button>
  </div>
  )
}

export default PlayerNav