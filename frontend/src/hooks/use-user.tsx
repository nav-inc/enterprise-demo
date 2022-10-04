import { useOutletContext } from 'react-router-dom'

interface UserInterface {
  first_name: string
  user_id: string
  email: string
  business_name: string
  business_state: string
  business_zip: string
}

export default function useUser() {
  const { user } = useOutletContext<{ user: UserInterface }>()
  return user
}
