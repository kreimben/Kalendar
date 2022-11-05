#!/bin/sh
# shellcheck disable=SC2046
# shellcheck disable=SC2006
echo `docker buildx build --platform linux/amd64,linux/arm64 -t registry.kreimben.com/wf:latest --push .`