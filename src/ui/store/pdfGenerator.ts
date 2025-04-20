import { jsPDF } from "jspdf";

export const generatePDF = (content: string) => {
  const doc = new jsPDF();

  doc.text(content, 10, 10);
  doc.save("document.pdf");
};
