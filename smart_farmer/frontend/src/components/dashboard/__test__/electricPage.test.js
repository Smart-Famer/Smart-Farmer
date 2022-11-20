import { render, screen , fireEvent} from '@testing-library/react';
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
                    <ElectricConductivity />
                </FarmContext.Provider>   
            </BrowserRouter>
        </AuthContext.Provider>
           
   
    )
}

describe("Test component rendering",()=>{
    test('should render a heading', () => {
        render(<MockElecCon />); 
        const elecInput = screen.getByRole('heading');
        expect(elecInput).toBeInTheDocument();
      });
      test('should render a link', () => {
        render(<MockElecCon />); 
        const elecInput = screen.getByRole('link');
        expect(elecInput).toBeInTheDocument();
      });
})

