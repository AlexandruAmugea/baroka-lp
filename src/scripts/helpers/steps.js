exports.initSteps = function initSteps(){
    let stepsArray = document.getElementsByClassName('tile-steps');
    let imagesArray = document.getElementsByClassName('image-tile');

    if(stepsArray.length > 0 && imagesArray.length > 0 ) {
        this.removeAll = function(){
            stepsArray[0].classList.remove('active');
            stepsArray[1].classList.remove('active');
            stepsArray[2].classList.remove('active');
        };
    
        this.switchImage = function(index){
            imagesArray[0].classList.remove('active');
            imagesArray[1].classList.remove('active');
            imagesArray[2].classList.remove('active');
            imagesArray[index].classList.add('active');
        };
    
        this.bindClick = (elem, index) => {
            elem.addEventListener('click', () =>{
                this.removeAll();
                elem.classList.add('active');
                this.switchImage(index);
            });
        };
    
        this.bindClick(stepsArray[0], 0);
        this.bindClick(stepsArray[1], 1);
        this.bindClick(stepsArray[2], 2);
    }

};