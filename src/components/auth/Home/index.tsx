import Image from "next/image";
const LogoUnemat =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/unemat.images/LogoUnemat.png?t=2023-02-22T23%3A57%3A16.417Z";

export default function Home() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-gradient-to-b from-[#272727a2] to-[#0e0e0f00]">
      <Image
        src={LogoUnemat}
        alt=""
        width={500}
        height={500}
        className={`opacity-10`}
      />
    </section>
  );
}
