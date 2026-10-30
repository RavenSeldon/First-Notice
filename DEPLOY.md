# Deploying First Notice → https://benamuwo.me/first-notice/

Same pattern as Schrödinger's Civilization (see `SchroCivWeb/DEPLOY.md`):
static files on the droplet at `/srv/first-notice/current/first-notice/`,
served by the `first_notice` blueprint in the Neurascape Flask blog.
Everything runs from the Mac; the droplet only receives files.

## Once: put the blueprint live (blog side)

The blog change is three small edits in `beamu-blog/WebDev/Blog`:
`app/routes/first_notice/` (new; a copy of the schrodingers_civ blueprint with
its own prefix, root and `firstnotice_` endpoints), one registration line in
`app/routes/__init__.py`, and one sitemap entry in `app/routes/main.py`.

```bash
cd ~/Root/beamu-blog            # or whichever clone you push the blog from
git status --short              # expect only those three paths
git add WebDev/Blog/app/routes/first_notice WebDev/Blog/app/routes/__init__.py WebDev/Blog/app/routes/main.py
git commit -m "Serve First Notice at /first-notice/"
git push
ssh -t neurascape
cd /var/www/Neurascape/WebDev/Blog && git pull
sudo systemctl kill -s HUP blog.service
exit
```

Until files are installed, `/first-notice/` returns **503** (blueprint live,
files missing). That is expected.

## Every release (app side)

```bash
cd ~/Root/Mangrove/First-Notice
./scripts/deploy.sh             # tests → build → upload → atomic symlink swap → curl checks
```

No blog restart is needed for releases. Expect `200` for all three checks.

## Rollback

```bash
ssh neurascape 'ls -1 /srv/first-notice/releases/'
ssh -t neurascape 'sudo ln -sfn /srv/first-notice/releases/<PREVIOUS> /srv/first-notice/current.new && sudo mv -T /srv/first-notice/current.new /srv/first-notice/current'
```

## Meaning of errors
| Symptom | Meaning |
|---|---|
| 404 at `/first-notice/` | Blueprint not loaded: blog `git pull` + HUP not done |
| 503 | Blueprint live, release files missing |
| Blank page, asset 404s | Visited without trailing slash on an old blog build; the blueprint 308-redirects |
