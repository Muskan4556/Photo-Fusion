import UploadButton from "../gallery/UploadButton";

type Props = {
  heading: string;
};

const SubHeader = ({ heading }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl md:text-4xl font-bold w-[90%]">
        {heading}
      </h1>
      <div className={` ${heading.split(" ")[0] === "Edit" && "md:block hidden"}`}><UploadButton /></div>
    </div>
  );
};

export default SubHeader;
