---
layout: post
title: Updating S3 Object Metadata With the AWS Ruby SDK
desc: "Updating S3 object metadata for a whole bucket using the AWS Ruby sdk"
date: 2017-03-31 17:00:00
categories: aws, s3, ruby, rails
---

Today I brought down a website by playing with fire and AWS S3. I did research, tested my code thoroughly, and then pressed the enter key. Shortly after, my heart dropped as quickly as the site went down. I decided to write a quick blog post to possibly prevent this mistake from happening to someone else.

## S3 is not a database

It is not possible to "update" an object in S3 -- it simply does not have an update method. This is true for both the Ruby SDK and the AWS CLI. If, like me, you're looking to update an entire bucket of objects with some new metadata (like `Cache-Control` headers, for instance), you'll need to use the [copy_to method](http://docs.aws.amazon.com/sdkforruby/api/Aws/S3/Object.html#copy_to-instance_method).

Let's start by authenticating and grabbing our bucket. 

```ruby
require 'aws-sdk'

Aws.config.update({
  region: 'us-east-1',
  credentials: Aws::Credentials.new(<AWS_ACCESS_KEY>, <AWS_SECRET_KEY>)
})
s3 = Aws::S3::Resource.new
bucket = s3.bucket('mattboldt-bucket')
```

Now we can loop through each object and copy it to itself with some new metadata. Notice we're using the option `metadata_directive: 'REPLACE'` -- this will _replace_ the object's metadata with our new metadata. Without this, it won't copy anything new, and you'll probably get an error message such as the following:

```
This copy request is illegal because it is trying to copy an object to itself without changing the object's metadata, storage class, website redirect location or encryption attributes
```
 **However, replacing the metadata here will also replace everything else about the object, such as its permissions. Do not run the following code.**

```ruby
# the WRONG way
bucket.objects.each do |object_summary|
  location = "#{bucket.name}/#{object_summary.key}"
  options = {
    cache_control: 'public, max-age=60',
    metadata_directive: 'REPLACE' # options: 'COPY' or 'REPLACE'
  }
  object_summary.copy_to(location, options)
end
```

Here's where I screwed up. All the S3 objects I just updated lost their read permissions, and the CDN could no longer access these once public assets. Right now it sounds like a pretty stupid mistake, but at the time I had no idea what had gone wrong.

### Updating / copying objects and retaining their existing data

Let's try again; and this time we'll be sure to include all the object's current attributes with the new request. Here's a list (as of March of 2017) of the possible options passed to the `copy_to` method:

```ruby
COPY_TO_OPTIONS = [:multipart_copy, :content_length, :copy_source_client, :copy_source_region, :acl, :cache_control, :content_disposition, :content_encoding, :content_language, :content_type, :copy_source_if_match, :copy_source_if_modified_since, :copy_source_if_none_match, :copy_source_if_unmodified_since, :expires, :grant_full_control, :grant_read, :grant_read_acp, :grant_write_acp, :metadata, :metadata_directive, :tagging_directive, :server_side_encryption, :storage_class, :website_redirect_location, :sse_customer_algorithm, :sse_customer_key, :sse_customer_key_md5, :ssekms_key_id, :copy_source_sse_customer_algorithm, :copy_source_sse_customer_key, :copy_source_sse_customer_key_md5, :request_payer, :tagging, :use_accelerate_endpoint]
```

Armed with this list, let's grab all the existing data and merge it into our new `options` hash. I only want to add valid options, not everything that gets returned from the `get` method, so I'm running an `Array#slice` against the above list.

Also notice that I'm using `object_summary.get` below -- this is because the object summary does not contain the metadata, permissions, etc, of the file. This creates some extra overhead, but I'm not sure of any other way at the moment.

```ruby
bucket.objects.each do |object_summary|
  object = object_summary.get
  location = "#{bucket.name}/#{object_summary.key}"

  # Build a new options object
  options = {}
 
  # Merge in the object's existing properties
  existing_options = object.to_h.slice(*COPY_TO_OPTIONS)
  options.merge!(existing_options)

  # Add our new updates
  # The `acl` option here was very important in my case!
  options.merge!({
    acl: 'public-read', # private, public-read, public-read-write, authenticated-read, aws-exec-read, bucket-owner-read, bucket-owner-full-control
    cache_control: 'public, max-age=60',
    metadata_directive: 'REPLACE'
  })
  
  # multipart_copy is necessary if the object is 5GB+
  if object.size >= 5_000_000_000
    options.merge!({multipart_copy: true})
  else
    # Only used if multipart_copy is true
    options.delete(:content_length)
  end
  
  # Execute the copy!
  object_summary.copy_to(location, options)

end
```

If the size of your bucket is large, this will take some time. However, know that the `copy_to` method sends a copy request to S3 and is not uploading anything from your local machine. So even if you were copying to a new location (which we are not; the file body and key are staying the same), you wouldn't be re-uploading files.

Here's a gist of the full code:

<script src="https://gist.github.com/mattboldt/6052bac987c16b73563d4d6c56d7509b.js"></script>

### Fin

If you found this helpful, feel free to [tweet me @atMattb](https://twitter.com/atmattb). Thanks for reading!