import React from 'react';
import Header from './UI/Header/Header'
import Data from './UI/Data_ui/data'


function App(props) {

      return(
        <React.Fragment>
          <Header url={props.url}/>
          <Data/>
          </React.Fragment>
        )
}

export default App;