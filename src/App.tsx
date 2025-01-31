import { Toaster } from 'react-hot-toast';
import RouteWeb from './routes/Route';
import ThemeProvider from './providers/ThemeProvider';
import GlobalLoading from './components/Loading/GlobalLoading';
import ModalContainer from './components/Modal/ModalContainer';

function App() {
  return (
    <>
      <ThemeProvider>
        <GlobalLoading />
        <Toaster position="bottom-center" />
        <RouteWeb />
        <ModalContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
