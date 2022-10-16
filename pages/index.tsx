import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { toPDF } from "../utils/toPDF";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
const Home: NextPage = () => {
  const [start, setStart] = useState(1000);
  const [end, setEnd] = useState(1250);
  const [fontSize, setFontSize] = useState(30);
  const [withLines, setWithLines] = useState(true);
  const [expanded, setExpanded] = useState(false);
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
        <div className="px-4 py-6 ring-1 rounded mt-10 flex gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <label htmlFor="start" className="text-lg">
              Start
            </label>
            <input
              type="number"
              id="start"
              className="border-gray-400 border-[1px] p-2 rounded"
              value={start}
              onChange={(e) => setStart(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="end" className="text-lg">
              End
            </label>
            <input
              type="number"
              id="end"
              className="border-gray-400 border-[1px] p-2 rounded"
              value={end}
              onChange={(e) => setEnd(Number(e.target.value))}
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 active:bg-blue-700"
            onClick={() => toPDF(start, end, fontSize, withLines)}
          >
            Download
          </button>
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
                <div className="flex items-center gap-2">
                  <label htmlFor="fontSize" className="text-lg">
                    Font Size
                  </label>
                  <input
                    type="number"
                    id="fontSize"
                    className="border-gray-400 border-[1px] p-2 rounded"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="withLines" className="text-lg cursor-pointer">
                    With Lines
                  </label>
                  <input
                    type="checkbox"
                    id="withLines"
                    checked={withLines}
                    className="ml-2"
                    onChange={(e) => setWithLines(e.target.checked)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
