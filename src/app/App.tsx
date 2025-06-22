import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './providers/app-routes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
