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

  def valid_word?(word)
    check(word).any?
  end

  private

  def check(word)
    words = [word]
    @dictionary = words.select { |w| isValidWord?(w) }
    @valid_words = []
    @rowcol = grid
    visitedGrid = 16.times.map { false }.each_slice(4).to_a
    @rowcol.each_with_index do |row, i|
      row.each_with_index do |_, j|
        findword(visitedGrid, i, j, '')
      end
    end
    @valid_words.uniq
  end

  def isValidWord?(word)
    system("look #{word.downcase} > /dev/null 2>&1")
  end

  def findword(visited, i, j, str)
    visited[i][j] = true
    str += @rowcol[i][j]
    if @dictionary.index(str.downcase) || @dictionary.index(str.upcase)
      @valid_words << str
    end

    row = i - 1
    while row <= i + 1 && row < 4
      col = j - 1
      if row > 0
        while col <= j + 1 && col < 4
          if col >= 0 && col < 4 && !visited[row][col]
            findword(visited, row, col, str)
          end
          col += 1
        end
      end
      row += 1
    end

    str = str[0..-2]
    visited[i][j] = false
  end

  class << self
    def gen
      letters = ('A'..'Z').to_a + ['Qu'] + %w[A E I O U]
      random_letters = letters.sample(4) + letters.sample(4) + letters.sample(4) + letters.sample(4)
      random_letters.each_slice(4).to_a
    end
  end
end
