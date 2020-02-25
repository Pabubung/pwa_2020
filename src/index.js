import React from 'react';
import ReactDOM from 'react-dom';
import MaterialAdmin from './materialAdmin';
import * as serviceWorker from './serviceWorker';
import {isMobile} from 'react-device-detect';
import { unregister } from './serviceWorker';

// if (isMobile) {
//     // return <div> This content is unavailable on mobile</div>
//     // unregister();
//     // serviceWorker.register();

//     ReactDOM.render(<MaterialAdmin />, document.getElementById('root'));
// }else{
//     ReactDOM.render(
    
//         <div className="">

//             <h1 style={{textAlign:'center', marginTop:'20px'}}>Portal Mobile DXG</h1>
//             <h1 style={{textAlign:'center', fontSize:'14px'}}>Maaf, Portal Mobile DXG hanya bisa diakses di mobile saja. Terima kasih</h1>

//         </div>, document.getElementById('rootWeb'));
// }

ReactDOM.render(<MaterialAdmin />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.register();