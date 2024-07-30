import moment from "moment"

const calculateDiscountTimeLeft = (date) => { // diff time by today
    let discountDateEnd = moment(date)

    let difference = +new Date(discountDateEnd) - + new Date()
    let timeLeft = null

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((difference / 1000 / 60) % 60)
    const seconds = Math.floor((difference / 1000) % 60)

    if (difference > 0) {
        timeLeft = {
            days: days.toString(),
            hours: hours > 9 ? hours.toString() : '0' + hours,
            minutes: minutes > 9 ? minutes.toString() : '0' + minutes,
            seconds: seconds > 9 ? seconds.toString() : '0' + seconds
        }
    }
    return timeLeft
}

const calculateDetectCourseExpire = (ed) => {
    let discountDateEnd = moment(ed)
    let isExpire = true
    let difference = +new Date(discountDateEnd) - + new Date()

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((difference / 1000 / 60) % 60)
    const seconds = Math.floor((difference / 1000) % 60)

    if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
        isExpire = false
    }

    if (!ed) { // endDate param is null
        isExpire = false
    }
    
    return {
        isExpire
    }
}

const calculateDifferentTimeByToday = (date) => {
    let discountDateEnd = moment(date)

    let difference = +new Date(discountDateEnd) - + new Date()
    let timeLeft = {}
    let isTimeOut = true

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((difference / 1000 / 60) % 60)
    const seconds = Math.floor((difference / 1000) % 60)

    if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
        isTimeOut = false
    }

    timeLeft = {
        days: days > 0 ? days.toString() : "0",
        hours: hours > 0 ? (hours > 9 ? hours.toString() : '0' + hours) : "00",
        minutes: minutes > 0 ? (minutes > 9 ? minutes.toString() : '0' + minutes) : "00",
        seconds: seconds > 0 ? (seconds > 9 ? seconds.toString() : '0' + seconds) : "00",
        isTimeOut
    }
    return timeLeft
}

const calculateRemainingPeriodStudyCourse = (sd, ed) => {
    let startDate = moment(sd)
    let endDate = moment(ed)

    let difference = +new Date(endDate) - + new Date(startDate)
    let timeLeft = {}
    let isExpire = true

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((difference / 1000 / 60) % 60)
    const seconds = Math.floor((difference / 1000) % 60)

    if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
        isExpire = false
    }

    if (!ed) { // endDate param is null
        isExpire = false
    }

    timeLeft = {
        days: days.toString(),
        hours: hours > 9 ? hours.toString() : '0' + hours,
        minutes: minutes > 9 ? minutes.toString() : '0' + minutes,
        seconds: seconds > 9 ? seconds.toString() : '0' + seconds,
        text: days + " วัน, " + hours + " ชั่วโมง " + minutes + " นาที " + seconds + " วินาที ",
        display: days + " วัน, " + hours + " ชั่วโมง " + minutes + " นาที ",
        isExpire
    }

    return timeLeft
}

const secondsToHms = (d) => {
    d = Number(d)
    let h = Math.floor(d / 3600)
    let m = Math.floor(d % 3600 / 60)
    let s = Math.floor(d % 3600 % 60)

    let hDisplay = h > 0 ? (h < 10 ? ("0" + h + (h === 1 ? ":" : ":")) : (h + (h === 1 ? ":" : ":"))) : "00:"
    let mDisplay = m > 0 ? (m < 10 ? ("0" + m + (m === 1 ? ":" : ":")) : (m + (m === 1 ? ":" : ":"))) : "00"
    let sDisplay = s > 0 ? (s < 10 ? ("0" + s + (s === 1 ? ":" : ":")) : (s + (s === 1 ? ":" : ":"))) : "00"
    
    return hDisplay + mDisplay + sDisplay.substr(0, 2)
}

const secondsToMdhms = (value) => {
    let num = Number(value)
    let d = Math.floor(num / 86400)
    let h = Math.floor(num % 86400 / 3600)
    let m = Math.floor(num % 3600 / 60)
    let s = Math.floor(num % 3600 % 60)

    // console.log(d, h, m, s);

    let dDisplay = d > 0 ? d + " วัน " : "";
    let hDisplay = h > 0 ? (h < 10 ? ("0" + h + (h === 1 ? ":" : ":")) : (h + (h === 1 ? ":" : ":"))) : "00:"
    let mDisplay = m > 0 ? (m < 10 ? ("0" + m + (m === 1 ? ":" : ":")) : (m + (m === 1 ? ":" : ":"))) : "00:"
    let sDisplay = s > 0 ? (s < 10 ? ("0" + s + (s === 1 ? ":" : ":")) : (s + (s === 1 ? ":" : ":"))) : "00"
    
    return dDisplay + hDisplay + mDisplay + sDisplay.substr(0, 2) + " ชั่วโมง"
}

const sumTime = (videoList) => {
    let tempTime = 0
    videoList.map(val => {
        tempTime += val.courseVideoDuration
    })
    
    return secondsToHms(tempTime)
}

export {
    calculateDiscountTimeLeft,
    calculateDetectCourseExpire,
    calculateDifferentTimeByToday,
    calculateRemainingPeriodStudyCourse,
    secondsToHms,
    secondsToMdhms,
    sumTime
}
