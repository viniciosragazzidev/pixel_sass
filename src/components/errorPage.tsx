import Logo from "@/components/ui/logo";

export default function ErrorPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col space-y-4">
      <Logo />
      <div className="flex   justify-center items-center text-8xl font-semibold">
        <span className=" rotate-12 text-teal-400">4</span>
        <span className="text-slate-200">0</span>
        <span className="text-teal-400 -rotate-12">4</span>
      </div>

      <h4 className="text-3xl font-semibold text-slate-200">
        <p className="text-slate-200">Página não encontrada</p>
      </h4>
    </div>
  );
}
