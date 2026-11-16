#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./_nvm.sh
. "$SCRIPT_DIR/_nvm.sh"

REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$REPO_ROOT"

SHOT_DIR="smartui-screenshots"
# Each run must have a UNIQUE build name. SmartUI maps an upload with an existing
# build name onto that same build and overwrites it in place (no comparison), so
# a static name silently overwrites the baseline instead of comparing against it.
# A unique name creates a new build; SmartUI still diffs each screenshot (by name)
# against the branch baseline.
BUILD_BASE="${SMARTUI_BUILD_NAME:-LT-Detox-RD-Android}"
BUILD_NAME="${BUILD_BASE}-$(date -u +%Y%m%d-%H%M%S)"

if [ -z "${PROJECT_TOKEN:-}" ]; then
  echo "⚠️  PROJECT_TOKEN is not set; skipping SmartUI upload." >&2
  echo "    Set it as a HyperExecute secret (SmartUI project token)." >&2
  exit 0
fi

if [ ! -d "$SHOT_DIR" ] || [ -z "$(ls -A "$SHOT_DIR" 2>/dev/null)" ]; then
  echo "⚠️  No screenshots in ./$SHOT_DIR; skipping SmartUI upload."
  echo "    Did the tests run with VISUAL=true?"
  exit 0
fi

echo "📤 Uploading $(ls -1 "$SHOT_DIR" | wc -l) screenshot(s) to SmartUI build '$BUILD_NAME'..."
npx smartui upload "$SHOT_DIR" --buildName "$BUILD_NAME"
