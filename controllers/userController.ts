import { userModel } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (isUserValid(user, password)) {
    return user;
  } else {
    throw new Error("Your password didn't match!");
  }
};
const getUserById = (id: any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export { getUserByEmailIdAndPassword, getUserById };
