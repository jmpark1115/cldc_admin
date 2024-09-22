import { CallBackendAPIFunction } from './getApi'

const CLIENTID = "38962661175-6lia53cvberqj4d39vc227f6i9cbjcnj.apps.googleusercontent.com"

async function loginSuccess(response) {
    const GIDT = response.credential
    localStorage.setItem('GIDT', GIDT)

    try {

        let userData = await CallBackendAPIFunction('GetMyPII', null, true)
        
        Object.keys(userData).forEach(el => localStorage.setItem(el, userData[el]))

        location.replace('/members.html')
    
    } catch (error) {

        console.error('Error:', error.message)
        return null
    }
}

export function initializeGoogleSignIn() {

    google.accounts.id.initialize({
        client_id: CLIENTID,
        auto_select: true,
        itp_support: true,
        callback: loginSuccess
    })
}

export function renderGoogleSignInButton() {
    const googleBtn = document.getElementById("buttonDiv")
    google.accounts.id.renderButton(googleBtn, {
        width: "100%",
        auto_select: true,
    })
}
