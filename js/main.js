import { ADMIN_ADDRESS } from './login'
window.onload = () => {
    // mob header
    const headerEl = document.querySelector('header')
    const mobMenuBtn = document.querySelector('header .hamburgerIcon')
    mobMenuBtn.addEventListener('click', () => headerEl.classList.toggle('clicked'))
    if(localStorage.getItem('Email') !== '247and.a@gmail.com') {
        alert('Access denied. You are not Authorized to access this page.')
        location.replace('/')
    }
} 