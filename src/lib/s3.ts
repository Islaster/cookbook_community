import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

export const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  export async function uploadToS3(fileBuffer: Buffer, fileName: string, fileType: string) {
    const key = `uploads/${randomUUID()}-${fileName}`;
  
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: fileBuffer,
      ContentType: fileType,
    });
  
    await s3.send(command);
  
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }

  export const streamToBuffer = async (stream: ReadableStream<Uint8Array>): Promise<Buffer> => {
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
  
    return Buffer.concat(chunks);
  };