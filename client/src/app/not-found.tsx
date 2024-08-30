import dynamic from "next/dynamic";

const NotFound = dynamic(() => import("@/components/common/NotFoundContent"), {
  ssr: false,
});

export default NotFound;
