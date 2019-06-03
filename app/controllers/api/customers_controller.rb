module Api
  class CustomersController < ApplicationController
    def index
      @customers = Customer.all
      render json: {status: 200, data: @customers}
    end

    def show
      @customer = Customer.find(params[:id])
      render json: { status: 200, data: @customer}
    end

    def create
      @customer = Customer.new(customers_params)
      if @customer.save
        render json: { status: 200, data: @customer, message: "Customer created with success!"}
      else
        render json: {status: 400, message: 'Customer can not be created!'}
      end
    end

    private

    def customers_params
      params.require(:customer).permit(:name, :phone, :address)
    end
  end
end
