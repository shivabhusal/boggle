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
require 'test_helper'

class GameTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
