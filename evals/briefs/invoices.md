# Brief: invoices screen

Build the invoices screen for Northwind's accounts team. Three people use it all day.

What they do here:

- Find an invoice by customer name or invoice number.
- See which invoices are overdue.
- Mark an invoice as paid when the money arrives.
- Send a reminder for an overdue invoice.
- Delete a draft invoice that was created by mistake. Deleting is permanent on the server.

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
  const customers = ['Acme Ltd', 'Brightside Bakery', 'Castellan Freight and Logistics International', 'Dovetail Joinery', 'Eastfield Primary School', 'Fennel & Rye', 'Greyfriars Dental', 'Harbour Lights Hotel', 'Ivy Lane Books', 'Juniper Health'];
  const statuses = ['draft', 'sent', 'sent', 'paid', 'paid', 'paid', 'overdue', 'overdue'];
  let invoices = q.get('empty') === '1' ? [] : Array.from({ length: 46 }, (_, i) => ({
    id: 'inv_' + (9000 + i), number: 'NW-' + (2041 + i), customer: customers[i % customers.length],
    issued: new Date(2026, 8, 1 + i).toISOString(), due: new Date(2026, 9, 1 + i).toISOString(),
    amount: Math.round((120 + ((i * 7919) % 48000)) * 100) / 100 + (i % 9 === 0 ? 1250000 : 0), currency: 'GBP',
    status: statuses[i % statuses.length], reminderSentAt: null,
  }));
  return {
    async listInvoices() { await wait(); maybeFail('list invoices'); return invoices.map((x) => ({ ...x })); },
    async markPaid(id) { await wait(); maybeFail('mark paid'); const x = invoices.find((v) => v.id === id); x.status = 'paid'; return { ...x }; },
    async sendReminder(id) { await wait(); maybeFail('send reminder'); const x = invoices.find((v) => v.id === id); x.reminderSentAt = new Date().toISOString(); return { ...x }; },
    async deleteInvoice(id) { await wait(); maybeFail('delete invoice'); invoices = invoices.filter((v) => v.id !== id); return { ok: true }; },
  };
})();
```
## Constraints

- Deliver one self-contained file: HTML with inline CSS and JavaScript. No build step, no frameworks or libraries, no network requests, no external fonts or images.
- Paste the "Simulated server" block into the page unchanged and use it for all data. Do not read or write its internals.
- The simulated server is slow (0.4 to 1.5 seconds per call) and fails about one call in five, like the real one. Three URL parameters exist for testing: `?fail=0` never fails, `?fail=1` always fails, `?empty=1` returns no records.
- It will be used on desktop mostly and sometimes on a phone.
