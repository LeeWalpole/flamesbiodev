export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="m-auto sm:w-[640px] ">
        <div className="m-auto sm:w-[640px]">{children}</div>
      </section>
    </>
  );
}
