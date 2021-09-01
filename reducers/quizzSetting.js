import { INC_PERCENTAGE, DEC_PERCENTAGE, RESET_PERCENTAGE } from "../actions/types";

const initialState = {  name : '',difficulty : '', percentage: 0 , timer : 500 , score : 0, heart : [1,2,3] , heartBroke : []}



export default function (state = initialState, action) {
    switch (action.type) {
        case INC_PERCENTAGE:
            return {
                ...state, percentage:
                    state.percentage + 1
            }
        case DEC_PERCENTAGE:
            return {
                ...state, percentage:
                state.percentage - 1
            }
        case RESET_PERCENTAGE:
            return {
                ...state, percentage:
                state.percentage * 0
            }
        default:
            return state;
    }
}
