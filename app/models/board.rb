class Board < ApplicationRecord
  def self.create_new!
    transaction do
      a_letters = ("A".."Z").to_a.sample(16)
      letters = [ a_letters[0..3], a_letters[4..7], a_letters[8..11], a_letters[12..15] ]
      create(letters: letters, title: "4x4 Board")
    end
  end

  def word_valid?(word)
    # return false if
    # - word not found in system dictionary or use 'dictionary' gem
    # - word length is < 3
    # - word length > 16
    #
    # find each occurance of first letter
    #
    # binding.pry
   return false if word.length <3 || word.length > 16 || `look #{word} | wc -l`.to_i == 0

    true
  end
end
