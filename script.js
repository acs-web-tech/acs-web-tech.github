if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js").then((e)=>{
    
    })

}

let startBtn = document.querySelector(".ini-btn")
let promptBtn =  document.querySelector("#acceptNotRemind")
let promptBtnOk = document.querySelector("#accept")
let confirmation = document.querySelector(".confirmation")
let video_duration = document.querySelector("#vid-inp")
let vidcount = document.querySelector("#vid-dur")
let duration =  document.querySelector(".duration")
let scr = document.querySelector(".screen")
let stop  = document.querySelector(".btn-source")
let vidupDur;
let videorec  = document.querySelectorAll(".src-video>video")

document.ondblclick = (e)=>{
	e.preventDefault()
}
document.oncontextmenu = (e)=>{
	e.preventDefault()
}
 async function recordStream(srcvid){
	let source  =await navigator.mediaDevices.getDisplayMedia({video:true,audio:true})
	video_duration.srcObject = source
	return source
}

 function HandleSource(source){

  

	let data=[]

   source.then((evid)=>{
	let audio = navigator.mediaDevices.getUserMedia({video:false,audio:true})
	   
	   audio.then((eaud)=>{
		  
	   let streamComplie = new MediaStream([...evid.getTracks(),...eaud.getTracks()])
	 
	   let media = new MediaRecorder(streamComplie)
	   media.start()
	 
	   media.onstart= (e)=>{
		  
		     vidcount.srcObject = evid
		
		    
		HandleDuration(video_duration.currentTime)
		stop.onclick=(e)=>{
			media.stop()
			
		 }
	   }
	 
	   media.onstop=(e)=>{
		   
         video_duration.ontimeupdate = null
		 
	   }
	   media.ondataavailable=(e)=>{
		   data.push(e.data)
		
		   let blob = new Blob(data,{type:"video/mp4"})
		   let url = URL.createObjectURL(blob)
		   document.querySelector(".cd").href=url
		   document.querySelector(".cd").click()
	   }
	   })
   })
}

function HandleDuration(mun){
	
	 video_duration.ontimeupdate=()=>{
		
		
		let sec =Math.floor(vidcount.currentTime-mun)%60
		let min = Math.floor(Math.floor(vidcount.currentTime-mun)/60)%60
		let hours  = Math.floor(Math.floor(vidcount.currentTime-mun)/3600)
	
		duration.innerText=`${hours<=9?"0"+(hours):(hours)}:${min<=9?"0"+(min):(min)}:${sec<=9?"0"+(sec):(sec)}`
	}
}

let recordSource  = recordStream(video_duration)


startBtn.onclick=(e)=>{
	if(!document.cookie.includes("prompt")){
		confirmation.style.display="block"
	}
	else{
      HandleSource(recordSource)
	}
}
promptBtn.addEventListener("click",(e)=>{
	if(document.cookie.includes("prompt")){
		confirmation.style.display="none"
		HandleSource(recordSource)
	}
	else{
		document.cookie="prompt="+false+";expires="+new Date((new Date()).setTime(new Date().getTime()+(30*24*60*60*1000))).toUTCString()+";"
	    confirmation.style.display="none"
		HandleSource(recordSource)
	}
})
