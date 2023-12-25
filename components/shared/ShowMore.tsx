"use client";

import { useRouter } from "next/navigation";

import { CustomButton } from "./index";
import { ShowMoreProps } from "@/types";
import { updateSearchParams } from "@/utils";

const ShowMore = ({ pageNumber, isNext, setLimit }: ShowMoreProps) => {
  // const router = useRouter();

  const handleSearch = () => {
    const newLimit = (pageNumber + 1) * 10;
    // const newPathName = updateSearchParams("limit", `${newLimit}`);
    // router.push(newPathName, { scroll: false });

    setLimit(newLimit);
  };

  return (
    <div className="w-full flex flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleSearch}
        />
      )}
    </div>
  );
};

export default ShowMore;
