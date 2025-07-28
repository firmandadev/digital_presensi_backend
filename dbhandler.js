import { MongoClient }from 'mongodb'

export async function connectDB(user,pass,func){
    let url = `mongodb+srv://${user}:${pass}@absendigital.ukgo1la.mongodb.net/?retryWrites=true&w=majority&appName=absendigital`;
console.log('Halo')
    const client = new MongoClient(url)
    await client.connect()
    console.log("Connected to MongoDB!")
    const db = client.db('absendigital')
    console.log("Connected to Database!")
    await func(db)
    await client.close()
}
export async function connectDBKKP(user,pass,func){
    let url = `mongodb+srv://${user}:${pass}@absendigital.ukgo1la.mongodb.net/?retryWrites=true&w=majority&appName=absendigital`;
console.log('Halo')
    const client = new MongoClient(url)
    await client.connect()
    console.log("Connected to MongoDB!")
    const db = client.db('kkpdalbin')
    console.log("Connected to Database!")
    await func(db)
    await client.close()
}
