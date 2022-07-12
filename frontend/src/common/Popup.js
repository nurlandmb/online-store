import React, { useEffect } from 'react';

function Popup(props) {
  useEffect(() => {
    if (props.active) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [props.active]);

  return (
    <>
      <div 
        className={props.active ? "overflow active" : "overflow"} 
        onClick={props.closePopup}
      />
      <div className={props.active ? `popup ${props.addClass} active` : `popup ${props.addClass}`}>
        <button className="popup__close" onClick={props.closePopup}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0111 10.8379L10.5016 7.32843L14.0111 3.81893C14.8733 2.9567 14.8549 1.52675 13.9923 0.664215C13.1298 -0.198325 11.6999 -0.216731 10.8376 0.645492L7.32812 4.15499L3.81862 0.645492C2.9564 -0.216731 1.52645 -0.198325 0.66391 0.664215C-0.19863 1.52675 -0.217036 2.9567 0.645187 3.81893L4.15469 7.32843L0.645187 10.8379C-0.217035 11.7002 -0.19863 13.1301 0.66391 13.9926C1.52645 14.8552 2.9564 14.8736 3.81862 14.0114L7.32812 10.5019L10.8376 14.0114C11.6998 14.8736 13.1298 14.8552 13.9923 13.9926C14.8549 13.1301 14.8733 11.7002 14.0111 10.8379Z"
              fill={props.theme === 'dark' ? 'White' : '#000'}
            />
          </svg>
        </button>
        {props.children}
      </div>
    </>
  );
}

export default Popup;
