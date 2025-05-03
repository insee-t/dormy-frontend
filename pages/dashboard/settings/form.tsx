import { HeroUIProvider } from "@heroui/react";
import App from "../../../components/Sidebar/App";
import { Input } from "rsuite";
import { useState } from "react";
import SettingNav from "../../../components/settingnav";

export default function () {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon",
  ];
  const validFileType = (file) => fileTypes.includes(file.type);

  const returnFileSize = (number) => {
    if (number < 1e3) {
      return `${number} bytes`;
    } else if (number >= 1e3 && number < 1e6) {
      return `${(number / 1e3).toFixed(1)} KB`;
    } else {
      return `${(number / 1e6).toFixed(1)} MB`;
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    // Reset message if files change
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle file upload via API if needed.
    
  };

  return (
    <HeroUIProvider>
      <App title="บิล">

        <SettingNav/>
        <div className="bg-white-500 rounded-md shadow-md mb-4 p-4 flex justify-center items-center w-full text-2xl">
          บิล
        </div>

        {/*  form field*/}
        <div className="bg-white-500 flex flex-col p-2 sm:p-4  rounded-md shadow-md w-full">
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full flex-col mb-2">
              <div className="mb-1">ประเภทธุรกิจ</div>
              <input
                type="text"
                placeholder="ประเภทธุรกิจ"
                className="border-1 rounded-md  border-gray-400 p-2"
                required
              />
            </div>

            <div className="flex w-full flex-col mb-2">
              <div className="mb-1">ชื่อบริษัท / ชื่อเต็มที่ </div>
              <input
                type="text"
                placeholder="ชื่อบริษัท / ชื่อเต็มที่ "
                className="border-1 rounded-md  border-gray-400 p-2"
                required
              />
            </div>

            <div className="flex w-full flex-col mb-2">
              <div className="mb-1">ที่อยู่</div>
              <textarea
                typeof="number"
                placeholder="ที่อยู่"
                className="border-1 rounded-md  border-gray-400 p-2"
                rows={5}
              />
            </div>

            <div className="flex w-full flex-col mb-2">
              <div className="mb-1">เลขประจำตัวผู้เสียภาษี</div>
              <input
                type="text"
                placeholder="เลขประจำตัวผู้เสียภาษี"
                className="border-1 rounded-md  border-gray-400 p-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row">
              <div className="flex w-full flex-col mb-2 mr-2">
                <div className="mb-1">เบอร์โทร</div>
                <input
                  maxLength={10}
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="เบอร์โทร"
                  className="border-1 rounded-md  border-gray-400 p-2"
                    pattern="[0-9]{10}"
                />
                <label form="phone"></label>
              </div>
              <div className="flex w-full flex-col mb-2">
                <div className="mb-1">อีเมล</div>
                <label form="email"></label>
                <input
                  type="email"
                  id="email"
                  placeholder="อีเมล"
                  className="border-1 rounded-md  border-gray-400 p-2"
                  pattern=".+@gmail\.com"
                />
              </div>
            </div>

            <div className="flex w-full flex-col mb-4">
              <div className="mb-2">โลโก้หอพัก/บริษัท</div>

              <div className="mb-4">
                <label
                  htmlFor="image_uploads"
                  className="bg-custom-what text-white-300 p-2 rounded-md hover:bg-custom-is active:bg-blue-500 cursor-pointer mb-2"
                >
                  อัพโหลดรูป (PNG, JPG)
                </label>
                <input
                  type="file"
                  id="image_uploads"
                  name="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  onChange={handleFileChange}
                  className="hidden mb-2"
                />
              </div>

              <div className="preview mb-3 rounded-md ">
                {files.length === 0 ? (
                  <p className=" flex justify-between p-2 w-full md:w-1/2 rounded-md text-gray-400">
                    -- ยังไม่มีไฟล์ที่อัปโหลด --
                  </p>
                ) : (
                  <ol>
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex flex-col  p-2"
                      >
                        {validFileType(file) ? (
                          <>
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-1/2 md:w-1/6 h-auto"
                            />
                            <p>
                              {file.name}, file size {returnFileSize(file.size)}
                              .
                            </p>
                          </>
                        ) : (
                          <p>
                            File name {file.name}: Not a valid file type. Update
                            your selection.
                          </p>
                        )}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-custom-is text-white-500 font-bold py-1 px-2 rounded-md hover:bg-[#ffae86] active:bg-[#ffae86]"
              >
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </App>
    </HeroUIProvider>
  );
}