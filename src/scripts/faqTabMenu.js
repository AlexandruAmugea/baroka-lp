exports.initTabMenuFaq = function initTabMenuFaq(){
    
        var menuElements = document.querySelectorAll('.tab-menu-faq li a');
        var sections  = document.querySelectorAll('.section-faq-tab-section');
        var backToTopElements = document.querySelectorAll('.section-faq-tab-section-selected');
        var menu = document.querySelector('.tab-menu-faq');

        function goBackToTop(){
            backToTopElements.forEach(function(el){
                el.addEventListener('click', function(){
                    menu.scrollIntoView(
                        {
                            behavior: "smooth",
                            block: 'start'
                        }
                    );
                });
            });
        };

        function setInactive(){
            menuElements.forEach(function(el){
                el.classList.remove('active');
            });
            sections.forEach(function(section){
                section.classList.remove('active');
            });
        };

        function initFirstTime(){
            menuElements[0].classList.add('active');
            sections[0].classList.add('active');
        }

        function setClick() {
            menuElements.forEach(function(elem){ 
                elem.addEventListener('click', function(e){ 
                    setInactive();
                    var element = document.getElementById(elem.getAttribute('b-link'));
                    element.scrollIntoView(
                        {
                            behavior: "smooth",
                            block: 'start'
                        }
                    );
                    element.classList.add('active');
                    elem.classList.add('active');
                    e.preventDefault();
                    e.stopPropagation();
                });
            });
        };

        goBackToTop();
        setClick();
        initFirstTime();
    };
    