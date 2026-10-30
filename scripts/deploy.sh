#!/usr/bin/env bash
# Deploy First Notice to https://benamuwo.me/first-notice/
# Runs on Ben's Mac. Same release/symlink pattern as Schrödinger's Civilization.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== tests";  npm test
echo "== build";  rm -rf dist && npm run build
test -f dist/index.html || { echo "ABORT: no dist/index.html"; exit 1; }

REL=$(date +%Y%m%d-%H%M%S)
echo "== upload release $REL"
ssh neurascape "mkdir -p ~/fn-staging/${REL}"
rsync -a --delete dist/ "neurascape:fn-staging/${REL}/"

ssh neurascape 'cat > ~/fn-install.sh' <<'INSTALL'
set -e
HOMEDIR=$(getent passwd "${SUDO_USER:-$USER}" | cut -d: -f6)
REL=$(ls -1 "$HOMEDIR/fn-staging" | sort | tail -1)
echo "installing: $REL"
test -f "$HOMEDIR/fn-staging/$REL/index.html" || { echo "ABORT: no index.html"; exit 1; }
mkdir -p "/srv/first-notice/releases/$REL"
rsync -a --delete "$HOMEDIR/fn-staging/$REL/" "/srv/first-notice/releases/$REL/first-notice/"
chown -R root:root "/srv/first-notice/releases/$REL"
chmod -R a+rX "/srv/first-notice/releases/$REL"
ln -sfn "/srv/first-notice/releases/$REL" /srv/first-notice/current.new
mv -T /srv/first-notice/current.new /srv/first-notice/current
echo "current -> $(readlink -f /srv/first-notice/current)"
INSTALL

echo "== install (sudo on droplet)"
ssh -t neurascape 'sudo bash ~/fn-install.sh'

echo "== check"
curl -sI https://www.benamuwo.me/first-notice/ | head -1
curl -sI https://www.benamuwo.me/ | head -1
curl -sI https://www.benamuwo.me/schrodingers_civ/ | head -1
