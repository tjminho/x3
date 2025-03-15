import Feed from "@/components/Feed";
import Share from "@/components/Share";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="">
      <div className="px-4 pt-4 flex justify-between text-textGray font-bold border-b-[1px] border-borderGray">
        <Link
          className="pb-3 flex items-center border-b-[4px] border-iconBlue"
          href="/"
        >
          For you
        </Link>
        <Link className="pb-3 flex items-center" href="/">
          Following
        </Link>
        <Link className="hidden pb-3 flex items-center" href="/">
          React
        </Link>
        <Link className="hidden pb-3 flex items-center" href="/">
          Javascript
        </Link>
        <Link className="hidden pb-3 flex items-center" href="/">
          css
        </Link>
      </div>
      <Share />
      <Feed />
    </div>
  );
};

export default HomePage;
