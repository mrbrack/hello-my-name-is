import dynamic from "next/dynamic";

const SketchBlock = dynamic(() => import("../components/SketchBlock"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <SketchBlock />
    </>
  );
}
