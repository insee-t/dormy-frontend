"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Page() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signIn("google", { callbackUrl: "/protected" });
    } catch (err) {
      setError("ไม่สามารถเข้าสู่ระบบด้วย Google ได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#01BCB4] flex flex-col">
      {/* Header Section */}
      <div className="max-w-screen-xl sm:px-8 lg:px-16 mx-auto text-white flex justify-between px-6 items-center">
        <div />
      </div>

      {/* Main Content: Centered Vertically and Horizontally */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-7xl w-full p-6 gap-8 flex flex-col sm:flex-row items-center">
          {/* Left Section: Logo and Title */}
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
                <h1 className="text-white text-3xl mb-4 hidden sm:block">
                  ระบบจัดการหอพัก อพาร์ทเมนท์
                </h1>
              </div>
            </div>
          </div>

          {/* Right Section: White Box with Google Login */}
          <div className="w-1/2 flex justify-center">
            <div className="bg-white-500 rounded-lg shadow-lg w-full max-w-md p-8">
              <h2 className="text-xl font-semibold text-center mb-6">
                เลือกวิธีเข้าสู่ระบบ
              </h2>
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                {loading ? (
                  "กำลังโหลด..."
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 48 48">
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      />
                      <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                    <span>เข้าสู่ระบบด้วย Google</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
