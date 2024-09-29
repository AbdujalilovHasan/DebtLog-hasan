
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = ({ heightStyle, classStyle }) => {
   return (
      <div
         className={`loading-page ${classStyle}`}
         style={{ height: heightStyle }}
      >
         <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
         </Spinner>
      </div>
   );
};

export default Loading;
