import moment from "moment"


// get specified month days
export function monthDays(year: string, month: string): Array<moment.Moment> {
  const startStr = year + '-' + month + '-' + '01'
  const date = moment(startStr)
  const endDate = date.clone().endOf('M')
  let days:Array<moment.Moment> = []
  while (date < endDate) {
    let d = date.clone()
    days.push(d)
    date.add(1, 'day')
  }
  return days
}

// get specified month weeks
export function weeks(year: string, month: string): Array<Array<moment.Moment>> {
  let weeks: Array<Array<moment.Moment>> = []
  let week: Array<moment.Moment> = []
  const days = monthDays(year, month)
  console.log('days', days)
  for(let i = 0; i < days.length; i++) {
    week.push(days[i])
    if (days[i].weekday() === 0) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length > 0) {
      weeks.push(week)
  }
  return weeks;
}

export function dateString(date:string):string {
  return moment(date).format("YYYY.MM.DD")
}