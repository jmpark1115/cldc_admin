import { initializeGoogleSignIn, renderGoogleSignInButton } from './api/googleSignIn'

window.onload = () => {

    // check cookie
    if (document.cookie.includes('g_state')) {
        document.cookie = "g_state=; expires=0; path=/;"
    } 

    initializeGoogleSignIn()
    renderGoogleSignInButton()
}