import React from 'react'
import RouteModule from './routes'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import GlobalStyle from './assets/style/GlobalStyle';
import { ThemeProvider } from 'styled-components'
import {darkTheme,lightTheme} from './assets/style/Theme'
import useStore from './store/globalStore';

function App() {

  const {isDark} = useStore()

  return (
    <BrowserRouter>
      <ThemeProvider theme={isDark? darkTheme:lightTheme}>
      <GlobalStyle/>
       <Routes>
         {RouteModule.map((route,idx)=>(
           <Route path={route.path} element={route.element} key={idx}/>
          ))}
       </Routes>
     </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
