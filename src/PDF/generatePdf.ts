import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import React, { SetStateAction } from 'react'




const generatePdf = (capture : HTMLDivElement | null, setLoader:React.Dispatch<SetStateAction<boolean>>) => {
    setLoader(true);
    if (capture)
      html2canvas(capture).then(async (canvas) => {
        const imgData = canvas.toDataURL("img/png");
        const doc = new jsPDF("p", "mm", "a4");
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 5;
        doc.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );

        const fileName = String(new Date().valueOf());
        await doc.save(fileName, { returnPromise: true });
        window.open(doc.output('bloburl', { filename: fileName })  , "_blank");

        setLoader(false);
      });
}

export default generatePdf