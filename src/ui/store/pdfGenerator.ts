import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { useTransactionsStore } from "../store/TransactionsStore";

export const generatePDF = () => {
  const doc = new jsPDF();
  const transactionStore = useTransactionsStore();

  const tableData = transactionStore.tableData;
  const userName = tableData[0]?.userName || "N/A";

  if (!tableData.length) {
    alert("No transactions available.");
    return;
  }

  // Get earliest and latest dates
  const sortedByDate = [...tableData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const startDate = dayjs(sortedByDate[0].date).format("YYYY-MM-DD");
  const endDate = dayjs(sortedByDate[sortedByDate.length - 1].date).format(
    "YYYY-MM-DD"
  );

  // Header Information
  doc.setFontSize(12);
  doc.text("Bank Statement", 14, 15);
  doc.setFontSize(10);
  doc.text(`Name: ${userName}`, 14, 22);
  doc.text(`Statement Period: ${startDate} to ${endDate}`, 14, 28);

  // Table Headers
  const headers = [["Date", "Time", "Amount", "Type", "TID"]];

  // Table Rows
  const rows = tableData.map((txn) => [
    dayjs(txn.date).format("YYYY-MM-DD"),
    dayjs(txn.date).format("HH:mm"),
    `${txn.amount} £`,
    txn.status,
    txn.tid.slice(0, 8) + "...", // Short TID
  ]);

  // Transaction Table
  autoTable(doc, {
    startY: 35,
    head: headers,
    body: rows,
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [30, 64, 175], // Tailwind deep blue
      textColor: 255,
    },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { left: 14, right: 14 },
  });

  // Signature Area
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.text("Signature: ____________________", 14, pageHeight - 20);
  doc.text(
    `Generated on: ${dayjs().format("YYYY-MM-DD HH:mm")}`,
    14,
    pageHeight - 10
  );

  // Save PDF
  doc.save(`Bank_Statement_${userName}_${endDate}.pdf`);
};
