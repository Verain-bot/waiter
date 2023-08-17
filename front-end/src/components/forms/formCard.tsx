import React from 'react';

type FormCardProps = {
    title: string,
    subtitle: string,
    children: React.ReactNode
}

export const FormCard: React.FC<FormCardProps> = (props) => {
    return(
              <div className="card">

                <div className="card-body">

                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">{props.title}</h5>
                    <p className="text-center medium">{props.subtitle}</p>
                  </div>

                  <form className="row g-3">
                    {props.children}
                  </form>

                </div>
              </div>
    )
}