import moment from 'moment';

// get specified month days
export function monthDays(year: string, month: string): Array<moment.Moment> {
  const startStr = year + '-' + month + '-' + '01';
  const date = moment(startStr);
  const endDate = date.clone().endOf('M');
  let days: Array<moment.Moment> = [];
  while (date < endDate) {
    let d = date.clone();
    days.push(d);
    date.add(1, 'day');
  }
  return days;
}

// get specified month weeks
export function weeks(
  year: string,
  month: string,
): Array<Array<moment.Moment>> {
  let weeks: Array<Array<moment.Moment>> = [];
  let week: Array<moment.Moment> = [];
  const days = monthDays(year, month);
  console.log('days', days);
  for (let i = 0; i < days.length; i++) {
    week.push(days[i]);
    if (days[i].weekday() === 0) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    weeks.push(week);
  }
  return weeks;
}

export function dateString(date: string): string {
  return moment(date).format('YYYY.MM.DD');
}

export function getChartOptions(
  data: any,
  filter: string,
  title: string,
  legends: Array<string>,
  keys: Array<string>,
) {
  const filteredData = data.filter((summary) => {
    return summary.Category.includes(filter);
  });
  let i = -1;
  const series = legends.map((legend) => {
    i += 1;
    return {
      name: legend,
      type: 'line',
      data: filteredData.map((v) => v[keys[i]]),
    };
  });

  const options = {
    title: {
      text: title,
      textStyle: {
        fontWeight: 'normal',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: 40,
      data: legends,
    },
    grid: {
      top: 80,
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: filteredData.map((v) => v.ReportName.substr(0, 4)),
    },
    yAxis: {
      type: 'value',
    },
    series: series,
  };
  return options;
}
