class Customer < ApplicationRecord
  has_many :loans, dependent: :destroy
end
