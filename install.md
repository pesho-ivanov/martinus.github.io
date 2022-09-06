# Up and running locally

1. Install `ruby-devel`
   ```sh
   dnfi ruby-devel
   ```
2. Install `bundler`
   ```sh
   export PATH=${PATH}:${HOME}/bin
   gem install bundler
   ```
3. Install jekyll stuff, run from the checked out `martinus.github.io` directory
   ```sh
   bundle config set --local path 'vendor/bundle'
   bundle install
   ```
4. Serve it, with drafts
   ```sh
   bundle exec jekyll serve --drafts # run this at least once
   bundle exec jekyll serve --drafts --incremental # doesn't update the main page!
   ```
