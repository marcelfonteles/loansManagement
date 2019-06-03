class AddColumnToLoan < ActiveRecord::Migration[5.2]
  def change
    add_column :loans, :date, :string
  end
end
