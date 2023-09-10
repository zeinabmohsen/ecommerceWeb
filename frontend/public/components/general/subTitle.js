import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubTitle = ({ mainTitle, title, btntitle }) => {
  return (
    <div className='my-4'>
      <div className=" main d-flex align-items-center gap-1">
        <img src="../rectangle.svg" alt="" />
        <div className="mainTitle">{mainTitle}</div>
      </div>
      <div className="d-flex justify-content-between pt-4">
        <div className="title">{title}</div>
        {btntitle ? (
          <div className="shoppingbtn">{btntitle}</div>
        ) : null}
      </div>
    </div>
  );
};

export default SubTitle;

