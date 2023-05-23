import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import React, { type ReactElement } from "react";

import { Carousel } from "react-responsive-carousel";
import Layout from "../components/Layout";
import { type NextPageWithLayout } from "../types/layout";
import Image from "next/image";

const testIMG =
  "https://zrohxlcjhxpnojvxpcju.supabase.co/storage/v1/object/public/dashboard.images/TestArea.png?t=2023-02-22T23%3A51%3A34.707Z";

const Informativos: NextPageWithLayout = () => {
  return (
    <section
      className={`flex h-full w-full flex-col items-center bg-zinc-900/50 text-white  max-sm:pl-0`}
    >
      <section className="flex h-full w-full flex-col items-center gap-4">
        <h1 className="flex items-center justify-center p-2 text-center text-3xl font-bold max-sm:text-2xl">
          Aqui voce pode acompanhar as principais noticias do curso
        </h1>
        <div className="flex h-full w-full items-center justify-center">
          <Carousel
            showArrows={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            width={780}
            className={`flex w-full items-center justify-center pb-4`}
          >
            <div className="flex items-end justify-between">
              <Image
                width={500}
                height={500}
                alt="test"
                src={testIMG}
                className="flex h-full w-full"
              />
              <p className="legend bg-zinc-800">Legend 1</p>
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
        <div
          className={`mb-2 flex h-full w-full flex-col items-center gap-4 bg-zinc-900/10 p-2 text-justify`}
        >
          <div
            className={`flex h-fit w-fit flex-col items-center  justify-center pt-4`}
          >
            <h3>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam
              voluptatum modi officia totam temporibus libero nobis id ducimus
              sed delectus amet voluptate qui labore, maxime veritatis omnis
              quam dignissimos! Assumenda.Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Numquam voluptatum modi officia
              totam temporibus libero nobis id ducimus sed delectus amet
              voluptate qui labore, maxime veritatis omnis quam dignissimos!
              Assumenda. Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Numquam voluptatum modi officia totam temporibus libero
              nobis id ducimus sed delectus amet voluptate qui labore, maxime
              veritatis omnis quam dignissimos! Assumenda.
            </h3>
            <Image
              width={500}
              height={500}
              alt="test"
              src={testIMG}
              className="flex h-full w-2/6 pt-2 max-sm:w-3/4"
            />
          </div>
          <div
            className={`flex flex-col items-center  justify-center pt-2 max-sm:pt-2`}
          >
            <h3>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam
              voluptatum modi officia totam temporibus libero nobis id ducimus
              sed delectus amet voluptate qui labore, maxime veritatis omnis
              quam dignissimos! Assumenda.Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Numquam voluptatum modi officia
              totam temporibus libero nobis id ducimus sed delectus amet
              voluptate qui labore, maxime veritatis omnis quam dignissimos!
              Assumenda. Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Numquam voluptatum modi officia totam temporibus libero
              nobis id ducimus sed delectus amet voluptate qui labore, maxime
              veritatis omnis quam dignissimos! Assumenda.
            </h3>
            <Image
              width={500}
              height={500}
              alt="test"
              src={testIMG}
              className="flex h-full w-2/6 pt-2 max-sm:w-3/4"
            />
          </div>
        </div>
      </section>
    </section>
  );
};

Informativos.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Informativos;
