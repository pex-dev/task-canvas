import React from 'react';

import { CalendarMonth as MuiCalendarMonth } from '@mui/icons-material';

export type CalendarMonthProps = React.ComponentProps<typeof MuiCalendarMonth>;

const CalendarMonth: React.FC<CalendarMonthProps> = (props) => {
  return <MuiCalendarMonth {...props} />;
};

export default CalendarMonth;
