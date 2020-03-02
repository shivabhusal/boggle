# frozen_string_literal: true

# == Schema Information
#
# Table name: games
#
#  id                 :integer          not null, primary key
#  grid               :string
#  words              :string
#  no_of_times_played :integer          default("0")
#  no_of_players      :integer          default("0")
#  top_score          :integer          default("0")
#  difficulty_level   :integer          default("0")
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class Game < ApplicationRecord
  has_many :plays
  serialize :grid, Array
  serialize :words, Array

  def top_score
    plays.maximum(:score)
  end

  def play_count
    plays.count
  end

  def player_count
    plays.distinct.select(:user_id).count
  end

  class << self
    def gen
      letters = ('A'..'Z').to_a + ['Qu'] + %w[A E I O U]
      random_letters = letters.sample(4) + letters.sample(4) + letters.sample(4) + letters.sample(4)
      random_letters.each_slice(4).to_a
    end
  end
end
