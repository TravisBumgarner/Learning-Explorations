import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import styled from 'styled-components'
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const PAGE_HEIGHT = 400

const WINDOW = 5 // Window should be an odd number where it's the sum of prevPages + current + nextPages rendered
const lookAroundSize = (WINDOW - 1) / 2

// On Page 1, you can't look back to negative pages. So really, what we need to check on render is this
const targetPagesRendered = lookAroundSize + 1

if (lookAroundSize !== Math.floor(lookAroundSize)) {
  throw new Error('Window should be an odd number')
}

const PerformantPage = ({ pageToRender, currentPage, handleAnnotationLayerSuccess, handleTextLayerSuccess, handleRenderSuccess }: { pageToRender: number; currentPage: number, handleAnnotationLayerSuccess: () => void, handleTextLayerSuccess: () => void, handleRenderSuccess: () => void }) => {
  console.log(lookAroundSize)
  if (pageToRender < currentPage - lookAroundSize || pageToRender > currentPage + lookAroundSize) {
    return <EmptyPage id={`page-${pageToRender}`} />
  }

  return (
    <div id={`page-${pageToRender}`}>
      <Page
        key={pageToRender}
        height={PAGE_HEIGHT}
        pageNumber={pageToRender}
        renderTextLayer={true}
        renderAnnotationLayer={true}
        onRenderAnnotationLayerSuccess={() => console.log('rendered page', pageToRender)}
        customTextRenderer={(params) => {
          const id = formatId(params.pageNumber, params.itemIndex)
          return `<span data-page-number="${pageToRender}" data-item-index="${params.itemIndex}" id="${id}"> ${params.str}</span>`
        }}
        onGetAnnotationsSuccess={handleAnnotationLayerSuccess}
        onRenderTextLayerSuccess={handleTextLayerSuccess}
        onRenderSuccess={handleRenderSuccess}
      />
    </div>
  )
}

const EmptyPage = styled.div`
  height: ${PAGE_HEIGHT}px;
`

const formatId = (pageNumber: number, itemIndex: number): TextId => {
  return `pageNumber-${pageNumber}-itemIndex-${itemIndex}`
}

type TextId = `pageNumber-${number}-itemIndex-${number}`

const PDF = ({ pdfPath }: { pdfPath: string }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesRendered, setPagesRendered] = useState<number>(0);
  const [annotationLayersRendered, setAnnotationLayersRendered] = useState<number>(0);
  const [textLayersRendered, setTextLayersRendered] = useState<number>(0);
  const [renderDuration, setRenderDuration] = useState<number>(0)

  const appRenderedAt = useMemo(() => new Date(), [])

  const onDocumentLoadSuccess = async (pdf: any) => {
    console.log('end')
    setNumPages(pdf.numPages);

    const newRenderDuration = new Date().getTime() - appRenderedAt.getTime()
    setRenderDuration(newRenderDuration)
  }

  useEffect(() => {
    if (annotationLayersRendered === targetPagesRendered && textLayersRendered === targetPagesRendered && pagesRendered === targetPagesRendered) {
      setRenderDuration(new Date().getTime() - appRenderedAt.getTime())
    }
  }, [annotationLayersRendered, textLayersRendered, pagesRendered, appRenderedAt])


  const handleRenderSuccess = useCallback(() => setPagesRendered((prev) => prev + 1), []);
  const handleAnnotationLayerSuccess = useCallback(() => setAnnotationLayersRendered((prev) => prev + 1), []);
  const handleTextLayerSuccess = useCallback(() => setTextLayersRendered((prev) => prev + 1), []);

  const pages = useMemo(() => {
    return Array.from(new Array(numPages), (el, index) => (
      <PerformantPage key={index} pageToRender={index + 1} currentPage={currentPage} handleAnnotationLayerSuccess={handleAnnotationLayerSuccess} handleRenderSuccess={handleRenderSuccess} handleTextLayerSuccess={handleTextLayerSuccess} />
    ));
  }, [numPages, currentPage, handleRenderSuccess, handleAnnotationLayerSuccess, handleTextLayerSuccess])

  const handleScroll = () => {
    let pageNumber = 1;
    for (let i = 1; i <= numPages; i++) {
      const pageElement = document.getElementById(`page-${i}`);
      if (pageElement && pageElement.getBoundingClientRect().top <= 0) {
        pageNumber = i;
      } else {
        break;
      }
    }
    setCurrentPage(pageNumber);
    console.log(currentPage)
  }

  return (
    <Wrapper>
      <ul>
        <li>Text Layers: {textLayersRendered} / {targetPagesRendered} {textLayersRendered === targetPagesRendered ? "✅" : "❌"}</li>
        <li>Annotation Layers: {annotationLayersRendered} / {targetPagesRendered} {annotationLayersRendered === targetPagesRendered ? "✅" : "❌"}</li>
        <li>Pages: {pagesRendered} / {targetPagesRendered} {pagesRendered === targetPagesRendered ? "✅" : "❌"}</li>
        <li>Render Duration: {renderDuration}ms</li>
      </ul>
      <PDFWrapper onScroll={handleScroll}>
        <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}>
          <div ref={containerRef} id="containerref">
            {pages}
          </div>
        </Document>
      </PDFWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const PDFWrapper = styled.div`
  border: 2px solid black;
  height: ${PAGE_HEIGHT}px;
  overflow: scroll;

  .highlighted {
    color: red;
    border: 2px solid red;
  }
`

export default PDF