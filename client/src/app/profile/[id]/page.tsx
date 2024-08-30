import PageContent from "@/components/profile/PageContent";

const Profile = ({ params }: { params: { id: string } }) => {
  return <PageContent params={params} />;
};

export default Profile;
