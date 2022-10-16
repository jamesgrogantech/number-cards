import jsPDF from "jspdf";

export function toPDF(
  start: number,
  end: number,
  fontSize: number,
  withLines: boolean
) {
  // create a jsPDF instance with 4 numbers per page from the start to the end
  const doc = new jsPDF("l");
  const docWidth = doc.internal.pageSize.getWidth();
  const docHeight = doc.internal.pageSize.getHeight();
  const docleftCenter = docWidth / 4;
  const docrightCenter = (docWidth / 4) * 3;
  const docTopCenter = docHeight / 4;
  const docBottomCenter = (docHeight / 4) * 3;
  doc.setFontSize(fontSize);
  for (let i = start; i <= end; i += 4) {
    // place 4 numbers per page
    doc.text(`${i}`, docleftCenter, docTopCenter, { align: "center" });
    if (i + 1 <= end) {
      doc.text(`${i + 1}`, docrightCenter, docTopCenter, { align: "center" });
    }
    if (i + 2 <= end) {
      doc.text(`${i + 2}`, docleftCenter, docBottomCenter, { align: "center" });
    }
    if (i + 3 <= end) {
      doc.text(`${i + 3}`, docrightCenter, docBottomCenter, {
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
  doc.save("numbers.pdf");
}
