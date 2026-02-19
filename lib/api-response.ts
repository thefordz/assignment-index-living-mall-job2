export type ApiSuccess<T> = {
  message?: string;
  data: T;
};

export type ApiError = {
  message?: string;
};

export function apiResponse<T>(options: {
  message?: string;
  status?: number;
  data?: T;
}) {
  const { message, status = 200, data } = options;

  if (data !== undefined) {
    const successBody: ApiSuccess<T> = {
      message,
      data,
    };

    return Response.json(successBody, { status });
  }

  const errorBody: ApiError = {
    message,
  };

  return Response.json(errorBody, { status });
}

export function internalServerError() {
  return apiResponse({ message: "Internal Server Error", status: 500 });
}
