import React, { useEffect, useState } from 'react';

import '../styles/calendar.css';

import { Icon } from '@iconify/react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameMonth,
  parse,
  addDays,
} from 'date-fns';
// 헤더 렌더
function RenderHeader(
  { currentMonth }: any,
  { preMonth }: any,
  { nextMonth }: any,
) {
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
          <Icon icon="bi:arrow-left-circle-fill" onClick={preMonth} />
          <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
        </div>
      </div>
    </>
  );
}
// 요일 렌더
function RenderDays() {
  const days = [];
  const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>,
    );
  }
  return <div className="days row">{days}</div>;
}
// 각 일 렌더
function RenderCells(currentMonth: any, selectedDate: any, onDateClick: any) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? 'disabled'
              : isSameDay(day, selectedDate)
              ? 'seleted'
              : format(currentMonth, 'M') !== format(day, 'M')
              ? 'not-valid'
              : 'valid'
          }`}
          key={day.toString()}
          onClick={() => onDateClick.parse(cloneDay)}
        >
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : ''
            }
          >
            {formattedDate}
          </span>
        </div>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day.toString()}>
        {days}
      </div>,
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
}
// 달력 렌더
function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const preMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day: any) => {
    setSelectedDate(day);
  };

  return (
    <div className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        preMonth={preMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </div>
  );
}

export default Calendar;
