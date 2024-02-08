'use client'

export function AppProvider({children}){
    return(
        <sessionProvider>
            {children}
        </sessionProvider>
    );
}