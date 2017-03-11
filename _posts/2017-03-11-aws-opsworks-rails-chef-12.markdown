---
layout: post
title: Deploying a Rails App to AWS OpsWorks using Chef 12
desc: "Configuring and deploying a Rails app to AWS OpsWorks using Linux Chef 12"
date: 2017-03-11 17:00:00
categories: aws, opsworks, chef 12, linux, ubuntu, rails
---


[AWS OpsWorks is a configuration management service that uses Chef](https://aws.amazon.com/opsworks/) to automate server configurations. OpsWorks previously used Chef v11 and came with built-in cookbooks to deploy apps such as Rails, Node, and more. However, the [latest OpsWorks Linux Chef v12](http://docs.aws.amazon.com/opsworks/latest/userguide/chef-12-linux.html) does not come with _any_ built-in cookbooks. While this adds some more complexity to setting things up, it also comes with the added benefit of using [community sourced cookbooks](https://github.com/chef-cookbooks) instead of ones developed by Amazon.


### Our To-do List

- [Download and install the Chef SDK on your local machine](https://downloads.chef.io/chefdk)
- Create, package, and upload our local cookbooks to S3 (as per the [AWS guides](http://docs.aws.amazon.com/opsworks/latest/userguide/best-practices-packaging-cookbooks-locally.html))
- Create a new Chef 12 OpsWorks Stack
- Deploy our Rails app

## Creating a Chef Cookbook

On your local machine, create a new cookbook:

```
chef generate cookbook "my-cookbook"
cd my-cookbook
```

Open up the freshly created `Berksfile` and `metadata.rb` in a text editor. We're going to use the fantastic [opsworks_ruby](https://github.com/ajgon/opsworks_ruby) set of cookbooks to emulate what OpsWorks did for us on Chef 11, when all you needed to do was choose "Rails App" from a dropdown menu.

```ruby
# Berksfile
source 'https://supermarket.chef.io'

cookbook 'opsworks_ruby', '1.3.0'
cookbook 'packages', '~> 1.0.0'
metadata
```

```ruby
# metadata.rb
# -- ommitted metadata properties --

depends 'opsworks_ruby', '1.3.0'
depends 'packages', '~> 1.0.0'

```

We're also using the [packages](https://github.com/mattray/packages-cookbook) cookbook that can install OS packages such as `imagemagick`, `nodejs`, or any other package your Rails app needs.

```ruby
# recipes/default.rb

node.default['packages-cookbook'] = [
 'nodejs',
 'imagemagick'
]
```

Now we're ready to package up these cookbooks and their dependencies. I recommend first installing the latest version of the `Berkshelf` gem, as I ran into some issues with the installed version from the Chef SDK.

```
gem install berkshelf
berks install
berks package cookbooks.tar.gz
```
You should now find `cookbooks.tar.gz` in your local directory; this archive contains all dependencies you're included in your `metadata.rb` file, as well as all your _dependencies'_ dependencies. You'll need to upload this file to an S3 bucket in your AWS account.


## Creating a New OpsWorks Stack

![create stack](../assets/img/aws-opsworks/create-stack.png)

### Add your Rails App Layer

![create layer](../assets/img/aws-opsworks/create-layer.png)

### Layer Settings

Here we enter our custom JSON generated from [opsworks_ruby's handy configurator](http://opsworks-ruby.rzegocki.pl/configuration-builder). I'm using Unicorn as my app server, an RDS endpoint for my MySQL database, and Ruby version 2.3. I've also configured it to not migrate the database for each deployment, as I'd prefer to do that manually. Additionally, I have `assets_precompile` disabled since I have that command running in a `before_restart.rb` hook instead of running it along with the recipes. For more custom attributes, visit the [opsworks_ruby documentation](http://opsworks-ruby.readthedocs.io/en/latest/attributes.html).

![general settings](../assets/img/aws-opsworks/general-settings.png)

### Configure Layer Recipes from the [opsworks_ruby recipes](http://opsworks-ruby.readthedocs.io/en/latest/recipes.html)

![create stack](../assets/img/aws-opsworks/create-recipes.png)

### Create and Deploy Your Rails App

Creating an app in OpsWorks is fairly self-explanatory, so I won't go in detail about that here. Once you get your app set up, you're ready to spin up a new instance of your choosing and deploy your Rails app.

## Automating Packaging and Uploading Your Cookbooks to S3

I've created a tool to automate this process so you don't have to pull up the S3 web interface or use the AWS CLI. [You can download it here.](https://gist.github.com/mattboldt/1d67be94b8b51ddb7a7ae07545ac997f)

<script src="https://gist.github.com/mattboldt/1d67be94b8b51ddb7a7ae07545ac997f.js"></script>

## Fin

I have most likely left out some details in this rather brief post, but this should get you going pretty quickly. All remaining setup will probably be unique to your application.