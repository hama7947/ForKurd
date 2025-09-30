const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const AppModel = require('../models/App');

const uploadDir = path.join(__dirname,'..','uploads');
const storage = multer.diskStorage({
  destination: (req,file,cb)=> cb(null, uploadDir),
  filename: (req,file,cb)=> {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.round(Math.random()*1E9) + ext);
  }
});
const upload = multer({ storage });

router.post('/', auth, upload.fields([{name:'icon', maxCount:1},{name:'apk', maxCount:1},{name:'screenshots', maxCount:5}]), async (req,res)=>{
  try{
    const { title, description, category } = req.body;
    const icon = req.files?.icon?.[0] ? `/uploads/${req.files.icon[0].filename}` : '';
    const apk = req.files?.apk?.[0] ? `/uploads/${req.files.apk[0].filename}` : '';
    const screenshots = (req.files?.screenshots||[]).map(i=> `/uploads/${i.filename}`);
    const app = new AppModel({ title, description, category, iconUrl:icon, apkUrl:apk, screenshots });
    await app.save();
    res.json(app);
  }catch(err){
    console.error(err);
    res.status(500).send('Upload failed');
  }
});

router.get('/', async (req,res)=>{
  try{
    const { q, category, page=1, limit=12 } = req.query;
    const filter = {};
    if(q) filter.$text = { $search: q };
    if(category) filter.category = category;
    const apps = await AppModel.find(filter).skip((page-1)*limit).limit(Number(limit)).sort({createdAt:-1});
    res.json(apps);
  }catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req,res)=>{
  try{
    const app = await AppModel.findById(req.params.id);
    if(!app) return res.status(404).json({ message:'Not found' });
    res.json(app);
  }catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/:id/download', async (req,res)=>{
  try{
    const app = await AppModel.findById(req.params.id);
    if(!app) return res.status(404).json({ message:'Not found' });
    app.downloads = (app.downloads || 0) + 1;
    await app.save();
    res.json({ ok:true });
  }catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
