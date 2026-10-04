import { config } from "dotenv";

const NODE_ENV = process.env.NODE_ENV || "development";

config({ path: `.env.${NODE_ENV}.local` });

export const { PORT, DB_URI, JWT_SECRET, JWT_EXPIRES_IN, ARCJET_KEY, ARCJET_ENV, EMAIL_USER, EMAIL_PASS, RENDER_KEY } = process.env;
export { NODE_ENV };
