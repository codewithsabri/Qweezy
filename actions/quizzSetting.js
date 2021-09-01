

import {
    INC_PERCENTAGE, DEC_PERCENTAGE, RESET_PERCENTAGE
} from './types';





// Increment percentage
export const incrementPercentage = () => {

    try {

        dispatch({
            type: INC_PERCENTAGE,
        });
    } catch (err) {
        console.log("erreur avec redux pour l'incrementation")
    }

}


//Decrement percentage
export const decrementPercentage = () => {

    try {

        dispatch({
            type: DEC_PERCENTAGE,
        });
    } catch (err) {
        console.log("erreur avec redux pour la décrementation")
    }

}



// Reset Percentage
export const decrementPercentage = () => {

    try {

        dispatch({
            type: RESET_PERCENTAGE,
        });
    } catch (err) {
        console.log("erreur avec redux pour le reset")
    }

}
