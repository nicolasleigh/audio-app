const { env } = process as { env: { [key: string]: string } };
export const MONGODB_URI = process.env.MONGODB_URI as string;
