import { Toaster } from 'react-hot-toast';
import RouteWeb from './routes/Route';
import ThemeProvider from './providers/ThemeProvider';
import GlobalLoading from './components/Loading/GlobalLoading';

function App() {
  return (
    <>
      <ThemeProvider>
        <GlobalLoading />
        <Toaster position="bottom-center" />
        <RouteWeb />
      </ThemeProvider>
    </>
  );
}

export default App;
