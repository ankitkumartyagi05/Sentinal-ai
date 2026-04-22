import Sidebar from '../../components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex bg-[#050505] min-h-screen text-white">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0050FF]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        {children}
      </main>
    </div>
  );
}
