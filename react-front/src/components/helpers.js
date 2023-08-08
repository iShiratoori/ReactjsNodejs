
export const getFullName = function (name) {
    return `${name.title} ${name.firstName} ${name.lastName}`
}

export const getDateFormattedForEditing = function (dob) {
    const newDate = new Date(dob.date);
    const data = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
    return data
}

export const getFormatedDate = function (date) {
    const newDate = new Date(date);
    const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = month_names[newDate.getMonth() - 1].substring(0, 3);
    return `${newDate.getDay()} ${month}, ${newDate.getFullYear()}`;
}