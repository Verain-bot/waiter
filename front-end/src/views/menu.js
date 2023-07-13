import { useState } from "react";
import { MenuCartFooter, MenuFooter } from "./components/menu/menuFooter";
import { MenuHeader } from "./components/menu/menuFilterHeader";
import { MenuTitle } from "./components/menu/menuTitle";
import { MenuSection } from "./components/menu/menuSubSection";
import { useSearchBar } from "../hooks";
const App = () =>{
    const [sections, setSections] = useState(['Starters','Main Course','Sides','Beverages'])
    const search = useSearchBar()

    return(
        <>
        
    
            <div class='col-md-6 col-12'>

            <MenuTitle name='Verains Pizza' type={['American','Italian','Indian']} />
                
            <MenuHeader />

            {sections.map((section)=>(<MenuSection name={section} />))}

                <MenuFooter sections={sections} />
                <MenuCartFooter />
            </div>
        </>
        
    )
}

export default App;