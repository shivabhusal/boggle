class Board < ApplicationRecord
  BOARD_SIZE      = 4
  MIN_WORD_LENGTH = 3
  MAX_WORD_LENGTH = BOARD_SIZE**BOARD_SIZE

  def self.create_new!
    transaction do
      a_letters = ("A".."Z").to_a.sample(16)
      letters = [ a_letters[0..3], a_letters[4..7], a_letters[8..11], a_letters[12..15] ]
      create(letters: letters, title: "4x4 Board")
    end
  end

  def word_valid?(word)
    word.upcase!

    return false if word.length < MIN_WORD_LENGTH || word.length > MAX_WORD_LENGTH || !word_in_dict?(word)

    # find each occurance of first letter in the board and traverse
    # finding the positions of the letters in the word
    self.letters.each_with_index do |inner_array, i|
      inner_array.each_with_index do |letter, j|
          if word[0] == letter # letters found in the board
            res = search_surrounding(i, j, 0, word)
            if res
              return true
            end
          end
      end
    end

    false
  end

  private

  def word_in_dict?(word)
    dictionary = Set.new(File.readlines(Rails.root.join("db/words"), chomp: true).map(&:upcase))
    dictionary.include?(word)
  end

  def search_surrounding(i, j, l_pos, word)
    matrix = [
      [ i-1, j-1 ], [ i-1, j ], [ i-1, j+1 ],
      [ i, j-1 ],        [ i, j+1 ],
      [ i+1, j-1 ], [ i+1, j ], [ i+1, j+1 ]
    ]
    matrix.each do |pair|
      next unless valid_boundary?(pair)

      neighbor = letters[pair[0]][pair[1]]
      next_letter = word[l_pos+1]
      if neighbor == next_letter

        if (l_pos+1) == (word.length - 1) # is last letter in the word
          return true
        else
          if search_surrounding(pair[0], pair[1], l_pos + 1, word)
            return true
          end
        end
      end
    end

    false
  end

  def valid_boundary?(pair)
    (0..(BOARD_SIZE-1)).include?(pair[0]) && (0..(BOARD_SIZE-1)).include?(pair[1])
  end
end
