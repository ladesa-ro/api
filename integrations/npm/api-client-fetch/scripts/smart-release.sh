#!/usr/bin/env bash

set -xe

last_tag=$(git describe --tags --abbrev=0)
last_tag_sha=$(git rev-list -n 1 ${last_tag})
changes="$(git diff --name-only HEAD ${last_tag_sha} | cat )"

desired=integrations/npm/api-client-fetch

diff_desired=$(echo "${changes}" | grep "${desired}"; exit 0)

diff_desired_count=0

if [[ -n "${diff_desired}" ]]; then
  diff_desired_count=$( echo "${diff_desired}" | wc -l )
fi

echo "Affected files count: ${diff_desired_count}"

if [[ ${diff_desired_count} -gt 0 ]]; then
  echo "Changed since last release"
  
  if [[ ${SMART_RELEASE_DRY_RUN} == "true" ]]; then
    echo release-it -c .release-it.json $@
  else
    release-it -c .release-it.json $@
  fi
else
  echo "No changes since last release"
fi

