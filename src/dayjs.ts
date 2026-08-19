import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import objectSupport from 'dayjs/plugin/objectSupport';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(isLeapYear);
dayjs.extend(weekOfYear);
dayjs.extend(objectSupport);
dayjs.extend(isoWeeksInYear);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;
