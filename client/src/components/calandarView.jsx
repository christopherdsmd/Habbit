import React from 'react';
import './calandarView.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import HeatMap from '@uiw/react-heat-map';

const generateDateValues = (habitDates, startDate, endDate) => {
  const dateValues = [];

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    const count = habitDates?.find((habitDate) => habitDate.date === dateString)?.count || 0;
    dateValues.push({ date: dateString, count });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateValues;
};

const CalendarView = ({ habits }) => {
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');

  return (
    <div>
      {habits.map((habit) => (
        <div key={habit._id} className="habit-calendar">
          <h2>
            {habit.habit_name}
            {habit.emoji}
          </h2>
          <CalendarHeatmap
            key={habit._id}
            startDate={startDate}
            endDate={endDate}
            values={generateDateValues(habit.daily_check, startDate, endDate)}
            classForValue={value => {
              if (!value || value === 0) {
                return 'color-empty';
              }
              return `color-github-${value.count}`;
            }}
            showWeekdayLabels={true}
            showOutOfRangeDays={true}
            tooltipDataAttrs={(value) => {
              return {
                'data-tip': `Date: ${value.date}, Count: ${value.count}`,
              };
            }}
          />
          <Tooltip id="myTooltip" />
        </div>
      ))}
    </div>
  );
};

export default CalendarView;
