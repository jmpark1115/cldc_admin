function toFixedFunc(x) {

    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10,e-1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
        } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10,e);
            x += (new Array(e+1)).join('0');
        }
    }
    return x;
}

export function withoutAbbreviation(target, divides = 1) {
    // 0이면 return
    if(!target) return
    let outputTarget = toFixedFunc(target / divides)
    const outputTargetLen = outputTarget.toString().split('.')[1]
    if(outputTargetLen && outputTargetLen.length > 17) {
        outputTarget = Number(outputTarget).toFixed(18)
    }
    return outputTarget
}

export function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength)
    }    
}