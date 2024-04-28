import { SideBar } from "@/components/sidebar";

type Props = {
    children: React.ReactNode
};

const MainLayout = ({ children }: Props) => {
    return (
        <>
            <SideBar/>
            <main className="pl-[256px] h-full">
                <div className="bg-slate-500 h-full">
                    { children }
                </div>
            </main>
        </>
    );
};

export default MainLayout;