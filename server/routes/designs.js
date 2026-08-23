import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateBody } from '../middleware/validate.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '..', 'data', 'designs.json');

const router = Router();

async function readAll() {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeAll(designs) {
  await writeFile(DATA_FILE, JSON.stringify(designs, null, 2));
}

function makeCode() {
  return 'PLN-' + Math.random().toString(36).slice(2, 7).toUpperCase();
}

router.post(
  '/',
  validateBody({ selections: { required: true } }),
  async (req, res, next) => {
    try {
      const designs = await readAll();
      const code = makeCode();
      const record = {
        code,
        selections: req.body.selections,
        createdAt: req.body.createdAt || new Date().toISOString(),
      };
      designs.push(record);
      await writeAll(designs);
      res.status(201).json(record);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/:code', async (req, res, next) => {
  try {
    const designs = await readAll();
    const found = designs.find((d) => d.code === req.params.code);
    if (!found) return res.status(404).json({ error: 'No board with that reference code.' });
    res.json(found);
  } catch (err) {
    next(err);
  }
});

export default router;
