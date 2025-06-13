import dynamic from "next/dynamic";

export const metadata = {
  title: "Profile",
};

const Edit = dynamic(() => import("@/components/profile/EditPageContent"), {
  ssr: false,
});

export default Edit;
