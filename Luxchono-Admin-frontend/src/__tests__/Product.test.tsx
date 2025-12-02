import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductPage from '../components/Product';

// Mock the API hooks
jest.mock('../api/Product', () => ({
  useGetAllProductQuery: () => ({
    data: [],
    isFetching: false,
    refetch: jest.fn(),
  }),
  useDeleteProductMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('../api/Category', () => ({
  useGetAllCategoryQuery: () => ({
    data: [],
    isFetching: false,
  }),
}));

jest.mock('../api/Brand', () => ({
  useGetAllBrandApiQuery: () => ({
    data: [],
    isFetching: false,
  }),
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock child components
jest.mock('../components/common/Buttons', () => {
  return function MockButtons(props: any) {
    return <button {...props}>{props.children}</button>;
  };
});

jest.mock('../components/common/Search', () => {
  return function MockSearch(props: any) {
    return <input data-testid="search-input" {...props} />;
  };
});

jest.mock('../components/common/Selects', () => {
  return function MockSelects(props: any) {
    return <select data-testid="select-input" {...props} />;
  };
});

jest.mock('../components/common/Table', () => {
  return function MockTable(props: any) {
    return <table data-testid="products-table" {...props} />;
  };
});

describe('Product Component', () => {
  test('renders product page with search and filter options', () => {
    render(<ProductPage />);
    
    // Check if the main heading is rendered
    expect(screen.getByText('Product')).toBeInTheDocument();
    
    // Check if search input is rendered
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    
    // Check if filter buttons are rendered
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  test('allows adding new product', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);
    
    render(<ProductPage />);
    
    const addButton = screen.getByText('Add Product');
    fireEvent.click(addButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/product/add-product');
  });
});