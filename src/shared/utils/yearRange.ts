function generateYearRange(start: number, end: number) {
  const years: number[] = [];
  for (let year = start; year <= end; year++) {
    years.push(year);
  }
  return years;
}

export function yearDataRange() {
  const currentYear = new Date().getFullYear();
  const data = generateYearRange(
    1970,
    currentYear,
  ).map((item: number | string) => ({ value: item, label: item }));
  data.push({ value: 0, label: 'год' });
  return data.reverse();
}
