#!/usr/bin/env bash

rm -rf public
mv ./frontend/build ./public
echo "copied build to public"
