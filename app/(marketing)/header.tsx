import Image from "next/image"

export const Header = () => {
    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-center h-full bg-slate-400">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-3">
                    <Image src="/mascot.svg"  height={60} width={60} alt="Mascot"/>
                </div>
                header
            </div>
        </header>
    )
}