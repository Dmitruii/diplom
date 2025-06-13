import PageContent from "@/components/profile/PageContent";

export const metadata = {
  title: "Profile",
};

const Profile = ({ params }: { params: { id: string } }) => {
  return <PageContent params={params} />;
};

export default Profile;
