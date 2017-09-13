export function computeMassToVolumeCoefficient(coefficientToGram, coefficientToLiter, fluidCoefficient) {
        return (coefficientToGram / coefficientToLiter) * fluidCoefficient;
    }

export function convertValue(value, valueType, massToVolumeCoefficient) {
    if(typeof(value) !== undefined)
    {
        switch(valueType){
            case 'mass':
                return +(value * massToVolumeCoefficient).toFixed(2);
            case 'volume':
                return +(value * (1/massToVolumeCoefficient)).toFixed(2);
            default:
                return +(value * massToVolumeCoefficient).toFixed(2);
            }
    }
    else
        return 0;
}