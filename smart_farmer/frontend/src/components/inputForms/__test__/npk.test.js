import { render, screen , fireEvent} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import NPKinput from "../NPKinput";
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
                    <NPKinput />

                </FarmContext.Provider>   
            </BrowserRouter>
        </AuthContext.Provider>
           
   
    )
}


describe("Test component rendering",()=>{
    test('should be able to type into input', () => {
        render(<MockElecCon />); 
        const n_input = screen.getByTestId("n-input");
        expect(n_input).toBeInTheDocument();
      });
      test('should be able to type into input', () => {
        render(<MockElecCon />); 
        const p_input = screen.getByTestId("p-input");
        expect(p_input).toBeInTheDocument();
      });
      test('should be able to type into input', () => {
        render(<MockElecCon />); 
        const k_input = screen.getByTestId("k-input");
        expect(k_input).toBeInTheDocument();
      });
})
