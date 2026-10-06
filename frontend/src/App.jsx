import EmployeeManager from "./components/EmployeeManager";
import {Toaster} from 'react-hot-toast';

function App() {
  return (
    <>
       <Toaster position="top-right" />
       <EmployeeManager />
    </>
  )
}

export default App;