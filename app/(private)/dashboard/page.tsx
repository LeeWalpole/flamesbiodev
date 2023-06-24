import AuthToggleButton from "@/components/AuthToggleButton";

export default function DashboardPage() {
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="text-center">
          <AuthToggleButton />
        </div>
      </div>
    </>
  );
}
