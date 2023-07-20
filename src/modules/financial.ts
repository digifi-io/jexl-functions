import { ConfigType } from 'dayjs';
import { JexlFunctionExecutionError } from '../errors';
import { createModule } from '../utils/module';
import dayjs from '../dayjs';
import createDateAndTimeModule from './date-and-time';

export default createModule(({ safeFlatten, coerceToNumber }, options) => {
  const dateTimeModule = createDateAndTimeModule(options);

  const FV = (rate: unknown, periods: unknown, payment: unknown, value: unknown, type: unknown) => {
    const coercedRate = coerceToNumber(rate);
    const coercedPeriods = coerceToNumber(periods);
    const coercedPayment = coerceToNumber(payment);
    const coercedValue = value ? coerceToNumber(value) : 0;
    const coercedType = type ? coerceToNumber(type) : 0;

    if (coercedRate === 0) {
      return -(coercedValue + coercedPayment * coercedPeriods);
    }

    const term = Math.pow(1 + coercedRate, coercedPeriods);

    if (coercedType === 1) {
      return -(coercedValue * term + (coercedPayment * (1 + coercedRate) * (term - 1)) / coercedRate);
    }

    return -(coercedValue * term + (coercedPayment * (term - 1)) / coercedRate);
  };

  const PMT = (rate: unknown, periods: unknown, present: unknown, future: unknown, type: unknown) => {
    const coercedRate = coerceToNumber(rate);
    const coercedPeriods = coerceToNumber(periods);
    const coercedPresent = coerceToNumber(present);
    const coercedFuture = future ? coerceToNumber(future) : 0;
    const coercedType = type ? coerceToNumber(type) : 0;

    if (coercedRate === 0) {
      return -(coercedPresent + coercedFuture) / coercedPeriods;
    }

    const term = Math.pow(1 + coercedRate, coercedPeriods);

    if (coercedType === 1) {
      return -(((coercedFuture * coercedRate) / (term - 1) + (coercedPresent * coercedRate) / (1 - 1 / term)) / (1 + coercedRate));
    }

    return -((coercedFuture * coercedRate) / (term - 1) + (coercedPresent * coercedRate) / (1 - 1 / term));
  };

  const ACCRINT = (issue: unknown, first: unknown, settlement: unknown, rate: unknown, par: unknown, frequency: unknown, basis: unknown) => {
    const coercedRate = coerceToNumber(rate);
    const coercedPar = par ? coerceToNumber(par) : 0;
    const coercedFrequency = coerceToNumber(frequency);

    const issueDate = dayjs(issue as ConfigType);
    const firstDate = dayjs(first as ConfigType);
    const settlementDate = dayjs(settlement as ConfigType);

    if (!issueDate.isValid()) {
      throw new JexlFunctionExecutionError('Issue date is not valid.');
    }

    if (!firstDate.isValid()) {
      throw new JexlFunctionExecutionError('First date is not valid.');
    }

    if (!settlementDate.isValid()) {
      throw new JexlFunctionExecutionError('Settlement date is not valid.');
    }

    if (coercedRate <= 0) {
      throw new JexlFunctionExecutionError('Rate is lower or equal 0.');
    }

    if (coercedPar <= 0) {
      throw new JexlFunctionExecutionError('Par is lower or equal 0');
    }

    if (![1, 2, 4].includes(coercedFrequency)) {
      throw new JexlFunctionExecutionError('Frequency should be equal to [1, 2, 4]');
    }

    if (settlementDate <= issueDate) {
      throw new JexlFunctionExecutionError('Settlement date should be greater than issue date');
    }

    return coercedPar * coercedRate * dateTimeModule.YEARFRAC(issue, settlement, basis);
  };

  const CUMIPMT = (rate: unknown, periods: unknown, value: unknown, start: unknown, end: unknown, type: unknown) => {
    const coercedRate = coerceToNumber(rate);
    const coercedPeriods = Math.abs(coerceToNumber(periods));
    const coercedValue = coerceToNumber(value);
    const coercedEnd = Math.abs(coerceToNumber(end));
    const coercedStart = Math.abs(coerceToNumber(start));

    if (coercedRate <= 0) {
      throw new JexlFunctionExecutionError('Rate should be more than 0.');
    }

    if (coercedPeriods <= 0) {
      throw new JexlFunctionExecutionError('Periods should be more than 0.');
    }

    if (coercedValue <= 0) {
      throw new JexlFunctionExecutionError('Value should be more than 0.');
    }

    if (coercedEnd < coercedStart) {
      throw new JexlFunctionExecutionError('End should be more than start.');
    }

    const differenceBetweenEndAndStart = coercedEnd - coercedStart;

    if (differenceBetweenEndAndStart > options.defaultMaxArraySize) {
      throw new JexlFunctionExecutionError(`Difference between end and start should be not more than: ${options.defaultMaxArraySize}`);
    }

    if (type !== 0 && type !== 1) {
      throw new JexlFunctionExecutionError('Type should be equal 0 or 1.');
    }

    const payment = PMT(coercedRate, coercedPeriods, coercedValue, 0, type);

    let interest = coercedStart === 1 && type === 0 ? -coercedValue : 0;
    const startFrom = coercedStart === 1 ? coercedStart + 1 : coercedStart;

    for (let i = startFrom; i <= coercedEnd; i++) {
      if (type === 1) {
        interest = interest + FV(coercedRate, i - 2, payment, coercedValue, 1) - payment;
      } else {
        interest = interest + FV(coercedRate, i - 1, payment, coercedValue, 0);
      }
    }

    return interest * coercedRate;
  };

  const CUMPRINC = (rate: unknown, periods: unknown, value: unknown, start: unknown, end: unknown, type: unknown) => {
    const coercedRate = coerceToNumber(rate);
    const coercedPeriods = Math.abs(coerceToNumber(periods));
    const coercedValue = coerceToNumber(value);
    const coercedEnd = Math.abs(coerceToNumber(end));
    const coercedStart = Math.abs(coerceToNumber(start));
    const coercedType = type ? coerceToNumber(type) : 0;

    if (coercedRate <= 0) {
      throw new JexlFunctionExecutionError('Rate should be more than 0.');
    }

    if (coercedPeriods <= 0) {
      throw new JexlFunctionExecutionError('Periods should be more than 0.');
    }

    if (coercedValue <= 0) {
      throw new JexlFunctionExecutionError('Value should be more than 0.');
    }

    if (coercedEnd < coercedStart) {
      throw new JexlFunctionExecutionError('End should be more than start.');
    }

    let principal = 0;

    const payment = PMT(coercedRate, coercedPeriods, coercedValue, 0, coercedType);
    const startFrom = coercedStart === 1 ? coercedStart + 1 : coercedStart;

    if (startFrom === 1) {
      principal = coercedType === 0
        ? payment + coercedValue * coercedRate
        : payment;
    }

    for (let i = startFrom; i <= coercedEnd; i++) {
      if (coercedType > 0) {
        principal = principal + payment - (FV(coercedRate, i - 2, payment, coercedValue, 1) - payment) * coercedRate;
      } else {
        principal = principal + payment - FV(coercedRate, i - 1, payment, coercedValue, 0) * coercedRate;
      }
    }

    return principal;
  };

  const IPMT = (rate: unknown, period: unknown, periods: unknown, present: unknown, future: unknown, type: unknown) => {
    const coercedRate = coerceToNumber(rate);
    const coercedPeriod = coerceToNumber(period);
    const coercedPresent = coerceToNumber(present);
    const coercedType = type ? coerceToNumber(type) : 0;

    const payment = PMT(rate, periods, present, future, type);

    if (coercedPeriod === 1) {
      return type === 1
        ? 0
        : (-coercedPresent * coercedRate);
    }

    return coercedType === 1
      ? (FV(coercedRate, coercedPeriod - 2, payment, coercedPresent, 1) - payment) * coercedRate
      : (FV(coercedRate, coercedPeriod - 1, payment, coercedPresent, 0)) * coercedRate;
  };

  const EFFECT = (rate: unknown, periods: unknown) => {
    const coercedRate = coerceToNumber(rate);
    const coercedPeriods = coerceToNumber(periods);

    if (coercedRate <= 0 || coercedPeriods < 1) {
      throw new JexlFunctionExecutionError('Incorrect incoming arguments.');
    }

    const flooredPeriods = Math.trunc(coercedPeriods);

    return Math.pow(1 + coercedRate / flooredPeriods, flooredPeriods) - 1
  };

  const RATE = (periods: unknown, payment: unknown, present: unknown, future: unknown, type: unknown, guess: unknown) => {
    const coercedGuess = guess === undefined ? 0.01 : coerceToNumber(guess);
    const coercedFuture = future ? coerceToNumber(future) : 0;
    const coercedType = type ? 1 : 0;
    const coercedPeriods = coerceToNumber(periods);
    const coercedPayment = coerceToNumber(payment);
    const coercedPresent = coerceToNumber(present);

    const epsMax = 1e-10;
    const maxIterations = 20;
    let rate = coercedGuess;

    for (let i = 0; i < maxIterations; i++) {
      if (rate <= -1) {
        throw new JexlFunctionExecutionError('Incorrect rate.');
      }

      let y;
      let f;

      if (Math.abs(rate) < epsMax) {
        y = coercedPresent * (1 + coercedPeriods * rate) + coercedPayment * (1 + rate * coercedType) * coercedPeriods + coercedFuture;
      } else {
        f = Math.pow(1 + rate, coercedPeriods);
        y = coercedPresent * f + coercedPayment * (1 / rate + coercedType) * (f - 1) + coercedFuture;
      }

      if (Math.abs(y) < epsMax) {
        return rate;
      }

      let dy;

      if (Math.abs(rate) < epsMax) {
        dy = coercedPresent * coercedPeriods + coercedPayment * coercedType * coercedPeriods;
      } else {
        const df = coercedPeriods * Math.pow(1 + rate, coercedPeriods - 1);

        f = Math.pow(1 + rate, coercedPeriods);
        dy = coercedPresent * df + coercedPayment * (1 / rate + coercedType) * df + coercedPayment * (-1 / (rate * rate)) * (f - 1);
      }

      rate = rate - y / dy;
    }

    return rate;
  };

  const ISPMT = (rate: unknown, period: unknown, periods: unknown, value: unknown) => {
    return coerceToNumber(value) * coerceToNumber(rate) * (coerceToNumber(period) / coerceToNumber(periods) - 1);
  };

  const NOMINAL = (rate: unknown, periods: unknown) => {
    const coercedRate = coerceToNumber(rate);
    const coercedPeriods = coerceToNumber(periods);

    if (coercedRate <= 0 || coercedPeriods < 1) {
      throw new JexlFunctionExecutionError('Incorrect arguments.');
    }

    const flooredPeriods = Math.trunc(coercedPeriods);

    return (Math.pow(coercedRate + 1, 1 / flooredPeriods) - 1) * flooredPeriods;
  };

  const NPER = (rate: unknown, payment: unknown, present: unknown, future: unknown, type: unknown) => {
    const coercedType = type ? coerceToNumber(type) : 0;
    const coercedFuture = future ? coerceToNumber(future) : 0;
    const coercedRate = coerceToNumber(rate);
    const coercedPayment = coerceToNumber(payment);
    const coercedPresent = coerceToNumber(present);

    if (coercedRate === 0) {
      return -(coercedPresent + coercedFuture) / coercedPayment;
    }

    const num = coercedPayment * (1 + coercedRate * coercedType) - coercedFuture * coercedRate;
    const den = coercedPresent * coercedRate + coercedPayment * (1 + coercedRate * coercedType);

    return Math.log(num / den) / Math.log(1 + coercedRate);
  };

  const NPV = (rate: unknown, ...args: unknown[]) => {
    const coercedRate = coerceToNumber(rate);

    return safeFlatten(args).reduce((result: number, arg, index) => {
      return result + coerceToNumber(arg) / Math.pow(1 + coercedRate, index + 1);
    }, 0);
  };

  const PDURATION = (rate: unknown, present: unknown, future: unknown) => {
    const coercedRate = coerceToNumber(rate);

    if (coercedRate <= 0) {
      throw new JexlFunctionExecutionError('Invalid arguments.');
    }

    return (Math.log(coerceToNumber(future)) - Math.log(coerceToNumber(present))) / Math.log(1 + coercedRate);
  };

  const PPMT = (rate: unknown, period: unknown, periods: unknown, present: unknown, future: unknown, type: unknown) => {
    return PMT(rate, periods, present, future, type) - IPMT(rate, period, periods, present, future, type);
  };

  const PV = (rate: unknown, periods: unknown, payment: unknown, future: unknown, type: unknown) => {
    const coercedRate = coerceToNumber(rate);
    const coercedPeriods = coerceToNumber(periods);
    const coercedPayment = coerceToNumber(payment);
    const coercedFuture = future ? coerceToNumber(future) : 0;
    const coercedType = type ? coerceToNumber(type) : 0;

    if (coercedRate === 0) {
      return -coercedPayment * coercedPeriods - coercedFuture;
    }

    return (
      (((1 - Math.pow(1 + coercedRate, coercedPeriods)) / coercedRate) * coercedPayment * (1 + coercedRate * coercedType) - coercedFuture) / Math.pow(1 + coercedRate, coercedPeriods)
    );
  };

  const DELTA = (firstValue: unknown, secondValue: unknown) => {
    return firstValue === secondValue ? 1 : 0;
  };

  return {
    EFFECT,
    FV,
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
  };
});
