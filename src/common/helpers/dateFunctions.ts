import { format, isValid } from 'date-fns';
import { dateRangeType } from 'src/common/utils/types';

export const formatIso = 'yyyy-LL-dd';

export const toStandardDateByDate = (date: Date) => {
  return format(date, 'dd.MM.yyyy');
};

export const toStandardDate = (dateTime: string | null | undefined | Date) => {
  return dateTime ? format(new Date(dateTime), 'dd.MM.yyyy') : null;
};

const checkDate = (date: any) => date && !isNaN(Date.parse(date));

export const dateForTable = (dateTime: any) => {
  const idDate = checkDate(dateTime);
  return idDate ? format(new Date(dateTime), 'dd-MM-yyyy') : dateTime;
};

export const dateTimeForTable = (dateTime: any) => {
  const idDate = checkDate(dateTime);
  return idDate ? format(new Date(dateTime), 'dd-LL-yyyy HH:mm') : dateTime;
};

export const checkDateNone = (dateTime: string) => {
  if (dateTime === 'none') {
    return dateTime;
  }
  return toStandardDate(dateTime);
};

export const toStandardDateTime = (
  dateTime: string | null | undefined | Date,
) => {
  return dateTime ? format(new Date(dateTime), 'dd.LL.yyyy HH:mm') : null;
};

export const toISOdDate = (dateTime: Date) => {
  if (!isValid(dateTime)) return null;
  return format(dateTime, 'yyyy-LL-dd');
};

export const formatDateBackRange = (
  date: [(Date | undefined | 'none')?, (Date | undefined | 'none')?] | null,
  isFilter?: boolean,
): [string | undefined, string | undefined] => {
  if (isFilter) {
    if (Array.isArray(date)) {
      return [
        date[0] ? format(new Date(date[0]), formatIso) : 'none',
        date[1] ? format(new Date(date[1]), formatIso) : 'none',
      ];
    }
  } else {
    if (Array.isArray(date)) {
      return [
        date[0] ? format(new Date(date[0]), formatIso) : undefined,
        date[1] ? format(new Date(date[1]), formatIso) : undefined,
      ];
    }
  }

  return ['none', 'none'];
};

export const getDateRange = (
  dateFrom: string | null | undefined,
  dateTo: string | null | undefined,
): dateRangeType => {
  if (!dateFrom && !dateTo) {
    return null;
  }

  const d1 = dateFrom ? new Date(dateFrom) : undefined;
  const d2 = dateTo ? new Date(dateTo) : undefined;

  return [d1, d2];
};
