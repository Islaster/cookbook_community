import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime"; // get content type from file extension
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadToS3 = async (fileName: string, localPath: string) => {
  const fileContent = fs.readFileSync(localPath);
  const contentType = mime.getType(localPath) || "image/jpeg";
  console.log("Uploading to: ", `uploads/${fileName}`);

  const uploadParams = {
    Bucket: "cookrecipeimages"!,
    Key: `recipes/${fileName}`,
    Body: fileContent,
    ContentType: contentType,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/recipes/${fileName}`;
};

console.log(process.env.AWS_REGION);
