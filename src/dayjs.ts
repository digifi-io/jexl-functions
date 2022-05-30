import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import objectSupport from 'dayjs/plugin/objectSupport';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';

dayjs.extend(weekOfYear);
dayjs.extend(objectSupport);
dayjs.extend(isoWeeksInYear);

export default dayjs;
