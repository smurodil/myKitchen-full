import { useLogin } from '../hooks/useLogin'
import { useSignup } from '../hooks/useSignup'
import { useRef } from 'react'
import videoBg from '../video/vid.mp4'
import { NavLink } from 'react-router-dom'


function Login() {
  const { signUpWithGoogleProvider } = useSignup()
  const { login } = useLogin()

  const email = useRef()
  const password = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email.current.value, password.current.value)
  }


  return (
    <div className="h-screen grid place-items-center top-0">
      <video className="w-full h-screen object-cover" src={videoBg} autoPlay loop muted/>
      <div className="bg-slate-400/50 py-10 px-10 rounded-lg absolute">
        <h1 className="text-3xl text-white font-bold mb-5">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="items-center mb-10">
            <label className="mr-5 text-white" htmlFor="email">Email: </label>
            <input ref={email} type="text" placeholder="Type here " id="email" className="input input-bordered input-primary w-full max-w-xs" required />
          </div>
          <div className="items-center mb-10">
            <label className="mr-5 text-white" htmlFor="password">Password</label>
            <input ref={password} type="password" id="password" placeholder="Type your password" className="input input-bordered input-error w-full max-w-xs" required />
          </div>
          <div className="flex flex-col gap-3">
            <button className='btn btn-primary btn-sm md:btn-md'>
              Login
            </button>
            <button type="button" onClick={signUpWithGoogleProvider} className="btn btn-sm text-white md:btn-md btn-accent">Google</button>
            <NavLink className="btn btn-sm md:btn-md text-white btn-info" to="/signup">If you do'nt have any account?</NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login