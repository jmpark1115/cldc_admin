import { CallBackendAPIFunction } from './api/getApi'
import { withoutAbbreviation } from './api/mathFunc'
import { renderPagination } from './api/paginationFunc'

(async() => {
    
    // GetMembers API
    const GetMembersArr = await CallBackendAPIFunction('GetMembers')
    drawMembers(GetMembersArr)

    // 팝업창 수정 버튼
    editBtn.addEventListener('click', () => {
        if(editClick) {

            const balanceDiff = userOrgBalance - targetBalance.value*(10**18)
            const inputValue = {"Email":targetEmail.value, "Amount":balanceDiff}

            CallBackendAPIFunction('AddExceptionalWithdrawal', inputValue)
                .then(()=> {
                    editBtnFunc(false)
                    editClick = false
                    alert('새로고침 해주세요')
                })
        } else {
            editBtnFunc()
            editClick = true
        }
    })
})()

const modalWrap = document.querySelector('.modalWrap')
const targetBalance = modalWrap.querySelector('[data-title="balance"]')
const targetEmail = modalWrap.querySelector('[data-title="email"]')
const editBtn = modalWrap.querySelector('button')
let editClick = false
let userOrgBalance

function drawMembers(data) {
    const targetBody = document.querySelector('main tbody')
    const templateBody = []

    if(!data) return false

    data.forEach((el, i) => {

        let CLDCBalance = withoutAbbreviation(el.CLDCBalance, 10 ** 18)
        if(!CLDCBalance) CLDCBalance = 0

            const template = `
            <tr>
                <td class="index">${i + 1}</td>
                <td data-value="email">${el.Email}</td>
                <td data-value="CLDCBalance">${CLDCBalance}</td>
                <td data-value="CLDCOrgBal" class="isHidden">${el.CLDCBalance}</td>
            </tr>
        `
        templateBody.push(template)
    })
    targetBody.innerHTML = templateBody.join('')

    const triggerBtnEls = document.querySelectorAll('tbody tr, .closeBtn')
    triggerBtnEls.forEach(el => {
        el.addEventListener('click', el => {

            if(el.currentTarget.tagName === 'TR') {
                const getEmail = el.currentTarget.querySelector('[data-value="email"]').innerText
                const getBalance = el.currentTarget.querySelector('[data-value="CLDCBalance"]').innerText
                userOrgBalance = el.currentTarget.querySelector('[data-value="CLDCOrgBal"]').innerText
                targetEmail.value = getEmail
                targetBalance.value = getBalance
            }

            // CSS
            if(modalWrap.classList.contains('open')) {
                editBtnFunc(false)
                editClick = false
            }
            modalWrap.classList.toggle('open')

            // textarea css
            const textAreaEls = modalWrap.querySelectorAll('textarea')
            textAreaEls.forEach(el => {
                el.style.height = `calc(${el.scrollHeight}px + 10%)`
            })
        })
    })
    renderPagination()
}

function editBtnFunc(clicked = true) {
    
    if(clicked) {
        targetBalance.parentElement.classList.add('editMode')
        targetBalance.readOnly = false
        editBtn.innerText = '적용하기'
    } else {
        targetBalance.parentElement.classList.remove('editMode')
        targetBalance.readOnly = true
        editBtn.innerText = '변경하기'
    } 
}