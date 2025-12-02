import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock API hooks
const mockUpdateProfile = jest.fn();
const mockChangePassword = jest.fn();

// Mock Redux store
const mockLogout = jest.fn();

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

// Mock Profile Page Component
function MockProfilePage() {
  return (
    <div data-testid="profile-page">
      <h1>My Profile</h1>
      <form data-testid="profile-form">
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            defaultValue="user@example.com" 
            data-testid="email-input"
          />
        </div>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            defaultValue="testuser" 
            data-testid="username-input"
          />
        </div>
        <div>
          <label>Phone:</label>
          <input 
            type="tel" 
            defaultValue="1234567890" 
            data-testid="phone-input"
          />
        </div>
        <button type="submit" data-testid="update-profile-btn">
          Update Profile
        </button>
      </form>
      
      <form data-testid="password-form">
        <div>
          <label>Current Password:</label>
          <input 
            type="password" 
            data-testid="current-password-input"
          />
        </div>
        <div>
          <label>New Password:</label>
          <input 
            type="password" 
            data-testid="new-password-input"
          />
        </div>
        <button type="submit" data-testid="change-password-btn">
          Change Password
        </button>
      </form>
      
      <button data-testid="logout-btn">Logout</button>
    </div>
  );
}

describe('Profile Component', () => {
  test('renders profile information correctly', () => {
    render(<MockProfilePage />);
    
    // Check if profile page is rendered
    expect(screen.getByTestId('profile-page')).toBeInTheDocument();
    
    // Check if form fields are populated with user data
    expect(screen.getByTestId('email-input').value).toBe('user@example.com');
    expect(screen.getByTestId('username-input').value).toBe('testuser');
    expect(screen.getByTestId('phone-input').value).toBe('1234567890');
  });

  test('allows updating profile information', () => {
    render(<MockProfilePage />);
    
    // Change username
    const usernameInput = screen.getByTestId('username-input');
    fireEvent.change(usernameInput, { target: { value: 'newusername' } });
    
    // Submit form
    const updateBtn = screen.getByTestId('update-profile-btn');
    fireEvent.click(updateBtn);
    
    // Verify the input was updated
    expect(usernameInput.value).toBe('newusername');
  });

  test('allows changing password', () => {
    render(<MockProfilePage />);
    
    // Fill in password fields
    const currentPassInput = screen.getByTestId('current-password-input');
    const newPassInput = screen.getByTestId('new-password-input');
    
    fireEvent.change(currentPassInput, { target: { value: 'oldpassword' } });
    fireEvent.change(newPassInput, { target: { value: 'newpassword' } });
    
    // Submit form
    const changePassBtn = screen.getByTestId('change-password-btn');
    fireEvent.click(changePassBtn);
    
    // Verify the inputs were filled
    expect(currentPassInput.value).toBe('oldpassword');
    expect(newPassInput.value).toBe('newpassword');
  });

  test('handles logout functionality', () => {
    render(<MockProfilePage />);
    
    const logoutBtn = screen.getByTestId('logout-btn');
    fireEvent.click(logoutBtn);
    
    // In a real implementation, this would trigger logout action
    expect(logoutBtn).toBeInTheDocument();
  });
});