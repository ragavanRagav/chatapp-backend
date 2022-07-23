var { Message, Video } = require("../Sequalize/models");
var { v4 } = require("uuid");
var fs = require("fs");
var path = require("path");
const writeMessage = async (data) => {
  try {
    let message = await Message.create({
      id: v4(),
      email: data?.user,
      message: data?.message,
      timeStamp: data?.timeStamp
    });
    return message;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getMessage = async (req, resp) => {
  try {
    const data = req?.body;
    let messages = await Message.findAll({
      where: {
        email: data?.email,
      },
    });
    resp.send({
      status: true,
      messages: messages,
    });
  } catch (err) {
    console.log(err);
    return {
      status: false,
    };
  }
};

const servVideo=(req, res)=> {
    try{
      const range = req?.headers?.range;
      const video = req?.params?.name;
      console.log(video);
      if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath =path.resolve(__dirname,`../storage/${video}`);
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
    }catch(err){
        console.log(err);
        res.status(404).send("Video not found");
    }
}

const saveVideo=async(req,res)=>{
  try{
    const file = req?.files?.file;
    const filename=file?.name;
    const data = req?.body;

    const videoPath =path.resolve(__dirname,`../storage/${filename}`);
    fs.writeFile(videoPath, file?.data, function (err,data) {
      if (err) {
        return console.log("Error ->",err);
      }
    });
    
    let video = await Video.create({
      id: v4(),
      email: data?.user,
      name: filename,
      timeStamp: (new Date()).getTime()
    });
    res.status(200).send({
      status:true,
      message: `Successfully Uploaded ${video?.name}`
    })
  }catch(err){
    console.log(err);
    res.status(400).send({status:false})
  }
}

const getAllVideos=async(req,res)=>{
  try{
    const data = req?.body;
    let videos = await Video.findAll({
      where: {
        email: data?.email,
      },
    });
    res.status(200).send({
      status:true,
      videos:videos
    })
  }catch(err){
    console.log(err);
    res.status(400).send({
      status:false
    })
  }
}

module.exports = { writeMessage, getMessage, servVideo, saveVideo, getAllVideos};
