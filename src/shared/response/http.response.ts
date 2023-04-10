import { Response } from 'express';

export enum HTTPStatus {
  OK = 200,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse {
  Ok(res: Response, data?: any): Response {
    return res.status(HTTPStatus.OK).json({
      status: HTTPStatus.OK,
      statusMsg: 'Success',
      data,
    });
  }

  NotFound(res: Response, data?: any): Response {
    return res.status(HTTPStatus.NOT_FOUND).json({
      status: HTTPStatus.NOT_FOUND,
      statusMsg: 'Not Found',
      error: data,
    });
  }

  Unauthorized(res: Response, data?: any): Response {
    return res.status(HTTPStatus.UNAUTHORIZED).json({
      status: HTTPStatus.UNAUTHORIZED,
      statusMsg: 'Unauthorized',
      data,
    });
  }

  Forbidden(res: Response, data?: any): Response {
    return res.status(HTTPStatus.FORBIDDEN).json({
      status: HTTPStatus.FORBIDDEN,
      statusMsg: 'Forbidden',
      error: data,
    });
  }

  Error(res: Response, data?: any): Response {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      status: HTTPStatus.INTERNAL_SERVER_ERROR,
      statusMsg: 'Internal Server Error',
      error: data,
    });
  }
}
