
export interface User{
	readonly id: number;
	readonly name: string;
	readonly email: string;
	readonly role: "admin" | "user";
}

export interface UpdateUserPayload {
  readonly id: string;
  readonly name?: string;
  readonly password?: string;
}