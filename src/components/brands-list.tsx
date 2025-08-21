"use client";

import Image from "next/image";

const BrandsList = () => {
  return (
    <div className="space-y-6">
      <h3 className="px-5 text-lg font-semibold md:text-xl lg:text-2xl">
        Marcas parceiras
      </h3>
      <div className="flex w-full gap-4 overflow-x-auto scroll-smooth px-5 md:gap-6 lg:justify-around lg:gap-8 [&::-webkit-scrollbar]:hidden">
        <div className="w-32 flex-shrink-0 md:w-40 lg:w-48">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-[#F1F1F1] p-4 md:h-40 md:w-40 lg:h-48 lg:w-48">
              <Image
                src="/nike.svg"
                alt="Nike"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full max-w-[80px] object-contain md:max-w-[100px] lg:max-w-[120px]"
              />
            </div>
            <p className="text-center text-sm font-medium md:text-base">Nike</p>
          </div>
        </div>
        <div className="w-32 flex-shrink-0 md:w-40 lg:w-48">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-[#F1F1F1] p-4 md:h-40 md:w-40 lg:h-48 lg:w-48">
              <Image
                src="/adidas.svg"
                alt="Adidas"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full max-w-[80px] object-contain md:max-w-[100px] lg:max-w-[120px]"
              />
            </div>
            <p className="text-center text-sm font-medium md:text-base">
              Adidas
            </p>
          </div>
        </div>
        <div className="w-32 flex-shrink-0 md:w-40 lg:w-48">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-[#F1F1F1] p-4 md:h-40 md:w-40 lg:h-48 lg:w-48">
              <Image
                src="/puma.svg"
                alt="Puma"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full max-w-[80px] object-contain md:max-w-[100px] lg:max-w-[120px]"
              />
            </div>
            <p className="text-center text-sm font-medium md:text-base">Puma</p>
          </div>
        </div>
        <div className="w-32 flex-shrink-0 md:w-40 lg:w-48">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-[#F1F1F1] p-4 md:h-40 md:w-40 lg:h-48 lg:w-48">
              <Image
                src="/newbalance.svg"
                alt="New Balance"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full max-w-[80px] object-contain md:max-w-[100px] lg:max-w-[120px]"
              />
            </div>
            <p className="text-center text-sm font-medium md:text-base">
              New Balance
            </p>
          </div>
        </div>
        <div className="w-32 flex-shrink-0 md:w-40 lg:w-48">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-[#F1F1F1] p-4 md:h-40 md:w-40 lg:h-48 lg:w-48">
              <Image
                src="/converse.svg"
                alt="Converse"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full max-w-[80px] object-contain md:max-w-[100px] lg:max-w-[120px]"
              />
            </div>
            <p className="text-center text-sm font-medium md:text-base">
              Converse
            </p>
          </div>
        </div>
        <div className="w-32 flex-shrink-0 md:w-40 lg:w-48">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-[#F1F1F1] p-4 md:h-40 md:w-40 lg:h-48 lg:w-48">
              <Image
                src="/polo.svg"
                alt="Polo"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full max-w-[40px] object-contain md:max-w-[55px] lg:max-w-[70px]"
              />
            </div>
            <p className="text-center text-sm font-medium md:text-base">Polo</p>
          </div>
        </div>
        <div className="w-32 flex-shrink-0 md:w-40 lg:w-48">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-[#F1F1F1] p-4 md:h-40 md:w-40 lg:h-48 lg:w-48">
              <Image
                src="/zara.svg"
                alt="Zara"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full max-w-[80px] object-contain md:max-w-[100px] lg:max-w-[120px]"
              />
            </div>
            <p className="text-center text-sm font-medium md:text-base">Zara</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsList;
