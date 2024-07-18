import { render } from '@testing-library/react'
import { screen, waitFor } from '@testing-library/dom'
import UserProfile from './UserProfile'

describe('UserProfile', () => {
  let fetchMock = jest.fn()
  beforeEach(() => {
    fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz'
          },
          {
            id: 2,
            name: 'Ervin Howell',
            username: 'Antonette',
            email: 'Sincere@april.biz'
          }
        ])
    })
    window.fetch = fetchMock
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  test('loads user profile', async () => {
    render(<UserProfile />)
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
  })

  test('displays error message on fetch error', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Error fetching data'))
    render(<UserProfile />)
    const errorMessage = await screen.findByText(/Error fetching data/i)
    expect(errorMessage).toBeInTheDocument()
  })

  test('displays loading message while fetching data', async () => {
    fetchMock.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: () => Promise.resolve([]) }), 1000))
    )
    render(<UserProfile />)
    expect(screen.getByText(/Loading users list.../i)).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText(/Loading users list.../i)).toBeNull(), { timeout: 2000 })
  })
})
