let convert=document.querySelector("button.convert");
let vid_title=document.querySelector("p.audio-title");
let search=document.querySelector("input.search");
let output=document.querySelector("div.output");
let audio=document.querySelector("audio");
let internetError=document.querySelector("p.internet-error");

convert.onclick=()=>{

    output.style.display="block";
    let data=search.value;
    let yt_id=null;
    if(data.includes("v=")){
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
                if(data.includes("shorts")){
                 internetError.style.display="block";
                 internetError.innerText="Shorts Are Not Allowed!";
                }
                else{
                    const response = await fetch(url, options);
                    const result = await response.json();
                    internetError.style.display="none";
                    vid_title.style.display="block"; 
                    vid_title.innerText=result["title"];
                    let Total_length=result["adaptiveFormats"].length;
                    audio.style.display="block";
                    audio.src=result["adaptiveFormats"][Total_length-1]["url"];
                }
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
