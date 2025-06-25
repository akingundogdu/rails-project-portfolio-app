class CreateContactMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :contact_messages do |t|
      t.string :name, null: false, limit: 100
      t.string :email, null: false, limit: 255
      t.string :subject, null: false, limit: 200
      t.text :message, null: false
      t.string :message_type, default: 'general', null: false
      t.boolean :read, default: false, null: false
      t.boolean :replied, default: false, null: false
      t.boolean :priority, default: false, null: false
      t.datetime :read_at
      t.datetime :replied_at
      t.string :ip_address
      t.string :user_agent
      t.text :admin_notes

      t.timestamps
    end

    add_index :contact_messages, :email
    add_index :contact_messages, :message_type
    add_index :contact_messages, :read
    add_index :contact_messages, :replied
    add_index :contact_messages, :priority
    add_index :contact_messages, :created_at
    add_index :contact_messages, [:read, :priority]
    add_index :contact_messages, [:message_type, :created_at]
    add_index :contact_messages, [:replied, :created_at]
  end
end 