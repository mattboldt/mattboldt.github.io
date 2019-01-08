---
layout: post
permalink: /:title/
title: Importing Massive CSV Data Into Rails
desc: "Importing data and associating records using ActiveRecord.import and other ActiveRecord tools"
date: 2017-01-21 22:00:00
categories: rails, activerecord, mysql
---

There are times when you've got to import a huge amount of legacy or other data into your Rails ActiveRecord models.
It could be sourced from JSON, CSV, and many other types of files, but I'm going to go over CSV files here.

<h2>Importing from a CSV File Into Rails</h2>

<h3>The bad way</h3>

Let's take a CSV file and create some records. For this example, imagine the CSV file has tens (or hundreds) of thousands of rows.

~~~ ruby
require 'csv'

csv = File.read('link/to/file.csv')
CSV.parse(csv, headers: true).each do |row|
  Item.create(row.to_h)
end

~~~

This would take forever because it's...

* Loading the entire CSV into memory
* Creating hundreds of thousands of records one. at. a. time.

<h3>The Better Way</h3>

~~~ ruby

CSV.foreach('link/to/file.csv', headers: true) do |row|
  Item.create(row.to_h)
end

~~~

This iterates over each row in the CSV rather than loading the entire file into memory. However, we're still creating records at a snail's pace.

<h3>The Best Way</h3>

Enter the magic of [ActiveRecord.import](https://github.com/zdennis/activerecord-import)

~~~ ruby

items = []
CSV.foreach('link/to/file.csv', headers: true) do |row|
  items << Item.new(row.to_h)
end
Item.import(items)

~~~

This gem gives us a very handy `ModelName.import` method.

Just have a look at [these benchmarks](https://github.com/zdennis/activerecord-import/wiki/Benchmarks) to get a sense of just how much faster this option is.
Instead of separate transactions, commits, and inserts that a `Model.create` generates SQL for, this handles it in a single query.

<h2>Assigning Existing Records to Newly Imported Ones</h2>

<h3>The bad way</h3>

So let's say we have a ton of new records to import, but they need to be associated via `belongs_to` to an existing record.
We'll call these models `List` and `Item`, where `List has_many :items`

~~~ ruby

items = []
CSV.foreach('link/to/file.csv', headers: true) do |row|
  list = List.find_by(name: row[:name])
  items << Item.new(list: list, title: row[:title])
end
Item.import(items)

~~~

It's good we're using `Item.import` here, but now we're running a `find_by` for each iteration. Lame.

<h3>The Best Way (IMO)</h3>

~~~ ruby

lists_hash = List.pluck(:name, :id).to_h
# => {'todo list' => 213, 'another list' => 319}

items = []
CSV.foreach('link/to/file.csv', headers: true) do |row|
  list_id = lists_hash[row[:name]]
  items << Item.new(list_id: list_id, title: row[:title])
end
Item.import(items)

~~~

The `List.pluck` will run a single query to retrieve _only_ the `name` and `id` for every `List`.
This query doesn't take much time, even for very large tables. Then we assign the appropriate `id` by looking up the `row[:name]` in the hash, and import the items.
Two queries! That's it.

<h3>Some Gotchas</h3>

If you have a CSV or JSON file filled with hundreds of thousands, or maybe millions of records, you'll need a way to separate it in chunks before importing.
At a certain large number, `ActiveRecord.import` will fail. But this is pretty easy to do with some `array.each_slice` trickery, or with setting an index `i` in the loop then returning after it reaches a certain threshold.


Thanks for reading! And if you've got some tips or other methods of doing the above, feel free to tweet me or leave a comment.

