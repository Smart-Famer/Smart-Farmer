import { render, screen , fireEvent} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import ElectricConductivityInput from "../ElectricConductivityInput";
import ElectricConductivity from '../../dashboard/ElectricConductivity';
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';
import { FarmContext } from "../../../context/FarmContext";


const MockElecCon= () => {
    const userContext = {
        user: {
            details:
            {
                first_name: "Madara",
                second_name: "Semini",
                user_type: "Assistant"
            }
        }
    }
    const farmContext = {
        farm: {
            _id: "636396faada6ca6a49d408a6", 
            name: "Farm-12",
            NPK_levels_key: "npk-636396faada6ca6a49d408a6",
            elec_conductivity_key: "elec-636396faada6ca6a49d408a6"
            
            

        }
    }
    return (
        <AuthContext.Provider value={userContext}>
            <BrowserRouter>
                <FarmContext.Provider value ={farmContext}>
                    <ElectricConductivityInput />
                    <ElectricConductivity />
                </FarmContext.Provider>   
            </BrowserRouter>
        </AuthContext.Provider>
           
   
    )
}

// const addTask  = async (tasks) => {
//     const inputElement =  screen.getByPlaceholderText("Electric Conductivity");
//     // const inputElement = screen.findByTestId("elec-con-input")
//     const buttonElement = await screen.findByRole("button", {
//       name: /Submit/i,
//     });
//     tasks.forEach((task) => {
//         // fireEvent.change(inputElement, { target: { value: task } });
//         fireEvent.change(inputElement,{target : {value : task}})
//         fireEvent.click(buttonElement);
//     })
// }

// test('should be able to type into input', () => {
//     render(
//         <MockElecCon />
//     );
//     addTask([56])
//     const divElement = screen.getByTestId("elec-con") 
//     expect(divElement).toHaveTextContent("56")
// });
describe("Test input fields" ,() =>{
    test('should be able to type into input', () => {
        render(<MockElecCon />); 
        const elecInput = screen.getByPlaceholderText("Electric Conductivity");
        userEvent.type(elecInput, "45");
        expect(elecInput.value).toMatch("45"); 
      });
}) 
describe("Test component rendering",()=>{
    test('should be able to type into input', () => {
        render(<MockElecCon />); 
        const elecInput = screen.getByPlaceholderText("Electric Conductivity");
        expect(elecInput).toBeInTheDocument();
      });
})


// test('task should have complete class when clicked', () => {
//     render(
//         <MockTodo />
//     );
//     addTask(["Go Grocery Shopping"])
//     const divElement = screen.getByText(/Go Grocery Shopping/i);
//     fireEvent.click(divElement)
//     expect(divElement).toHaveClass("todo-item-active")  
// });