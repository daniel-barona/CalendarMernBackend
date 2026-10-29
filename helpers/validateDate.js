

const validateDate = (end, { req }) => {
    const startDate = new Date(req.body.start)
    const endDate = new Date(end)

    if (endDate <= startDate) {
        throw new Error(
            'The end date must be later than the start date'
        )
    }

    return true
}

module.exports = {
    validateDate
}
