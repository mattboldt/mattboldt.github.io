---
layout: post
title: Separating Rails Routes
desc: "Cleaning up routes.rb by separating routes into individual files"
date: 2017-11-11 17:00:00
categories: ruby, rails
---

Routes can quickly get out of hand in large apps. In a [reverted commit to rails 4](https://github.com/rails/rails/commit/5e7d6bba79393de0279917f93b82f3b7b176f4b5), a feature was removed to fix this, citing [concerns about separate files becoming less clear](https://github.com/rails/rails/commit/5e7d6bba79393de0279917f93b82f3b7b176f4b5#commitcomment-5846694). I agree that going buck wild creating new files probably won't help make things simpler, but if your app is big enough, it may be becoming difficult to add new routes in the right places.

### Things we need

 - Routes must load in the correct order
 - Routes must auto-reload in the dev environment

Here's how [dhh](https://gist.github.com/dhh/2492118) and the folks at [GitLab](https://gitlab.com/gitlab-org/gitlab-ce/blob/master/config/initializers/routing_draw.rb) get it done:

```ruby
# config/initializers/routing_draw.rb

# Adds draw method into Rails routing
# It allows us to keep routing splitted into files
class ActionDispatch::Routing::Mapper
  def draw(routes_name)
    instance_eval(File.read(Rails.root.join("config/routes/#{routes_name}.rb")))
  end
end
```

### New `routes.rb`

```ruby
# config/routes.rb
MyApp::Application.routes.draw do
  draw :api_v1
  draw :api_v2
  draw :admin
end
```

### New route files

```ruby
# config/routes/api_v1.rb
namespace :api_v1 do
  # lots of routes
end

# config/routes/api_v2.rb
namespace :api_v2 do
  # lots of routes
end

# config/routes/admin.rb
namespace :admin do
  # lots of routes
end
```

## Confirming All Routes Are Intact

To be sure you haven't completely destroyed any endpoints on your app, check your new routes into a branch and run the following:

```bash
git checkout master
rake routes | cat > routes_before.txt

git checkout route_split
rake routes | cat > routes_after.txt

diff -u routes_before.txt routes_after.txt
#=> No results means no changes!
```

### end