import FinancialModule from './financial';
import { JexlFunctionExecutionError } from '../errors';

const {
  FV,
  EFFECT,
  PMT,
  IPMT,
  RATE,
  ISPMT,
  NOMINAL,
  NPER,
  NPV,
  PDURATION,
  PPMT,
  PV,
  DELTA,
  ACCRINT,
  CUMPRINC,
  CUMIPMT,
} = FinancialModule();

describe('Financial Module', () => {
  describe('FV function', () => {
    test('should calculate future value correctly for ordinary annuity (type = 0)', () => {
      const rate = 0.05;
      const periods = 10;
      const payment = 100;
      const presentValue = 0;
      const type = 0;

      const futureValue = FV(rate, periods, payment, presentValue, type);

      expect(futureValue).toBe(-1257.7892535548842);
    });

    test('should calculate future value correctly for annuity due (type = 1)', () => {
      const rate = 0.05;
      const periods = 10;
      const payment = 100;
      const presentValue = 0;
      const type = 1;

      const futureValue = FV(rate, periods, payment, presentValue, type);

      expect(futureValue).toBe(-1320.6787162326286);
    });

    test('should handle zero rate correctly', () => {
      const rate = 0;
      const periods = 10;
      const payment = 100;
      const presentValue = 1000;
      const type = 0;

      const futureValue = FV(rate, periods, payment, presentValue, type);

      const expectedFutureValue = -(presentValue + payment * periods);

      expect(futureValue).toBe(expectedFutureValue);
    });
  });

  describe('EFFECT function', () => {
    test('should calculate effective annual interest rate correctly', () => {
      const nominalRate = 0.12;
      const periods = 4;

      const effectiveRate = EFFECT(nominalRate, periods);

      const expectedEffectiveRate = Math.pow(1 + nominalRate / periods, periods) - 1;

      expect(effectiveRate).toBeCloseTo(expectedEffectiveRate);
    });

    test('should throw error for zero rate', () => {
      const nominalRate = 0;
      const periods = 12;

      expect(() => EFFECT(nominalRate, periods))
        .toThrow(new JexlFunctionExecutionError('Incorrect incoming arguments.'));
    });

    test('should throw error for invalid arguments', () => {
      const nominalRate = -0.1;
      const periods = 6;

      expect(() => EFFECT(nominalRate, periods))
        .toThrow(new JexlFunctionExecutionError('Incorrect incoming arguments.'));
    });
  });

  describe('PMT function', () => {
    test('should calculate periodic payment amount correctly for ordinary annuity', () => {
      const rate = 0.08;
      const periods = 5;
      const presentValue = 10000;
      const futureValue = 0;
      const type = 0;

      const payment = PMT(rate, periods, presentValue, futureValue, type);

      expect(payment).toBe(-2504.564545668364);
    });

    test('should calculate periodic payment amount correctly for annuity due', () => {
      const rate = 0.1;
      const periods = 3;
      const presentValue = 5000;
      const futureValue = 0;
      const type = 1;

      const payment = PMT(rate, periods, presentValue, futureValue, type);

      expect(payment).toBe(-1827.7945619335328);
    });

    test('should handle zero rate correctly', () => {
      const rate = 0;
      const periods = 10;
      const presentValue = 2000;
      const futureValue = 0;
      const type = 0;

      const payment = PMT(rate, periods, presentValue, futureValue, type);

      const expectedPayment = -(presentValue / periods);

      expect(payment).toBe(expectedPayment);
    });

    test('should handle future value correctly', () => {
      const rate = 0.05;
      const periods = 8;
      const presentValue = 30000;
      const futureValue = 10000;
      const type = 0;

      const payment = PMT(rate, periods, presentValue, futureValue, type);

      expect(payment).toBe(-5688.872545107242);
    });
  });

  describe('IPMT function', () => {
    test('should calculate interest payment for the first period of an ordinary annuity correctly', () => {
      const rate = 0.1;
      const period = 1;
      const periods = 5;
      const presentValue = 10000;
      const futureValue = 0;
      const type = 0;

      const payment = IPMT(rate, period, periods, presentValue, futureValue, type);

      expect(payment).toBe(-1000);
    });

    test('should calculate interest payment for the last period of an ordinary annuity correctly', () => {
      const rate = 0.08;
      const period = 5;
      const periods = 5;
      const presentValue = 10000;
      const futureValue = 0;
      const type = 0;

      const payment = IPMT(rate, period, periods, presentValue, futureValue, type);

      expect(payment).toBe(-185.52329967913843);
    });

    test('should calculate interest payment for the first period of an annuity due correctly', () => {
      const rate = 0.1;
      const period = 1;
      const periods = 3;
      const presentValue = 5000;
      const futureValue = 0;
      const type = 1;

      const payment = IPMT(rate, period, periods, presentValue, futureValue, type);

      expect(payment).toBe(0);
    });

    test('should handle zero rate correctly', () => {
      const rate = 0;
      const period = 5;
      const periods = 10;
      const presentValue = 2000;
      const futureValue = 0;
      const type = 0;

      const payment = IPMT(rate, period, periods, presentValue, futureValue, type);

      expect(payment).toBe(-0);
    });
  });

  describe('RATE function', () => {
    test('should calculate rate correctly', () => {
      const periods = 100;
      const payment = 1;
      const present = 1;
      const future = 0;
      const type = 0;
      const guess = 0.8;

      const calculatedRate = RATE(periods, payment, present, future, type, guess);

      expect(calculatedRate).toBeCloseTo(0.4673775966101782);
    });

    test('should handle zero periods correctly', () => {
      const periods = 0;
      const payment = 100;
      const present = 1000;
      const future = 0;
      const type = 0;
      const guess = 0.05;

      expect(() => RATE(periods, payment, present, future, type, guess)).toThrow('Incorrect rate.');
    });
  });

  describe('ISPMT function', () => {
    test('should calculate interest correctly', () => {
      const rate = 0.05;
      const period = 3;
      const periods = 12;
      const value = 10000;

      const calculatedInterest = ISPMT(rate, period, periods, value);

      expect(calculatedInterest).toBeCloseTo(-375);
    });

    test('should handle zero value correctly', () => {
      const rate = 0.05;
      const period = 3;
      const periods = 12;
      const value = 0;

      const calculatedInterest = ISPMT(rate, period, periods, value);

      expect(calculatedInterest).toBe(-0);
    });
  });

  describe('NOMINAL function', () => {
    test('should calculate nominal interest rate correctly', () => {
      const rate = 0.06;
      const periods = 12;

      const nominalRate = NOMINAL(rate, periods);

      const expectedNominalRate = 0.0583;

      expect(nominalRate).toBeCloseTo(expectedNominalRate, 3);
    });

    test('should handle zero rate correctly', () => {
      const rate = 0;
      const periods = 12;

      expect(() => NOMINAL(rate, periods)).toThrow('Incorrect arguments.');
    });

    test('should handle negative periods correctly', () => {
      const rate = 0.06;
      const periods = -12;

      expect(() => {
        NOMINAL(rate, periods);
      }).toThrow('Incorrect arguments.');
    });
  });

  describe('NPER function', () => {
    test('should calculate number of periods correctly', () => {
      const rate = 0.05;
      const payment = -2000;
      const present = 10000;
      const future = 0;
      const type = 0;

      const numPeriods = NPER(rate, payment, present, future, type);

      const expectedNumPeriods = 5.896;

      expect(numPeriods).toBeCloseTo(expectedNumPeriods, 3);
    });

    test('should handle zero rate correctly', () => {
      const rate = 0;
      const payment = -2000;
      const present = 10000;
      const future = 0;
      const type = 0;

      const numPeriods = NPER(rate, payment, present, future, type);

      expect(numPeriods).toBe(5);
    });

    test('should handle zero payment correctly', () => {
      const rate = 0.05;
      const payment = 0;
      const present = 10000;
      const future = 0;
      const type = 0;

      const numPeriods = NPER(rate, payment, present, future, type);

      expect(numPeriods).toBe(-Infinity);
    });
  });

  describe('NPV function', () => {
    test('should calculate net present value correctly', () => {
      const rate = 0.05;
      const cashFlows = [-1000, 200, 300, 400, 500];

      const npv = NPV(rate, ...cashFlows);

      const expectedNPV = 209.02;

      expect(npv).toBeCloseTo(expectedNPV, 2);
    });

    test('should handle zero rate correctly', () => {
      const rate = 0;
      const cashFlows = [-1000, 200, 300, 400, 500];

      const npv = NPV(rate, ...cashFlows);

      expect(npv).toBe(400);
    });

    test('should handle empty cash flows correctly', () => {
      const rate = 0.05;

      const npv = NPV(rate, ...[]);

      expect(npv).toBe(0);
    });
  });

  describe('PDURATION function', () => {
    test('should calculate duration correctly', () => {
      const rate = 0.1;
      const presentValue = 1000;
      const futureValue = 2000;

      const duration = PDURATION(rate, presentValue, futureValue);

      const expectedDuration = 7.2725;

      expect(duration).toBeCloseTo(expectedDuration, 4);
    });

    test('should handle zero rate correctly', () => {
      const rate = 0;
      const presentValue = 1000;
      const futureValue = 2000;

      expect(() => PDURATION(rate, presentValue, futureValue)).toThrow('Invalid arguments.');
    });

    test('should handle negative rate correctly', () => {
      const rate = -0.05;
      const presentValue = 1000;
      const futureValue = 2000;

      expect(() => PDURATION(rate, presentValue, futureValue)).toThrow('Invalid arguments.');
    });
  });

  describe('PPMT function', () => {
    test('should calculate principal payment correctly', () => {
      const rate = 0.1;
      const periods = 5;
      const presentValue = 1000;
      const futureValue = 0;
      const type = 0;
      const period = 3;

      const principalPayment = PPMT(rate, period, periods, presentValue, futureValue, type);

      expect(principalPayment).toBeCloseTo(-198.19495176164168, 4);
    });

    test('should handle zero rate correctly', () => {
      const rate = 0;
      const periods = 5;
      const presentValue = 1000;
      const futureValue = 0;
      const type = 0;
      const period = 3;

      const principalPayment = PPMT(rate, period, periods, presentValue, futureValue, type);

      expect(principalPayment).toBe(-200);
    });
  });

  describe('PV function', () => {
    test('should calculate present value correctly', () => {
      const rate = 0.1;
      const periods = 5;
      const payment = 100;
      const futureValue = 0;
      const type = 0;

      const presentValue = PV(rate, periods, payment, futureValue, type);

      const expectedPresentValue = -379.07867694084507;

      expect(presentValue).toBeCloseTo(expectedPresentValue, 4);
    });

    test('should handle zero rate correctly', () => {
      const rate = 0;
      const periods = 5;
      const payment = 100;
      const futureValue = 0;
      const type = 0;

      const presentValue = PV(rate, periods, payment, futureValue, type);

      expect(presentValue).toBe(-500);
    });
  });

  describe('DELTA function', () => {
    test('should return 1 when values are equal', () => {
      const firstValue = 10;
      const secondValue = 10;

      const result = DELTA(firstValue, secondValue);

      expect(result).toBe(1);
    });

    test('should return 0 when values are not equal', () => {
      const firstValue = 10;
      const secondValue = 20;

      const result = DELTA(firstValue, secondValue);

      expect(result).toBe(0);
    });
  });

  describe('ACCRINT function', () => {
    test('should throw an error if issue date is invalid', () => {
      const issue = 'invalid-date';
      const first = '2024-01-01';
      const settlement = '2024-02-01';
      const rate = 0.05;
      const par = 1000;
      const frequency = 1;
      const basis = 0;

      expect(() => {
        ACCRINT(issue, first, settlement, rate, par, frequency, basis);
      }).toThrow('Issue date is not valid.');
    });

    test('should throw an error if first date is invalid', () => {
      const issue = '2023-01-01';
      const first = 'invalid-date';
      const settlement = '2024-02-01';
      const rate = 0.05;
      const par = 1000;
      const frequency = 1;
      const basis = 0;

      expect(() => {
        ACCRINT(issue, first, settlement, rate, par, frequency, basis);
      }).toThrow('First date is not valid.');
    });

    test('should throw an error if settlement date is invalid', () => {
      const issue = '2023-01-01';
      const first = '2024-01-01';
      const settlement = 'invalid-date';
      const rate = 0.05;
      const par = 1000;
      const frequency = 1;
      const basis = 0;

      expect(() => {
        ACCRINT(issue, first, settlement, rate, par, frequency, basis);
      }).toThrow('Settlement date is not valid.');
    });

    test('should throw an error if rate is less than or equal to 0', () => {
      const issue = '2023-01-01';
      const first = '2024-01-01';
      const settlement = '2024-02-01';
      const rate = 0;
      const par = 1000;
      const frequency = 1;
      const basis = 0;

      expect(() => {
        ACCRINT(issue, first, settlement, rate, par, frequency, basis);
      }).toThrow('Rate is lower or equal 0.');
    });

    test('should throw an error if par is less than or equal to 0', () => {
      const issue = '2023-01-01';
      const first = '2024-01-01';
      const settlement = '2024-02-01';
      const rate = 0.05;
      const par = 0;
      const frequency = 1;
      const basis = 0;

      expect(() => {
        ACCRINT(issue, first, settlement, rate, par, frequency, basis);
      }).toThrow('Par is lower or equal 0');
    });

    test('should throw an error if frequency is not 1, 2, or 4', () => {
      const issue = '2023-01-01';
      const first = '2024-01-01';
      const settlement = '2024-02-01';
      const rate = 0.05;
      const par = 1000;
      const frequency = 3;
      const basis = 0;

      expect(() => {
        ACCRINT(issue, first, settlement, rate, par, frequency, basis);
      }).toThrow('Frequency should be equal to [1, 2, 4]');
    });

    test('should throw an error if settlement date is less than or equal to issue date', () => {
      const issue = '2024-01-01';
      const first = '2024-01-01';
      const settlement = '2024-01-01';
      const rate = 0.05;
      const par = 1000;
      const frequency = 1;
      const basis = 0;

      expect(() => {
        ACCRINT(issue, first, settlement, rate, par, frequency, basis);
      }).toThrow('Settlement date should be greater than issue date');
    });
  });

  describe('CUMPRINC function', () => {
    test('should calculate cumulative principal correctly when start equals 1', () => {
      const rate = 0.05;
      const periods = 5;
      const value = 1000;
      const start = 1;
      const end = 5;
      const type = 0;

      expect(CUMPRINC(rate, periods, value, start, end, type)).toBeCloseTo(-819.025201871731, 2);
    });

    test('should calculate cumulative principal correctly when start is greater than 1', () => {
      const rate = 0.05;
      const periods = 5;
      const value = 1000;
      const start = 3;
      const end = 5;
      const type = 0;

      expect(CUMPRINC(rate, periods, value, start, end, type)).toBeCloseTo(-629.0016638370496, 2);
    });

    test('should handle type = 1 correctly', () => {
      const rate = 0.05;
      const periods = 5;
      const value = 1000;
      const start = 1;
      const end = 5;
      const type = 1;

      expect(CUMPRINC(rate, periods, value, start, end, type)).toBeCloseTo(-780.0240017826011, 2);
    });

    test('should throw an error if rate is less than or equal to 0', () => {
      const rate = 0;
      const periods = 5;
      const value = 1000;
      const start = 1;
      const end = 5;
      const type = 0;

      expect(() => {
        CUMPRINC(rate, periods, value, start, end, type);
      }).toThrow('Rate should be more than 0.');
    });

    test('should throw an error if periods is less than or equal to 0', () => {
      const rate = 0.05;
      const periods = 0;
      const value = 1000;
      const start = 1;
      const end = 5;
      const type = 0;

      expect(() => {
        CUMPRINC(rate, periods, value, start, end, type);
      }).toThrow('Periods should be more than 0.');
    });

    test('should throw an error if value is less than or equal to 0', () => {
      const rate = 0.05;
      const periods = 5;
      const value = 0;
      const start = 1;
      const end = 5;
      const type = 0;

      expect(() => {
        CUMPRINC(rate, periods, value, start, end, type);
      }).toThrow('Value should be more than 0.');
    });

    test('should throw an error if end is less than start', () => {
      const rate = 0.05;
      const periods = 5;
      const value = 1000;
      const start = 5;
      const end = 1;
      const type = 0;

      expect(() => {
        CUMPRINC(rate, periods, value, start, end, type);
      }).toThrow('End should be more than start.');
    });
  });

  describe('CUMIPMT function', () => {
    test('should calculate cumulative interest correctly when start equals 1', () => {
      const rate = 0.05;
      const periods = 5;
      const value = 1000;
      const start = 1;
      const end = 5;
      const type = 0;

      expect(CUMIPMT(rate, periods, value, start, end, type)).toBeCloseTo(-154.8739906413408, 2);
    });

    test('should calculate cumulative interest correctly when start is greater than 1', () => {
      const rate = 0.05;
      const periods = 5;
      const value = 1000;
      const start = 3;
      const end = 5;
      const type = 0;

      expect(CUMIPMT(rate, periods, value, start, end, type)).toBeCloseTo(-63.92273054775419, 2);
    });

    test('should handle type = 1 correctly', () => {
      const rate = 0.05;
      const periods = 5;
      const value = 1000;
      const start = 1;
      const end = 5;
      const type = 1;

      expect(CUMIPMT(rate, periods, value, start, end, type)).toBeCloseTo(-99.87999108699127, 2);
    });

    test('should throw an error if rate is less than or equal to 0', () => {
      const rate = 0;
      const periods = 5;
      const value = 1000;
      const start = 1;
      const end = 5;
      const type = 0;

      expect(() => {
        CUMIPMT(rate, periods, value, start, end, type);
      }).toThrow('Rate should be more than 0.');
    });

    test('should throw an error if periods is less than or equal to 0', () => {
      const rate = 0.05;
      const periods = 0;
      const value = 1000;
      const start = 1;
      const end = 5;
      const type = 0;

      expect(() => {
        CUMIPMT(rate, periods, value, start, end, type);
      }).toThrow('Periods should be more than 0.');
    });

    test('should throw an error if value is less than or equal to 0', () => {
      const rate = 0.05;
      const periods = 5;
      const value = 0;
      const start = 1;
      const end = 5;
      const type = 0;

      expect(() => {
        CUMIPMT(rate, periods, value, start, end, type);
      }).toThrow('Value should be more than 0.');
    });

    test('should throw an error if end is less than start', () => {
      const rate = 0.05;
      const periods = 5;
      const value = 1000;
      const start = 5;
      const end = 1;
      const type = 0;

      expect(() => {
        CUMIPMT(rate, periods, value, start, end, type);
      }).toThrow('End should be more than start.');
    });
  });
});
