import React from 'react';
import { Html } from '@react-three/drei';

const Loading = () => {
  return (
   <Html>
    <div className="wrapper absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
         <div className="kinetic"></div>
         <div className="wording">
           <div className="letter">L</div>
         <div className="letter">o</div>
           <div className="letter">a</div>
           <div className="letter">d</div>
           <div className="letter">i</div>
           <div className="letter">n</div>
           <div className="letter">g</div>
           <div className="letter circle"></div>
           <div className="letter circle"></div>
           <div className="letter circle"></div>
       </div>
    </div>
   </Html>
  );
};

export default Loading;