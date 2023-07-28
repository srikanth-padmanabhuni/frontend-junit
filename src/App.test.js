const { render, screen, fireEvent } = require('@testing-library/react'); 
const { default: App } = require('./App');

describe('App', () => {

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('login-form')).toBeTruthy();
  });

  it('handles form submission with valid username and password', () => {
    render(<App />);
    const usernameInput = screen.getByTestId('username-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    // Expect a success message to be displayed
    expect(screen.queryByTestId('success-message')).toBeTruthy();
    expect(screen.getByText('Login successful!')).toBeTruthy();
    // Make sure the error message is not displayed
    expect(screen.queryByTestId('error-message')).not.toBeTruthy();
  });

  it('handles form submission with empty username and password', () => {
    render(<App />);
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.click(submitButton);

    // Expect an error message to be displayed
    expect(screen.getByTestId('error-message')).toBeTruthy();
    expect(screen.getByText('Please enter both username and password.')).toBeTruthy();
    expect(screen.queryByTestId('success-message')).not.toBeTruthy();
  });

  it('handles form submission with only username or only password', () => {
    render(<App />);
    const usernameInput = screen.getByTestId('username-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(submitButton);

    // Expect an error message to be displayed for missing password
    expect(screen.getByTestId('error-message')).toBeTruthy();
    expect(screen.getByText('Please enter both username and password.')).toBeTruthy();
    expect(screen.queryByTestId('success-message')).not.toBeTruthy();

    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    // Expect an error message to be displayed for missing username
    expect(screen.getByTestId('error-message')).toBeTruthy();
    expect(screen.getByText('Please enter both username and password.')).toBeTruthy();

    expect(screen.queryByTestId('success-message')).not.toBeTruthy();
  });
});
//npm install @babel/register @babel/preset-env karma karma-cli karma-jasmine karma-chrome-launcher karma-webpack webpack jasmine-core babel-loader babel-plugin-transform-class-properties --save-dev
