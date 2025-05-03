import { SignIn } from '@clerk/nextjs'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="min-h-screen bg-[#01BCB4]">
        {/* <div className="h-1"></div> */}
        <div className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto text-white-500 flex justify-between px-24 items-center">
        <div/>
          <div className="flex-col mt-8">
            <div className="text-2xl">เข้าสู่ระบบ</div>
            <MoveRight size={48} className="mx-auto" />
          </div>
        </div>
      <div className="flex items-center justify-center mt-12">
        <div className="max-w-7xl w-full p-6  gap-8 flex flex-col sm:flex-row items-center sm:items-normal">
          <div className="w-1/2 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="flex-col">
                <div className="mb-6 hidden sm:block">
                  <img
                    src="/assets/Logo_vertical_white.png"
                    alt="Dormy Icon"
                    width={400}
                    height={300}
                  />
                </div>
                {/* <div className="mb-12 text-white-500 font-nunito text-8xl mx-auto w-full text-center">Dormy</div> */}
                <h1 className="text-white-500 text-3xl mb-4 hidden sm:block">ระบบจัดการหอพัก อพาร์ทเมนท์</h1>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center">
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
};
