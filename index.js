let convert=document.querySelector("button.convert");
let vid_title=document.querySelector("p.audio-title");
let search=document.querySelector("input.search");
let output=document.querySelector("div.output");
let audio=document.querySelector("audio");
let internetError=document.querySelector("p.internet-error");

// Adding Some GSAP
let t=gsap.timeline();

t.from("div.top-box,div.web",{
    y:-70,
    stagger:0.4,
    opacity:0
})

t.from("div.main-box",{
    opacity:0,
    x:-300
})

t.from("p.insert-url,div.search-part",{
    opacity:0,
    stagger:0.3,
    x:-30
})

t.to("h2.yt-to-mp3",{
    duration:1.5,
    text:"YouTube to MP3 Converter"
})

t.to("p.yt-desc",{
    duration:3,
    text:"Our YouTube to MP3 Converter allows you to convert your favorite YouTube videos to MP3 (audio) files and to download them for FREE. YT2Music works on your desktop, tablet and mobile device without the installation of any additional apps. The usage of YT2Music is free, and safe!"
})

convert.onclick=()=>{

    output.style.display="block";
    let data=search.value;
    let yt_id=null;
    if(data.includes("shorts")){
        let split_url=data.split(/[/]/);
        yt_id=split_url[4];
    }
    
    else if(data.includes("v=")){
        let split_url=data.split(/[&?]/);
        for (i of split_url){
            if(i.startsWith("v=")){
                yt_id=i.substring(2);
                break
            }
        }
    }   
    else if(data.includes("si=")){
        let split_url=data.split(/[/?]/);
        yt_id=split_url[3];
    }
    

    let searchYT=()=>{

        const url = `https://yt-api.p.rapidapi.com/dl?id=${yt_id}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'c0e897e06bmshf1b07b02427bc79p1edb79jsn0132d0db5ef9',
                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
            }
        };
    
        async function getAudio(){
    
            try{
                const response = await fetch(url, options);
                const result = await response.json();
                internetError.style.display="none";
                vid_title.style.display="block"; 
                vid_title.innerText=result["title"];
                let Total_length=result["adaptiveFormats"].length;
                audio.style.display="block";
                audio.src=result["adaptiveFormats"][Total_length-1]["url"];
                
            }
            catch(err){
                internetError.style.display="block";
                internetError.innerText="Please Check Your Internet :(";
                vid_title.style.display="none"; 
                audio.style.display="none";
    
            }
               
        }
         getAudio()
        }

    if(data.includes("https://www.youtube.com/") || data.includes("https://youtu.be/")){
        searchYT();
    }
    else{
        alert("Invalid Youtube URL :(")
    }

}
