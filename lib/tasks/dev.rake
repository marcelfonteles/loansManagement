namespace :dev do
  desc "TODO"
  task Setup: :environment do
  	puts 'Dropping Database...'
  	"#{`rails db:drop`}"
  	puts 'Dropping Database...[OK]'
  	puts 'Creating new Database...'
  	"#{`rails db:create`}"
  	"#{`rails db:migrate`}"
  	puts 'Creating new Database...[OK]'
  	puts 'Inserting data in new DB...'
  	"#{`rails db:seed`}"
  	puts 'Inserting data in new DB...[OK]'
  end

  task setuprun: :environment do
    puts 'Dropping Database...'
    "#{`rails db:drop`}"
    puts 'Dropping Database...[OK]'
    puts 'Creating new Database...'
    "#{`rails db:create`}"
    "#{`rails db:migrate`}"
    puts 'Creating new Database...[OK]'
    puts 'Inserting data in new DB...'
    "#{`rails db:seed`}"
    puts 'Inserting data in new DB...[OK]'
    puts 'Starting Server'
    "#{`rails s`}"
  end

end
