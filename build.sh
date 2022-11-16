#!/bin/sh
# shellcheck disable=SC2046
# shellcheck disable=SC2006
# 도커 이미지로 빌드해서 개인 서버에 업로드 하는 쉘 스크립트 입니다.
echo `docker buildx build --platform linux/amd64,linux/arm64 -t registry.kreimben.com/wf:latest --push .`