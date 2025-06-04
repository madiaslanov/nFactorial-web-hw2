import './App.css'
import { Route, Routes} from "react-router";
import NavBar from "../module/navbar/ui/navBar.tsx";
import Dialog from "../module/dialog/ui/dialog.tsx";
import ThemeContext from '../shared/theme.tsx';

function App() {
    const theme: 'light' | 'dark' = 'light';
    return (
        <>
        <ThemeContext.Provider value={theme}>
                <Routes>
                    <Route path='/' element={<NavBar/>}>
                        <Route index element={< Dialog/>}/>
                        <Route path=':id' element={< Dialog/>}/>
                    </Route>
                </Routes>
            </ ThemeContext.Provider >
        </>
    )
}

export default App
