import bcrypt from "bcryptjs";

// ✅ Password helpers
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (input: string, hashed: string) => {
  return bcrypt.compare(input, hashed);
};

// ✅ Tailwind className helper
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
