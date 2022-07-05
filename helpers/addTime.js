module.exports = {
    addTime(date) {
        let endDate;
        endDate = new Date(date).setHours(new Date(date).getHours() + 23);
        endDate = new Date(endDate).setMinutes(
            new Date(endDate).getMinutes() + 59
        );
        return endDate;
    },
};
