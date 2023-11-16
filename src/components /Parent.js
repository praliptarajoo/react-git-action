import React from 'react'
import Child from './Child';

function Parent() {
  const dataMessage = 'How are you doing sushant?';

  const pull_data = (data) => {
    console.log(data);
  };

  return (
    <div>
      Parent - 
      <Child message={dataMessage} func={pull_data}/>
    </div>
  )
}

export default Parent