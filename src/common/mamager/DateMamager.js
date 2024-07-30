import moment from "moment"

const calculateEndDateLearnCourse = (courseFormatId, startDate) => {
    let endLearnDate = null;
    switch (courseFormatId) {
        case 1: endLearnDate = null; break;                                 // ตลอดชีวิต
        case 2: endLearnDate = moment(startDate).add(1, "year"); break;     // 1 ปี
        case 3: endLearnDate = moment(startDate).add(6, "month"); break;    // 6 เดือน
        case 4: endLearnDate = moment(startDate).add(3, "month"); break;    // 3 เดือน
        default: endLearnDate = null; break;
    }
    return endLearnDate;
}

const genMonthName = (number) => {
    let month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    return month[number];
}

const modifyDate = (data) => {
    let dateSplit = data.split('-');
    if (data.search('-') === -1) {
        dateSplit = data.split("/");
        // format = "dd/mm/yyyy"
        return Number(dateSplit[0]) + " " + genMonthName(Number(dateSplit[1]) - 1) + " " + (Number(dateSplit[2]) + 543);
    } else {
        // format = "yyyy-mm-dd"
        return Number(dateSplit[2]) + " " + genMonthName(Number(dateSplit[1]) - 1) + " " + (Number(dateSplit[0]) + 543);
    }
}

const genDay = () => {
    let tmpDay = [];
    for (let i = 1; i <= 31; i++) {
        tmpDay.push({
            label: i,
            value: i
        });
    }

    return tmpDay;
}

const genMonth = () => {
    let tmpMonth = [
        { label: "มกราคม", value: 1 },
        { label: "กุมภาพันธ์", value: 2 },
        { label: "มีนาคม", value: 3 },
        { label: "เมษายน", value: 4 },
        { label: "พฤษภาคม", value: 5 },
        { label: "มิถุนายน", value: 6 },
        { label: "กรกฎาคม", value: 7 },
        { label: "สิงหาคม", value: 8 },
        { label: "กันยายน", value: 9 },
        { label: "ตุลาคม", value: 10 },
        { label: "พฤศจิกายน", value: 11 },
        { label: "ธันวาคม", value: 12 },
    ];

    return tmpMonth;
}

const genYear = (move) => {

    let tmpYear = [];
    let a = moment().format('YYYY');
    let yearCurrent = (Number(a) + 543) - 1;
    if (move === "regress") {
        for (let i = yearCurrent; i > (yearCurrent - 100); i--) {
            tmpYear.push({
                label: i + 1,
                value: i + 1
            });
        }
    } else if (move === "go-ahead") {
        for (let i = yearCurrent; i < (yearCurrent + 3); i++) {
            tmpYear.push({
                label: i + 1,
                value: i + 1
            });
        }
    }

    return tmpYear;
}

export {
    calculateEndDateLearnCourse,
    modifyDate,
    genDay,
    genMonth,
    genYear
}