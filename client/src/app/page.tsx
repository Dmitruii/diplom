import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/components/common/HomeContentPage"), {
  ssr: false,
});

export default Home;
