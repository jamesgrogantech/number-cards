import jsPDF from "jspdf";
import { Student } from "../types/student";

type Props = {
  fontSize: number;
  withLines: boolean;
} & (
  | {
      start: number;
      end: number;
      studentData?: never;
    }
  | {
      start?: never;
      end?: never;
      studentData: Student[];
    }
);

export function toPDF({ start, end, fontSize, withLines, studentData }: Props) {
  // create a jsPDF instance with 4 numbers per page from the start to the end
  const doc = new jsPDF("l", "mm", "a4");
  doc.setFont("times");
  const docWidth = doc.internal.pageSize.getWidth();
  const docHeight = doc.internal.pageSize.getHeight();
  const docleftCenter = docWidth / 4;
  const docrightCenter = (docWidth / 4) * 3;
  const docTopCenter = docHeight / 4;
  const docBottomCenter = docTopCenter * 3;
  const lineHeight = doc.getLineHeight() + 5;
  doc.setFontSize(fontSize);

  console.log(studentData);
  if (studentData) {
    const cardsPerPage = 4;

    doc.setFontSize(100);
    let pageNumber = 1;

    // create cards for each student, if the number of students is not a multiple of 4, add empty cards
    // each card has a number on one side and a name on the other side. This means each page of numbers should be followed by a page of names
    // the first page of numbers should be followed by the first page of names, the second page of numbers should be followed by the second page of names, etc.
    for (let i = 0; i < studentData.length; i += cardsPerPage) {
      // add a new page
      doc.addPage();

      // add the numbers
      for (let j = 0; j < cardsPerPage; j++) {
        if (i + j >= studentData.length) {
          break;
        }
        const x = (docWidth / 4) * (j % 2);
        const y = (docHeight / 4) * Math.floor(j / 2);
        doc.text(`${studentData[i + j].number}`, x / 2, y / 2, {
          align: "center",
        });
      }

      // add a new page
      doc.addPage();

      // add the names
      for (let j = 0; j < cardsPerPage; j++) {
        if (i + j >= studentData.length) break; // don't add empty cards (if the number of students is not a multiple of 4
        const x = (docWidth / 4) * (j % 2);
        const y = (docHeight / 4) * Math.floor(j / 2);
        doc.text(`${studentData[i + j].name}`, x / 2, y / 2, {
          align: "center",
        });
      }
    }
  } else {
    if (start > end) {
      alert("Start must be less than end.");
      return;
    }
    if (start < 1) {
      alert("Start must be greater than 0.");
      return;
    }
    for (let i = start; i <= end; i += 4) {
      doc.text(`${i}`, docleftCenter, docTopCenter + lineHeight / 2, {
        align: "center",
      });
      if (i + 1 <= end) {
        doc.text(`${i + 1}`, docrightCenter, docTopCenter + lineHeight / 2, {
          align: "center",
        });
      }
      if (i + 2 <= end) {
        doc.text(`${i + 2}`, docleftCenter, docBottomCenter + lineHeight / 2, {
          align: "center",
        });
      }
      if (i + 3 <= end) {
        doc.text(`${i + 3}`, docrightCenter, docBottomCenter + lineHeight / 2, {
          align: "center",
        });
      }
      if (withLines) {
        doc.line(0, docTopCenter * 2, docWidth, docTopCenter * 2);
        doc.line(docWidth / 2, 0, docWidth / 2, docHeight);
      }
      if (i + 4 <= end) {
        // add a new page
        doc.addPage();
      }
    }
  }
  doc.save("numbers.pdf");
}
