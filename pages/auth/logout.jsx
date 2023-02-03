import { deleteCookie } from "cookies-next"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Logout() {

  const router = useRouter()

  useEffect(() => {
    deleteCookie('apikey')
    router.push('./login')
  }) 

  return (
    <h1 className="text-center text-white font-semibold text-2xl">Are you sure?</h1>
  )
}