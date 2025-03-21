import Image from "./image";

const PopularTags = () => {
  return (
    <div className="p-4 roundde-2xl border-[1px] border-borderGray flex flex-col gap-4">
      <h1 className="text-xl font-bold text-textGrayLight">
        {"What's"} Happening
      </h1>
      {/* TRENDS EVENT*/}
      <div className="flex gap-4">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden">
          <Image
            path="general/event.png"
            alt="event"
            w={120}
            h={120}
            tr={true}
          />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-textGrayLight">
            Nadal v Feder Grand Slam
          </h2>
          <span className="text-sm text-textGray">Last Night</span>
        </div>
      </div>
      {/* TOPICS */}
      <div className=""></div>
    </div>
  );
};

export default PopularTags;
