"use client"
import { FormEvent, useState } from "react";
import { addToWaitlist } from "./actions/waitlist";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [isPending, setIsPending] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const { toast } = useToast()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPending(true)
    const { success, message } = await addToWaitlist(data)

    toast({
      variant: success ? "default" : 'destructive',
      title: "Response",
      description: message
    })
    setData({
      name: "",
      email: "",
      message: ""
    })

    setIsPending(false)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1 className="font-bold text-3xl md:text-4xl xl:text-5xl">YurForms</h1>
          <h2 className="text-xl">Join waitlist</h2>
        </div>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by filling the {" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              form below
            </code>
            .
          </li>
          <li>Submit and see you soon.😎</li>
        </ol>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          <div className="w-full">
            <label>Name: </label>
            <input

              onChange={(event) => setData({ ...data, [event.target.name]: event.target.value })}
              className="w-full border border-black px-2 py-1 rounded" placeholder="Name (nickname, full name)" name="name" />
          </div>

          <div className="w-full">
            <label>Email: </label>
            <input
              onChange={(event) => setData({ ...data, [event.target.name]: event.target.value })}
              className="w-full border border-black px-2 py-1" placeholder="Email" name="email" />
          </div>

          <div className="w-full">
            <label>Message: </label>
            <input
              onChange={(event) => setData({ ...data, [event.target.name]: event.target.value })}
              className="w-full border border-black px-2 py-1" placeholder="message(optional)" name="message" />
          </div>

          <div className="flex items-center flex-col sm:flex-row">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              {isPending ? "Loading" : "Submit"}
            </button>
          </div>
        </form>

      </main>
    </div>
  );
}
