import { render, screen , fireEvent} from '@testing-library/react';
import ElectricConductivity from "../ElectricConductivity";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';


const MockElecCon= () => {
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
                <ElectricConductivity />
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

const addTask  = async (tasks) => {
    const inputElement =  screen.getByPlaceholderText("Electric Conductivity");
    // const inputElement = screen.findByTestId("elec-con-input")
    const buttonElement = await screen.findByRole("button", {
      name: /Submit/i,
    });
    tasks.forEach((task) => {
        // fireEvent.change(inputElement, { target: { value: task } });
        fireEvent.change(inputElement,{target : {value : task}})
        fireEvent.click(buttonElement);
    })
}

test('should be able to type into input', () => {
    render(
        <MockElecCon />
    );
    addTask([56])
    const divElement = screen.getByTestId("elec-con")
    expect(divElement).toHaveTextContent("56")
});


// test('task should have complete class when clicked', () => {
//     render(
//         <MockTodo />
//     );
//     addTask(["Go Grocery Shopping"])
//     const divElement = screen.getByText(/Go Grocery Shopping/i);
//     fireEvent.click(divElement)
//     expect(divElement).toHaveClass("todo-item-active")
// });