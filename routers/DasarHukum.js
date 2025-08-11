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
      let body = req.body
      if( body.doc_date ){ body.doc_date = new Date(body.doc_date) }
      let datas = 
      await db.collection(config.collection.legal).insertOne(body)
      DasarHukumRoutes.sentObject.message = "Berhasil Upload Dokumen"
      DasarHukumRoutes.sentObject.response_code = 200
      DasarHukumRoutes.sentObject.datas = datas
      res.send(DasarHukumRoutes.sentObject)
    })
    }
  static getDocuments(req,res){
    connectDBKKP(config.users[0].user, config.users[0].pass, async (db)=>{
      let datas = await db.collection(config.collection.legal).find({}).sort({doc_date:-1}).toArray()
      DasarHukumRoutes.sentObject.message = "Berhasil Mengambil Dokumen"
      DasarHukumRoutes.sentObject.response_code = 200
      DasarHukumRoutes.sentObject.datas = datas
      res.send(DasarHukumRoutes.sentObject)
      })
    }
  static updateDocuments(req,res){
    connectDBKKP(config.users[0].user, config.users[0].pass, async (db)=>{
      let body = req.body
      if( body.doc_date ){ body.doc_date = new Date(body.doc_date) }
      let datas = await db.collection(config.collection.legal).updateOne({doc_id:req.params['doc_id']},{$set:body})
      DasarHukumRoutes.sentObject.message = "Berhasil Update Data"
      DasarHukumRoutes.sentObject.response_code = 200
      DasarHukumRoutes.sentObject.datas = datas
      console.log(DasarHukumRoutes.sentObject)
      res.send(DasarHukumRoutes.sentObject)
         
    })

  }
}
