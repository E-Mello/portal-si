import { useEffect, useRef, useState } from "react";

interface HeaderImgPageProps {
  src01: string;
  src02?: string;
  classNameImg?: string;
  nIMG: number;
}

export function HeaderPage({
  src01,
  src02,
  classNameImg,
  nIMG,
}: HeaderImgPageProps) {
  const [qtdImg, setQtdImg] = useState(nIMG);
  const imageRef = useRef<Array<HTMLImageElement | null>>(
    new Array(qtdImg).fill(null)
  );

  useEffect(() => {
    setQtdImg(nIMG);
  }, [nIMG]);

  const renderImages = () => {
    const images = [];
    if (src02) {
      for (let i = 0; i < qtdImg; i++) {
        images.push(
          <div
            className={
              qtdImg === 1
                ? "flex h-[37.76824034334764vh] w-[25vw]"
                : "flex h-[37.76824034334764vh] w-[12.5]"
            }
            key={i}
          >
            {i === 0 ? (
              <img
                ref={(el) => (imageRef.current[i] = el)}
                src={src01}
                className={
                  qtdImg === 1
                    ? "flex h-[37.76824034334764vh] w-[25vw]"
                    : "flex h-[37.76824034334764vh] w-[12.5]"
                }
              />
            ) : (
              <img
                ref={(el) => (imageRef.current[i] = el)}
                src={src02}
                className={
                  qtdImg === 1
                    ? "flex h-[37.76824034334764vh] w-[25vw]"
                    : "flex h-[37.76824034334764vh] w-[12.5]"
                }
              />
            )}
          </div>
        );
      }
    } else {
      for (let i = 0; i < qtdImg; i++) {
        images.push(
          <div
            className={
              qtdImg === 1
                ? "flex h-[37.76824034334764vh] w-[25vw]"
                : "flex h-[37.76824034334764vh] w-[12.5vw]"
            }
            key={i}
          >
            <img
              ref={(el) => (imageRef.current[i] = el)}
              src={src01}
              className={
                qtdImg === 1 ? "flex h-[30.901287553648068vh] w-[25vw]" : "flex h-[20vh] w-[12.5vw]"
              }
            />
          </div>
        );
      }
    }
    return images;
  };

  // fazer um title para o header, para que ele possa ser usado em outras paginas e cada pagina ter um titulo diferente

  return (
    //classNameHeader
    //"flex h-full w-full justify-center bg-zinc-900 pl-10"
    <header className={`flex h-[26vh] w-full justify-center bg-zinc-900 pl-10`}>
      <main className="flex h-full w-full justify-between pt-4 pr-4">
        {renderImages()}
      </main>
    </header>
  );
}
