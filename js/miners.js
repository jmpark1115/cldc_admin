import { CallBackendAPIFunction } from './api/getApi'
import { renderPagination } from './api/paginationFunc'

(async () => {
    const targetBody = document.querySelector('main tbody')
    const templateBody = []
    let minersArr = await CallBackendAPIFunction('GetMiners', 'a')
    minersArr = minersArr.sort((a, b) => {
        return a.SN < b.SN ? -1 : a.SN > b.SN ? 1 : 0
    })
    minersArr.forEach((el, i) => {
        if(!el) return
        const template = `
            <tr>
                <td class="index">${i+1}</td>
                <td>${el['SN']}</td>
                <td>${el['PK']}</td>
            </tr>
        `
        templateBody.push(template)
    })
    targetBody.innerHTML = templateBody.join('')
    renderPagination()
})()