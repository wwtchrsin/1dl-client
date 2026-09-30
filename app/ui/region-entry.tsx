"use client"

import { useState } from "react"
import { useSession } from "../providers/session"
import { regionLang } from "@/app/lib/regions"
import { txtRes } from "../lib/text-resources"
import SignUpForm from "@/app/ui/sign-up-form"
import SignInForm from "@/app/ui/sign-in-form"
import Profile from "@/app/ui/profile"
import SearchByTag from "@/app/ui/search-by-tag"
import CookieConsentWidget from "./cookie-consent-widget"
import type { Region } from "@/app/lib/interfaces"

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
            { txtRes.SearchByTag[lang] }
          </button>
        )}
        {deviceid && userAuthorized && (
          <button className={headerItemClasses(displayedForm === "profile")}
            onClick={() => setActiveForm("profile")} key="profile">
            { txtRes.Profile[lang] }
          </button>
        )}
        {deviceid && !userAuthorized && (<>
          <button className={headerItemClasses(displayedForm === "sign-in")}
            onClick={() => setActiveForm("sign-in")} key="sign-in">
            { txtRes.SignIn[lang] }
          </button>
          <button className={headerItemClasses(displayedForm === "sign-up")}
            onClick={() => setActiveForm("sign-up")} key="sign-up">
            { txtRes.CreateAccount[lang] }
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