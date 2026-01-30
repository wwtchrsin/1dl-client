"use client"

import Link from "next/link"
import { useState } from "react"
import { useProfile } from "../providers"
import { regionLang } from "@/app/lib/regions"
import SignUpForm from "@/app/ui/sign-up-form"
import SignInForm from "@/app/ui/sign-in-form"
import Profile from "@/app/ui/profile"
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
  Error: {
    en: "Error",
    ru: "Ошибка",
  },
  OK: {
    en: "OK",
    ru: "ОК",
  },
}

export default function RegionCard({ region }: { region: Region }) {
  let { profile } = useProfile()
  let [ activeForm, setActiveForm ] = useState("")

  let lang = regionLang[region]
  let userAuthorized = !!profile && profile.region === region

  let headerItemClasses = (active: boolean) => {
    let classes = "underline decoration-2 "
    classes += active ? "font-bold" : "text-gray-600"
    return classes
  }

  let switchForm = (formTag: string) => {
    setActiveForm(activeForm !== formTag ? formTag : "")
  }

  return (
    <div className="px-6 py-12 md:mx-auto md:max-w-lg bg-black/5">
      <div className={`flex flex-row gap-2 items-center`}>
        <div>
          <span className="max-sm:hidden">{ TxtRes.Region[lang] }: </span>
          <Link href={`/${region}`} className={headerItemClasses(userAuthorized)}>
            {`/${region.toUpperCase()}`}
          </Link>
        </div>
        {!userAuthorized && (<>
          <button className={headerItemClasses(activeForm === "sign-in")}
            onClick={() => switchForm("sign-in" )} key="sign-in">
            { TxtRes.SignIn[lang] }
          </button>
          <button className={headerItemClasses(activeForm === "sign-up")}
            onClick={() => switchForm("sign-up")} key="sign-up">
            { TxtRes.CreateAccount[lang] }
          </button>
        </>)}
      </div>
      {!userAuthorized && activeForm === "sign-in" && (
        <SignInForm region={region} />
      )}
      {!userAuthorized && activeForm === "sign-up" && (
        <SignUpForm region={region} />
      )}
      {userAuthorized && (
        <Profile profile={profile!} />
      )}
    </div>
  )
}