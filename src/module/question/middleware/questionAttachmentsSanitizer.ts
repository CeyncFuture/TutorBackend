import { constants } from "../../../constants";
import { NextFunction } from "express";
import multer, { memoryStorage, FileFilterCallback, MulterError } from "multer";
import path from "path";
import BadRequestError from "../../errors/classes/BadRequestError";

const fileUpload = ( field: string, acceptFormats: string[], maxCount?:number ) => {

    // Define storage options
    const storage = memoryStorage();
  
    // Define file filter
    const fileFilter: multer.Options["fileFilter"] = ( req, file, callBack: FileFilterCallback ) => {
    
        // Check if file name length exceeds the limit
    if (file.originalname.length > constants.FILE_VALIDATION.FILE_NAME_MAX_LENGTH) {
      return callBack(
        new BadRequestError(
          `File name is too long. Maximum allowed length is ${constants.FILE_VALIDATION.FILE_NAME_MAX_LENGTH} characters.`
        )
      );
    }
  
      // Check if file is an accepted type
      const isMimetypeIncluded = acceptFormats.includes(file.mimetype);
      const isExtnameIncluded = acceptFormats.includes(path.extname(file.originalname).toLowerCase());
  
      if (isMimetypeIncluded || isExtnameIncluded) {
        return callBack(null, true);
      }
  
      callBack(
        new BadRequestError(
          `Invalid file type. Only ${acceptFormats.join(", ")} files are allowed!`
        )
      );
    };
  
    const upload = multer({
      storage,
      fileFilter,
      limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
    });
  
    // Handle errors
    return [
      upload.array(field,maxCount),
      (err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof MulterError) {
          let message;
          switch (err.code) {
            case "LIMIT_FILE_SIZE":
              message = "File size exceeds the maximum allowed limit!";
              break;
            case "LIMIT_FILE_COUNT":
              message = "The number of files exceeds the allowed limit!";
              break;
            case "LIMIT_FIELD_COUNT":
              message = "The number of fields exceeds the allowed limit!";
              break;
            case "LIMIT_FIELD_KEY":
              message = "Field name exceeds the maximum allowed length!";
              break;
            case "LIMIT_FIELD_VALUE":
              message = "Field value exceeds the maximum allowed length!";
              break;
            case "LIMIT_PART_COUNT":
              message = "The number of parts in the request exceeds the allowed limit!";
              break;
            case "LIMIT_UNEXPECTED_FILE":
              message = "An unexpected file was encountered in the request!";
              break;
            default:
              message = "An error occurred while processing the file upload!";
          }
          throw new BadRequestError(message);
        } else {
          throw err;
        }
      },
    ];
  };