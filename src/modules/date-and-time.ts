import { ConfigType } from 'dayjs';
import dayjs from '../dayjs';
import { createModule } from '../utils/module';

const DEFAULT_WEEKEND_MASK = '0000011';
const WEEKEND_MASK_BY_NUMBER: Record<number, string> = {
  1: DEFAULT_WEEKEND_MASK,
  2: '1000001',
  3: '1100000',
  4: '0110000',
  5: '0011000',
  6: '0001100',
  7: '0000110',
  11: '0000001',
  12: '1000000',
  13: '0100000',
  14: '0010000',
  15: '0001000',
  16: '0000100',
  17: '0000010',
};

export default createModule(({ validateArrayMaxSize, coerceToNumber, coerceToStringWithValidation }, options) => {
  const validateWeekendMask = (weekend: unknown) => {
    const weekendMaskRegex = new RegExp('^[0|1]{7}$');

    if (typeof weekend !== 'string') {
      throw new Error('Weekend should be a string')
    }

    if (!weekendMaskRegex.test(weekend)) {
      throw new Error('Weekend string doesn\'t much patter');
    }

    if (!weekend.includes('0')) {
      throw new Error('At least one working day should exists');
    }
  };

  const generateHolidaysSet = (holidays: unknown[]) => {
    const holidaysSet = new Set();

    for (const holiday of holidays) {
      const holidayDate = dayjs(holiday as ConfigType);

      if (!holidayDate.isValid()) {
        throw new Error('Holiday date is not valid.');
      }

      holidaysSet.add(`${holidayDate.month()}/${holidayDate.date()}/${holidayDate.year()}`);
    }

    return holidaysSet;
  };

  const getWeekendMask = (weekend: unknown) => {
    if (!weekend) {
      return DEFAULT_WEEKEND_MASK;
    }

    if (typeof weekend === 'string') {
      return weekend;
    }

    if (typeof weekend !== 'number') {
      return weekend;
    }

    const mask = WEEKEND_MASK_BY_NUMBER[weekend];

    if (!mask) {
      throw new Error('Incorrect weekend');
    }

    return mask;
  };

  const WEEKNUM = (date: unknown, format?: unknown) => {
    return dayjs(date as ConfigType, coerceToStringWithValidation(format) || undefined).week();
  };

  const YEAR = (date: unknown, format?: unknown) => {
    return dayjs(date as ConfigType, coerceToStringWithValidation(format) || undefined).year();
  };

  const YEARFRAC = (firstDate: unknown, secondDate: unknown, basis: unknown = 0, format?: unknown) => {
    const coercedFormat = coerceToStringWithValidation(format) || undefined;
    const coercedBasis = coerceToNumber(basis);

    const firstDateObject = dayjs(firstDate as ConfigType, coercedFormat);
    const secondDateObject = dayjs(secondDate as ConfigType, coercedFormat);

    const firstDateDay = firstDateObject.date();
    const firstDateYear = firstDateObject.year();
    const firstDateMonth = firstDateObject.month();
    const secondDateDay = secondDateObject.date();
    const secondDateYear = secondDateObject.year();
    const secondDateMonth = secondDateObject.month();

    switch (coercedBasis) {
      case 0: {
        const convertedFirstDateDay = firstDateDay === 31 ? 30 : firstDateDay;
        const convertedSecondDateDay = secondDateDay === 31 ? 30 : secondDateDay;

        return (convertedSecondDateDay + secondDateMonth * 30 + secondDateYear * 360 - (convertedFirstDateDay + firstDateMonth * 30 + firstDateYear * 360)) / 360;
      }
      case 1: {
        return secondDateObject.diff(firstDateObject, 'days') / 360;
      }
      case 2: {
        return secondDateObject.diff(firstDateObject, 'days') / 365;
      }
      case 3: {
        return (secondDateDay + secondDateMonth * 30 + secondDateYear * 360 - (firstDateDay + firstDateMonth * 30 + firstDateYear * 360)) / 360;
      }
      default: {
        throw new Error('Incorrect basis provided.');
      }
    }
  };

  const NOW = (format?: unknown) => {
    return dayjs().format(coerceToStringWithValidation(format) || undefined);
  };

  const DATE = (year: unknown, month: unknown, day: unknown, format?: unknown) => {
    return dayjs({
      year: coerceToNumber(year),
      month: coerceToNumber(month) - 1,
      day: coerceToNumber(day),
    } as unknown as ConfigType).format(coerceToStringWithValidation(format) || undefined);
  };

  const DAY = (date: unknown, format?: unknown) => {
    return dayjs(date as ConfigType, coerceToStringWithValidation(format) || undefined).date();
  };

  const DAYS = (firstDate: unknown, secondDate: unknown, format?: unknown) => {
    const coercedFormat = coerceToStringWithValidation(format) || undefined;

    return dayjs(firstDate as ConfigType, coercedFormat).diff(dayjs(secondDate as ConfigType, coercedFormat), 'days');
  };

  const DATEVALUE = (date: unknown, format?: unknown) => {
    return dayjs(date as ConfigType).format(coerceToStringWithValidation(format) || undefined);
  };

  const ISOWEEKNUM = (date: unknown, format?: unknown) => {
    const dateObject = dayjs(date as ConfigType, coerceToStringWithValidation(format) || undefined).startOf('date');
    const yearStateDateObject = dayjs({ year: dateObject.year(), month: 0, day: 0 } as unknown as ConfigType);

    const isoDate = dateObject.add(dateObject.date() + 4 - (dateObject.day() || 7));

    return Math.ceil(((isoDate.diff(yearStateDateObject, 'milliseconds')) / 86400000 + 1) / 7);
  };

  const MONTH = (date: unknown, format?: unknown) => {
    return dayjs(date as ConfigType, coerceToStringWithValidation(format) || undefined).month() + 1;
  }

  const TODAY = (format?: unknown) => {
    const now = dayjs();

    return now
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .format(coerceToStringWithValidation(format) || undefined);
  };

  const EOMONTH = (startDate: unknown, months: number, format?: unknown) => {
    const coercedMonths = coerceToNumber(months);

    const flooredMonths = Math.floor(coercedMonths);

    const startDateObject = dayjs(startDate as ConfigType);

    if (!startDateObject.isValid()) {
      throw new Error('Invalid start date.');
    }

    return dayjs({
      year: startDateObject.year(),
      month: startDateObject.month() + flooredMonths + 1,
      day: 0,
    } as unknown as ConfigType)
      .add(-1, 'day')
      .format(coerceToStringWithValidation(format) || undefined);
  };

  const NETWORKDAYSINTL = (startDate: unknown, endDate: unknown, weekend?: unknown, holidays: unknown[] = []) => {
    const startDateObject = dayjs(startDate as ConfigType);
    const endDateObject = dayjs(endDate as ConfigType);
    const transformedHolidays = Array.isArray(holidays) ? holidays : [holidays];
    const weekendMask = getWeekendMask(weekend);

    validateArrayMaxSize(holidays);
    validateWeekendMask(weekendMask);

    if (!startDateObject.isValid()) {
      throw new Error('Start date is invalid');
    }

    if (!endDateObject.isValid()) {
      throw new Error('End date is invalid');
    }

    const holidaysSet = generateHolidaysSet(transformedHolidays);
    const typedWeekendMask = weekendMask as string;
    const days = endDateObject.diff(startDateObject, 'days') || 1;

    const daysModule = Math.abs(days);
    let iterationDate = dayjs(startDateObject);

    if (days > options.maxDaysForWorkdaysFunctions) {
      throw new Error(`Days between dates should be less than ${options.maxDaysForWorkdaysFunctions}`);
    }

    let total = days < 0 ? days - 1 : days + 1;

    for (let i = 0; i < daysModule; i++) {
      const iterationDay = iterationDate.date();
      const iterationMonth = iterationDate.month();
      const iterationYear = iterationDate.year();
      const iterationDayOfMonth = iterationDate.day();

      const weekendIndex = iterationDayOfMonth ? iterationDayOfMonth - 1 : 6;
      const isWorkingDay = !Number(typedWeekendMask[weekendIndex]);
      const isHoliday = holidaysSet.has(`${iterationMonth}/${iterationDay}/${iterationYear}`);

      if (!isWorkingDay || isHoliday) {
        total = days < 0 ? total + 1 : total - 1;
      }

      iterationDate = iterationDate.add(days < 0 ? -1 : 1, 'day');
    }

    return total;
  };

  const WORKDAYINTL = (startDate: unknown, days: unknown, weekend?: unknown, holidays: unknown[] = []) => {
    const startDateObject = dayjs(startDate as ConfigType);
    const coercedDays = coerceToNumber(days);
    const transformedHolidays = Array.isArray(holidays) ? holidays : [holidays];
    const weekendMask = getWeekendMask(weekend);

    if (coercedDays < 0) {
      throw new Error('Days should be more than 0');
    }

    if (coercedDays > options.maxDaysForWorkdaysFunctions) {
      throw new Error(`Days should be less than ${options.maxDaysForWorkdaysFunctions}`);
    }

    validateWeekendMask(weekendMask);
    validateArrayMaxSize(holidays);

    const holidaysSet = generateHolidaysSet(transformedHolidays);
    const typedWeekendMask = weekendMask as string;

    let workingDays = 0;
    let iterationDate = startDateObject;

    while (workingDays < coercedDays) {
      iterationDate = iterationDate.add(1, 'day');

      const iterationDay = iterationDate.date();
      const iterationMonth = iterationDate.month();
      const iterationYear = iterationDate.year();
      const iterationDayOfMonth = iterationDate.day();

      const weekendIndex = iterationDayOfMonth ? iterationDayOfMonth - 1 : 6;
      const isWorkingDay = !Number(typedWeekendMask[weekendIndex]);
      const isHoliday = holidaysSet.has(`${iterationMonth}/${iterationDay}/${iterationYear}`);

      if (isWorkingDay && !isHoliday) {
        workingDays++;
      }
    }

    return iterationDate.format();
  };

  const EDATE = (date: unknown, months: unknown, format?: unknown) => {
    return dayjs(date as ConfigType).add(coerceToNumber(months), 'months').format(coerceToStringWithValidation(format) || undefined);
  };

  const DAYS360 = (startDate: unknown, endDate: unknown, method?: unknown) => {
    const startDateObject = dayjs(startDate as ConfigType);
    const endDateObject = dayjs(endDate as ConfigType);

    const endMonth = endDateObject.month();
    const startMonth = startDateObject.month();

    if (method) {
      const endMonth = endDateObject.month();
      const startMonth = startDateObject.month();

      const startDay = startDateObject.date() === 31 ? 30 : startDateObject.date();
      const endDay = endDateObject.date() === 31 ? 30 : endDateObject.date()

      return 360 * (endDateObject.year() - startDateObject.year()) + 30 * (endMonth - startMonth) + (endDay - startDay);
    }

    const nextMonthStartDate = dayjs({ year: startDateObject.year(), month: startMonth + 1, day: 0 } as unknown as ConfigType)
      .add(-1, 'day');
    const nextMonthEndDate = dayjs({ year: endDateObject.year(), month: endMonth + 1, day: 0 } as unknown as ConfigType)
      .add(-1, 'day')

    const startDay = startDateObject.date() === nextMonthStartDate.date() ? 30 : startDateObject.date();

    if (endDateObject.date() === nextMonthEndDate.date()) {
      return startDay < 30
        ? 360 * (endDateObject.year() - startDateObject.year()) + 30 * (endMonth + 1 - startMonth) + (1 - startDay)
        : 360 * (endDateObject.year() - startDateObject.year()) + 30 * (endMonth - startMonth) + (30 - startDay);
    }

    return 360 * (endDateObject.year() - startDateObject.year()) + 30 * (endMonth - startMonth) + (endDateObject.date() - startDay);
  };

  return {
    WEEKNUM,
    YEAR,
    YEARFRAC,
    NOW,
    DATE,
    DAY,
    DAYS,
    DATEVALUE,
    ISOWEEKNUM,
    MONTH,
    TODAY,
    EOMONTH,
    NETWORKDAYSINTL,
    WORKDAYINTL,
    EDATE,
    DAYS360,
  };
}, {
  maxDaysForWorkdaysFunctions: 3653,
});
