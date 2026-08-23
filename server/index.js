import express from 'express';
import cors from 'cors';

import projectsRouter from './routes/projects.js';
import designsRouter from './routes/designs.js';
import contactRouter from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// tiny request log, useful when demoing the CV project
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()}  ${req.method} ${req.path}`);
  next();
});

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'plinth-server' }));

app.use('/api/projects', projectsRouter);
app.use('/api/designs', designsRouter);
app.use('/api/contact', contactRouter);

// central error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Plinth API listening on http://localhost:${PORT}`);
});
