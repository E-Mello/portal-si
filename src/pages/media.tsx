import React, { type ReactElement, useState } from "react";

import Layout from "../components/Layout";
import { type NextPageWithLayout } from "../types/layout";
import Image from "next/image";

const img =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/dashboard.images/TestArea.png?t=2023-02-22T23%3A51%3A34.707Z";

const MediaPage: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState("photos");

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };
  return (
    <section className="flex h-[100vh] w-full flex-col items-center bg-zinc-800  text-white max-sm:h-full  max-sm:pl-0">
      <section className="flex h-full w-full flex-col items-center gap-4">
        <div className="flex h-full w-full flex-col items-center justify-start  text-center">
          <h1 className="pt-2 text-5xl font-bold">
            Welcome to the Media Gallery
          </h1>

          <p className="pb-2 pt-2 text-2xl">
            Choose between photos and videos:
          </p>

          <div className="flex gap-5 pt-5">
            <button
              className={` font-bold ${
                activeTab === "photos" ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => handleTabClick("photos")}
            >
              Photos
            </button>
            <button
              className={`font-bold ${
                activeTab === "videos" ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => handleTabClick("videos")}
            >
              Videos
            </button>
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center max-sm:h-full">
          <div className="flex w-3/4 flex-col justify-evenly gap-5 pl-16 max-sm:w-full max-sm:gap-2 max-sm:pl-0">
            {activeTab === "photos" ? (
              <div className="grid w-full grid-cols-2 items-end gap-8 self-center max-sm:flex max-sm:flex-col max-sm:justify-between">
                <Image
                  width={500}
                  height={500}
                  src={img}
                  alt="Media image"
                  className="max-sm:h-full max-sm:w-full"
                />
                <Image
                  width={500}
                  height={500}
                  src={img}
                  alt="Media image"
                  className="max-sm:h-full max-sm:w-full"
                />
                <Image
                  width={500}
                  height={500}
                  src={img}
                  alt="Media image"
                  className="max-sm:h-full max-sm:w-full"
                />
                <Image
                  width={500}
                  height={500}
                  src={img}
                  alt="Media image"
                  className="max-sm:h-full max-sm:w-full"
                />
                {/* Add more images here */}
              </div>
            ) : (
              <div className="col flex w-full flex-wrap justify-between gap-8">
                <iframe
                  width={380}
                  height={380}
                  src="https://www.youtube.com/embed/YMJX3fROIec"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <iframe
                  width={380}
                  height={380}
                  src="https://www.youtube.com/embed/YMJX3fROIec"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <iframe
                  width={380}
                  height={380}
                  src="https://www.youtube.com/embed/YMJX3fROIec"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <iframe
                  width={380}
                  height={380}
                  src="https://www.youtube.com/embed/YMJX3fROIec"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

MediaPage.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MediaPage;
