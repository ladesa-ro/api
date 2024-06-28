#!/usr/bin/env bash

set -xe

last_tag=$(git describe --tags --abbrev=0)
last_tag_sha=$(git rev-list -n 1 ${last_tag})
changes="$(git diff --name-only HEAD ${last_tag_sha} | cat )"

desired=integrations/npm/api-client

diff_desired=$(echo "${changes}" | grep "${desired}")

diff_desired_count=$( echo "${diff_desired}" | wc -l )

echo "Affected files count: ${diff_desired_count}"

if [[ ${diff_desired_count} -gt 0 ]]; then
  echo "Changed since last release"
  release-it -c .release-it.json $@
else
  echo "No changes since last release"
fi

