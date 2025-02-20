import React from 'react'
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
   
    return (
        <div className="min-h-screen flex flex-col">
      <Header/>
          <div className="flex flex-col items-center justify-center mt-[10px]">
           
            
            <div className="mt-11 pt-11 space-x-4">
             </div>
          </div>
                <ToastContainer/>
         
          <Footer/>

                
   
</div>

          
          
          
          
          
          
        



    )  
}


export default Home;
