import { deleteCookie } from "cookies-next"
import { useRouter } from "next/router"

export default function Logout() {

  const router = useRouter()

  function handleLogout() {
    event.preventDefault()
    deleteCookie('apikey')
    router.push('./login')
  }

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col gap-4 justify-center items-center">
      <h1 className="font-semibold text-2xl">Are you sure?</h1>
      <form className="p-4 bg-white rounded-2xl flex flex-col gap-2">
        <button onClick={handleLogout} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded duration-200">Log Out</button>
      </form>
    </main>
  )
}