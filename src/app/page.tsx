"use client";
import { FormEvent, useState } from "react";
import { addToWaitlist } from "./actions/waitlist";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

const defaultData = {
    name: "",
    email: "",
    message: "",
};
export default function Home() {
    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [data, setData] = useState(defaultData);
    const { toast } = useToast();
    const { theme, setTheme } = useTheme();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsPending(true);
        const { success, message } = await addToWaitlist(data);

        toast({
            variant: success ? "default" : "destructive",
            title: "Response",
            description: message,
        });

        if (success) {
            setIsSuccess(true);
        }

        setData(defaultData);
        setIsPending(false);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors">
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                <button
                    onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900"
                >
                    {theme === "dark" ? "🌞" : "🌙"}
                </button>
            </div>

            <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 sm:py-16 md:py-24">
                <div className="mb-8 sm:mb-16 text-center space-y-4 sm:space-y-6">
                    <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl xl:text-7xl tracking-tight text-black dark:text-white">
                        YurForms
                    </h1>
                    <h2 className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
                        Join our exclusive waitlist and be the first to
                        experience the future of form management
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto px-2">
                        Fill a form once, use it everywhere. Save time and
                        streamline your workflow with our innovative form
                        solution.
                    </p>
                </div>

                <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 bg-gray-50 dark:bg-gray-900 shadow-xl mx-auto border border-gray-100 dark:border-gray-800">
                    {isSuccess ? (
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                                <span className="text-2xl text-black dark:text-white">✓</span>
                            </div>
                            <h3 className="text-xl font-semibold text-black dark:text-white">
                                Welcome to YurForms!
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Thank you for joining our waitlist. We'll keep you updated on our progress and notify you when we launch.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 sm:mb-8">
                                <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">
                                    🚀 Be an Early Adopter
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                    Join our growing community of innovators and
                                    get exclusive early access.
                                </p>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4 sm:space-y-6"
                            >
                                {["name", "email", "message"].map((field) => (
                                    <div
                                        key={field}
                                        className="space-y-1.5 sm:space-y-2"
                                    >
                                        <label className="block text-base sm:text-lg font-medium capitalize text-gray-800 dark:text-gray-200">
                                            {field}{" "}
                                            {field !== "message" && (
                                                <span className="text-gray-400">
                                                    *
                                                </span>
                                            )}
                                        </label>
                                        <input
                                            required={field !== "message"}
                                            name={field}
                                            value={
                                                data[field as keyof typeof data]
                                            }
                                            disabled={isPending}
                                            placeholder={
                                                field === "message"
                                                    ? "Tell us how you plan to use YurForms (optional)"
                                                    : `Enter your ${field}`
                                            }
                                            onChange={(event) =>
                                                setData({
                                                    ...data,
                                                    [event.target.name]:
                                                        event.target.value,
                                                })
                                            }
                                            className="w-full h-12 sm:h-14 px-4 sm:px-6 rounded-xl sm:rounded-2xl border 
                        bg-white dark:bg-black
                        border-gray-200 dark:border-gray-800
                        text-black dark:text-white
                        focus:border-black dark:focus:border-white
                        focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-opacity-20
                        focus:outline-none transition-all duration-200
                        text-sm sm:text-base"
                                        />
                                    </div>
                                ))}

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full h-12 sm:h-14 rounded-full text-base sm:text-lg font-medium
                    bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100
                    text-white dark:text-black transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed mt-6 sm:mt-8
                    shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    {isPending
                                        ? "Processing..."
                                        : "Join the Waitlist →"}
                                </button>
                            </form>
                        </>
                    )}

                    <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-2">
                        By joining, you'll be among the first to know when we
                        launch. No spam, ever.
                    </p>
                </div>
            </main>
        </div>
    );
}
