import React, { useState, createContext } from 'react';

const AppContext = createContext([{}, () => {}]);

const AppContextProvider = props => {
    const [state, setState] = useState({});
    return(
        <AppContext.Provider value={[state, setState]}>
            {props.children}
        </AppContext.Provider>
    )
}
export { AppContext, AppContextProvider }
