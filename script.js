
window.onload = async function() {

    //Carregar dados da internet (data.json)
    let request = await fetch("data.json");
    let audiodata = await request.json();
  



    // Variaveis de elementos
    let title = document.querySelector("#title"); 

    let previousButton = document.querySelector("#previous-button");

    let playbutton = document.querySelector("#play-button");

    let nextbutton = document.querySelector("#next-button");
    
    let scrubinput = document.querySelector("#scrub-input");

    let volumeInput = document.querySelector("#volume-input");

    let fileinput = document.querySelector("#file-input");
    
    let audio = document.querySelector("audio");
    let currentmusic = 0
    console.log(audiodata[currentmusic]);



    // Funções
    function changeTitle(value) {
    title.innerText = value;
    }
    function updateInputbar(value, bar) {
        bar.style.transform = "scaleX(" + value / 100 +")"  
    }

    previousButton.onclick = function() {
    console.log("previous button clicked");
    }
    
    playbutton.onclick = function() {
   
        if(audio.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    }
    nextbutton.onclick = function() {
        console.log("next button clicked");
    }
    scrubinput.querySelector("input").oninput = function(event) {
        let bar = scrubinput.querySelector(".range-bar");
        updateInputbar(event.target.value, bar); 
    }
    volumeInput.querySelector("input").oninput = function(event) {
        let bar = volumeInput.querySelector(".range-bar");
        updateInputbar(event.target.value, bar);
    }
    fileinput.oninput = function(){
        console.log("aqui");
    }

    audio.onplay = function(){
        let playIcon = document.querySelector("#icon-play");
        let pauseIcon = document.querySelector("#icon-pause");
        playIcon.style.display = "none";
        pauseIcon.style.display = "block"; 
    }
       
    audio.onpause = function(){
        let playIcon = document.querySelector("#icon-play");
        let pauseIcon = document.querySelector("#icon-pause");
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
    }

    function playAudio() {
        audio.src = audiodata[currentmusic].url
        audio.play();
    }

    function pauseAudio() {
        audio.pause();
    }
 }
        
        





