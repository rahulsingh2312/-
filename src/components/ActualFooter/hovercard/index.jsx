import React from 'react';
import CardContent from './CardContent';
import CardHeader from './CardHeader';
function Card() {
  return (
    <article className="flex absolute bottom-full mb-2 flex-col rounded-none max-w-[476px]">
      <div className="flex flex-col w-full rounded-[57px] shadow-[10px_34px_69px_rgba(0,0,0,0.97)]">
        <div className="flex flex-col w-full rounded-[56px] bg-gradient-to-b from-[#000354cc] to-[#2a355ccc] border-[1.5px] border-[#DBB9FF] backdrop-blur-sm">
          <div className="flex flex-col justify-center p-7 w-full rounded-[56px] transition-transform duration-300 hover:scale-105">
            <CardHeader />
            <CardContent />
          </div>
        </div>
      </div>
    </article>
  );
}

export default Card;