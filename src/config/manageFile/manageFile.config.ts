/**
 * author Thilina Pahalagedara
 * created on 08-09-2024-20h-29m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { IS3Config } from "./manageFile.interface";
import InternalServerError from "../../module/errors/classes/InternalServerError";
import { constants } from "../../constants";

const getS3Config = (): IS3Config => {
  if (!constants.AWS.S3_ACCESS_KEY) throw new InternalServerError("AWS Access Key is not defined!");
  if (!constants.AWS.S3_SECRET_KEY) throw new InternalServerError("AWS Secret Key is not defined!");
  if (!constants.AWS.S3_REGION) throw new InternalServerError("AWS Region is not defined!");
  if (!constants.AWS.S3_BUCKET) throw new InternalServerError("AWS S3 Bucket is not defined!");

  return {
    accessKeyId: constants.AWS.S3_ACCESS_KEY,
    secretAccessKey: constants.AWS.S3_SECRET_KEY,
    region: constants.AWS.S3_REGION,
    bucketName: constants.AWS.S3_BUCKET,
  };
};

export default {
  getS3Config,
};
