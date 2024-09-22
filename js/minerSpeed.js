import { CallBackendAPIFunction } from './api/getApi'

document.querySelector('.btnWrap').addEventListener('click', () => {
        
    const chgMinerSpeed = document.querySelector('input[data-value="chgMinerSpeed"]').value * (10**18)
    CallBackendAPIFunction('SetMinerSpeed', {"Speed": chgMinerSpeed})
    .then(data => {
        if(data.message == 'Unexpected end of JSON input') {
            alert('Invalid Number')
        } else {
            alert('변경이 완료되었습니다.')
            document.querySelector('input[data-value="chgMinerSpeed"]').value = 0
        }
    })
})