import { PutObjectAclCommand, S3Client } from "@aws-sdk/client-s3"
import uniqid from "uniqid"

export async function POST(req){
    const data = req.formData()
    if(data.get('file')){
        const file = data.get('file')
        const s3_client = new S3Client({
            region: 'ap-south-1',
            credentials : {
                accessKeyId : process.env.AWS_ACCESS_KEY,
                secretAccessKey : process.env.AWS_SECRET_KEY,

            },

        });
        const ext = file.name.split('.').slice(-1)[0]
        const newFileName = uniqid()+'.'+ext
        const chunks = []
        for await (const chunk of file.stream()){
            chunks.push(chunk)
        }
        const buffer = Buffer.concat(chunks)
        const bucket = 'zubair-easy-order'

        await s3_client.send(new PutObjectAclCommand({
            Bucket : bucket,
            key : newFileName,
            ACL : 'public-read',
            ContentType : file.type,
            body: buffer


        }))

        const link = 'https://'+bucket+'.s3.amazonaws.com/'+newFileName
        return Response.json(link)

    }

    return Resposne.json(true)
}