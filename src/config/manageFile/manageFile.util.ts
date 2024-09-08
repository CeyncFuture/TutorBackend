/**
 * author Thilina Pahalagedara
 * created on 08-09-2024-20h-08m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';
import Config from "./manageFile.config";
import { IUploadResponse, IPresignedUrlResponse, IDeleteResponse } from "./manageFile.interface";
import InternalServerError from "../../module/errors/classes/InternalServerError";
import { constants } from "../../constants";

// Initialize S3 client with config
const config = Config.getS3Config();
const s3Client = new S3Client({
  region: config.region,
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  },
});

// Helper function to generate a unique filename
const generateUniqueFileName = (originalName: string): string => {
  const fileExtension = originalName.split('.').pop(); // Get the file extension
  const uniqueName = uuidv4(); // Generate a unique ID
  return `${uniqueName}.${fileExtension}`; // Return unique name with the original extension
};

// Upload file to S3 with dynamic folder and unique filename
const uploadFileToS3 = async (folderName: string, fileName: string, fileContent: Buffer): Promise<IUploadResponse> => {
  const uniqueFileName = generateUniqueFileName(fileName); // Generate unique filename
  const filePath = `${folderName}/${uniqueFileName}`; // Set dynamic folder and filename

  const command = new PutObjectCommand({
    Bucket: config.bucketName,
    Key: filePath,
    Body: fileContent,
  });

  try {
    const response = await s3Client.send(command);
    return {
      Location: `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${filePath}`,
      ETag: response.ETag || "",
      Bucket: config.bucketName,
      Key: filePath,
    };
  } catch (error) {
    throw new InternalServerError(`Failed to upload file to S3`);
  }
};

// Generate a presigned URL for a file
const generateS3PresignedUrl = async (folderName: string, fileName: string): Promise<IPresignedUrlResponse> => {
  const filePath = `${folderName}/${fileName}`;

  const command = new GetObjectCommand({
    Bucket: config.bucketName,
    Key: filePath,
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: constants.AWS.S3_SESSION_EXPIRE });
    return { url };
  } catch (error) {
    throw new InternalServerError(`Failed to generate presigned URL`);
  }
};

// Delete a file from S3 with dynamic folder management
const deleteFileFromS3 = async (folderName: string, fileName: string): Promise<IDeleteResponse> => {
  const filePath = `${folderName}/${fileName}`;

  const command = new DeleteObjectCommand({
    Bucket: config.bucketName,
    Key: filePath,
  });

  try {
    const response = await s3Client.send(command);
    return {
      Deleted: [{ Key: filePath }],
    };
  } catch (error) {
    throw new InternalServerError(`Failed to delete file from S3`);
  }
};

//Exporting functions
const uploadFile = async (folderName: string, file: Express.Multer.File) => {
  return await uploadFileToS3(folderName, file.filename, file.buffer);
}

const deleteFile = async (folderName: string, fileName: string) => {
  return await deleteFileFromS3(folderName, fileName);
}

const generatePresignedUrl = async (folderName:string, fileName: string) => {
  return await generateS3PresignedUrl(folderName, fileName)
}

export default{
  uploadFile,
  deleteFile,
  generatePresignedUrl,
}