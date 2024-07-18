import { useEffect, useState } from 'react'

interface UserProfileProps {
  id: number
  name: string
  username: string
  email: string
}

const UserProfile = () => {
  const [user, setUser] = useState<UserProfileProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) {
          throw new Error('Error fetching data')
        }
        const data: UserProfileProps[] = await response.json()
        setUser(data)
        setError(null)
      } catch (error) {
        setError('Error fetching data')
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Users</h1>
      {error && <p>{error}</p>}
      {isLoading ? (
        <p>Loading users list...</p>
      ) : (
        <ul>
          {user.map((user: UserProfileProps) => (
            <li key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserProfile
