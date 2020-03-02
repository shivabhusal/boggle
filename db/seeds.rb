# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.create first_name: 'Shiva', last_name: 'Bhusal'

10.times.map do |_i|
  game = Game.create grid: Game.gen, difficulty_level: rand(1..3)
  rand(1..10).times { game.plays.create user: user }
end
