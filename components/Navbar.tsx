import React from 'react'
import NavbarItem from './NavbarItem'

const Navbar = () => {

  return (
    <nav className='w-full fixed z-40 '>
        <div className='px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90'>
            <img src='/images/logo.png' className='h-4 lg:h-7' alt='logo'/>
            <div className='flex-row ml-8 gap-7 hidden lg:flex'>
                <NavbarItem label="home"/>
                <NavbarItem label="Series"/>
                <NavbarItem label="Films"/>
                <NavbarItem label="New & popular"/>
                <NavbarItem label="My List"/>
                <NavbarItem label="Browse by Language"/>
            </div>
            <div className='lg:hidden felx flex-row items-center gap-2 ml-8 cursor-pointer relative'>
                <p className='text-white text-sm'>Browse</p>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;