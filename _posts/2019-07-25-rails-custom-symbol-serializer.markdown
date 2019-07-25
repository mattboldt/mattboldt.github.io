---
layout: post
title: Custom Rails Symbol Serializer
desc: "Serialize Rails model string attributes as symbols"
date: 2019-07-25 15:00:00
categories: rails, ruby symbols
---

Rails comes with some built in model serialziers such as `Array` and `JSON` which transform data from the database into your preferred format. In some cases, you may have a string column that you'd rather interact with via symbols.

Find or create a `lib/serializers` directory, then create `symbol_serializer.rb` and add the following:

```ruby
class SymbolSerializer
  def self.dump(sym)
    sym ? sym.to_s : nil
  end

  def self.load(text)
    text ? text.to_sym : nil
  end
end
```

Before we can use this new serializer, we need to add the `lib/serializers` path to our autoload config in `config/application.rb`.

```ruby
config.autoload_paths += %W(
  # ...
  #{config.root}/lib/serializers
  # ...
)
```

Now it can be used on any ActiveRecord model.

```ruby
class Person < ApplicationRecord
  serialize :status, SymbolSerializer
end

user = Person.create(status: :active)
user.status
#=> :active

user.update(status: 'blocked')
user.status
#=> :blocked
```

Notice you can still pass strings to your model and it will convert back to a symbol once you save and call the method's getter again.



