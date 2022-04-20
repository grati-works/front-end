import React, { useState } from 'react';
import Calendar from 'react-calendar';

export function CalendarComponent({ onChange, value }) {
  return (
    <div>
      <Calendar onChange={onChange} value={value} calendarType="US" minDate={new Date()} activeStartDate={value} />
    </div>
  );
}