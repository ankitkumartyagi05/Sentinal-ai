import Sandbox from '../../components/Sandbox';
import Navbar from '../../components/Navbar';

export default function SandboxPage() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <Navbar />
      <Sandbox />
    </main>
  );
}
