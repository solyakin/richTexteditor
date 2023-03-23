import { AxiosError } from "axios";

export const ErrorHandler = (error: AxiosError, msg?: string) => {
  const error_response = error?.response;
  const error_response_data = error_response?.data as any;

  let message = ''

  if (error_response_data && error_response_data?.error?.message) {
    message = error_response_data.error?.message;
  } else if (error.message) {
    message = error.message;
  } else {
    message = msg || 'Something went wrong'
  }

  return message;
}