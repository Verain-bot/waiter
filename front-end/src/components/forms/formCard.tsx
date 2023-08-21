import React from 'react';
import { Form } from 'react-router-dom';

type FormCardProps = {
    title: string,
    subtitle: string,
    children: React.ReactNode,
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH',
    error?: string[]
    action?: string
}

export const FormCard: React.FC<FormCardProps> = (props) => {
    return(
              <div className="card">

                <div className="card-body">

                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">{props.title}</h5>
                    <p className="text-center medium">{props.subtitle}</p>
                  </div>
                  <div className="d-flex justify-content-center align-items-center pb-3 flex-column">
                    {props.error?.map((msg,key)=>
                    <span className='text-danger' key={key}>{msg}</span>)}
                  </div>
                  <Form className="row g-3" method={props.method} action={props.action}>
                    {props.children}
                  </Form>

                </div>
              </div>
    )
}