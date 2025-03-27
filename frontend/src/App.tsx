import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router';
import {Provider} from "react-redux"
import {store} from "./reducers/store";
import { Toaster } from 'sonner';

const App: React.FC = () => {

  return (
    <>
     <Provider store={store}>
      <Toaster position="top-right" richColors closeButton />
     <RouterProvider router={router} />
     </Provider>
    </>
  )
}

export default App
