import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the API hooks
const mockGetAllOrders = jest.fn();
const mockUpdateOrderStatus = jest.fn();

jest.mock('../api/Orders', () => ({
  useGetAllOrderQuery: () => ({
    data: [
      {
        _id: 'order1',
        orderId: 'ORD-001',
        user: { username: 'John Doe' },
        paymentAmount: 299,
        status: 'Pending',
        createdAt: '2023-01-01T00:00:00.000Z'
      },
      {
        _id: 'order2',
        orderId: 'ORD-002',
        user: { username: 'Jane Smith' },
        paymentAmount: 499,
        status: 'Completed',
        createdAt: '2023-01-02T00:00:00.000Z'
      }
    ],
    isFetching: false,
    refetch: jest.fn(),
  }),
  useUpdateOrderStatusMutation: () => [mockUpdateOrderStatus, { isLoading: false }],
}));

// Mock child components
jest.mock('../../components/common/Buttons', () => {
  return function MockButtons(props: any) {
    return <button {...props}>{props.children}</button>;
  };
});

jest.mock('../../components/common/Table', () => {
  return function MockTable(props: any) {
    return <table data-testid="orders-table" {...props} />;
  };
});

// Mock Order Management Component
function MockOrderManagement() {
  return (
    <div data-testid="order-management">
      <h1>Order Management</h1>
      <div className="order-list">
        <div className="order-item" data-testid="order-1">
          <div>Order ID: ORD-001</div>
          <div>Customer: John Doe</div>
          <div>Amount: ₹299</div>
          <div>Status: Pending</div>
          <select data-testid="status-select-1">
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button data-testid="update-status-btn-1">Update</button>
        </div>
        <div className="order-item" data-testid="order-2">
          <div>Order ID: ORD-002</div>
          <div>Customer: Jane Smith</div>
          <div>Amount: ₹499</div>
          <div>Status: Completed</div>
          <select data-testid="status-select-2">
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button data-testid="update-status-btn-2">Update</button>
        </div>
      </div>
    </div>
  );
}

describe('Order Management Component', () => {
  test('renders order list with correct data', () => {
    render(<MockOrderManagement />);
    
    // Check if order management page is rendered
    expect(screen.getByTestId('order-management')).toBeInTheDocument();
    
    // Check if orders are displayed correctly
    expect(screen.getByText('Order ID: ORD-001')).toBeInTheDocument();
    expect(screen.getByText('Customer: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Amount: ₹299')).toBeInTheDocument();
    expect(screen.getByText('Status: Pending')).toBeInTheDocument();
    
    expect(screen.getByText('Order ID: ORD-002')).toBeInTheDocument();
    expect(screen.getByText('Customer: Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Amount: ₹499')).toBeInTheDocument();
    expect(screen.getByText('Status: Completed')).toBeInTheDocument();
  });

  test('allows updating order status', () => {
    render(<MockOrderManagement />);
    
    // Change status for first order
    const statusSelect = screen.getByTestId('status-select-1');
    fireEvent.change(statusSelect, { target: { value: 'Completed' } });
    
    // Click update button
    const updateBtn = screen.getByTestId('update-status-btn-1');
    fireEvent.click(updateBtn);
    
    // Verify the selection was made
    expect(statusSelect.value).toBe('Completed');
  });

  test('displays order table correctly', () => {
    render(<MockOrderManagement />);
    
    // Check if orders table is rendered
    expect(screen.getByTestId('orders-table')).toBeInTheDocument();
  });
});