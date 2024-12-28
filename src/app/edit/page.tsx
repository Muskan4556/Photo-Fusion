import SubHeader from "../components/SubHeader";
import EditImage from "./EditImage";

export default async function Edit({
  searchParams,
}: {
  searchParams: {
    publicId: string;
  };
}) {
  const params = await searchParams;

  return (
    <div className="my-8 px-8">
      <SubHeader heading={`Edit ${params.publicId.split("/").pop()} `} />

      <EditImage publicId={params.publicId} />
    </div>
  );
}
