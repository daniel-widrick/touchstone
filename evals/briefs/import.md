# Brief: import contacts

Build the "import contacts" tool for a small CRM. Office staff use it a few times a year, usually with a spreadsheet export of a few hundred rows.

What they do here:

- Paste CSV text or choose a CSV file with the columns name, email, phone, company.
- See which rows have problems before anything is imported, and decide whether to go ahead with the good rows.
- Run the import, which takes a while on the server, and see the outcome.

## Simulated server

```js
// Simulated server. Do not change this block.
const api = (() => {
  const q = new URLSearchParams(location.search);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms || 400 + Math.random() * 1100));
  const maybeFail = (what) => {
    const f = q.get('fail');
    if (f === '1' || (f !== '0' && Math.random() < 0.2)) {
      const e = new Error('ECONNRESET: socket hang up while trying to ' + what); e.code = 'ECONNRESET'; throw e;
    }
  };
  return {
    // rows: [{ name, email, phone, company }]. Resolves to [{ row: index, field, code }] where code is
    // 'REQUIRED', 'EMAIL_FORMAT', 'PHONE_FORMAT' or 'DUPLICATE_IN_CRM'.
    async validateImport(rows) {
      await wait(); maybeFail('validate import');
      const out = [];
      rows.forEach((r, i) => {
        if (!r.name || !r.name.trim()) out.push({ row: i, field: 'name', code: 'REQUIRED' });
        if (!r.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r.email)) out.push({ row: i, field: 'email', code: r.email ? 'EMAIL_FORMAT' : 'REQUIRED' });
        else if (/@example\.org$/.test(r.email)) out.push({ row: i, field: 'email', code: 'DUPLICATE_IN_CRM' });
        if (r.phone && !/^[+\d][\d\s()-]{5,}$/.test(r.phone)) out.push({ row: i, field: 'phone', code: 'PHONE_FORMAT' });
      });
      return out;
    },
    // Imports the rows in batches. Calls onProgress(done, total) as it goes. Takes roughly 8 to 15 seconds.
    // signal is an optional AbortSignal; aborting stops the import, and rows already imported stay imported.
    // Resolves to { imported, skipped }. May reject part way; error.imported says how many rows were saved.
    async runImport(rows, onProgress, signal) {
      const total = rows.length; let done = 0;
      const steps = 12, f = q.get('fail');
      const failAt = f === '1' ? 5 : (f !== '0' && Math.random() < 0.25 ? 3 + Math.floor(Math.random() * 7) : -1);
      for (let s = 1; s <= steps; s++) {
        await wait(650 + Math.random() * 600);
        if (signal && signal.aborted) { const e = new Error('ABORTED'); e.code = 'ABORTED'; e.imported = done; throw e; }
        if (s === failAt) { const e = new Error('ETIMEDOUT: upstream timed out during batch ' + s); e.code = 'ETIMEDOUT'; e.imported = done; throw e; }
        done = Math.min(total, Math.round((total * s) / steps)); if (onProgress) onProgress(done, total);
      }
      return { imported: total, skipped: 0 };
    },
  };
})();
```
## Constraints

- Deliver one self-contained file: HTML with inline CSS and JavaScript. No build step, no frameworks or libraries, no network requests, no external fonts or images.
- Paste the "Simulated server" block into the page unchanged and use it for all data. Do not read or write its internals.
- The simulated server is slow (0.4 to 1.5 seconds per call) and fails about one call in five, like the real one. Three URL parameters exist for testing: `?fail=0` never fails, `?fail=1` always fails, `?empty=1` returns no records.
- It will be used on desktop mostly and sometimes on a phone.
