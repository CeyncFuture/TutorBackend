/**
 * author Thilina Pahalagedara
 * created on 03-08-2024-11h-28m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

const capitalizedFirstLatter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

//Categorize the files array using filedname.
const categorizeFilesByFiledName = (files: Express.Multer.File[]) => {
    return files.reduce((acc, file) => {
      const { fieldname } = file;
  
      // Initialize the category array if it doesn't exist
      if (!acc[fieldname]) {
        acc[fieldname] = [];
      }
  
      // Add the file to the appropriate category
      acc[fieldname].push(file);
  
      return acc;
    }, {} as Record<string, Express.Multer.File[]>);
  };

export default {
    capitalizedFirstLatter,
    categorizeFilesByFiledName,
}