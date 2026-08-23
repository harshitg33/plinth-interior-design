import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateBody } from '../middleware/validate.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '..', 'data', 'enquiries.json');

const router = Router();

async function readAll() {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

router.post(
  '/',
  validateBody({
    name: { required: true },
    email: { required: true, test: (v) => /\S+@\S+\.\S+/.test(v), message: 'Enter a valid email address.' },
    city: { required: true },
  }),
  async (req, res, next) => {
    try {
      const enquiries = await readAll();
      const record = {
        id: Date.now().toString(36),
        ...req.body,
        receivedAt: new Date().toISOString(),
      };
      enquiries.push(record);
      await writeFile(DATA_FILE, JSON.stringify(enquiries, null, 2));

      // In production this is where you'd call an email/CRM provider
      // (e.g. nodemailer, Resend, or a Slack webhook). Logged here so
      // the flow is easy to demo without external credentials.
      console.log('New studio enquiry:', record);

      res.status(201).json({ ok: true });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
