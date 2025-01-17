import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative h-screen bg-black">
      <Scene />
    </div>
  );
}
