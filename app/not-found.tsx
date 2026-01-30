import ErrorPage from "@/app/ui/error-page"

export default function NotFound() {
  return (
    <ErrorPage error="appError.pageNotFound" />
  )
}