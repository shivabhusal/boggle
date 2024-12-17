require "test_helper"

class BoardTest < ActiveSupport::TestCase
  test ".create_new!" do
    new_board = Board.create_new!
    assert new_board.persisted?
    assert new_board.letters.count == 4
  end

  test "#word_valid?" do
    board = Board.build(letters: [[ 'T', 'R', 'A', 'P' ],['E', 'S', 'E', 'N'],['L', 'I', 'D', 'E'],['C', 'O', 'M', 'A']])

    assert board.word_valid?('trap')
    assert board.word_valid?('send')
    assert board.word_valid?('idea')
    assert board.word_valid?('lid')
    assert board.word_valid?('sea')
    assert board.word_valid?('side')
    assert board.word_valid?('panda')
    assert board.word_valid?('strap')
    assert board.word_valid?('comedist')
    assert board.word_valid?('pandemic')
    assert_not board.word_valid?('pandamic')
    assert_not board.word_valid?('comedian')

  end
end
