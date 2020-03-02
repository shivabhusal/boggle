# == Schema Information
#
# Table name: plays
#
#  id              :integer          not null, primary key
#  correct_words   :string
#  incorrect_words :string
#  game_id         :integer          not null
#  user_id         :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'test_helper'

class PlayTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
