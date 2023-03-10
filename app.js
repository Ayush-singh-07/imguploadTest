const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer  = require('multer')



app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))


//db conn

mongoose.connect('mongodb+srv://admin-ayush:roronoaZoro7@atlascluster.wumy5wn.mongodb.net/testDB').then(()=>console.log("DB Connected"))

const imageSchema = new mongoose.Schema({
    name: String,
    img:String,
})

const Image = new mongoose.model("Image_upload", imageSchema);

//setting multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb)=>{
        const filename_suffix = (Date.now()+path.extname(file.originalname))
        cb(null,  filename_suffix)
    }
})
const upload = multer({ storage: storage })


app.get('/', (req, res) =>{

        Image.find({})
        .then((result)=> {
            res.render('index' , {data: result})
        })
        .catch((err)=>console.log("err: "+err))

})


app.post('/', upload.single('uploaded_file'), (req, res)=>{
    
    const uploaddata = new Image({
        name: req.body.txt,
        img: req.file.filename
    })

    uploaddata.save()
    .then(()=> res.redirect('/'))
    .catch((err)=>console.log("err: "+err))

})

app.listen(3000,()=>{
    console.log("Listning on 3000");
})