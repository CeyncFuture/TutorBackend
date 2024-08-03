/**
 * author Thilina Pahalagedara
 * created on 02-08-2024-22h-07m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

interface IError {
    statusCode: number;
    message: string;
    data: any
  }

interface IStringDictionary {
    [index: string]: string | number;
}

  export {
    IError,
    IStringDictionary
  }