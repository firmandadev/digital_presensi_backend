import { connectDB, connectDBKKP } from './dbhandler.js'
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
function getKKP(req,res){
    connectDBKKP(config.users[0].user, config.users[0].pass, async (db)=>{
        let datas = await db.collection(config.collection.upts).find().toArray()
        res.send(datas)
    })
}
function homePage(req,res){
	res.send("Hello World!")
}
function postKKP(req,res){
    connectDBKKP(config.users[0].user,config.users[0].pass,async (db)=>{
        let obj={
            id_kegiatan : req.body.id_kegiatan,
            nama_upt : req.body.nama_upt,
            tanggala : req.body.tanggala,
            tanggalb : req.body.tanggalb,
            periodea : req.body.periodea,
            periodeb : req.body.periodeb,
            linknhp : req.body.linknhp,
            linklhp : req.body.linklhp,
            linksurat : req.body.linksurat,
            linkblangko : req.body.linkblangko,
        }
	try{
        await db.collection(config.collection.upts).insertOne(obj)
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
function getKKPContents(req,res){
    connectDBKKP(config.users[0].user, config.users[0].pass, async (db)=>{
         let datas = await db.collection(config.collection.upts).findOne({id_kegiatan:req.params['idKKP']})
         let contents = await db.collection(config.collection.contents).find({id_kegiatan:req.params['idKKP']}).toArray()
        res.send({
            upt: datas,
            contents : contents
        })
    })
}
function postKKPContents(req,res){
    connectDBKKP(config.users[0].user,config.users[0].pass,async (db)=>{
        let obj={
            user : req.body.user,
            id_content : req.body.id_content,
            id_kegiatan : req.body.id_kegiatan,
            catatan : req.body.catatan,
            bidang : req.body.bidang,
            keterangan : req.body.keterangan,
            bulan : req.body.bulan,
            noberkas : req.body.noberkas,
            saran : req.body.saran,
        }
	try{
        await db.collection(config.collection.contents).insertOne(obj)
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
function deleteKKPContents(req,res){
    connectDBKKP(config.users[0].user, config.users[0].pass, async (db)=>{
        try{
            let datas = await db.collection(config.collection.contents).deleteOne({id_content:req.params['idContent']})
            res.send({
                message : "Berhasil Menghapus Data"
            })
        }catch(err){
            res.send({
                message : "Gagal Menghapus Data"
            })
        }
         
    })
}
function updateKKP(req,res){
    connectDBKKP(config.users[0].user, config.users[0].pass, async (db)=>{
        try{
            let datas = await db.collection(config.collection.upts).updateOne(
                {
                    id_kegiatan:req.params['idKKP']
                },{$set:{
                    id_kegiatan : req.body.id_kegiatan,
                    nama_upt : req.body.nama_upt,
                    tanggala : req.body.tanggala,
                    tanggalb : req.body.tanggalb,
                    periodea : req.body.periodea,
                    periodeb : req.body.periodeb,
                    linknhp : req.body.linknhp,
                    linklhp : req.body.linklhp,
                    linksurat : req.body.linksurat,
                    linkblangko : req.body.linkblangko,
                }})
            res.send({
                message : "Berhasil Update Data"
            })
        }catch(err){
            res.send({
                message : "Gagal Update Data",
                err : err.message
            })
        }
         
    })
}
function loginKKP(req,res){
    connectDBKKP(config.users[0].user,config.users[0].pass,async (db)=>{
	try{
        let datas = await db.collection(config.collection.accounts).findOne({username:req.body.username,password:req.body.password})
        if(datas !== null){
        res.send({
            success : true,
            message : "Login Berhasil",
            loginInfo : {
                datas : datas,
                token : "ABCADAberapa"
            }
        })}else{
        res.send({
            success : false,
            message : "Login Gagal",
        })    
        }
    
    } catch(err){
		res.send({
			"message" : "Anda gagal membuat kegiatan baru",
			"err_message":err.message
		})
	}
    })
}
export { getAllDatas, postData, getKegiatan, getAllKegiatan, postKegiatan, homePage, getDatas, postKKP, getKKP, getKKPContents, postKKPContents, deleteKKPContents, updateKKP, loginKKP }
