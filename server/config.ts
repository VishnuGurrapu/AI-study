import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Ensure .env is loaded from the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootEnvPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: rootEnvPath });

export interface ServerEnvConfig {
  geminiApiKey: string | undefined;
  port: number;
}

export const getGeminiApiKey = (): string => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      'Missing GEMINI_API_KEY. Please create a .env file based on .env.example and set your Gemini API key.'
    );
  }
  return apiKey;
};

export const isApiKeyConfigured = (): boolean => {
  return Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
};

export const serverConfig: ServerEnvConfig = {
  geminiApiKey: process.env.GEMINI_API_KEY?.trim(),
  port: Number(process.env.PORT) || 3001
};
