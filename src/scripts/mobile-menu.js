exports.initMobileMenu = function mobileMenu(){

    var menu = document.getElementsByClassName('mobile-menu')[0];
    var navMobileBtn = document.getElementById('sidenav-button--slide-left');
    var mobileExternalWrapper = document.getElementById('external-wrapper');
    var backBtn = document.getElementsByClassName('sidenav-menu__close')[0];

    function toogleActive() {
        menu.classList.toggle('active');
        mobileExternalWrapper.classList.toggle('active');
    }

    navMobileBtn.addEventListener('click', toogleActive, false);
    mobileExternalWrapper.addEventListener('click', toogleActive, false);
    backBtn.addEventListener('click', toogleActive, false);

};
