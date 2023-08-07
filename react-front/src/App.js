import './App.css';
import { useContext, useEffect, useState } from 'react';
import { DispatchErrorContext } from './components/context/error.context';
import ErrorBoundary from './components/ErrorBoundary';
import Error from './components/Error/Error';

import Routes from './routes/Routes';
import { ThemeContext } from './components/context/theme.context';
function App() {
  const { dispatchError } = useContext(DispatchErrorContext)
  const { theme } = useContext(ThemeContext)
  const [prevTheme, setPrevTheme] = useState('')

  useEffect(() => {
    if (prevTheme) {
      document.documentElement.classList.remove(prevTheme)
    }
    document.documentElement.classList.add(theme)
    setPrevTheme(theme)
    //eslint-disable-next-line
  }, [theme])
  return (
    <div className="">
      <ErrorBoundary
        fallback={<Error />}
        dispatchError={dispatchError}>
        <Routes />
      </ErrorBoundary>
    </div >
  );
}

export default App;
