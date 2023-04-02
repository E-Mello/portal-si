import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import React, { Component, ReactElement, useRef } from "react";

import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Layout from "../components/Layout";
import LogoUnemat from "../assets/LogoUnemat.png";
import { NextPageWithLayout } from "../types/layout";
import ReactDOM from "react-dom";
import { Separator } from "../components/ui/separator";
import { cn } from "../utils/cn";

const testIMG =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/dashboard.images/TestArea.png?t=2023-02-22T23%3A51%3A34.707Z";

const Informativos: NextPageWithLayout = () => {
  const imageRef = useRef(null);
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
            <img ref={imageRef} src={testIMG} className="flex h-full w-full" />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img ref={imageRef} src={testIMG} className="flex h-full w-full" />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img ref={imageRef} src={testIMG} className="flex h-full w-full" />
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img ref={imageRef} src={testIMG} className="flex h-full w-full" />
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img ref={imageRef} src={testIMG} className="flex h-full w-full" />
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
        <img
          ref={imageRef}
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
        <img
          ref={imageRef}
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
