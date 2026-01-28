export interface SuccessApiResponse<T> {
	readonly code: number;
	readonly data: T;
	readonly message: string;
}

export interface FailureApiResponse {
	readonly code: number;
	readonly message: string;
}