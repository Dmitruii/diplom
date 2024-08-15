import Image from "next/image";
import ModalLayout from "../layouts/ModalLayout";
import { useAppSelector } from "@/store/hooks";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

interface IFinalModal {
  isModalOpen: boolean;
}

const FinalModal = ({ isModalOpen }: IFinalModal) => {
  const router = useRouter();
  const winner = useAppSelector((state) => state.tournament.winner);

  return (
    <ModalLayout
      rest={{
        theme: {
          root: {
            show: {
              on: "flex",
            },
          },
        },
        size: "2xl",
      }}
      isModalOpen={isModalOpen}
      onClose={() => {}}
    >
      <div className="flex justify-center items-center">
        <Image src={"/final.svg"} alt="example" width={100} height={100} />
        <h1 className="ml-2 text-2xl">Congratulations to {winner?.name}!</h1>
      </div>
      <Button
        className="mt-5 mx-auto"
        size="xl"
        onClick={() => router.push("/dashboard")}
      >
        Back to dashboard
      </Button>
    </ModalLayout>
  );
};

export default FinalModal;
