import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import objectSupport from 'dayjs/plugin/objectSupport';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';

dayjs.extend(isLeapYear);
dayjs.extend(weekOfYear);
dayjs.extend(objectSupport);
dayjs.extend(isoWeeksInYear);

export default dayjs;
