module Api
  class Api::LoansController < ApplicationController
    def index
      @loans = Loan.all
    end

    def create
      @loan = Loan.new(loans_params)
      paid = '{'
      count = 1
      @loan.portions.to_i.times do
        paid = paid + "portion#{count}: false"
        if count != @loan.portions.to_i
          paid = paid + ","
        end
        count += 1
      end
      paid = paid + '}'
      @loan.paid = paid

      if @loan.save 
        render json: { status: 200, data: @loan, message: 'Loan save successfully'}
      else
        render json: { status: 400, message: 'I could not save this loan. Try again another time!'}
      end
    end

    def confirm_payment
      @paramsToJSON = JSON.parse(params[:_json])
      @update = JSON.generate(@paramsToJSON[0..@paramsToJSON.length - 2])
      @loan = Loan.find(@paramsToJSON[@paramsToJSON.length - 1]['loan_id'])
      @loan.update(paid: @update)

      render json: {status: 200, data: @loan}
    end

    def customer_loans
      @loans = Loan.all.where(customer_id: params[:customer_id])
      render json: { status: 200, data: @loans}
    end

    def destroy
      @loan = Loan.find(params[:id])
      if @loan.destroy
        render json: {status: 200, message: "Loan deleted from database." }
      else
        render json: { status: 400, message: "Is not possible to delete this loan"}
      end
    end

    def total_amount
      @totalAmount = Loan.all.sum {|loan| loan.amount }
      @numberLoans = Loan.all.count
      render json: { status: 200, totalAmount: @totalAmount, numberLoans: @numberLoans}
    end

    private

    def loans_params
      params.require(:loan).permit(:amount, :store, :portions, :paid, :customer_id, :portion, :paid, :_json)
    end
  end
end
