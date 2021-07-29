const { json } = require('express');
const express = require('express');
const app=express();
const path= require('path')
const pa= (__dirname,"/public/index.html")
const pa1= (__dirname,"/public/privacyp.html")
const pa2= (__dirname,"/public/termsofuse.html")
const routers=express.Router();
console.log(pa);
app.use(express.json())
const ytdl  =require('ytdl-core')

const port= process.env.PORT || 3000;

app.get("/",(req,res)=>{    
        res.sendFile(__dirname+ pa)

})

app.get("/privacyp",(req,res)=>{
    res.sendFile(__dirname+ pa1)

})

app.get("/termsofuse",(req,res)=>{
    res.sendFile(__dirname+ pa2)

})

app.get("/videoInfo",async function(req,res){
    const videoURL= req.query.videoURL;
     const info =await ytdl.getInfo(videoURL)
     res.status(200).json(info)
 
 
 })

 app.get("/download",(req,res)=>{
     try {
        let itag= req.query.itag;
        console.log(itag);
        if(itag=="mp3")
        {
           const videoURL= req.query.videoURL;
       
           res.header("Content-Disposition",'attachment; filename="Audio.mp3')
           ytdl(videoURL,{
               filter: format => format.itag=="mp3",
           }).pipe(res)
            // async function getdata()
            // {
            //     const videoURL= req.query.videoURL;
            //    let info =await ytdl.getInfo(videoURL)
            //     console.log("video id"+ info.videoDetails.videoId)

            //      info =await ytdl.getInfo(info.videoDetails.videoId)
            //     let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
            //     console.log('Formats with only audio: ' + audioFormats.length);
            // }
            // getdata()
               
        }
        else
        {
           const videoURL= req.query.videoURL;
              res.header("Content-Disposition",'attachment;\ filename="Video.mp4"')
              ytdl(videoURL,{
                  filter: format => format.itag==itag,
              }).pipe(res)
        }
     } catch (error) {
         console.log("some thing wrong in dwlod")
     }
   
 })


app.listen(port,()=>{
    console.log("Server Running on port 3000")
})