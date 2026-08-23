import { Router } from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '..', 'data', 'projects.json');

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8');
    res.json(JSON.parse(raw));
  } catch (err) {
    next(err);
  }
});

export default router;
