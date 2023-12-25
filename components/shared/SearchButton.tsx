import { SearchButtonProps } from "@/types";
import Image from "next/image";

const SearchButton = ({ otherClasses }: SearchButtonProps) => {
  return (
    <button type="submit" className={`-ml-6 z-10 ${otherClasses}`}>
      <Image
        src="/magnifying-glass.svg"
        alt="Magnifying Glass"
        width={40}
        height={40}
        className="object-contain"
      />
    </button>
  );
};

export default SearchButton;
