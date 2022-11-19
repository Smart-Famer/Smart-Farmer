import { render, screen } from '@testing-library/react';
import Login from "../Login";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';
import userEvent from "@testing-library/user-event";

const onSubmit = jest.fn(); 
const MockLogin= () => {
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
                <Login />
            </BrowserRouter>
        </AuthContext.Provider>
    )
}
describe("Test the Login Component rendering", () => {
  test("render the login form submit button on the screen", async () => {
    render(<MockLogin />);
    const buttonList = await screen.findAllByRole("button"); 
    expect(buttonList).toHaveLength(1);
  });

  test("render the login form with password on the screen", () => {
    render(<MockLogin />);
    const password = screen.getByPlaceholderText("Password");
    expect(password).toBeInTheDocument();
  });

  test("render the login form email on the screen", async () => {
    render(<MockLogin />);
    const email = screen.getByPlaceholderText("email");
    expect(email).toBeInTheDocument();
  });


  
describe("Test input fields",()=>{
  test("email input field should accept email ", () => {
    render(<MockLogin />);
    const email = screen.getByPlaceholderText("email");
    userEvent.type(email, "dipesh");
    expect(email.value).not.toMatch("dipesh.malvia@gmail.com");
  });
  test("passport input should have type password ", () => {
    render(<MockLogin />);
    const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type", "password");
  });

})

//   test("should display alert if error", () => {
//     render(<MockLogin />);
//     const email = screen.getByPlaceholderText("email");
//     const password = screen.getByPlaceholderText("Password");
//     const buttonList = screen.getAllByRole("button");

//     userEvent.type(email, "dipesh");
//     userEvent.type(password, "123456");
//     userEvent.click(buttonList[0]);
//     const error = screen.getByText("Account Doesn't Exists");
//     expect(error).toBeInTheDocument();
//   });


//   test("should be able to submit the form", () => {
//     const component = render(<MockLogin />);
//     const email = screen.getByPlaceholderText("email");
//     const password = screen.getByPlaceholderText("Password");
//     const btnList = screen.getAllByRole("button");

//     userEvent.type(email, "dipesh@gmail.com");
//     userEvent.type(password, "123456");
//     userEvent.click(btnList[0]);

//     const user = screen.getByText("/Dashboard/i");
//     expect(user).toBeInTheDocument();
//   });
});