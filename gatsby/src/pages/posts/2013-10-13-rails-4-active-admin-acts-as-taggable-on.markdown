---
layout: post
permalink: /:title/
title: "Rails 4, ActiveAdmin, and acts_as_taggable_on"
desc: Rails 4 has done away with using attr_accessible and others like it. The new standard is to use strong parameters, and it definitely seems like a more secure system. But, for legacy apps upgrading to Rails 4, there is a gem called "protected_attributes" that gives you back what Rails 3 and before let you do -- which is the ability to use attr_accessible :attr1, :attr2, etc to mass assign attributes in your model. This, however, does not come without issues.
date: 2013-10-13 17:00:00
categories: rails, ruby
---

<p>
Rails 4 has done away with using attr_accessible and others like it. The new standard is to use strong parameters, and it definitely seems like a more secure system. But, for legacy apps upgrading to Rails 4, there is a gem called "protected_attributes" that gives you back what Rails 3 and before let you do -- which is the ability to use attr_accessible :attr1, :attr2, etc to mass assign attributes in your model. This, however, does not come without issues.</p>

<p>
Recently I sought out to use the acts_as_taggable_on gem. I'm also using ActiveAdmin. For some reason, when I added tags to my database entries via ActiveAdmin, no errors were returned, but the entries weren't being updated. In the Rails server error logs, I found a mass assign error.
</p>

~~~
WARNING: Can't mass-assign protected attributes for ActsAsTaggableOn::Tag: name
~~~

<p>
Now, to use the acts_as_taggable_on gem, you are to use <span class="inline-code">attr_accessible :tag_list</span> in the model. But, this doesn't quite work since you're relying on the protected_attributes gem. One work around is to hack the acts_as_taggable system a bit to include those extra attributes on the attr_accessible list. But I'd rather have a future proof solution where I'm not relying on a gem for an old feature. So, I removed the protected_attributes gem from my Gemfile. And then came the long list of errors specific to Rails 4 and the new <strong>strong parameter</strong> system.
</p>

~~~
`attr_accessible': `attr_accessible` is extracted out of Rails into a gem. Please use new recommended protection model for params(strong_parameters) or add `protected_attributes` to your Gemfile to use old one.
~~~


<p>
So now I need a way to make ActiveAdmin use strong parameters instead of relying on attr_accessible. The solution is rather cumbersome, but seems the most future proof, and the most proper way to go about fixing this ActiveAdmin limitation.
</p>

<p>
In your ActiveAdmin controllers <span class="inline-code">app/admin/model_name.rb</span>, you must add the following code to each:
</p>

~~~
ActiveAdmin.register ModelName do
  controller do
    def permitted_params
      params.permit!
    end
  end
end
~~~

<p>
The <span class="inline-code">params.permit!</span> allows <strong>all</strong> attributes to be edited. This is, after all, my admin panel. But alternatively, you can just list the specific attrs.
</p>

~~~
params.permit(:blog => [:name, :description])
~~~

<p>And that's it! You're now using the new strong parameters with ActiveAdmin, and your acts_as_taggable_on gem works perfectly</p>


<p>If you run into any problems, please feel free to contact me and I'll update this article to reflect any other cases</p>

<p><small>
Credit to these Stack Overflow & Github threads.<br />
<a href="http://stackoverflow.com/questions/13091011/how-to-get-activeadmin-to-work-with-strong-parameters">How to get ActiveAdmin to work with Strong Parameters?</a><br />
<a href="https://github.com/mbleigh/acts-as-taggable-on/issues/389">Rails 4 protected attributes</a><br />
<a href="http://stackoverflow.com/questions/8355659/saving-tags-with-acts-as-taggable-and-activeadmin">Saving tags with acts_as_taggable and activeadmin</a>
</small>
</p>
