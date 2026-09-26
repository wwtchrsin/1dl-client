"use client"

import { useState } from "react"
import { useSession } from "../providers/session"
import { regionLang } from "@/app/lib/regions"
import SignUpForm from "@/app/ui/sign-up-form"
import SignInForm from "@/app/ui/sign-in-form"
import Profile from "@/app/ui/profile"
import SearchByTag from "./search-by-tag"
import CookieConsentWidget from "./cookie-consent-widget"
import type { Region } from "@/app/lib/interfaces"

let TxtRes = {
  Region: {
    en: "Region",
    ru: "Регион",
  },
  CreateAccount: {
    en: "Create account",
    ru: "Регистрация",
  },
  SignIn: {
    en: "Sign in",
    ru: "Вход",
  },
  SearchByTag: {
    en: "Search by tag",
    ru: "Поиск по метке",
  },
  Profile: {
    en: "Profile",
    ru: "Профиль",
  },
  Error: {
    en: "Error",
    ru: "Ошибка",
  },
  OK: {
    en: "OK",
    ru: "ОК",
  },
}

export default function RegionEntry({ region }: { region: Region }) {
  let { profile, deviceid } = useSession()
  let userAuthorized = !!profile && profile.region === region
  let [ activeForm, setActiveForm ] = useState("")
  let lang = regionLang[region]

  let headerItemClasses = (active: boolean) => {
    let classes = "underline decoration-2 "
    classes += active ? "font-bold" : "text-gray-600"
    return classes
  }

  let displayedForm = activeForm
  if ( userAuthorized ) {
    if ( displayedForm !== "search-by-tag" && displayedForm !== "profile" ) {
      displayedForm = "search-by-tag"
    }
  } else {
    if ( displayedForm !== "sign-in" && displayedForm !== "sign-up" ) {
      displayedForm = "sign-in"
    }
  }

  return (
    <div className="p-6 md:mx-auto md:max-w-lg bg-black/5">
      <div className={`flex flex-row gap-2 items-center`}>
        {deviceid && userAuthorized && (
          <button className={headerItemClasses(displayedForm === "search-by-tag")}
            onClick={() => setActiveForm("search-by-tag")} key="search-by-tag">
            { TxtRes.SearchByTag[lang] }
          </button>
        )}
        {deviceid && userAuthorized && (
          <button className={headerItemClasses(displayedForm === "profile")}
            onClick={() => setActiveForm("profile")} key="profile">
            { TxtRes.Profile[lang] }
          </button>
        )}
        {deviceid && !userAuthorized && (<>
          <button className={headerItemClasses(displayedForm === "sign-in")}
            onClick={() => setActiveForm("sign-in")} key="sign-in">
            { TxtRes.SignIn[lang] }
          </button>
          <button className={headerItemClasses(displayedForm === "sign-up")}
            onClick={() => setActiveForm("sign-up")} key="sign-up">
            { TxtRes.CreateAccount[lang] }
          </button>
        </>)}
      </div>
      {deviceid && displayedForm === "sign-in" && (
        <SignInForm region={region} />
      )}
      {deviceid && displayedForm === "sign-up" && (
        <SignUpForm region={region} />
      )}
      {deviceid && displayedForm === "profile" && (
        <Profile profile={profile!} />
      )}
      {deviceid && displayedForm === "search-by-tag" && (
        <SearchByTag region={region} />
      )}
      {!deviceid && (
        <CookieConsentWidget region={region} />
      )}
    </div>
  )
}