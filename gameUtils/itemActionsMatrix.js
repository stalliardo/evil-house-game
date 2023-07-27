const ITEMS_ACTIONS_MATRIX = {
    basementPaperClip: {
        actions: ["Use", "Examine"],
        use:() =>  console.log("%cTODO", "color:greenyellow"),
        examine:() => "A flat wire clip shaped so that it can hold sheets of paper between two of its loops. Maybe it has another use."
    }
}

export {ITEMS_ACTIONS_MATRIX};