source "https://rubygems.org"

# Match the GitHub Pages build environment so local previews behave like production.
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end

gem "webrick", "~> 1.7"

# Pin native-extension gems to versions that still support the system Ruby (2.6.x).
gem "ffi", "< 1.17"
gem "google-protobuf", "< 3.25"
