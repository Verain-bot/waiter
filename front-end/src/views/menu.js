import { useState } from "react";
import { Header } from "./components/header/header";
import { MenuCartFooter, MenuFooter } from "./components/menu/menuFooter";
import { MenuHeader } from "./components/menu/menuFilterHeader";
import { MenuItem } from "./components/menu/menuItem";
import { MenuModal } from "./components/menu/menuModal";
import { MenuTitle } from "./components/menu/menuTitle";
import { MenuAccordion } from "./components/menu/menuSubCategoryAccordion";
import { MenuSection } from "./components/menu/menuSubSection";
const App = () =>{
    const [sections, setSections] = useState(['Starters','Main Course','Sides','Beverages'])
    
    return(
        <>
        
            <Header />
            <main id="main" class="main">
            <MenuTitle name='Verains Pizza' type={['American','Italian','Indian']} />
                
                <MenuHeader />

                {sections.map((section)=>(<MenuSection name={section} />))}

                <MenuFooter sections={sections} />
                <MenuCartFooter />
            </main>
            </>
        
    )
}

export default App;