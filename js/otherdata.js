






function GetGoogleDate(d = "26.01.2024"){
    let tab = d.split(".");

    return {
        day: parseInt(tab[0]),
        month: parseInt(tab[1]),
        year: parseInt(tab[2]),
    };
}



function DaysDifference(date1, date2) {
    const d1 = new Date(date1.year, date1.month - 1, date1.day); 
    const d2 = new Date(date2.year, date2.month - 1, date2.day);

    const differenceMs = Math.abs(d1 - d2);

    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays;
}