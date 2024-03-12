import DateAndTimeModule from './date-and-time';
import dayjs from '../dayjs';

const {
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
  DATEDIF,
} = DateAndTimeModule();

describe('Date And Time Module', () => {
  const fakeNow = new Date('2023-01-10');

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(fakeNow);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('WEEKNUM function', () => {
    test('should return the week number of a valid date', () => {
      const date = '2024-04-12';

      const weekNumber = WEEKNUM(date);

      expect(weekNumber).toBe(15);
    });

    test('should return the week number of a valid date with custom format', () => {
      const date = '12.04.2024';
      const format = 'DD.MM.YYYY';

      const weekNumber = WEEKNUM(date, format);

      expect(weekNumber).toBe(15);
    });

    test('should return NaN for an invalid date', () => {
      const date = 'invalid-date';

      const weekNumber = WEEKNUM(date);

      expect(weekNumber).toBeNaN();
    });

    test('should return NaN for an invalid date with custom format', () => {
      const date = '12.03.2024';
      const format = 'YYYY-MM-DD';

      const weekNumber = WEEKNUM(date, format);

      expect(weekNumber).toBeNaN();
    });

    test('should return current week number when date is not provided(undefined)', () => {
      const weekNumber = WEEKNUM(undefined);

      expect(weekNumber).toBe(dayjs().week());
    });

    test('should return NaN when date is not provided with custom format', () => {
      const format = 'DD.MM.YYYY';

      const weekNumber = WEEKNUM(undefined, format);

      expect(weekNumber).toBeNaN();
    });

    test('should return NaN when date is null', () => {
      const weekNumber = WEEKNUM(null);

      expect(weekNumber).toBeNaN();
    });
  });

  describe('YEAR function', () => {
    test('should return the year of a valid date', () => {
      const date = '2024-03-12';

      const year = YEAR(date);

      expect(year).toBe(2024);
    });

    test('should return the year of a valid date with custom format', () => {
      const date = '12.03.2024';
      const format = 'DD.MM.YYYY';

      const year = YEAR(date, format);

      expect(year).toBe(2024);
    });

    test('should return NaN for an invalid date', () => {
      const date = 'invalid-date';

      const year = YEAR(date);

      expect(year).toBeNaN();
    });

    test('should return NaN for an invalid date with custom format', () => {
      const date = '12.03.2024';
      const format = 'YYYY-MM-DD';

      const year = YEAR(date, format);

      expect(year).toBeNaN();
    });

    test('should return current year when date is not provided', () => {
      const year = YEAR(undefined);

      expect(year).toBe(dayjs().year());
    });

    test('should return NaN when date is not provided with custom format', () => {
      const format = 'DD.MM.YYYY';

      const year = YEAR(undefined, format);

      expect(year).toBeNaN();
    });

    test('should return NaN when date is null', () => {
      const year = YEAR(null);

      expect(year).toBeNaN();
    });
  });

  describe('YEARFRAC function', () => {
    test('should return the correct year fraction with basis 0', () => {
      const firstDate = '2024-01-01';
      const secondDate = '2024-07-01';
      const basis = 0;

      const yearFrac = YEARFRAC(firstDate, secondDate, basis);

      expect(yearFrac).toBeCloseTo(0.5); // 50% of the year between January 1st and July 1st
    });

    test('should return the correct year fraction with basis 1', () => {
      const firstDate = '2024-01-01';
      const secondDate = '2024-07-01';
      const basis = 1;

      const yearFrac = YEARFRAC(firstDate, secondDate, basis);

      expect(yearFrac).toBeCloseTo(0.505); // 50% of the year between January 1st and July 1st
    });

    test('should return the correct year fraction with basis 2', () => {
      const firstDate = '2024-01-01';
      const secondDate = '2024-07-01';
      const basis = 2;

      const yearFrac = YEARFRAC(firstDate, secondDate, basis);

      expect(yearFrac).toBeCloseTo(0.5); // 50% of the year between January 1st and July 1st
    });

    test('should return the correct year fraction with basis 3', () => {
      const firstDate = '2024-01-01';
      const secondDate = '2024-07-01';
      const basis = 3;

      const yearFrac = YEARFRAC(firstDate, secondDate, basis);

      expect(yearFrac).toBeCloseTo(0.5); // 50% of the year between January 1st and July 1st
    });

    test('should throw an error for incorrect basis', () => {
      const firstDate = '2024-01-01';
      const secondDate = '2024-07-01';
      const basis = 4; // Incorrect basis

      expect(() => YEARFRAC(firstDate, secondDate, basis)).toThrowError('Incorrect basis provided.');
    });
  });

  describe('NOW function', () => {
    test('should return the current date and time in default format', () => {
      const currentDate = dayjs();
      const formattedCurrentDate = currentDate.format();

      const now = NOW();

      expect(now).toBe(formattedCurrentDate);
    });

    test('should return the current date and time in custom format', () => {
      const format = 'YYYY-MM-DD HH:mm:ss';
      const now = NOW(format);

      const formattedCurrentDate = dayjs().format(format);

      expect(now).toEqual(formattedCurrentDate);
    });

    test('should return the current date and time with a format containing special characters', () => {
      const format = 'YYYY/MM/DD HH:mm:ss.SSS';
      const now = NOW(format);

      const formattedCurrentDate = dayjs().format(format);

      expect(now).toEqual(formattedCurrentDate);
    });
  });

  describe('DATE function', () => {
    test('should return the formatted date for valid input', () => {
      const year = 2024;
      const month = 3; // March
      const day = 12;
      const format = 'YYYY-MM-DD';

      const dateResult = DATE(year, month, day, format);

      expect(dateResult).toEqual('2024-03-12');
    });

    test('should return the formatted date with a custom format containing special characters', () => {
      const year = 2024;
      const month = 3; // March
      const day = 12;
      const format = 'YYYY/MM/DD';

      const dateResult = DATE(year, month, day, format);

      expect(dateResult).toEqual('2024/03/12');
    });

    test('should return the formatted date with default format if not provided', () => {
      const year = 2024;
      const month = 3; // March
      const day = 12;
      const dateResult = DATE(year, month, day);

      const expectedDateResult = dayjs({ year, month: month - 1, day }).format();

      expect(dateResult).toEqual(expectedDateResult);
    });
  });

  describe('DAY function', () => {
    test('should return the day of the month for a valid date', () => {
      const date = '2024-03-12'; // March 12, 2024

      const day = DAY(date);

      expect(day).toBe(12);
    });

    test('should return the day of the month for a valid date with custom format', () => {
      const date = '12.03.2024'; // March 12, 2024 in a custom format
      const format = 'DD.MM.YYYY'; // Custom format

      const day = DAY(date, format);

      expect(day).toBe(12);
    });

    test('should return NaN for an invalid date', () => {
      const date = 'invalid-date'; // An invalid date

      const day = DAY(date);

      expect(day).toBeNaN();
    });

    test('should return NaN for an invalid date with custom format', () => {
      const date = '12.03.2024'; // A valid date in a custom format
      const format = 'YYYY-MM-DD'; // Incorrect format

      const day = DAY(date, format);

      expect(day).toBeNaN();
    });

    test('should return the current day of the month if no date is provided', () => {
      const day = DAY(undefined);

      expect(day).toBe(dayjs().date());
    });

    test('should return NaN if no date is provided with custom format', () => {
      const format = 'DD.MM.YYYY'; // Custom format

      const day = DAY(undefined, format);

      expect(day).toBeNaN();
    });
  });

  describe('DAYS function', () => {
    test('should return the difference in days between two valid dates', () => {
      const firstDate = '2024-03-12'; // March 12, 2024
      const secondDate = '2024-03-22'; // March 22, 2024
      const daysDifference = DAYS(firstDate, secondDate);
      expect(daysDifference).toBe(-10); // Difference between March 12 and March 22 is 10 days
    });

    test('should return the difference in days between two valid dates with custom format', () => {
      const firstDate = '22.03.2024'; // March 12, 2024 in a custom format
      const secondDate = '12.03.2024'; // March 22, 2024 in a custom format
      const format = 'DD.MM.YYYY'; // Custom format
      const daysDifference = DAYS(firstDate, secondDate, format);
      expect(daysDifference).toBe(10); // Difference between March 12 and March 22 is 10 days
    });

    test('should return NaN for invalid dates', () => {
      const firstDate = 'invalid-date'; // An invalid date
      const secondDate = '2024-03-22'; // A valid date
      const daysDifference = DAYS(firstDate, secondDate);
      expect(daysDifference).toBeNaN();
    });

    test('should return NaN for invalid dates with custom format', () => {
      const firstDate = '12.03.2024'; // A valid date in a custom format
      const secondDate = '22.03.2024'; // A valid date in a custom format
      const format = 'YYYY-MM-DD'; // Incorrect format
      const daysDifference = DAYS(firstDate, secondDate, format);
      expect(daysDifference).toBeNaN();
    });
  });

  describe('DATEVALUE function', () => {
    test('should return the formatted date for a valid date', () => {
      const date = '2024-03-12'; // March 12, 2024
      const format = 'DD/MM/YYYY'; // Custom format

      const formattedDate = DATEVALUE(date);
      const expectedDate = dayjs(date).format(format);

      expect(dayjs(formattedDate).format(format)).toBe(expectedDate);
    });

    test('should return the formatted date with a custom format', () => {
      const date = '2024-03-12'; // March 12, 2024
      const format = 'DD/MM/YYYY'; // Custom format
      const formattedDate = DATEVALUE(date, format);
      const expectedFormattedDate = '12/03/2024'; // Expected formatted date with custom format
      expect(formattedDate).toEqual(expectedFormattedDate);
    });

    test('should return "Invalid Date" for an invalid date', () => {
      const date = 'invalid-date'; // An invalid date
      const formattedDate = DATEVALUE(date);
      expect(formattedDate).toBe('Invalid Date');
    });

    test('should return the current date if no date is provided', () => {
      const formattedDate = DATEVALUE(undefined);
      const currentDate = dayjs().format(); // Current date in default format
      expect(formattedDate).toEqual(currentDate);
    });

    test('should return the current date with custom format if no date is provided', () => {
      const format = 'DD/MM/YYYY'; // Custom format
      const formattedDate = DATEVALUE(undefined, format);
      const currentDate = dayjs().format(format); // Current date in custom format
      expect(formattedDate).toEqual(currentDate);
    });
  });

  describe('ISOWEEKNUM function', () => {
    test('should return the correct ISO week number for a valid date', () => {
      const date = '2024-03-12'; // March 12, 2024

      const isoWeekNumber = ISOWEEKNUM(date);

      expect(isoWeekNumber).toBe(11); // ISO week number for March 12, 2024 is 11
    });

    test('should return the correct ISO week number for a valid date with custom format', () => {
      const date = '12.03.2024'; // March 12, 2024 in a custom format
      const format = 'DD.MM.YYYY'; // Custom format

      const isoWeekNumber = ISOWEEKNUM(date, format);

      expect(isoWeekNumber).toBe(11); // ISO week number for March 12, 2024 is 11
    });

    test('should return NaN for an invalid date', () => {
      const date = 'invalid-date'; // An invalid date

      const isoWeekNumber = ISOWEEKNUM(date);

      expect(isoWeekNumber).toBeNaN();
    });
  });

  describe('MONTH function', () => {
    test('should return the month correctly for a valid date', () => {
      const result = MONTH('2024-03-12'); // March 12, 2024

      expect(result).toEqual(3); // March is the third month
    });

    test('should return the month correctly for a valid date with custom format', () => {
      const result = MONTH('12.03.2024', 'DD.MM.YYYY'); // March 12, 2024

      expect(result).toEqual(3); // March is the third month
    });
  });

  describe('TODAY function', () => {
    test('should return the current date at midnight by default', () => {
      const currentDateAtMidnight = dayjs().startOf('day').format();

      const result = TODAY();

      expect(result).toEqual(currentDateAtMidnight);
    });

    test('should return the current date at midnight with custom format', () => {
      const format = 'YYYY-MM-DD'; // Custom format
      const currentDateAtMidnightFormatted = dayjs().startOf('day').format(format);

      const result = TODAY(format);

      expect(result).toEqual(currentDateAtMidnightFormatted);
    });
  });

  describe('EOMONTH function', () => {
    test('should return the end of the month correctly for a valid start date', () => {
      const startDate = '2024-03-12';
      const months = 2;

      const result = EOMONTH(startDate, months);

      expect(result).toEqual('2024-05-31T00:00:00+03:00');
    });

    test('should return the end of the month correctly for a valid start date with custom format', () => {
      const startDate = '12.03.2024';
      const months = 2;
      const format = 'DD.MM.YYYY';

      const result = EOMONTH(startDate, months, format);

      expect(result).toEqual('28.02.2025');
    });

    test('should throw an error for an invalid start date', () => {
      const invalidStartDate = 'invalid-date';

      expect(() => EOMONTH(invalidStartDate, 1)).toThrowError('Invalid start date.');
    });
  });

  describe('NETWORKDAYSINTL function', () => {
    test('should return the correct number of working days between two valid dates without holidays and weekend specified', () => {
      const startDate = '2024-03-01'; // March 1, 2024 (Friday)
      const endDate = '2024-03-10'; // March 11, 2024 (Monday)

      const result = NETWORKDAYSINTL(startDate, endDate);

      expect(result).toEqual(7);
    });

    test('should return the correct number of working days considering weekends', () => {
      const startDate = '2024-03-01'; // March 1, 2024 (Friday)
      const endDate = '2024-03-10'; // March 10, 2024 (Sunday)
      const weekend = '0000011'; // Saturday and Sunday are non-working days

      const result = NETWORKDAYSINTL(startDate, endDate, weekend);

      expect(result).toEqual(7);
    });

    test('should return the correct number of working days considering holidays', () => {
      const startDate = '2024-12-24'; // December 24, 2024 (Tuesday)
      const endDate = '2025-01-02'; // January 2, 2025 (Thursday)
      const holidays = ['2024-12-25', '2024-12-26', '2025-01-01']; // Christmas and New Year holidays

      const result = NETWORKDAYSINTL(startDate, endDate, undefined, holidays);

      expect(result).toEqual(5);
    });
  });

  describe('WORKDAYINTL function', () => {
    test('should return the correct end date after a specified number of working days without weekends and holidays', () => {
      const startDate = '2024-03-01'; // March 1, 2024 (Thursday)
      const days = 5; // Five working days

      const result = WORKDAYINTL(dayjs(startDate), days);

      // Expected result: March 8, 2024 (Friday)
      expect(dayjs(result).format('YYYY-MM-DD')).toEqual('2024-03-08');
    });

    test('should return the correct end date after a specified number of working days considering weekends', () => {
      const startDate = '2024-03-01'; // March 1, 2024 (Thursday)
      const days = 5; // Five working days
      const weekend = '0000011'; // Saturday and Sunday are non-working days

      const result = WORKDAYINTL(startDate, days, weekend);

      expect(dayjs(result).format('YYYY-MM-DD')).toEqual('2024-03-08');
    });

    test('should return the correct end date after a specified number of working days considering holidays', () => {
      const startDate = '2024-12-24'; // December 24, 2024 (Tuesday)
      const days = 3; // Three working days
      const holidays = ['2024-12-25', '2024-12-26']; // Christmas holidays

      const result = WORKDAYINTL(startDate, days, undefined, holidays);

      // Expected result: December 27, 2024 (Friday) since Christmas holidays will be skipped
      expect(dayjs(result).format('YYYY-MM-DD')).toEqual('2024-12-31');
    });
  });

  describe('EDATE function', () => {
    test('should return the correct end date after adding the specified number of months without a custom format', () => {
      const startDate = '2024-03-12';
      const monthsToAdd = 3;

      const result = EDATE(startDate, monthsToAdd);

      expect(result).toEqual(dayjs('2024-06-12').format());
    });

    test('should return the correct end date after adding the specified number of months with a custom format', () => {
      const startDate = '12.03.2024';
      const monthsToAdd = 5;
      const format = 'DD.MM.YYYY';

      const result = EDATE(startDate, monthsToAdd, format);

      expect(result).toEqual('03.05.2025');
    });
  });

  describe('DAYS360 function', () => {
    test('should return the correct number of days', () => {
      const startDate = '2024-01-30';
      const endDate = '2024-03-31';

      const result = DAYS360(startDate, endDate);

      expect(result).toEqual(60);
    });

    test('should return the correct number of days using the method', () => {
      const startDate = '2024-01-30';
      const endDate = '2024-03-31';

      const result = DAYS360(startDate, endDate, true);

      expect(result).toEqual(60);
    });
  });

  describe('DATEDIF function', () => {
    test('should return the correct difference in years', () => {
      const startDate = '2000-01-01';
      const endDate = '2024-01-01';

      const result = DATEDIF(startDate, endDate, 'Y');

      expect(result).toEqual(24);
    });

    test('should return the correct difference in months', () => {
      const startDate = '2023-06-01';
      const endDate = '2024-03-01';

      const result = DATEDIF(startDate, endDate, 'M');

      expect(result).toEqual(9);
    });

    test('should return the correct difference in days', () => {
      const startDate = '2024-01-01';
      const endDate = '2024-01-15';

      const result = DATEDIF(startDate, endDate, 'D');

      expect(result).toEqual(14);
    });
  });
});

