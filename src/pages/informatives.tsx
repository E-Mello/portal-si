import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import React, { type ReactElement } from "react";

import { Carousel } from "react-responsive-carousel";
import Layout from "../components/Layout";
import { type NextPageWithLayout } from "../types/layout";
import { Separator } from "../components/ui/separator";
import { cn } from "../utils/cn";
import Image from "next/image";

const testIMG =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/dashboard.images/TestArea.png?t=2023-02-22T23%3A51%3A34.707Z";

const Informativos: NextPageWithLayout = () => {
  return (
    <section
      className={`flex h-full flex-col items-center justify-between text-white `}
    >
      <div className=" flex h-[calc(65vh)] w-full items-center justify-center bg-zinc-900">
        <Carousel
          showArrows={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          width={780}
          className={`flex w-full items-center justify-center`}
        >
          <div className="flex items-end justify-between">
            <Image
              width={500}
              height={500}
              alt="test"
              src={testIMG}
              className="flex h-full w-full"
            />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <Image
              width={500}
              height={500}
              alt="test"
              src={testIMG}
              className="flex h-full w-full"
            />
            <p className="legend">Legend 2</p>
          </div>

          <div>
            <Image
              width={500}
              height={500}
              alt="test"
              src={testIMG}
              className="flex h-full w-full"
            />
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <Image
              width={500}
              height={500}
              alt="test"
              src={testIMG}
              className="flex h-full w-full"
            />
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <Image
              width={500}
              height={500}
              alt="test"
              src={testIMG}
              className="flex h-full w-full"
            />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
      </div>
      <Separator
        className={cn("bg-gradient-to-t from-[#0e0e0f00] to-zinc-900")}
      />
      <span>dashboard</span>
      <div
        className={`flex h-full w-2/3 flex-col items-center justify-center `}
      >
        <h3>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam
          voluptatum modi officia totam temporibus libero nobis id ducimus sed
          delectus amet voluptate qui labore, maxime veritatis omnis quam
          dignissimos! Assumenda.Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Numquam voluptatum modi officia totam temporibus
          libero nobis id ducimus sed delectus amet voluptate qui labore, maxime
          veritatis omnis quam dignissimos! Assumenda. Lorem ipsum dolor, sit
          amet consectetur adipisicing elit. Numquam voluptatum modi officia
          totam temporibus libero nobis id ducimus sed delectus amet voluptate
          qui labore, maxime veritatis omnis quam dignissimos! Assumenda.
        </h3>
        <Image
          width={500}
          height={500}
          alt="test"
          src={testIMG}
          className="flex h-full w-[calc(45vh)]"
        />
      </div>
      <div
        className={`flex h-full w-2/3 flex-col items-center justify-center `}
      >
        <h3>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam
          voluptatum modi officia totam temporibus libero nobis id ducimus sed
          delectus amet voluptate qui labore, maxime veritatis omnis quam
          dignissimos! Assumenda.Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Numquam voluptatum modi officia totam temporibus
          libero nobis id ducimus sed delectus amet voluptate qui labore, maxime
          veritatis omnis quam dignissimos! Assumenda. Lorem ipsum dolor, sit
          amet consectetur adipisicing elit. Numquam voluptatum modi officia
          totam temporibus libero nobis id ducimus sed delectus amet voluptate
          qui labore, maxime veritatis omnis quam dignissimos! Assumenda.
        </h3>
        <Image
          width={500}
          height={500}
          alt="test"
          src={testIMG}
          className="flex h-full w-[calc(45vh)]"
        />
      </div>
    </section>
  );
};

Informativos.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Informativos;
