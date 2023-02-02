import { setCookie } from "cookies-next"
import { useRouter } from "next/router"

export default function Login() {

  const router = useRouter()

  function handleLogin() {
    event.preventDefault()
    const apikey = document.getElementById('apikey').value
    setCookie('apikey', apikey)
    router.push('/')
  }

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col gap-4 justify-center items-center">
      <h1 className="font-semibold text-2xl">Login To Continue</h1>
      <form className="p-4 bg-white rounded-2xl flex flex-col gap-2">
        <input type="password" name="apikey" id="apikey" placeholder="Your Key" className="p-2 bg-blue-100 border-2 border-gray-300 rounded text-black text-center" />
        <button onClick={handleLogin} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded duration-200">Login</button>
      </form>
    </main>
  )
}