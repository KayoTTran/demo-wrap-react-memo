import React from 'react';

const WithoutMemo: React.FC = () => {
  console.log('%crender without memo component', 'color:red');
  return (
    <div>This component is not using memo</div>
  )
};

export default WithoutMemo;
