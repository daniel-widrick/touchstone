# Brief: field jobs app

Build the jobs app for Harbour Heating's engineers. Six engineers use it on their phones all day, in the van and at customers' homes. The office sometimes opens it on a desktop.

What they do here:

- See today's jobs in order and find a particular one.
- Open a job to see the customer, the address, what needs doing and the notes so far.
- Add a note to a job.
- Move a job to another day when the customer is not in.
- Mark a job as complete. The customer is emailed an invoice at once, and this cannot be reversed.

## Simulated server

```js
// Simulated server. Do not change this block.
const api = (() => {
  const q = new URLSearchParams(location.search);
  const wait = () => new Promise((r) => setTimeout(r, 400 + Math.random() * 1100));
  const maybeFail = (what) => {
    const f = q.get('fail');
    if (f === '1' || (f !== '0' && Math.random() < 0.2)) {
      const e = new Error('ECONNRESET: socket hang up while trying to ' + what); e.code = 'ECONNRESET'; throw e;
    }
  };
  const day = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
  const people = ['Mrs A. Okonkwo', 'Mr D. Castellanos-Whitby', 'Greyfriars Dental Practice', 'Ms R. Lindqvist', 'Mr T. Babatunde', 'The Harbour Lights Hotel (kitchen)', 'Dr S. Mehta', 'Mr and Mrs Pemberton', 'Ivy Lane Books', 'Miss K. Dvorak'];
  const work = ['Annual boiler service', 'No hot water, boiler showing fault F28', 'Radiator leaking in upstairs bedroom', 'Replace thermostat and rebalance system', 'Gas safety certificate for landlord', 'Noisy pump, intermittent'];
  let jobs = q.get('empty') === '1' ? [] : Array.from({ length: 14 }, (_, i) => ({
    id: 'job_' + (700 + i), ref: 'HH-' + (5120 + i), customer: people[i % people.length],
    address: (12 + i * 7) + ' ' + ['Quay Street', 'Lighthouse Road', 'Breakwater Terrace', 'Tidepool Lane'][i % 4] + ', Harbourton, HB' + (1 + (i % 6)) + ' ' + (2 + (i % 7)) + 'QT',
    phone: '01632 9601' + String(10 + i), date: day(i < 9 ? 0 : 1), slot: ['08:00', '09:30', '11:00', '12:30', '14:00', '15:30', '17:00'][i % 7],
    work: work[i % work.length], status: i < 2 ? 'complete' : 'booked',
    notes: i % 3 === 0 ? [{ at: new Date(Date.now() - 86400000).toISOString(), text: 'Customer asked us to use the side gate. Dog in the garden.' }] : [],
  }));
  const find = (id) => { const j = jobs.find((x) => x.id === id); if (!j) { const e = new Error('NOT_FOUND: job'); e.code = 'NOT_FOUND'; throw e; } return j; };
  const copy = (j) => JSON.parse(JSON.stringify(j));
  return {
    // date: 'YYYY-MM-DD'. Resolves to the jobs on that day, without their notes.
    async listJobs(date) { await wait(); maybeFail('list jobs'); return jobs.filter((j) => j.date === date).map((j) => { const c = copy(j); delete c.notes; return c; }); },
    async getJob(id) { await wait(); maybeFail('load job'); return copy(find(id)); },
    async addNote(id, text) {
      await wait(); maybeFail('add note');
      if (!text || !text.trim()) { const e = new Error('VALIDATION: note_empty'); e.code = 'VALIDATION'; throw e; }
      const j = find(id); j.notes.push({ at: new Date().toISOString(), text: text.trim() }); return copy(j);
    },
    async moveJob(id, date) {
      await wait(); maybeFail('move job');
      const j = find(id);
      if (j.status === 'complete') { const e = new Error('CONFLICT: job_complete'); e.code = 'COMPLETE'; throw e; }
      if (date <= day(0)) { const e = new Error('VALIDATION: date_not_future'); e.code = 'PAST'; throw e; }
      j.date = date; return copy(j);
    },
    async completeJob(id) {
      await wait(); maybeFail('complete job');
      const j = find(id);
      if (j.status === 'complete') { const e = new Error('CONFLICT: job_complete'); e.code = 'COMPLETE'; throw e; }
      j.status = 'complete'; return copy(j);
    },
  };
})();
```

## Constraints

- Deliver one self-contained file: HTML with inline CSS and JavaScript. No build step, no frameworks or libraries, no network requests, no external fonts or images.
- Paste the "Simulated server" block into the page unchanged and use it for all data. Do not read or write its internals.
- The simulated server is slow (0.4 to 1.5 seconds per call) and fails about one call in five, like the real one. Three URL parameters exist for testing: `?fail=0` never fails, `?fail=1` always fails, `?empty=1` returns no records.
- It will be used on a phone mostly and sometimes on a desktop.
