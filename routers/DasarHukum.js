import { connectDBKKP } from '../dbhandler.js'
import config from '../config.js'

export class DasarHukumRoutes{
    static sentObject = {
        message : undefined,
        response_code : undefined,
        datas : undefined
    }
    static postDocuments(req,res){
        connectDBKKP(config.users[0].user,config.users[0].pass,async (db)=>{
           let datas = 
            await db.collection(config.collection.legal).insertOne(req.body)
            DasarHukumRoutes.sentObject.message = "Berhasil Upload Dokumen"
            DasarHukumRoutes.sentObject.response_code = 200
            DasarHukumRoutes.sentObject.datas = datas
            res.send(DasarHukumRoutes.sentObject)
            })
    }
    static getDocuments(req,res){
        connectDBKKP(config.users[0].user, config.users[0].pass, async (db)=>{
            let datas = await db.collection(config.collection.legal).find().toArray()
            DasarHukumRoutes.sentObject.message = "Berhasil Mengambil Dokumen"
            DasarHukumRoutes.sentObject.response_code = 200
            DasarHukumRoutes.sentObject.datas = datas
            res.send(DasarHukumRoutes.sentObject)
            })
    }
}