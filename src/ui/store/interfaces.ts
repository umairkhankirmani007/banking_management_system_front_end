export interface Payee {
  _id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age: number;
  imageUrl: string;
  isVerified: boolean;
  balance: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PayeeApiResponse {
  message: string;
  data: Payee[];
}

export interface AppUser {
  userId: string;
  email: string;
  imageUrl: string;
  age: number;
  userName?: string; // optional because not all users have this field
}

export interface AllUsersResponse {
  message: string;
  data: AppUser[];
}

export interface TransactionsInterface {
  _id: string;
  userId: string;
  status: "CREDITED" | "DEBITED";
  isTopUp: boolean;
  amount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TransactionsResponse {
  success: boolean;
  creditHistory: TransactionsInterface[];
}

export interface TableDataInterface {
  tid: string;
  userName: string;
  userId: string;
  status: "CREDITED" | "DEBITED";
  amount: number;
  date: string;
  time: string;
  userImage: string;
}
