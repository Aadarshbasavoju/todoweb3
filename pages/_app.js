import '@/styles/globals.css'
//INTERNAL IMPORT

import {ToDolistContext, ToDolistProvider} from "../context/ToDolistApp";

 const MyApp=({ Component, pageProps })=>( 
  <ToDolistProvider>
    <div>
  <Component {...pageProps} />;
  </div>
  </ToDolistProvider>
 )

export default MyApp;