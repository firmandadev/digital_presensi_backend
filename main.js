import express from 'express'
import bodyParser from 'body-parser'
import {DasarHukumRoutes} from './routers/DasarHukum.js'
import { 
  getAllDatas, 
  postData, 
  getKegiatan, 
  getAllKegiatan, 
  postKegiatan, 
  homePage,
  getDatas,
  postKKP,
  getKKP,
  getKKPContents,
  postKKPContents,
  deleteKKPContents,
  updateKKP,
  loginKKP,
  updateContent
} from './router.js'
import config from './config.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.get('/',homePage)
app.get('/api/getAllDatas',getAllDatas)
app.post('/api/postData',postData)
app.get('/api/getKegiatan/:idKegiatan',getKegiatan)
app.get('/api/getAllKegiatan',getAllKegiatan)
app.post('/api/postKegiatan',postKegiatan)
app.get('/api/getDatas/:idKegiatan',getDatas)
app.post('/api/pengendalian/kkp/uploadKKP',postKKP)
app.get('/api/pengendalian/kkp/getKKP',getKKP)
app.put('/api/pengendalian/kkp/updateKKP/:idKKP',updateKKP)
app.get('/api/pengendalian/kkp/getKKP/:idKKP',getKKPContents)
app.post('/api/pengendalian/kkp/uploadKKP/:idKKP',postKKPContents)
app.put('/api/pengendalian/kkp/updateContent',updateContent)
app.delete('/api/pengendalian/kkp/deleteKKP/:idContent',deleteKKPContents)
app.post('/api/pengendalian/login',loginKKP)
app.post('/api/dasarhukum/upload',DasarHukumRoutes.postDocuments)
app.get('/api/dasarhukum/get/all',DasarHukumRoutes.getDocuments)



app.listen(process.env.PORT || 7000,()=>{
    console.log(`Listening to Port ${config.port}`)
})
