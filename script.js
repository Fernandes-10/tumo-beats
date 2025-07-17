
window.onload = async function() {

    //Carregar dados da internet (data.json)
    let request = await fetch("data.json");
    let audiodata = await request.json();
  
    //Carregar o service worker
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js")
    }




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



    // Funções
    function changeTitle(value) {
        title.innerText = value;
    }
    function updateInputbar(value, bar) {
        bar.style.transform = "scaleX(" + value / 100 +")"  
    }

    previousButton.onclick = function() {
        currentmusic--;
        if(currentmusic <0){
            currentmusic = audiodata.length - 1
        } 
        playAudio();
        console.log("previous", currentmusic)
    }
    
    playbutton.onclick = function() {
   
        if(audio.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    }
    nextbutton.onclick = function() {
        currentmusic++;
        if (currentmusic >= audiodata.length) {
            currentmusic = 0
        }
        playAudio();
    }
    scrubinput.querySelector("input").oninput = function(event) {
        let bar = scrubinput.querySelector(".range-bar");
        let value = event.target.value 
        scrubaudio(value);    
        updateInputbar(value, bar);

    }
    volumeInput.querySelector("input").oninput = function(event) {
        let bar = volumeInput.querySelector(".range-bar");
        let value = event.target.value;
        audio.volume = value / 100;
        updateInputbar(event.target.value, bar);
       
    }
    fileinput.oninput = function(event){
        let file = Array.from(fileInput.files)[0];
        let reader = new FileReader();
        reader.onload = function() {
        audioData.push({
        title: file.name,
        url: reader.result
        });
        }
        if (file) {
        reader.readAsDataURL(file);
        }
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
    audio.ontimeupdate = function() {

        if(!audio.src) return;
        let bar = scrubinput.querySelector(".range-bar");
        let  value = (audio.currentTime / audio.duration) * 100;
        updateInputbar(value, bar)
        console.log(value)
      }
      

      function scrubaudio(value){

        if (!audio.src) return
        audio.currentTime = audio.duration * (value / 100)
      }

    
    

    function playAudio() {
        audio.src = audiodata[currentmusic].url
        changeTitle(audiodata[currentmusic].title)
        audio.play();
    }

    function pauseAudio() {
        audio.pause();
    }
 }
        
        





