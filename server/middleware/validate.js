/**
 * Tiny dependency-free validator: pass a shape of required fields
 * (and optional custom checks) and get back Express middleware.
 *
 * validateBody({
 *   name: { required: true },
 *   email: { required: true, test: (v) => /\S+@\S+\.\S+/.test(v), message: 'Enter a valid email.' },
 * })
 */
export function validateBody(shape) {
  return (req, res, next) => {
    const errors = [];
    for (const [key, rule] of Object.entries(shape)) {
      const value = req.body?.[key];
      if (rule.required && (value === undefined || value === null || value === '')) {
        errors.push(`"${key}" is required.`);
        continue;
      }
      if (value !== undefined && rule.test && !rule.test(value)) {
        errors.push(rule.message || `"${key}" is invalid.`);
      }
    }
    if (errors.length) {
      return res.status(400).json({ error: errors.join(' ') });
    }
    next();
  };
}
