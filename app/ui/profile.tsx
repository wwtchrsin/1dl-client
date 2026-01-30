"use client"

import { useState, useActionState } from "react"
import { deleteProfileAction, logoutAction } from "../lib/form-actions"
import { regionLang } from "../lib/regions"
import ErrorMessage from "./error-message"
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
  logout: {
    en: "logout",
    ru: "выйти",
  },
  deleteAccount: {
    en: "delete account",
    ru: "удалить аккаунт",
  },
  ConfirmDeletion: {
    en: "Are you sure you want to delete your account " +
      "and all the data associated with it? " +
      "This action cannot be undone.",
    ru: "Вы уверены, что хотите удалить ваш аккаунт " +
      "вместе со всеми связанными данными? " +
      "Это действие нельзя будет отменить.",
  },
  confirm: {
    en: "confirm",
    ru: "подтвердить",
  },
  cancel: {
    en: "cancel",
    ru: "отменить",
  },
}

export default function Profile({ profile }: { profile: Profile }) {
  let [ logoutFormState, logoutFormAction, logoutFormPending ] = 
    useActionState(logoutAction, {
      error: undefined,
      done: false,
      timestamp: -1,
    })
  let [ deleteFormState, deleteFormAction, deleteFormPending ] = 
    useActionState(deleteProfileAction, {
      error: undefined,
      done: false,
      timestamp: -1,
    })
  let [ dialogVisible, setDialogVisible ] = useState(false)
  let lang = regionLang[profile.region as Region]
  let error = logoutFormState.error || deleteFormState.error
  let done = logoutFormState.done || deleteFormState.done
  let isPending = logoutFormPending || deleteFormPending
  let timestamp = Math.max(logoutFormState.timestamp, deleteFormState.timestamp)

  let timestampToDate = (timestamp: number | string): string => {
    let date = new Date(+timestamp * 1000)
    let day = String(date.getDate()).padStart(2, "0")
    let month = String(date.getMonth() + 1).padStart(2, "0")
    let year = date.getFullYear()
    return `${day} / ${month} / ${year}`
  }

  if ( done ) {
    return <></>
  }

  return (
    <form action="#">
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
        {!dialogVisible && (
          <div className="mt-2 flex flex-row gap-2">
            <button className="rounded py-1 px-2 bg-red-500 text-white"
              type="submit" formAction={logoutFormAction}
              disabled={isPending}>
                { TxtRes.logout[lang] }
            </button>
            <button className="rounded py-1 px-2 bg-red-500 text-white" 
              onClick={() => setDialogVisible(true)}
              disabled={isPending}>
                { TxtRes.deleteAccount[lang] }
            </button>
          </div>
        )}
        {dialogVisible && (
          <div className="mt-2 flex flex-col gap-2">
            <div className="text-red-500 font-bold">
              { TxtRes.ConfirmDeletion[lang] }
            </div>
            <div className="flex flex-row gap-2">
              <button className="rounded py-1 px-2 bg-red-500 text-white"
                type="submit" formAction={deleteFormAction}
                disabled={isPending}>
                  { TxtRes.confirm[lang] }
              </button>
              <button className="rounded py-1 px-2 bg-red-500 text-white" 
                onClick={() => setDialogVisible(false)}>
                  { TxtRes.cancel[lang] }
              </button>
            </div>
          </div>
        )}
        <ErrorMessage
          error={error}
          timestamp={timestamp}
          lang={lang}
        />
      </div>
    </form>
  )
}