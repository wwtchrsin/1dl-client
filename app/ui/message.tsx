import type { Message } from "@/app/lib/interfaces";

export default function Message({ message }: { message: Message }) {
  return (
    <div className="flex flex-col max-w-80">
      <div>
        { message.text }
      </div>
      <div className="font-bold">
        { message.username }
      </div>
    </div>
  )
}