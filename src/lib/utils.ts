import { differenceInDays, differenceInMonths, differenceInYears, parse } from 'date-fns';

export function parseDate(dateStr: string): Date {
  if (dateStr.toLowerCase() === 'present') {
    return new Date();
  }
  return parse(dateStr, 'MMMM yyyy', new Date());
}

export function formatDuration(dateRange: string): string {
  const parts = dateRange.split(' - ');
  if (parts.length !== 2) return dateRange;

  const endStr = parts[1].trim();
  const isPresent = endStr.toLowerCase() === 'present';
  const startDate = parseDate(parts[0].trim());
  const endDate = parseDate(endStr);

  const totalDays = differenceInDays(endDate, startDate);
  const months = differenceInMonths(endDate, startDate);
  const years = differenceInYears(endDate, startDate);
  const plus = isPresent ? '+' : '';

  if (totalDays < 30) {
    return `${totalDays}${plus} day${totalDays !== 1 ? 's' : ''}`;
  } else if (months < 12) {
    const remainingDays = totalDays - (months * 30);
    if (remainingDays > 15) {
      return `${months + 1}${plus} month${months + 1 !== 1 ? 's' : ''}`;
    }
    return `${months}${plus} month${months !== 1 ? 's' : ''}`;
  } else {
    const remainingMonths = months - (years * 12);
    if (remainingMonths === 0) {
      return `${years}${plus} year${years !== 1 ? 's' : ''}`;
    }
    const decimalYears = (years + remainingMonths / 12).toFixed(1);
    return `${decimalYears}${plus} years`;
  }
}
