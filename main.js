import express from 'express'
import bodyParser from 'body-parser'
import { getAllDatas, postData, getKegiatan, getAllKegiatan, postKegiatan, homePage } from './router.js'
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

app.listen(process.env.PORT || 7000,()=>{
    console.log(`Listening to Port ${config.port}`)
})
