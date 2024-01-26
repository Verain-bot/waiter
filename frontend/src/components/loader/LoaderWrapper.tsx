import { useLoaderData } from "react-router-dom"
import Loading from '../../views/loading'
import React, { Suspense } from "react"
import { Await } from "react-router-dom"
import { ErrorBody } from '../../views/error'

const LoaderWrapper = (Main : React.FC<any>)=>{
    
    const d = useLoaderData() as {data : any}
    console.log(d)

    return (
        <Suspense fallback={<Loading />}>
            <Await resolve={d.data} 
            errorElement={<ErrorBody text="Something Went Wrong." data="Fetch failed. Could be an issue with the server. Please try again later"/>}
            >
                {(data)=>{
                    return <Main data={data} />
                }}
            </Await>
        </Suspense>
    )

}

export default LoaderWrapper