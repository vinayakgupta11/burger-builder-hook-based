export const updateObject=(oldState,updateState)=>{
    return {
        ...oldState,
        ...updateState
    }
}