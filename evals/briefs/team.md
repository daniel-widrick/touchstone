# Brief: team settings screen

Build the team settings screen for a project tool. Team owners use it now and then.

What they do here:

- Rename the team.
- See who is on the team and what role each person has.
- Invite someone by email as a member or an admin.
- Change a person's role.
- Remove a person from the team. A removed person loses access at once, and can be invited again later.
- Choose which email notifications the team gets.

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
  const team = {
    name: 'Northwind Studio', plan: 'team', seats: 12,
    members: q.get('empty') === '1' ? [] : [
      { id: 'u1', name: 'Priya Raman', email: 'priya@northwind.example', role: 'owner', lastActive: '2026-11-15T16:20:00Z' },
      { id: 'u2', name: 'Tomas Okafor', email: 'tomas@northwind.example', role: 'admin', lastActive: '2026-11-14T09:02:00Z' },
      { id: 'u3', name: 'Wilhelmina Featherstonehaugh-Abernathy', email: 'wilhelmina.featherstonehaugh-abernathy@northwind.example', role: 'member', lastActive: '2026-10-02T11:45:00Z' },
      { id: 'u4', name: 'Sam Lee', email: 'sam@northwind.example', role: 'member', lastActive: null },
      { id: 'u5', name: 'Noor Haddad', email: 'noor@northwind.example', role: 'member', lastActive: '2026-11-15T08:10:00Z' },
    ],
    notifications: { weekly_digest: true, new_member: true, billing: true, mentions: false },
  };
  let n = 6;
  return {
    async getTeam() { await wait(); maybeFail('load team'); return JSON.parse(JSON.stringify(team)); },
    async renameTeam(name) { await wait(); maybeFail('rename team'); if (!name.trim()) { const e = new Error('VALIDATION: name_required'); e.code = 'VALIDATION'; throw e; } team.name = name.trim(); return { name: team.name }; },
    async inviteMember(email, role) {
      await wait(); maybeFail('invite member');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { const e = new Error('VALIDATION: email_format'); e.code = 'VALIDATION'; throw e; }
      if (team.members.some((m) => m.email === email)) { const e = new Error('CONFLICT: member_exists'); e.code = 'EXISTS'; throw e; }
      if (team.members.length >= team.seats) { const e = new Error('LIMIT: seats_exhausted'); e.code = 'SEATS'; throw e; }
      const m = { id: 'u' + n++, name: email.split('@')[0], email, role, lastActive: null }; team.members.push(m); return { ...m };
    },
    async changeRole(id, role) { await wait(); maybeFail('change role'); const m = team.members.find((x) => x.id === id); m.role = role; return { ...m }; },
    async removeMember(id) { await wait(); maybeFail('remove member'); team.members = team.members.filter((x) => x.id !== id); return { ok: true }; },
    async setNotification(key, on) { await wait(); maybeFail('save notification'); team.notifications[key] = on; return { ...team.notifications }; },
  };
})();
```
## Constraints

- Deliver one self-contained file: HTML with inline CSS and JavaScript. No build step, no frameworks or libraries, no network requests, no external fonts or images.
- Paste the "Simulated server" block into the page unchanged and use it for all data. Do not read or write its internals.
- The simulated server is slow (0.4 to 1.5 seconds per call) and fails about one call in five, like the real one. Three URL parameters exist for testing: `?fail=0` never fails, `?fail=1` always fails, `?empty=1` returns no records.
- It will be used on desktop mostly and sometimes on a phone.
