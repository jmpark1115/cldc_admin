import { CallBackendAPIFunction } from './api/getApi'
import { withoutAbbreviation } from './api/mathFunc'
import { renderPagination } from './api/paginationFunc'

(async () => {
    let sendRequestArr = await CallBackendAPIFunction('GetSendRequests')
    if(!sendRequestArr || sendRequestArr.length === 0) return false
    sendRequestArr = sendRequestArr.sort((a, b) => {
        return a.Time < b.Time ? -1 : a.Time > b.Time ? 1 : 0
    })
    const targetBody = document.querySelector('main tbody')
    const templateBody = []
    sendRequestArr.forEach((el, i) => {
        
        const elAmount = withoutAbbreviation(el.Amount, 10 ** 18)
        const TheDate = new Date(el.Time * 1000)
        const elTime = `
            ${TheDate.getFullYear()}/${(TheDate.getMonth() + 1).toString().padStart(2, "0")}/${TheDate.getDate().toString().padStart(2, "0")} ${TheDate.getHours().toString().padStart(2, "0")}:${TheDate.getMinutes().toString().padStart(2, "0")}
        `
        const template = `
            <tr>
                <td>${i+1}</td>
                <td data-userInfo="email">${el.Email}</td>
                <td>${el.ToAddress}</td>
                <td>${elAmount}</td>
                <td>${elTime}</td>
                <td><button type="button">취소</button></td>
            </tr>
        `
        templateBody.push(template)

    });
    targetBody.innerHTML = templateBody.join('')
    renderPagination()

    // 취소버튼
    const cancelBtn = document.querySelectorAll('button')
    cancelBtn.forEach(el => el.addEventListener('click', function() {
        const userEmail = this.parentElement.parentElement.querySelector('[data-userInfo="email"]')
        const confirmMsg = confirm('삭제하시겠습니까?')
        if(!confirmMsg) return false
        CallBackendAPIFunction('RemoveSendRequest', {"Email":`${userEmail.innerText}`})
            .then(alert('새로고침 해주세요'))
    }))
})()
