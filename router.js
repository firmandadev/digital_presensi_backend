import { connectDB } from './dbhandler.js'
import config from './config.js'

function getAllDatas(req,res){
    connectDB(config.users[0].user,config.users[0].pass, async (db)=>{
        console.log("Mengambil Data")
        res.send(await db.collection(config.collection.presensi).find().toArray())
    })
}
function postData(req,res){
    connectDB(config.users[0].user,config.users[0].pass,async (db)=>{
        let obj={
            nama:req.body.nama,
            jabatan:req.body.jabatan,
            unit_kerja:req.body.unit_kerja,
            signature:req.body.signature,
            upload_time:req.body.upload_time,
	    no_hp : req.body.no_hp,	
            id_acara : req.body.id_acara

        }
        await db.collection(config.collection.presensi).insertOne(obj)
        res.send({
            "message" : "Anda berhasil melaksanakan presensi",
		"response_code":200
        })
    })
}
function getKegiatan(req,res){
    console.log("getKegiatan")
    connectDB(config.users[0].user, config.users[0].pass, async (db)=>{
        let datas = await db.collection(config.collection.acara).findOne({id_kegiatan:req.params['idKegiatan']})
        res.send(datas)
    })
}
function getDatas(req,res){
  connectDB(config.users[0].user, config.users[0].pass, async (db)=>{
    let datas = await db.collection(config.collection.presensi).find({id_acara:req.params['idKegiatan']}).toArray()
    res.send(datas)
  })
}
function getAllKegiatan(req,res){
    connectDB(config.users[0].user, config.users[0].pass, async (db)=>{
        let datas = await db.collection(config.collection.acara).find().toArray()
        res.send(datas)
    })
}
function postKegiatan(req,res){
    connectDB(config.users[0].user,config.users[0].pass,async (db)=>{
        let obj={
            id_kegiatan : req.body.id_kegiatan,
            nama_kegiatan : req.body.nama_kegiatan,
            waktu_akhir : req.body.waktu_akhir,
            waktu_awal : req.body.waktu_awal,
            tanggal_kegiatan : req.body.tanggal_kegiatan

        }
	try{
        await db.collection(config.collection.acara).insertOne(obj)
        res.send({
            "message" : "Anda berhasil membuat kegiatan baru",
		"err_message" :""
        })} catch(err){
		res.send({
			"message" : "Anda gagal membuat kegiatan baru",
			"err_message":err.message
		})
	}
    })
}
function homePage(req,res){
	res.send("Hello World!")
}
export { getAllDatas, postData, getKegiatan, getAllKegiatan, postKegiatan, homePage, getDatas }
