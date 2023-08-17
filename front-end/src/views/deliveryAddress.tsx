import { FormCard } from "../components/forms/formCard"
import { Input } from "../components/forms/inputsUncontrolled"
import {Button} from '../components/forms/inputsControlled'

const App = ()=>{
    return(
        <div className='col-12 col-md-6'>
            <FormCard title='Address' subtitle='Please enter the delivery address'>
                <Input name='Name' inputName="addrrr" />
                <Input name='Phone' prepend='+91' type='number' inputName="phone" />
                <Input name='Address' inputName="addr" />
                <Button name='Save' onClick={()=>{}} />
            </FormCard>
        </div>
    )
}

export default App