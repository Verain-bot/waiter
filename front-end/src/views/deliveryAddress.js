import { FormCard } from "./components/forms/formCard"
import { Button, IntegerInput, TextInput } from "./components/forms/inputs"

const App = ()=>{
    return(
        <div class='col-12 col-md-6'>
            <FormCard title='Address' subtitle='Please enter the delivery address'>
                <TextInput name='Name' />
                <IntegerInput name='Phone' prepend='+91' />
                <TextInput name='Address' />
                <Button name='Save' />
            </FormCard>
        </div>
    )
}

export default App