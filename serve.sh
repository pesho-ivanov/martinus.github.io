#!/bin/bash
rm -Rvf _site && bundle exec jekyll serve --incremental --limit_posts 1
