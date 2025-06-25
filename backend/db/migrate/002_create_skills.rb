class CreateSkills < ActiveRecord::Migration[7.1]
  def change
    create_table :skills do |t|
      t.string :name, null: false, limit: 50
      t.string :category, null: false
      t.integer :proficiency_level, null: false
      t.decimal :years_of_experience, precision: 4, scale: 1, null: false
      t.text :description
      t.boolean :featured, default: false, null: false
      t.string :icon_url
      t.string :color_code
      t.integer :sort_order, default: 0

      t.timestamps
    end

    add_index :skills, :name, unique: true
    add_index :skills, :category
    add_index :skills, :proficiency_level
    add_index :skills, :featured
    add_index :skills, :sort_order
    add_index :skills, [:category, :proficiency_level]
    add_index :skills, [:featured, :proficiency_level]
  end
end 