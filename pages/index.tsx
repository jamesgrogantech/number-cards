import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { toPDF } from "../utils/toPDF";
import * as XLSX from "xlsx";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Student } from "../types/student";

const Home: NextPage = () => {
  const [start, setStart] = useState(1000);
  const [end, setEnd] = useState(1250);
  const [fontSize, setFontSize] = useState(100);
  const [withLines, setWithLines] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      setExcelFile(file);
    }
  };

  const parseExcel = (file: File, callback: (students: Student[]) => void) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<string[] | number[]>(worksheet, {
        header: 1,
      });
      const students: Student[] = rows.map((row) => ({
        name: row[0] as string,
        number: row[1] as number,
      }));
      callback(students);
    };
    reader.readAsArrayBuffer(file);
  };

  const createStudentPDF = (students: Student[]) => {
    toPDF({ fontSize, withLines, studentData: students });
  };

  return (
    <div>
      <Head>
        <title>Number Cards</title>
        <meta
          name="description"
          content="Creates a PDF download for cards between a number range"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-4xl p-6 m-auto">
        <h1 className="text-3xl">Number Cards</h1>
        <p className="mt-2">
          Enter the starting and ending numbers and click download to produce a
          PDF
        </p>
        <div className="px-4 py-4 ring-1 rounded mt-10 flex gap-6 flex-wrap">
          <div>
            <label htmlFor="start" className="text-sm block pl-2 pb-1">
              Start
            </label>
            <input
              type="number"
              id="start"
              className="border-gray-400 border-[1px] p-2 rounded w-20"
              value={start}
              onChange={(e) => setStart(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="start" className="text-sm block pl-2 pb-1">
              End
            </label>
            <input
              type="number"
              id="end"
              className="border-gray-400 border-[1px] p-2 rounded w-20"
              value={end}
              onChange={(e) => setEnd(Number(e.target.value))}
            />
          </div>
          <div className="grow flex items-end">
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 active:bg-blue-700"
              onClick={() => {
                if (excelFile) parseExcel(excelFile, createStudentPDF);
                else toPDF({ start, end, fontSize, withLines });
              }}
            >
              Download
            </button>
          </div>
          <button onClick={() => setExpanded(!expanded)}>
            <div className="flex gap-2 items-center">
              {expanded ? <MdExpandLess /> : <MdExpandMore />}
              Advanced
            </div>
          </button>
          {expanded && (
            <div className="w-full">
              <hr />
              <div className="flex gap-6 mt-6 flex-wrap">
                <div>
                  <label htmlFor="start" className="text-sm block pl-2 pb-1">
                    Font Size
                  </label>
                  <input
                    type="number"
                    id="fontSize"
                    className="border-gray-400 border-[1px] p-2 rounded w-20"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label htmlFor="start" className="text-sm block pl-2 pb-1">
                    With Lines
                  </label>
                  <input
                    type="checkbox"
                    id="withLines"
                    checked={withLines}
                    className="ml-2 mt-3 form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer rounded"
                    onChange={(e) => setWithLines(e.target.checked)}
                  />
                </div>
                {/* <div className="flex items-center gap-2">
                  <label htmlFor="withLines" className="text-lg cursor-pointer">
                    Upload Data
                  </label>
                  <input type="file" onChange={handleFileUpload} />
                </div> */}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
