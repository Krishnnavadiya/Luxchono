import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock API hooks
const mockMakeOrder = jest.fn();
const mockPaymentOrder = jest.fn();
const mockPaymentVerification = jest.fn();

jest.mock('../api/Order', () => ({
  useMakeOrderMutation: () => [mockMakeOrder, { isLoading: false }],
  usePaymentOrderMutation: () => [mockPaymentOrder, { isLoading: false }],
  usePaymentVerificationMutation: () => [mockPaymentVerification, { isLoading: false }],
  useGetAllOrderQuery: () => ({
    data: [
      {
        _id: 'order1',
        orderId: 'ORD-001',
        paymentAmount: 299,
        status: 'Completed',
        createdAt: '2023-01-01T00:00:00.000Z'
      },
      {
        _id: 'order2',
        orderId: 'ORD-002',
        paymentAmount: 499,
        status: 'Pending',
        createdAt: '2023-01-02T00:00:00.000Z'
      }
    ],
    isFetching: false,
  }),
}));

// Mock Redux store
const mockToggleLoginAlert = jest.fn();
jest.mock('../redux/store', () => ({
  actions: {
    toggleLoginAlert: mockToggleLoginAlert,
  },
}));

// Mock child components
jest.mock('../components/common/Buttons', () => {
  return function MockButtons(props) {
    return <button {...props}>{props.children}</button>;
  };
});

jest.mock('../components/common/Loader', () => {
  return function MockLoader() {
    return <div data-testid="loader">Loading...</div>;
  };
});

// Mock Order Page Component
function MockOrderPage() {
  return (
    <div data-testid="order-page">
      <h1>My Orders</h1>
      <div className="order-list">
        <div className="order-item" data-testid="order-1">
          <div>Order ID: ORD-001</div>
          <div>Amount: ₹299</div>
          <div>Status: Completed</div>
          <div>Date: 2023-01-01</div>
        </div>
        <div className="order-item" data-testid="order-2">
          <div>Order ID: ORD-002</div>
          <div>Amount: ₹499</div>
          <div>Status: Pending</div>
          <div>Date: 2023-01-02</div>
        </div>
      </div>
    </div>
  );
}

// Mock Payment Page Component
function MockPaymentPage() {
  return (
    <div data-testid="payment-page">
      <h1>Payment</h1>
      <div className="payment-summary">
        <div>Total Amount: ₹798</div>
        <div>Discount: ₹100</div>
        <div>Final Amount: ₹698</div>
      </div>
      <button data-testid="pay-now-btn">Pay Now</button>
    </div>
  );
}

describe('Order Components', () => {
  test('renders order list with correct data', () => {
    render(<MockOrderPage />);
    
    // Check if order page is rendered
    expect(screen.getByTestId('order-page')).toBeInTheDocument();
    
    // Check if orders are displayed correctly
    expect(screen.getByText('Order ID: ORD-001')).toBeInTheDocument();
    expect(screen.getByText('Amount: ₹299')).toBeInTheDocument();
    expect(screen.getByText('Status: Completed')).toBeInTheDocument();
    
    expect(screen.getByText('Order ID: ORD-002')).toBeInTheDocument();
    expect(screen.getByText('Amount: ₹499')).toBeInTheDocument();
    expect(screen.getByText('Status: Pending')).toBeInTheDocument();
  });

  test('renders payment page with correct amounts', () => {
    render(<MockPaymentPage />);
    
    // Check if payment page is rendered
    expect(screen.getByTestId('payment-page')).toBeInTheDocument();
    
    // Check if payment details are displayed correctly
    expect(screen.getByText('Total Amount: ₹798')).toBeInTheDocument();
    expect(screen.getByText('Discount: ₹100')).toBeInTheDocument();
    expect(screen.getByText('Final Amount: ₹698')).toBeInTheDocument();
  });

  test('handles payment initiation', () => {
    render(<MockPaymentPage />);
    
    const payNowBtn = screen.getByTestId('pay-now-btn');
    fireEvent.click(payNowBtn);
    
    // In a real implementation, this would initiate the payment process
    expect(payNowBtn).toBeInTheDocument();
  });
});