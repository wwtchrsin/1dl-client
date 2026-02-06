import type { Message } from "@/app/lib/interfaces";

export default function Message({ message }: { message: Message }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="max-w-80 p-6 flex flex-col">
        <div>
          { message.text }
        </div>
        <div className="font-bold">
          { message.username }
        </div>
      </div>
    </div>
  )
}