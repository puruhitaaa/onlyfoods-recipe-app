import { Link } from 'react-router-dom'
import _ from 'lodash'
import { useAuth } from '../../hooks/useAuth'
import {
  HiOutlineGlobe,
  HiOutlinePaperAirplane,
  HiSearch,
} from 'react-icons/hi'
import { useForm } from '../../hooks/useForm'
import { useModes } from '../../hooks/useModes'

const Header = () => {
  const { user, logout } = useAuth((state) => ({
    user: state.user,
    logout: state.logout,
  }))
  const { isExploreMode, toggleExploreMode } = useModes((state) => ({
    isExploreMode: state.isExploreMode,
    toggleExploreMode: state.toggleExploreMode,
  }))

  const initialState = {
    search: '',
  }
  const { onChange, onSubmit, values } = useForm(() => null, initialState)

  return (
    <header className='navbar bg-base-100 top-0 sticky z-50'>
      <div className='max-w-7xl w-full mx-auto'>
        <div className='navbar-start inline-flex items-center'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost btn-circle'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h7'
                />
              </svg>
            </label>
            <ul className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
              <li>
                <Link to='/about'>About</Link>
              </li>
              {_.isEmpty(user) ? (
                <>
                  <li>
                    <Link to='/login'>Login</Link>
                  </li>
                  <li>
                    <Link to='/register'>Register</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={`/profile/${user?.username}`}>My Profile</Link>
                  </li>
                  <li>
                    <button type='button' onClick={logout}>
                      Logout
                    </button>
                  </li>
                  <li>
                    <form className='relative'>
                      <input
                        className='bg-transparent placeholder-base-content outline-none'
                        placeholder='Search...'
                        type='text'
                        onChange={onChange}
                        value={values.search}
                      />
                      <HiSearch className='w-5 h-5 cursor-pointer absolute right-2' />
                    </form>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className='navbar-center inline-flex items-center'>
          <Link to='/' className='btn btn-ghost normal-case text-xl'>
            OnlyFoods
          </Link>
        </div>
        <div className='navbar-end inline-flex items-center'>
          <button
            className='btn btn-ghost btn-circle'
            onClick={toggleExploreMode}
          >
            {!isExploreMode ? (
              <HiOutlinePaperAirplane className='w-5 h-5 rotate-45' />
            ) : (
              <HiOutlineGlobe className='w-5 h-5' />
            )}
          </button>
          <button className='btn btn-ghost btn-circle'>
            <div className='indicator'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                />
              </svg>
              <span className='badge badge-xs badge-primary indicator-item' />
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
