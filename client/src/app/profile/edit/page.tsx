import dynamic from "next/dynamic";

const Edit = dynamic(() => import("@/components/profile/EditPageContent"), {
  ssr: false,
});

export default Edit;
