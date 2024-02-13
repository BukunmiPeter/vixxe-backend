import { Document, FilterQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument } from "../models/user.models";


export async function createUser(
  input: Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
) {
  try {
    // Check if input is already a model instance
    const user = input instanceof UserModel ? input : new UserModel(input);

    // Save the user to the database
    await user.save();

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
