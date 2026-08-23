const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
}

export const api = {
  saveDesign: (payload) => request('/designs', { method: 'POST', body: JSON.stringify(payload) }),
  sendContact: (payload) => request('/contact', { method: 'POST', body: JSON.stringify(payload) }),
  getProjects: () => request('/projects'),
};
