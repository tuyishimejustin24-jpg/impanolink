
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserRound, Camera, LogOut } from 'lucide-react'

export default function Profile() {
  const navigate = useNavigate()

  const user = JSON.parse(
    sessionStorage.getItem('impanolink_demo_user') ||
    localStorage.getItem('impanolink_demo_user') ||
    sessionStorage.getItem('impanolink_user') ||
    '{}'
  )

  const storageKey = `impanolink_photo_${user.id || user.email || 'user'}`

  const [photo, setPhoto] = useState(
    localStorage.getItem(storageKey) || ''
  )

  const [message, setMessage] = useState('')

  function handlePhotoChange(event) {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage('The image must be smaller than 2 MB.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      const image = reader.result

      try {
        localStorage.setItem(storageKey, image)
        setPhoto(image)
        setMessage('Your photo has been saved on this device.')
      } catch {
        setMessage('Unable to save the photo. Try a smaller image.')
      }
    }

    reader.readAsDataURL(file)
  }

  function handleLogout() {
    sessionStorage.removeItem('impanolink_token')
    sessionStorage.removeItem('impanolink_user')
    sessionStorage.removeItem('impanolink_demo_logged_in')
    sessionStorage.removeItem('impanolink_demo_user')

    navigate('/login', { replace: true })
  }

  return (
    <main className="min-h-screen bg-[#101c35] px-4 py-12 text-white">
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-700 bg-[#172641] p-6 shadow-xl sm:p-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            My ImpanoLink Profile
          </h1>

          <p className="mt-2 text-slate-300">
            Show who you are and the talent you have.
          </p>

          <div className="relative mx-auto mt-8 h-36 w-36">
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="h-36 w-36 rounded-full border-4 border-cyan-400 object-cover"
              />
            ) : (
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-cyan-400 bg-slate-700">
                <UserRound size={68} />
              </div>
            )}

            <label
              htmlFor="profile-photo"
              className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-cyan-400 p-3 text-slate-950 hover:bg-cyan-300"
              title="Upload photo"
            >
              <Camera size={22} />
            </label>

            <input
              id="profile-photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          <p className="mt-4 text-sm text-cyan-300">
            Click the camera icon to upload a photo.
          </p>
        </div>

        <div className="mt-8 space-y-4 rounded-xl bg-[#101c35] p-5">
          <div>
            <p className="text-sm text-slate-400">Full Name</p>
            <p className="mt-1 text-lg font-semibold">
              {user.full_name || user.fullName || 'ImpanoLink User'}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Email</p>
            <p className="mt-1 break-all">
              {user.email || 'No email available'}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Account Type</p>
            <p className="mt-1 capitalize">
              {user.role || 'Unknown'}
            </p>
          </div>
        </div>

        {message && (
          <p role="status" className="mt-4 text-center text-cyan-300">
            {message}
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/services')}
            className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Explore Services
          </button>

          <button
            type="button"
            onClick={() => navigate('/chat')}
            className="rounded-lg bg-teal-500 px-5 py-3 font-semibold text-slate-950 hover:bg-teal-400"
          >
            Continue to Group Chat
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-slate-500 px-5 py-3 hover:bg-slate-700"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </section>
    </main>
  )
}
