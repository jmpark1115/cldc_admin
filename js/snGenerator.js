import { CallBackendAPIFunction } from './api/getApi'

{
    const validateTarget = document.querySelector('form')
    const snGeneratorBtnEl = validateTarget.querySelector('button')
    const inputEls = validateTarget.querySelectorAll('input')

    const handleAddNewMiner = async () => {
        try {
            if(validateTarget.checkValidity()) {

                const snInput = document.querySelector('input[data-value="serialNumber"]')
                const pkInput = document.querySelector('input[data-value="privateKey"]')

                const addNewInfo = {
                    SN: snInput.value, 
                    PK: pkInput.value,
                }

                const data = await CallBackendAPIFunction('AddNewMiner', addNewInfo)
                if (data.SN) {
                    alert('Successfully Added')
                    inputEls.forEach((el) => (el.value = ''))

                } else {

                    alert('An error occurred while adding a new miner.')
                }
            } else {
                
                inputEls.forEach(el => el.classList.add('invalid'))
            }
        } catch (error) {
            console.error(error)
            alert('An error occurred while adding a new miner.')
        }
    }

    snGeneratorBtnEl.addEventListener('click', handleAddNewMiner)
}
