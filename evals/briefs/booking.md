# Brief: book a meeting room

Build the "book a meeting room" flow for an office. Any member of staff uses it, a few times a month.

What they do here:

- Say when they need a room, for how long and for how many people.
- See which rooms are free and pick one.
- Give a title for the meeting, and optionally ask for catering and add a note for reception.
- Confirm the booking and see that it is booked.

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
  const rooms = [
    { id: 'r1', name: 'Harbour', floor: 1, capacity: 4, features: ['screen'] },
    { id: 'r2', name: 'Lighthouse', floor: 1, capacity: 8, features: ['screen', 'video'] },
    { id: 'r3', name: 'Quay', floor: 2, capacity: 12, features: ['screen', 'video', 'whiteboard'] },
    { id: 'r4', name: 'Breakwater Boardroom and Client Suite', floor: 3, capacity: 20, features: ['screen', 'video', 'whiteboard', 'catering'] },
    { id: 'r5', name: 'Tidepool', floor: 2, capacity: 2, features: [] },
  ];
  return {
    // criteria: { date: 'YYYY-MM-DD', start: 'HH:MM', minutes: number, people: number }
    async findRooms(c) {
      await wait(); maybeFail('find rooms');
      if (q.get('empty') === '1') return [];
      if (new Date(c.date + 'T' + c.start) < new Date()) { const e = new Error('VALIDATION: start_in_past'); e.code = 'PAST'; throw e; }
      return rooms.filter((r) => r.capacity >= c.people && !(r.id === 'r2' && c.start < '12:00')).map((r) => ({ ...r }));
    },
    // booking: { roomId, date, start, minutes, people, title, catering: boolean, note }
    async createBooking(b) {
      await wait(); maybeFail('create booking');
      if (!b.title || !b.title.trim()) { const e = new Error('VALIDATION: title_required'); e.code = 'VALIDATION'; throw e; }
      if (b.catering && !rooms.find((r) => r.id === b.roomId).features.includes('catering')) { const e = new Error('CONFLICT: room_has_no_catering'); e.code = 'NO_CATERING'; throw e; }
      return { id: 'bk_' + Math.floor(Math.random() * 90000 + 10000), ...b };
    },
  };
})();
```
## Constraints

- Deliver one self-contained file: HTML with inline CSS and JavaScript. No build step, no frameworks or libraries, no network requests, no external fonts or images.
- Paste the "Simulated server" block into the page unchanged and use it for all data. Do not read or write its internals.
- The simulated server is slow (0.4 to 1.5 seconds per call) and fails about one call in five, like the real one. Three URL parameters exist for testing: `?fail=0` never fails, `?fail=1` always fails, `?empty=1` returns no records.
- It will be used on desktop mostly and sometimes on a phone.
