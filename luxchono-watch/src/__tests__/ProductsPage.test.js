import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductsPage from '../components/ProductsPage';

// Mock the API hooks
jest.mock('../../api/Product', () => ({
  useGetProductQuery: () => ({
    data: [],
    isFetching: false,
    refetch: jest.fn(),
  }),
  useGetLikeProductQuery: () => ({
    data: [],
    isFetching: false,
  }),
}));

// Mock redux store
jest.mock('../../redux/store', () => ({
  actions: {
    toggleLoginAlert: jest.fn(),
  },
}));

// Mock child components
jest.mock('../components/common/Search', () => {
  return function MockSearch(props) {
    return <input data-testid="search-input" {...props} />;
  };
});

jest.mock('../components/common/ProductBox', () => {
  return function MockProductBox(props) {
    return <div data-testid="product-box" {...props} />;
  };
});

jest.mock('../components/common/ProductFilterDrawer', () => {
  return function MockProductFilterDrawer(props) {
    return <div data-testid="filter-drawer" {...props} />;
  };
});

describe('ProductsPage Component', () => {
  test('renders products page with search and filter options', () => {
    render(<ProductsPage />);
    
    // Check if search input is rendered
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    
    // Check if filter button is rendered
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  test('displays product boxes', () => {
    render(<ProductsPage />);
    
    // Check if product boxes container is rendered
    expect(screen.getByTestId('product-box')).toBeInTheDocument();
  });
});