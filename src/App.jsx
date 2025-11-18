import React from 'react';
import AppRouter from './routers/app router/AppRouter';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <section className='h-screen bg-slate-900 p-1 overflow-y-auto sidebar'>

      <div className=' w-full'>
        <AppRouter />
      </div>

      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          duration: 2000,
          style: {
            background: "#1e293b",
            color: "#fff",
          }
        }}
      />
    </section>
  )
}

export default App
