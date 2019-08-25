# install bundler version from the Gemfile.lock:

gem install bundler -v 1.15.3
bundle install --path ~/martinus.github.io.bundle

# serve it
bundle exec jekyll serve --incremental

# faster
bundle exec jekyll serve --watch --limit_posts 1