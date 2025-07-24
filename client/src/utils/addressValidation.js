import axios from "axios";

export default async function googleValidateAdderss(address) {
    try {
        const res = await axios.post(`https://addressvalidation.googleapis.com/v1:validateAddress?key=${import.meta.env.VITE_PLACES_MAP_KEY}`, address)
        console.log(res)
        const verdict = res.data.result.verdict
            console.log(JSON.stringify(verdict))
            if(verdict.possibleNextAction==='FIX'){

            }else if(verdict.possibleNextAction==='CONFIRM_ADD_SUBPREMISES'){
                
            }else if(verdict.possibleNextAction==='CONFIRM' || verdict.possibleNextAction==='ACCEPT'){
                return {
                    validation:true,
                    message:'Address Validation SuccessFull'
                }
            }else{
                console.error("Error in verdict.possibleNextAction "+verdict.possibleNextAction)
            }
    } catch (error) {
        console.log("Error in googleValidateAdderss()" + error)
    }
}