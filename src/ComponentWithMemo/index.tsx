import React, { memo } from 'react';

const WithMemo: React.FC = () => {
  console.log('%cRender withmemo component', 'color:green');
  return (
    <div>This component is using memo</div>
  )
};

export default memo(WithMemo);
