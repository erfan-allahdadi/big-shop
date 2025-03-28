export interface ResponseInterface {
  code: string;
  message: string;
  data?: any;
}
export class ResponseGeneratorHelper {
  static SuccessResponse(response: ResponseInterface) {
    return {
      result: {
        code: response.code,
        message: response.message,
        data: response.data,
      },
    };
  }
}
