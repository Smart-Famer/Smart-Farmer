import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar';
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';

const MockNavbar = () => {

    const context = {
        user: {
            details:
            {
                first_name: "Madara",
                second_name: "Semini",
                user_type: "Assistant"
            }
        }
    }
    return (
        <AuthContext.Provider value={context}>
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        </AuthContext.Provider>
    )

}
test('should render user details correctly', () => {
    render(<MockNavbar />);
    const typeElement = screen.getByTestId("top-nav-info-type")
    const nameElement = screen.getByTestId("top-nav-info-name")

    expect(typeElement).toHaveTextContent('Assistant')
    expect(nameElement).toHaveTextContent('Madara Semini')

});
