import bcrypt from "bcryptjs";

const matchPassword = async (enteredPassword, dbPassword) => {
  return await bcrypt.compare(enteredPassword, dbPassword);
};

const hashPassword = async enteredPassword => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(enteredPassword, salt);
};

export { matchPassword, hashPassword };
