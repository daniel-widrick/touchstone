# Brief: getting started page for harbour

Build the "Getting started" page of the documentation for `harbour`, a command-line backup tool. The readers are people setting it up for the first time on their own computer or a small server. Many will have the page open beside a terminal and copy commands from it.

Here are the engineer's notes. Turn them into the page.

- harbour makes encrypted, de-duplicated backups of folders to a local disk or to any S3-compatible storage. Version 2.4.
- Needs: macOS 12 or later, Linux with glibc 2.31 or later, or Windows 10 or later. About 60 MB of disk. No other dependencies.
- Install on macOS: `brew install harbour`
- Install on Linux: `curl -fsSL https://get.harbour.example/install.sh | sh` then check with `harbour --version`
- Install on Windows: `winget install Harbour.Harbour`
- First, create a repository, which is where backups are stored: `harbour init /mnt/backup/repo`. It asks for a passphrase twice. The passphrase cannot be recovered. If it is lost, the backups cannot be read by anyone, including us.
- For S3 storage use `harbour init s3://bucket-name/path` after setting `HARBOUR_S3_KEY` and `HARBOUR_S3_SECRET` in the environment.
- Make a first backup: `harbour backup ~/Documents --repo /mnt/backup/repo`. The first run copies everything and can take a long time; later runs only send what changed.
- See what is stored: `harbour list --repo /mnt/backup/repo`. Each backup is called a snapshot and has an id like `a1b2c3d4`.
- Restore: `harbour restore a1b2c3d4 --to ~/restored --repo /mnt/backup/repo`. It never overwrites existing files unless `--overwrite` is given.
- To run every night at 02:00 on Linux or macOS, add to crontab: `0 2 * * * harbour backup ~/Documents --repo /mnt/backup/repo --quiet`
- Common problems:
  - `repository is locked`: another harbour process is using it, or one crashed. If you are sure nothing is running: `harbour unlock --repo /mnt/backup/repo`
  - `wrong passphrase`: check the keyboard layout and caps lock. There is no reset.
  - `permission denied` reading a file: harbour skips it and carries on, then lists skipped files at the end. Run with sudo to include them.
- Next pages in the docs: "Excluding files" at `/docs/excludes`, "Retention and pruning" at `/docs/retention`, "Checking a repository" at `/docs/check`.

## Constraints

- Deliver one self-contained file: HTML with inline CSS and JavaScript. No build step, no frameworks or libraries, no network requests, no external fonts or images.
- It will be read on desktops mostly, sometimes on a phone.
