/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-18h-30m
 * github: https://github.com/Pahalagedara
 * copyright 2024
 */

interface IS3Config {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
}

interface IFTPConfig {
  host: string,
  user: string,
  password: string,
  secure: boolean
}

interface IUploadResponse {
  Location: string;
  ETag: string;
  Bucket: string;
  Key: string;
}

interface IPresignedUrlResponse {
  url: string;
}

interface IDeleteResponse {
  Deleted: Array<{ Key: string }>;
}

export {
  IS3Config,
  IUploadResponse,
  IPresignedUrlResponse,
  IDeleteResponse,
  IFTPConfig,
}
