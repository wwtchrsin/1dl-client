import { regionLang } from "../lib/regions"
import type { Profile, Region } from "../lib/interfaces"

let TxtRes = {
  Login: {
    en: "Login",
    ru: "Логин",
  },
  Name: {
    en: "Name",
    ru: "Имя",
  },
  AccountCreated: {
    en: "Account created",
    ru: "Аккаунт создан",
  },
}

export default function Profile({ profile }: { profile: Profile }) {
  let lang = regionLang[profile.region as Region]

  let timestampToDate = (timestamp: number | string): string => {
    let date = new Date(+timestamp * 1000)
    let day = String(date.getDate()).padStart(2, "0")
    let month = String(date.getMonth() + 1).padStart(2, "0")
    let year = date.getFullYear()
    return `${day} / ${month} / ${year}`
  }

  return (
    <div className="flex flex-col gap-2 py-4">
      <div>
        <div className="text-gray-500">
          { TxtRes.Login[lang] }
        </div>
        <div className="text-xl">
          { profile.login }
        </div>
      </div>
      <div>
        <div className="text-gray-500">
          { TxtRes.Name[lang] }
        </div>
        <div className="text-xl">
          { profile.name }
        </div>
      </div>
      <div>
        <div className="text-gray-500">
          { TxtRes.AccountCreated[lang] }
        </div>
        <div className="text-xl">
          { timestampToDate(profile.timestamp) }
        </div>
      </div>
    </div>
  )
}