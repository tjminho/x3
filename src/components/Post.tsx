import { imagekit } from "@/utils";
import Image from "./image";
import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import Video from "./Video";

interface fileDetailsResponse {
  width: number;
  height: number;
  filePath: string;
  url: string;
  fileType: string;
  customMetadata?: {
    sensitive: boolean;
  };
}

const Post = async () => {
  const getFileDetails = async (
    fileId: string
  ): Promise<fileDetailsResponse> => {
    return new Promise((resolve, reject) => {
      imagekit.getFileDetails(fileId, function (error, result) {
        if (error) reject(error);
        else resolve(result as fileDetailsResponse);
      });
    });
  };

  const fileDetails = await getFileDetails("67d62f9a432c4764166200b3");

  return (
    <div className="p-4 border-y-[1px] border-borderGray">
      {/* POST TYPE */}
      <div className="flex items-center gap-2 text-sm text-textGray mb-2 from-bold cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="#71767b"
            d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
          />
        </svg>
        <span>Jinhaeng Dev reposted</span>
      </div>
      {/* POST CONTENT */}
      <div className="flex gap-4">
        {/* AVATAR */}
        <div className="w-10 h-10 relative rounded-full overflow-hidden">
          <Image
            path="general/avatar.png"
            alt="jinhaeng dev"
            w={100}
            h={100}
            tr={true}
          />
        </div>
        {/* CONTENT */}
        <div className="flex-1 flex flex-col gap-2">
          {/* TOP */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-md font-bold">Jinhaeng Dev</h1>
              <span className="text-textGray">@jinhaengdev</span>
              <span className="text-textGray">1 day ago</span>
            </div>
            <PostInfo />
          </div>
          {/* TEXT & MEDIA */}
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
            dolorum numquam corrupti consectetur, ab repellendus laborum
            reiciendis atque minima officia accusamus vero! Enim beatae hic
            aspernatur quibusdam corrupti, saepe expedita?
          </p>
          {/* <Image path="posts/post.jpeg" alt="" w={600} h={600} /> */}
          {fileDetails && fileDetails.fileType === "image" ? (
            <Image
              path={fileDetails.filePath}
              alt=""
              w={fileDetails.width}
              h={fileDetails.height}
              className={fileDetails.customMetadata?.sensitive ? "blur-lg" : ""}
            />
          ) : (
            <Video
              path={fileDetails.filePath}
              className={fileDetails.customMetadata?.sensitive ? "blur-lg" : ""}
            />
          )}
          <PostInteractions />
        </div>
      </div>
    </div>
  );
};

export default Post;
