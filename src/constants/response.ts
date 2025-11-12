export interface SuccessApiResponse<T> {
	readonly code: number;
	readonly data: T;
	readonly message: string;
}

export interface FailureApiResponse {
	readonly code: number;
	readonly message: string;
	readonly errors?: Record<string, string>; //Contains key value pairs of errors if they need to be displayed on UI (eg. validation errors for input tag)
}