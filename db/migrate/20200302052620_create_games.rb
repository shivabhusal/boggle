class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :grid
      t.references :user, null: false, foreign_key: true
      t.string :words, array: true

      t.timestamps
    end
  end
end
