export function renderPagination() {
    const rowsPerPage = 20
    const rows = document.querySelectorAll('tbody tr')
    const rowsCount = rows.length
    const pageCount = Math.ceil(rowsCount/rowsPerPage)
    const numbers = document.querySelector('.pagination ol')
    const prevPageBtn = document.querySelector('.pagination .prev')
    const nextPageBtn = document.querySelector('.pagination .next')
    let pageActiveIdx = 0
    let currentPageNum = 0
    let maxPageNum = 3

    // 페이지네이션 생성
    for(let i=1; i <=pageCount; i++) {
        numbers.innerHTML += `<li><a href="#none">${i}</a></li>`
    }
    const numberBtn = numbers.querySelectorAll('a')

    // 페이지네이션 번호 감추기
    for(let nb of numberBtn) {
        nb.classList.add('isHidden')
    }
    numberBtn.forEach((el, i) => {
        el.addEventListener('click', (e) => {
            // 테이블 출력
            displayRow(i)
        })
    })

    function displayRow(idx) {

        let start = idx * rowsPerPage
        let end = start + rowsPerPage
        let rowsArr = [...rows]
    
        for(let ra of rowsArr) {
            ra.classList.add('isHidden') 
        }
    
        let newRows = rowsArr.slice(start, end)
        for(let nr of newRows) {
            nr.classList.remove('isHidden')
        }
        for(let nb of numberBtn) {
            nb.classList.remove('active')
        }
        numberBtn[idx].classList.add('active')
    }
    displayRow(0)

    // 페이지네이션 그룹 표시 함수
    function displayPage(num) {
        // 페이지네이션 번호 감추기
        for(let nb of numberBtn) {
            nb.classList.add('isHidden')
        }
        let totalPageCount = Math.ceil(pageCount / maxPageNum)
        let pageArr = [...numberBtn]
        let start = num * maxPageNum
        let end = start + maxPageNum
        let pageListArr = pageArr.slice(start, end)

        for(let item of pageListArr) {
            item.classList.remove('isHidden')
        }
        if(pageActiveIdx === 0) {
            prevPageBtn.classList.add('isHidden')
        } else {
            prevPageBtn.classList.remove('isHidden')
        }

        if(pageActiveIdx === totalPageCount-1) {
            nextPageBtn.classList.add('isHidden')
        } else {
            nextPageBtn.classList.remove('isHidden')
        }
    }
    displayPage(0)

    nextPageBtn.addEventListener('click', () => {
        let nextPageNum = pageActiveIdx * maxPageNum + maxPageNum
        displayRow(nextPageNum)
        ++pageActiveIdx
        displayPage(pageActiveIdx)
    })

    prevPageBtn.addEventListener('click', () => {
        let nextPageNum = pageActiveIdx * maxPageNum - maxPageNum
        displayRow(nextPageNum)
        --pageActiveIdx
        displayPage(pageActiveIdx)
    })
}