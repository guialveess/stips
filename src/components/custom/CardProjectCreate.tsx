import { Sparkles, Code2, Boxes } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Card_07() {
    return (
        <div className="relative w-full h-auto mx-auto max-w-lg">
            <div
                className="relative overflow-hidden rounded-2xl
                border border-zinc-200 dark:border-zinc-800
                bg-white dark:bg-zinc-900
                shadow-[0_8px_16px_-6px_rgb(0_0_0/0.05)] dark:shadow-[0_8px_16px_-6px_rgb(0_0_0/0.25)] my-auto"
            >
                <div className="p-7 space-y-4">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg 
                        bg-zinc-100 dark:bg-zinc-800 w-fit"
                    >
                        <Sparkles className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            New Project
                        </span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                            Create Project
                        </h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Set up your new project with just a few clicks.
                            We'll handle the deployment.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-7 space-y-5 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="space-y-2.5">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            Project Name
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                                <Boxes className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                            </div>
                            <input
                                id="name"
                                name="name"
                                placeholder="Enter project name"
                                autoComplete="off"
                                className="w-full pl-10 h-11 rounded-lg
                                    bg-zinc-50 dark:bg-zinc-800/50
                                    border border-zinc-200 dark:border-zinc-800
                                    focus:border-zinc-400 dark:focus:border-zinc-700
                                    focus-visible:ring-1 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700
                                    focus:outline-none
                                    text-zinc-900 dark:text-zinc-100
                                    placeholder:text-zinc-500 dark:placeholder:text-zinc-600"
                            />
                        </div>
                    </div>

                    {/* Framework Select */}
                    <div className="space-y-2.5">
                        <label
                            htmlFor="framework"
                            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            Framework
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center z-10">
                                <Code2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                            </div>
                            <Select name="framework">
                                <SelectTrigger
                                    className="w-full pl-10 h-11 rounded-lg
                                        bg-zinc-50 dark:bg-zinc-800/50
                                        border border-zinc-200 dark:border-zinc-800
                                        focus:border-zinc-400 
                                        dark:focus:border-zinc-700
                                        focus:outline-none
                                        text-zinc-900 dark:text-zinc-100
                                        [&>span:not(:empty)]:text-zinc-900 dark:[&>span:not(:empty)]:text-zinc-100
                                        [&>span:empty]:text-zinc-500 dark:[&>span:empty]:text-zinc-600
                                        dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0 dark:focus-visible:ring-transparent"
                                >
                                    <SelectValue placeholder="Select framework" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                                    <SelectItem value="next">
                                        Next.js
                                    </SelectItem>
                                    <SelectItem value="sveltekit">
                                        SvelteKit
                                    </SelectItem>
                                    <SelectItem value="astro">Astro</SelectItem>
                                    <SelectItem value="nuxt">
                                        Nuxt.js
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="p-7 flex justify-end border-t border-zinc-100 dark:border-zinc-800">
                    <Button>Create Project</Button>
                </div>
            </div>
        </div>
    );
}
