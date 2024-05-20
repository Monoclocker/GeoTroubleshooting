interface Filter {
    placeId: number,
    currentPlaceValue: (number | number[])[]
    startTimeStamp: Date,
    endTimeStamp: Date
    markId?: string,
    isRealTime: boolean
    isReady: boolean
}

export default Filter