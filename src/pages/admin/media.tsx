import React, { type ReactElement, useState } from "react";

import Layout from "~/components/admin/Layout";
import { type NextPageWithLayout } from "~/types/layout";
import Image from "next/image";

const img =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/dashboard.images/TestArea.png?t=2023-02-22T23%3A51%3A34.707Z";

const MediaPageAdmin: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState("photos");

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center py-2">
      <main className="relative flex h-full w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-5xl font-bold">Welcome to the Media Gallery</h1>

        <p className="mt-3 text-2xl">Choose between photos and videos:</p>

        <div className="mt-10">
          <button
            className={`mr-5 font-bold ${
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
        <div className="mt-10 flex flex-wrap">
          {activeTab === "photos" ? (
            <div className="flex w-full flex-wrap justify-between gap-8">
              <Image width={500} height={500} src={img} alt="Media image" />
              <Image width={500} height={500} src={img} alt="Media image" />
              <Image width={500} height={500} src={img} alt="Media image" />
              <Image width={500} height={500} src={img} alt="Media image" />
              {/* Add more images here */}
            </div>
          ) : (
            <div className="flex w-full flex-wrap justify-between gap-8">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/YMJX3fROIec"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/YMJX3fROIec"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/YMJX3fROIec"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/YMJX3fROIec"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

MediaPageAdmin.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MediaPageAdmin;
