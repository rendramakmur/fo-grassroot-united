import { useEffect, useState } from "react"

export default function DateField({ onDateChange }) {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  useEffect(() => {
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    if (!year || !month || !day) {
      onDateChange(null)
    } else {
      onDateChange(formattedDate)
    }
  }, [day, month, year, onDateChange])

  const handleMonthChange = (e) => {
    const newMonth = e.target.value
    setMonth(newMonth)
    if (day && (parseInt(day) > daysInMonth(newMonth, year))) {
      setDay('')
    }
  }

  const handleYearChange = (e) => {
    const newYear = e.target.value
    setYear(newYear)
    if (day && (parseInt(day) > daysInMonth(month, newYear))) {
      setDay('')
    }
  }

  const daysInMonth = (m, y) => {
    return new Date(y, m, 0).getDate()
  }

  const getDays = () => {
    const numDays = daysInMonth(month, year)
    return Array.from({ length: numDays }, (_, i) => i + 1).map((day) => (
      <option key={day} value={day}>
        {day}
      </option>
    ))
  }

  const getMonths = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
      <option key={month} value={month}>
        {month}
      </option>
    ))
  }

  const getYears = () => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 100 }, (_, i) => currentYear - i).map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ))
  }

  
  return (
    <>
      <select name="day" id="day" placeholder="day" value={day} onChange={(e) => setDay(e.target.value)} className="bg-gray-50 border text-gray-900 rounded-lg text-center w-full p-2">
        <optgroup label="Day">
          <option value="" hidden>Day</option>
          {getDays()}
        </optgroup>
      </select>
      <select name="month" id="month" placeholder="month" value={month} onChange={handleMonthChange} className="bg-gray-50 border text-gray-900 rounded-lg text-center w-full p-2">
        <optgroup label="Month">
          <option value="" hidden>Month</option>
          {getMonths()}
        </optgroup>
      </select>
      <select name="year" id="year" placeholder="year" value={year} onChange={handleYearChange} className="bg-gray-50 border text-gray-900 rounded-lg text-center w-full p-2">
        <optgroup label="Year">
          <option value="" hidden>Year</option>
          {getYears()}
        </optgroup>
      </select>
    </>
  )
}