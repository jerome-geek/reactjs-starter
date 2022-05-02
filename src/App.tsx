import mall from 'api/mall';
import React, { useEffect } from 'react';

const App = () => {
    useEffect(() => {
        mall.getMall().then((res) => console.log(res));
    }, []);

    return <div>App</div>;
};

export default App;
