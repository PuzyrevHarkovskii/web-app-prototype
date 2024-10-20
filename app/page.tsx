import { div } from "framer-motion/client";
import Image from "next/image";
import Header from "./components/Header";
import ResizableSections from "./components/Main";

export default function Home() {
  return (
    <div>
      <ResizableSections />
    </div>
  );
}
