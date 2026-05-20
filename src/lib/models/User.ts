import { ObjectId } from "mongodb";

export interface IUser {
  _id?: ObjectId | string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  
  // Custom onboarding fields
  fullName?: string;
  collegeName?: string;
  hostelDetails?: string;
  studentIdUrl?: string;
  verificationStatus?: "pending" | "approved" | "rejected";
  isVerified: boolean;
  isOnboarded: boolean;
  
  createdAt?: Date;
  updatedAt?: Date;
}
