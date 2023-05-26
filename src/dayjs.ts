import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import objectSupport from 'dayjs/plugin/objectSupport';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(isLeapYear);
dayjs.extend(weekOfYear);
dayjs.extend(objectSupport);
dayjs.extend(isoWeeksInYear);
dayjs.extend(customParseFormat);

export default dayjs;
