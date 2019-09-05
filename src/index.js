import React, { setGlobal } from 'reactn'
import ReactDOM from 'react-dom';
import App from './App';

setGlobal({
    host: "ec2-50-16-197-244.compute-1.amazonaws.com",
    port: 5432,
    database: "dagf3knmquj0kj",
    user: "jbqcgbigvtunjd",
    password: "ef76e69d9b77990b51d0a39228d0f2253ac839990f99f07e72467ee2eb8a48a7"
})
ReactDOM.render(<App />, document.getElementById('root'));
