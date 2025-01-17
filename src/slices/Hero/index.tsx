import Scene from "@/components/3d/Scene";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Scene />
    </section>
  );
};

export default Hero;

// import dynamic from "next/dynamic";

// const Scene = dynamic(() => import("@/components/3d/Scene"), {
//   loading: () => <p>Loading...</p>,
//   ssr: false,
// });

// export default function Home() {
//   return <div className="relative h-screen">{/* <Scene /> */}</div>;
// }
