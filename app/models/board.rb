class Board < ApplicationRecord
  def self.create_new!
    transaction do
      a_letters = ("A".."Z").to_a.sample(16)
      letters = [ a_letters[0..3], a_letters[4..7], a_letters[8..11], a_letters[12..15] ]
      create(letters: letters, title: "4x4 Board")
    end
  end

  def word_valid?(word)
    word.upcase!
    # return false if
    # - word not found in system dictionary
    # - word length is < 3
    # - word length > 16

    return false if word.length <3 || word.length > 16 || `look #{word} | wc -l`.to_i == 0

    # find each occurance of first letter in the board and traverse
    #
    # binding.pry

    word.split("").each_with_index do |l, l_pos|
      # positions of the letter
      letters.each_with_index do |inner_array, i|
        inner_array.each_with_index do |letter, j|
            if l == letter
              puts "found: " + [ l, i, j ].to_s
              if find_surrounding(i, j, l_pos, word)
                return true
              end
            end
        end
      end
    end

    false
  end

  private

  def find_surrounding(i, j, l_pos, word)
    matrix = [
      [ i-1, j-1 ], [ i-1, j ], [ i-1, j+1 ],
      [ i, j-1 ],   [ i, j ],   [ i, j+1 ],
      [ i+1, j-1 ], [ i+1, j ], [ i+1, j+1 ]
    ]
    matrix.each do |pair|
      if (0..3).include?(pair[0]) && (0..3).include?(pair[1]) && letters[pair[0]][pair[1]] == word[l_pos+1]
        if l_pos + 1 == word.length - 1
          return true
        else
          find_surrounding(pair[0], pair[1], l_pos + 1, word)
        end
      end
    end

    false
  end
end
