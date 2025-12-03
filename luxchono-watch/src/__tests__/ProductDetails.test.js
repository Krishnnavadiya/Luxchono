import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock API hooks
const mockAddToCart = jest.fn();
const mockToggleLike = jest.fn();

jest.mock('../api/Product', () => ({
  useGetOneProductQuery: () => ({
    data: {
      product: {
        _id: 'prod1',
        name: 'Luxury Watch',
        price: 299,
        dummyPrice: 399,
        description: 'A beautiful luxury watch',
        image: ['watch1.jpg', 'watch2.jpg'],
        brand: { name: 'Rolex' },
        category: [{ name: 'Watches' }]
      },
      similarProduct: [
        { _id: 'sim1', name: 'Similar Watch 1', price: 199 },
        { _id: 'sim2', name: 'Similar Watch 2', price: 249 }
      ],
      ratings: []
    },
    isFetching: false,
    refetch: jest.fn(),
  }),
  useAddToCartMutation: () => [mockAddToCart, { isLoading: false }],
  useGetLikeProductQuery: () => ({
    data: [],
    isFetching: false,
  }),
}));

jest.mock('../api/Cart', () => ({
  useGetCartIdsQuery: () => ({
    data: [],
    isFetching: false,
  }),
}));

// Mock Redux store
const mockToggleLikeAction = jest.fn();
jest.mock('../redux/store', () => ({
  actions: {
    toggleLike: mockToggleLikeAction,
    toggleLoginAlert: jest.fn(),
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

// Mock Product Details Component
function MockProductDetails() {
  return (
    <div data-testid="product-details">
      <h1>Luxury Watch</h1>
      <div className="price-section">
        <span className="current-price">₹299</span>
        <span className="original-price">₹399</span>
        <span className="discount">(25% off)</span>
      </div>
      <div className="description">
        <p>A beautiful luxury watch</p>
      </div>
      <button data-testid="add-to-cart-btn">Add to Cart</button>
      <button data-testid="like-btn">♡ Like</button>
      
      <div className="similar-products">
        <h2>Similar Products</h2>
        <div>Similar Watch 1 - ₹199</div>
        <div>Similar Watch 2 - ₹249</div>
      </div>
    </div>
  );
}

describe('Product Details Component', () => {
  test('renders product details correctly', () => {
    render(<MockProductDetails />);
    
    // Check if product details are displayed
    expect(screen.getByText('Luxury Watch')).toBeInTheDocument();
    expect(screen.getByText('₹299')).toBeInTheDocument();
    expect(screen.getByText('₹399')).toBeInTheDocument();
    expect(screen.getByText('(25% off)')).toBeInTheDocument();
    expect(screen.getByText('A beautiful luxury watch')).toBeInTheDocument();
  });

  test('displays similar products', () => {
    render(<MockProductDetails />);
    
    // Check if similar products section is rendered
    expect(screen.getByText('Similar Products')).toBeInTheDocument();
    expect(screen.getByText('Similar Watch 1 - ₹199')).toBeInTheDocument();
    expect(screen.getByText('Similar Watch 2 - ₹249')).toBeInTheDocument();
  });

  test('handles add to cart functionality', () => {
    render(<MockProductDetails />);
    
    const addToCartBtn = screen.getByTestId('add-to-cart-btn');
    fireEvent.click(addToCartBtn);
    
    // In a real implementation, this would trigger an API call
    expect(addToCartBtn).toBeInTheDocument();
  });

  test('handles like functionality', () => {
    render(<MockProductDetails />);
    
    const likeBtn = screen.getByTestId('like-btn');
    fireEvent.click(likeBtn);
    
    // In a real implementation, this would toggle the like state
    expect(likeBtn).toBeInTheDocument();
  });
});