const express = require('express');
const app=express();
const path= require('path')
const pa= (__dirname,"/public/index.html")
const pa1= (__dirname,"/public/privacyp.html")
const pa2= (__dirname,"/public/termsofuse.html")
console.log(pa);
app.use(express.json())
const ytdl  =require('ytdl-core')


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
   
     const videoURL= req.query.videoURL;
     let itag= req.query.itag;
     if(itag=="mp4")
     {
        res.header('Content-Disposition','attachment; filename="video.mp4')
        ytdl(videoURL,{
            filter: format => format.itag=itag,
        }).pipe(res)
     }
     else if(itag=="mp3")
     {
        res.header('Content-Disposition','attachment; filename="Audio.mp3')
        ytdl(videoURL,{
            filter: format => format.itag=itag,
        }).pipe(res)
     }
  
 })


app.listen(3000,()=>{
    console.log("Server Running on port 3000")
})