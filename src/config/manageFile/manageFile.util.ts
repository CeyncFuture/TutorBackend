/**
 * author Thilina Pahalagedara
 * created on 08-09-2024-20h-08m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Client } from 'basic-ftp';
import * as path from 'path';
import * as fs from 'fs';
import os from "os";
import Config from "./manageFile.config";
import { constants } from "../../constants";
import { IUploadResponse, IPresignedUrlResponse, IDeleteResponse } from "./manageFile.interface";
import InternalServerError from "../../module/errors/classes/InternalServerError";
import NotFoundError from '../../module/errors/classes/NotFoundError';


const ftpClient = new Client();

// // Initialize S3 client with config
// const configS3 = Config.getS3Config();
// const s3Client = new S3Client({
//   region: configS3.region,
//   credentials: {
//     accessKeyId: configS3.accessKeyId,
//     secretAccessKey: configS3.secretAccessKey,
//   },
// });

// Helper function to generate a unique filename
const generateUniqueFileName = (originalName: string): string => {
  const removeSpaces = originalName.replace(/\s+/g, '-');
  
  const fileExtension = removeSpaces.split('.').pop(); // Get the file extension
  const uniqueName = uuidv4(); // Generate a unique ID
  return `${uniqueName}.${fileExtension}`; // Return unique name with the original extension
};

// // Upload file to S3 with dynamic folder and unique filename
// const uploadFileToS3 = async (folderName: string, fileName: string, fileContent: Buffer): Promise<IUploadResponse> => {
//   const uniqueFileName = generateUniqueFileName(fileName); // Generate unique filename
//   const filePath = `${folderName}/${uniqueFileName}`; // Set dynamic folder and filename

//   const command = new PutObjectCommand({
//     Bucket: configS3.bucketName,
//     Key: filePath,
//     Body: fileContent,
//   });

//   try {
//     const response = await s3Client.send(command);
//     return {
//       Location: `https://${configS3.bucketName}.s3.${configS3.region}.amazonaws.com/${filePath}`,
//       ETag: response.ETag || "",
//       Bucket: configS3.bucketName,
//       Key: filePath,
//     };
//   } catch (error) {
//     throw new InternalServerError(`Failed to upload file to S3`);
//   }
// };

// // Generate a presigned URL for a file
// const generateS3PresignedUrl = async (folderName: string, fileName: string): Promise<IPresignedUrlResponse> => {
//   const filePath = `${folderName}/${fileName}`;

//   const command = new GetObjectCommand({
//     Bucket: configS3.bucketName,
//     Key: filePath,
//   });

//   try {
//     const url = await getSignedUrl(s3Client, command, { expiresIn: constants.AWS.S3_SESSION_EXPIRE });
//     return { url };
//   } catch (error) {
//     throw new InternalServerError(`Failed to generate presigned URL`);
//   }
// };

// // Delete a file from S3 with dynamic folder management
// const deleteFileFromS3 = async (folderName: string, fileName: string): Promise<IDeleteResponse> => {
//   const filePath = `${folderName}/${fileName}`;

//   const command = new DeleteObjectCommand({
//     Bucket: configS3.bucketName,
//     Key: filePath,
//   });

//   try {
//     const response = await s3Client.send(command);
//     return {
//       Deleted: [{ Key: filePath }],
//     };
//   } catch (error) {
//     throw new InternalServerError(`Failed to delete file from S3`);
//   }
// };

//FTP File Upload
const uploadFileToFTP = async(folderName: string, file: Express.Multer.File): Promise<string> => {
  const fileName = generateUniqueFileName(file.originalname);
  const tempFilePath = path.join(__dirname, '../../../temp', fileName);

  try {
      // Connect to the FTP server
      await ftpClient.access(Config.getFTPConfig());

      // Save file buffer to a temporary file
      await fs.promises.writeFile(tempFilePath, file.buffer);

      // Define the remote file path
      const remoteFilePath = path.join(folderName, fileName);

       // Verify that the file exists before proceeding
      try {
        await fs.promises.access(tempFilePath); // Check file existence
      } catch {
        throw new Error(`Temporary file does not exist at ${tempFilePath}`);
      }
      
      // Upload the file to the FTP server
      await ftpClient.uploadFrom(tempFilePath, remoteFilePath);

      console.log(`File uploaded successfully to ${remoteFilePath}`);
      // https://server.toptutorsglobal.com/tutor_backend/att/question_attachment/136819b1-fa84-4278-8906-b5bf11a9c38a.png
      // Construct the public URL (for example purposes, adapt based on your FTP server setup)
      const publicUrl = `${Config.getFTPConfig().fileAccessURL}/${folderName}/${fileName}`;

      return publicUrl;
  } catch (error) {
      console.error('Error during file upload:', error);
      throw new InternalServerError('File upload failed');
  } finally {
      // Ensure the FTP client is closed
      ftpClient.close();

      // Clean up the temporary file
      try {
          if (await fs.existsSync(tempFilePath)) {
              fs.unlinkSync(tempFilePath);
          }
      } catch (cleanupError) {
          console.error('Error cleaning up temporary file:', cleanupError);
      }
  }
  // return await uploadFileToS3(folderName, file.filename, file.buffer);
};

// Function to delete file on FTP (if required)
const deleteFileFromFTP = async (fileURL: string) => {
  // Extract file path from the URL and delete it using FTP client
  try {
    await ftpClient.access(Config.getFTPConfig());
    await ftpClient.remove(fileURL);
    ftpClient.close();
    
    console.log(`File deleted successfully from ${fileURL}`);
  } catch (error) {
    console.error('Error deleting FTP file:', error);
    throw new InternalServerError('FTP file deletion failed');
  }
};

//Exporting functions
const uploadFile = async(folderName: string, file: Express.Multer.File): Promise<string>  => {
  return await uploadFileToFTP(folderName, file);
  // return await uploadFileToS3(folderName, file.filename, file.buffer);
}

const deleteFile = async(fileURL: string): Promise<void> => {
  return await deleteFileFromFTP(fileURL);
  // return await deleteFileFromS3(folderName, fileName);
}

const generatePresignedUrl = async(folderName:string, fileName: string) => {

  // return await generateS3PresignedUrl(folderName, fileName);
}

export default{
  uploadFile,
  deleteFile,
  generatePresignedUrl,
}