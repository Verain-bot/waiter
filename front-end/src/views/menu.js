import { Header } from "./components/header/header";
import { MenuItem } from "./components/menu/menuItem";
const App = () =>{
    return(
        <>
            <Header />
        
            <main id="main" class="main">
                <div class="container">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />

                </div>
            </main>
            </>
        
    )
}

export default App;