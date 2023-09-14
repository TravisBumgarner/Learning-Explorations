import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styled from 'styled-components'
import "react-pdf/dist/esm/Page/TextLayer.css";

const PAGE_HEIGHT = 500

const PDF = () => {
  const [numPages, setNumPages] = useState<number>();
  const [scrollTop, setScrollTop] = useState(0);

  // const [actualSize, setActualSize] = useState<{width: number, height: number}>({width: 0, height: 0})
  const [width, setWidth] = useState<number>(0)

  const onDocumentLoadSuccess = async (pdf: any) => {
    console.log(pdf)
    const page = await pdf.getPage(2)
    console.log(page.height, page.width)
    setNumPages(pdf.numPages);
  }

  const onPageClick = (event: any) => {
    var bounds = event.target.getBoundingClientRect();
    var x = event.clientX - bounds.left;
    var y = event.clientY - bounds.top;
    console.log('Relative to box', x, y)

    // Don't add X, just add Y
    const xPos = x
    const yPos = y + scrollTop
    console.log('relative to document', xPos, yPos)

    const pageClicked = Math.floor(yPos / PAGE_HEIGHT) + 1 // Yay for 1-indexing
    const positionOnPage = yPos % PAGE_HEIGHT

    console.log('Page Clicked', pageClicked, 'position on page', positionOnPage)
  }

  const onPageLoadSuccess = async (page: any) => {
    console.log(page.height, page.width)
    // setActualSize({width: page.width, height: page.height})
    setWidth(page.width)
  }

  const handleOnScroll = (event: any) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <Wrapper>
      <div>
        <p>Details</p>
        <ul>
          <li>scrollTop: {scrollTop}</li>
        </ul>
      </div>
      <PDFWrapper onScroll={handleOnScroll}>
        <Document file="http://localhost:8080/static/2page.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          {
            Array.from(new Array(numPages), (el, index) => (
              <Page onClick={onPageClick} onLoadSuccess={onPageLoadSuccess} height={PAGE_HEIGHT} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
            ))
          }
        </Document>
      </PDFWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const PDFWrapper = styled.div`
  border: 2px solid black;
  height: ${PAGE_HEIGHT}px;
  overflow: scroll;
`


export default PDF