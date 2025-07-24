import axios from "axios";

export default async function googleValidateAdderss(address) {
    try {
        const res = await axios.post(`https://addressvalidation.googleapis.com/v1:validateAddress?key=${import.meta.env.VITE_PLACES_MAP_KEY}`, address)
        console.log(res)
        const result = res.data.result
        const verdict = result.verdict
        console.log(JSON.stringify(verdict))
        if (verdict.possibleNextAction === 'FIX') {
            let addressComp = []
            if (verdict.inputGranularity === 'OTHER' || verdict.inputGranularity === 'ROUTE'
                || verdict.validationGranularity === 'OTHER' || verdict.validationGranularity === 'ROUTE'
                || verdict.geocodeGranularity === 'OTHER' || verdict.geocodeGranularity === 'ROUTE') {

                const { addressComponents, missingComponentTypes, unresolvedTokens } = result.address
                if (addressComponents !== undefined && addressComponents !== null) {
                    const suspiciousAddressComponents = addressComponents.filter((add) => add.confirmationLevel === 'UNCONFIRMED_AND_SUSPICIOUS' && add.componentType);
                    const plausibleAddressComponents = addressComponents.filter((add) => add.confirmationLevel === 'UNCONFIRMED_BUT_PLAUSIBLE' && add.componentType);

                    addressComp.push({
                        suspicious: suspiciousAddressComponents,
                        plausible: plausibleAddressComponents
                    })
                }

                if (missingComponentTypes !== undefined && missingComponentTypes !== null) {
                    addressComp.push({
                        missing: missingComponentTypes
                    })
                }

                if (unresolvedTokens !== undefined && unresolvedTokens !== null) {
                    addressComp.push({
                        invalid: unresolvedTokens
                    })
                }

                return{
                    validation: false,
                    data:addressComp,
                    message:'Can\'t Validate entered Address please Update!!'
                }

            } else {
                console.error("Error in verdict.possibleNextAction === FIX " + JSON.stringify(verdict))
            }
        } else if (verdict.possibleNextAction === 'CONFIRM_ADD_SUBPREMISES') {

        } else if (verdict.possibleNextAction === 'CONFIRM' || verdict.possibleNextAction === 'ACCEPT') {
            const validAddress = result.address.formattedAddress
            const { latitude, longitude } = result.geocode.location
            return {
                validation: true,
                data: {
                    address: validAddress,
                    coordinates: {
                        latitude,
                        longitude,
                    }
                },
                message: 'Address Validation Successfull'
            }
        } else {
            console.error("Error in verdict.possibleNextAction " + verdict.possibleNextAction)
        }
    } catch (error) {
        console.error("Error in googleValidateAdderss()" + error)
    }
}