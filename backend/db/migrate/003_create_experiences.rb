class CreateExperiences < ActiveRecord::Migration[7.1]
  def change
    create_table :experiences do |t|
      t.string :company_name, null: false, limit: 100
      t.string :position, null: false, limit: 100
      t.text :description, null: false
      t.date :start_date, null: false
      t.date :end_date
      t.boolean :current, default: false, null: false
      t.string :employment_type, null: false
      t.string :location, null: false, limit: 100
      t.string :company_url
      t.string :company_logo_url
      t.text :technologies
      t.text :achievements
      t.boolean :featured, default: false, null: false
      t.integer :sort_order, default: 0

      t.timestamps
    end

    add_index :experiences, :company_name
    add_index :experiences, :position
    add_index :experiences, :start_date
    add_index :experiences, :end_date
    add_index :experiences, :current
    add_index :experiences, :employment_type
    add_index :experiences, :featured
    add_index :experiences, :sort_order
    add_index :experiences, [:current, :start_date]
    add_index :experiences, [:featured, :start_date]
  end
end 