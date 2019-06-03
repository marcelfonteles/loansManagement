# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Names avaliable
@names = ['José',
          'João Gilberto',
          'Maria Joaquina',
          'Marta Ribeiro',
          'Juliete',
          'Ramona Marins',
          'Don Corleone,'
          'José Villar']

puts "Apagando o banco...."

User.all.each do |user|
  user.destroy
end
Loan.all.each do |loan|
  loan.destroy
end
Customer.all.each do |customer|
  customer.destroy
end

puts "Apagando o banco....[OK]"

puts "Populando o banco...."

User.create(email: 'user@user.com', password:'fonteles', name: 'Usuário')

count = 1
9.times do 
  Customer.create(name: @names.sample,
                  phone: "+55 85 9 9999-999#{count}",
                  address: "Street #{count}, 6020#{count}")
  count += 1
end
count = 1
100.times do
  @amount = [500, 100, 150, 1250, 325, 333.33].sample
  @portions = [1,2,3,4,5].sample
  @paid = '['
  @count = 1
  @portions.times do
    @paid = @paid + '{"portion": ' + @count.to_s + ', "paid": "false"}'
    if @count != @portions
      @paid = @paid + ', '
    end
    @count = @count + 1
  end
  @paid = @paid + ']'
  @customer = Customer.all.sample.id
  Loan.create(store: "Loja #{count}",
              amount: @amount,
              portions: @portions,
              paid: @paid,
              customer_id: @customer
              )
  count += 1
end

puts "Populando o banco....[OK]"
