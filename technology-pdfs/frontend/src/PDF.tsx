import { useState } from 'react';
import {Document, Page, pdfjs } from 'react-pdf';
import styled from 'styled-components'
import "react-pdf/dist/esm/Page/TextLayer.css";

const DESIRED_HEIGHT = 500

const PDF = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  // const [actualSize, setActualSize] = useState<{width: number, height: number}>({width: 0, height: 0})
  const [width, setWidth] = useState<number>(0)

  const onDocumentLoadSuccess = async (pdf: any) => {
    console.log(pdf)
    const page = await pdf.getPage(2)
    console.log(page.height, page.width)
    setNumPages(pdf.numPages);
  }

  const onPageLoadSuccess = async (page: any) => {
    console.log(page.height, page.width)
    // setActualSize({width: page.width, height: page.height})
    setWidth(page.width)
  }

  return (
    <Wrapper>
      <PDFWrapper>
      <Document file="http://localhost:8080/static/2page.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page onLoadSuccess={onPageLoadSuccess} height={DESIRED_HEIGHT} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button onClick={() => setPageNumber(pageNumber - 1)}>Prev</button>
      <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
      </PDFWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PDFWrapper = styled.div`
  border: 2px solid black;
  height: ${DESIRED_HEIGHT}px;
`


export default PDF