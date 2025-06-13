import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Final",
};

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
