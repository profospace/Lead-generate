import React from 'react'
import PostProperty from './pages/PostProperty'
import toast, { Toaster } from 'react-hot-toast';
import BackToTop from './components/BackToTop';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Signup from './pages/Signup';

function App() {
  return (
    <div>
      <BackToTop />
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostProperty />} />
          <Route path='signup' element={<Signup/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App