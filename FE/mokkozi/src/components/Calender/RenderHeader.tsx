import React from 'react';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';

function RenderHeader(currentMonth: any) {
  return (
    <>
      <div className="header row">
        <div className="col col-start">
          <span className="text">
            <span className="text month">{format(currentMonth, 'M')}월</span>
          </span>
          {format(currentMonth, 'yyyy')}
        </div>
        <div className="col col-end">
          <Icon icon="bi:arrow-left-circle-fill" />
          <Icon icon="bi:arrow-right-circle-fill" />
        </div>
      </div>
    </>
  );
}
