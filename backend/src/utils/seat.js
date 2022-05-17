module.exports = {
    indexRange: {
        min: 1, // included
        max: 10 // included
    },
    stateRange: {
        min: -1, // included
        max: 2 // included
    },
    state: {
        ERROR: -1,
        USING: 0,
        AVAILABLE: 1,
        IDLE_TOO_LONG: 2,
    },
}