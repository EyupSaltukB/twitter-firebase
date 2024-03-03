import React from 'react'
import { navSections } from '../constants'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'


const Nav = () => {

  return (
    <nav className="flex flex-col items-center justify-between p-2 py-4">
      <div>
        <div className='flex justify-center my-5'>
          <img className='w-14' src="/x-logo.png" alt="" />
        </div>
        {navSections.map((sec, i) => (
          <div className='flex items-center gap-3 text-lg p-3 cursor-pointer transition hover:bg-gray-900 rounded-full'>
            {sec.icon}
            <span>{sec.title}</span>
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-5'>
        <div className='flex items-center gap-1'>
          <img
            className='w-12 h-12 rounded-full'
            src={auth.currentUser.photoURL} alt="profile" />
          <p>{auth.currentUser.displayName}</p>
        </div>

        <button 
        onClick={() => signOut(auth)}
        className='bg-gray-700 rounded-lg p-2'>Çıkış Yap</button>
      </div>
    </nav>
  )
}

export default Nav