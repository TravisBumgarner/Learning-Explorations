import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styled from 'styled-components'
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


const PAGE_HEIGHT = 400

const formatId = (pageNumber: number, itemIndex: number): TextId => {
  return `pageNumber-${pageNumber}-itemIndex-${itemIndex}`
}

type TextId = `pageNumber-${number}-itemIndex-${number}`


const PDF = ({pdfPath}: {pdfPath: string}) => {
  const [numPages, setNumPages] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pagesRendered, setPagesRendered] = useState<number>(0);
  const [annotationLayersRendered, setAnnotationLayersRendered] = useState<number>(0);
  const [textLayersRendered, setTextLayersRendered] = useState<number>(0);
  const [renderDuration, setRenderDuration] = useState<number>(0)

  const appRenderedAt = useMemo(() => new Date(), [])


  const onDocumentLoadSuccess = async (pdf: any) => {
    setNumPages(pdf.numPages);
  }

  const handleRenderSuccess = useCallback(() => setPagesRendered((prev) => prev + 1), []);
  const handleAnnotationLayerSuccess = useCallback(() => setAnnotationLayersRendered((prev) => prev + 1), []);
  const handleTextLayerSuccess = useCallback(() => setTextLayersRendered((prev) => prev + 1), []);

  useEffect(() => {
    if (annotationLayersRendered === numPages && textLayersRendered === numPages && pagesRendered === numPages) {
      setRenderDuration(new Date().getTime() - appRenderedAt.getTime())
    }
  }, [annotationLayersRendered, textLayersRendered, pagesRendered, appRenderedAt, numPages])



  const pages = useMemo(() => {
    return Array.from(new Array(numPages), (el, index) => (
      <Page
      key={index}
        height={PAGE_HEIGHT}
        pageNumber={index + 1}
        renderTextLayer={true}
        renderAnnotationLayer={true}
        customTextRenderer={(params) => {
          const id = formatId(params.pageNumber, params.itemIndex)
          return `<span data-page-number="${index + 1}" data-item-index="${params.itemIndex}" id="${id}"> ${params.str}</span>`
        }}
        onGetAnnotationsSuccess={handleAnnotationLayerSuccess}
        onRenderTextLayerSuccess={handleTextLayerSuccess}
        onRenderSuccess={handleRenderSuccess} 
      />
    ));
  }, [numPages, handleRenderSuccess, handleAnnotationLayerSuccess, handleTextLayerSuccess])

  return (
    <Wrapper>
      <ul>
        <li>Text Layers: {textLayersRendered} / {numPages} {textLayersRendered === numPages ? "✅" : "❌"}</li>
        <li>Annotation Layers: {annotationLayersRendered} / {numPages} {annotationLayersRendered === numPages ? "✅" : "❌"}</li>
        <li>Pages: {pagesRendered} / {numPages} {pagesRendered === numPages ? "✅" : "❌"}</li>
        <li>Render Duration: {renderDuration}ms</li>
      </ul>
      <PDFWrapper>
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