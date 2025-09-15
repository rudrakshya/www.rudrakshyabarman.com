import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  useEffect(() => {
    // Remove the default Vite + React template styles
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.removeAttribute('style');
    }
  }, []);

  return (
    <HelmetProvider>
      <Outlet />
    </HelmetProvider>
  );
}

export default App;
