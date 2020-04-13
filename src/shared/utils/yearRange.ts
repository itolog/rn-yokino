function generateYearRange(start: number, end: number) {
  const years: number[] = [];
  for (let year = start; year <= end; year++) {
    years.push(year);
  }
  return years;
}

export function yearDataRange() {
  const currentYear = new Date().getFullYear();
  const data = generateYearRange(1970, currentYear);

  return data.map((item: number) => ({ value: item, label: item })).reverse();
}
