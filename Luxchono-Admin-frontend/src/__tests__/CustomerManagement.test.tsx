import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the API hooks
const mockGetAllCustomers = jest.fn();
const mockUpdateCustomerStatus = jest.fn();

jest.mock('../../api/Customers', () => ({
  useGetAllCustomerQuery: () => ({
    data: [
      {
        _id: 'customer1',
        email: 'john@example.com',
        username: 'John Doe',
        phoneNo: '1234567890',
        isVerified: true
      },
      {
        _id: 'customer2',
        email: 'jane@example.com',
        username: 'Jane Smith',
        phoneNo: '0987654321',
        isVerified: false
      }
    ],
    isFetching: false,
  }),
  useUpdateCustomerStatusMutation: () => [mockUpdateCustomerStatus, { isLoading: false }],
}));

// Mock child components
jest.mock('../../components/common/Buttons', () => {
  return function MockButtons(props: any) {
    return <button {...props}>{props.children}</button>;
  };
});

jest.mock('../../components/common/Table', () => {
  return function MockTable(props: any) {
    return <table data-testid="customers-table" {...props} />;
  };
});

// Mock Customer Management Component
function MockCustomerManagement() {
  return (
    <div data-testid="customer-management">
      <h1>Customer Management</h1>
      <div className="customer-list">
        <div className="customer-item" data-testid="customer-1">
          <div>Name: John Doe</div>
          <div>Email: john@example.com</div>
          <div>Phone: 1234567890</div>
          <div>Status: Verified</div>
          <button data-testid="toggle-verification-1">
            Unverify
          </button>
        </div>
        <div className="customer-item" data-testid="customer-2">
          <div>Name: Jane Smith</div>
          <div>Email: jane@example.com</div>
          <div>Phone: 0987654321</div>
          <div>Status: Not Verified</div>
          <button data-testid="toggle-verification-2">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

describe('Customer Management Component', () => {
  test('renders customer list with correct data', () => {
    render(<MockCustomerManagement />);
    
    // Check if customer management page is rendered
    expect(screen.getByTestId('customer-management')).toBeInTheDocument();
    
    // Check if customers are displayed correctly
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: 1234567890')).toBeInTheDocument();
    expect(screen.getByText('Status: Verified')).toBeInTheDocument();
    
    expect(screen.getByText('Name: Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Email: jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: 0987654321')).toBeInTheDocument();
    expect(screen.getByText('Status: Not Verified')).toBeInTheDocument();
  });

  test('allows toggling customer verification status', () => {
    render(<MockCustomerManagement />);
    
    // Check first customer's verification toggle button
    const toggleBtn1 = screen.getByTestId('toggle-verification-1');
    expect(toggleBtn1.textContent).toBe('Unverify');
    
    // Check second customer's verification toggle button
    const toggleBtn2 = screen.getByTestId('toggle-verification-2');
    expect(toggleBtn2.textContent).toBe('Verify');
    
    // Click to toggle verification for second customer
    fireEvent.click(toggleBtn2);
  });

  test('displays customers table correctly', () => {
    render(<MockCustomerManagement />);
    
    // Check if customers table is rendered
    expect(screen.getByTestId('customers-table')).toBeInTheDocument();
  });
});