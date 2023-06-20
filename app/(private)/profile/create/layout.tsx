import { auth } from "@clerk/nextjs";

export default function Layout({ children }) {
  const { userId } = auth();

  return (
    <>
      <section className="m-auto sm:w-[640px] pt-16">
        <div className="m-auto sm:w-[640px] mt-8">{children}</div>
      </section>
    </>
  );
}
