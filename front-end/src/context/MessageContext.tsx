import React, { createContext, useContext, useState } from 'react';

type MessageContextType = {
    heading: string;
    body: string;
    type: string;
  };

const MessageContext = createContext<[MessageContextType, React.Dispatch<React.SetStateAction<MessageContextType>>] | undefined>(undefined);

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = useState<MessageContextType>({
        heading: '',
        body: '',
        type: '',
    })

    return (
        <MessageContext.Provider value={[message, setMessage]} >
            {children}
        </MessageContext.Provider>
    )

}

export const useMessageContext = ()=>{
    const context = useContext(MessageContext)

    if (context === undefined) {
        throw new Error('Message context is undefined')
    }

    return context
}