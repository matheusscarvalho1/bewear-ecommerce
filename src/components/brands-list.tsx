import Image from "next/image";

const BrandsList = () => {
  return (
    <>
      <h3 className="px-5 font-semibold">Marcas</h3>
      <div className="flex items-center space-x-6 p-5">
        <div className="flex flex-col items-center">
          <div className="rounded-6 border border-[#F1F1F1] p-6">
            <Image src="/nike.svg" alt="Nike" width={100} height={100} />
          </div>
          <p className="font-medium">Nike</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-6 border border-[#F1F1F1] p-6">
            <Image src="/adidas-2x.png" alt="Adidas" width={100} height={100} />
          </div>
          <p className="font-medium">Adidas</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-6 border border-[#F1F1F1] p-6">
            <Image src="/puma.png" alt="Puma" width={100} height={100} />
          </div>
          <p className="font-medium">Puma</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-6 border border-[#F1F1F1] p-6">
            <Image
              src="/newbalance.svg"
              alt="New Balance"
              width={32}
              height={32}
            />
          </div>
          <p className="font-medium">New Balance</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-6 border border-[#F1F1F1] p-6">
            <Image
              src="/converse.svg"
              alt="Converse"
              width={100}
              height={100}
            />
          </div>
          <p className="font-medium">Converse</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-6 border border-[#F1F1F1] p-6">
            <Image src="/polo.svg" alt="Polo" width={100} height={100} />
          </div>
          <p className="font-medium">Polo</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-6 border border-[#F1F1F1] p-6">
            <Image src="/zara.svg" alt="Zara" width={100} height={100} />
          </div>
          <p className="font-medium">Zara</p>
        </div>
      </div>
    </>
  );
};

export default BrandsList;
