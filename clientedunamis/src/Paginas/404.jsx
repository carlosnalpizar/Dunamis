import React from 'react';
import '../Css/404.styles.css';


const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notFound__content">
        <img src="../../404.jpg" alt="404 Not Found" className="notFound__image" />
        <h2 className="notFound__text">Lo sentimos, página no encontrada</h2>
        <button className="notFound__button" onClick={() => window.history.back()}>
                    Volver
        </button>
      </div>
    </div>
  );
};

export default NotFound;