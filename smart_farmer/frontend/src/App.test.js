import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';

const MockApp = () => {
  return (
      <AuthContext.Provider value={context}>
          <BrowserRouter>
              <NavBar />
          </BrowserRouter>
      </AuthContext.Provider>
  )

}
test('renders learn react link', () => {
  render(<MockApp />);
  const linkElement = screen.getByText(/smart farmer/i);
  expect(linkElement).toBeInTheDocument();
});
