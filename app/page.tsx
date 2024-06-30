import ToolSection from "./components/Home/ToolSection";
import { HighlightSection } from "./components/Home/HighlightSection";
import { Metadata } from "next";


export default function Home() {
  return (
    <main>
      {/* <HighlightSection /> */}
      <ToolSection name={'Convert'} />
      <ToolSection name={'File'} />
      <ToolSection name={'Photo'} />
    </main>
  );
}
