import { useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styled from 'styled-components'
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


const PAGE_HEIGHT = 1000

type StartSelection = {
  pageNumber: number;
  itemIndex: number;
  startOffset: number
}

type EndSelection = {
  pageNumber: number;
  itemIndex: number;
  endOffset: number
}

const formatId = (pageNumber: number, itemIndex: number): TextId => {
  return `pageNumber-${pageNumber}-itemIndex-${itemIndex}`
}

type TextId = `pageNumber-${number}-itemIndex-${number}`


const PDF = () => {
  const [numPages, setNumPages] = useState<number>();
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState<{start: StartSelection, end: EndSelection} | null>(null);

  useEffect(() => {
      console.log('highlight', highlight)
    if(!highlight) {
      console.log('no highlight')
      containerRef.current?.querySelectorAll('.highlighted').forEach(item => item.classList.remove('highlighted'))
      return
    }

    const ids: TextId[] = []

    for(let itemIndex = highlight.start.itemIndex; itemIndex <= highlight.end.itemIndex; itemIndex++){
      ids.push(formatId(highlight.start.pageNumber, itemIndex))
    }
    console.log('ids gen', ids)
    console.log('containerRef?', containerRef.current?.innerHTML)
    ids.forEach(id => {
      const foundItemByQuerySelector = containerRef.current?.querySelector("span#" + id)
      const foundItemById = document.getElementById(id)
      console.log('found by id', id, foundItemById)
      console.log('found by queryselector', id, foundItemByQuerySelector)

      foundItemById?.classList.add('highlighted')
    })
  }, [highlight])

  // const [actualSize, setActualSize] = useState<{width: number, height: number}>({width: 0, height: 0})
  const itemsPerPageRef = useRef<Record<number, number>>({})

  const onDocumentLoadSuccess = async (pdf: any) => {
    console.log(pdf)
    const page = await pdf.getPage(2)
    console.log(page.height, page.width)
    setNumPages(pdf.numPages);
  }

  const handleOnScroll = (event: any) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  const updateItemsPerPageRef = (page: number, itemsPerPage: number) => {
    if(!itemsPerPageRef.current) return
    itemsPerPageRef.current[page] = itemsPerPage
  }

  useEffect(() => {
    const handleSelectionChange = () => {
      const NODE_TYPE_TEXT = 3;
      const NODE_TYPE_HTML_ELEMENT = 1;

      const s = window.getSelection();
      if (s) {
        const selection = getSelection();
        // console.log(selection)
        if (!selection) {
          console.log('no selection')
          setHighlight(null)
          return;
        }

        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

        if (selection.isCollapsed) {
          console.log('is collapsed')
          setHighlight(null)
          return;
        }

        if(!range){
          console.log('no range')
          setHighlight(null)
          return
        }

        var fragment = range.cloneContents();
        console.log('fragment', fragment)
        console.log('fragmtypey', fragment.hasChildNodes())
        console.log()
        


        if (fragment.childNodes[0].nodeType === NODE_TYPE_HTML_ELEMENT){
          const textSelection = fragment.querySelectorAll('span[data-page-number][data-item-index]');
          console.log('textSelection', textSelection)
          
          if(textSelection.length < 2){
            console.log("too few textSelectionItems")
            setHighlight(null)
            return
          }
  
          const start = {
            pageNumber: parseInt(textSelection[0].getAttribute('data-page-number') || '-1'),
            itemIndex: parseInt(textSelection[0].getAttribute('data-item-index') || '-1'),
            startOffset: range.startOffset,
          }
  
          const end = {
            pageNumber: parseInt(textSelection[textSelection.length - 1].getAttribute('data-page-number') || '-1'),
            itemIndex: parseInt(textSelection[textSelection.length - 1].getAttribute('data-item-index') || '-1'),
            endOffset: range.endOffset,
          }
  
          const isInvalid = [...Object.values(start), ...Object.values(end)].some((v) => v === -1)
          // The range.isCollapsed check above ensures the offsets are valid values.
          if (isInvalid) {
            console.log('invalid')
            setHighlight(null)
            return;
          }
          setHighlight({start, end});
        } else if(fragment.childNodes[0].nodeType === NODE_TYPE_TEXT) {
          const textSelection = range.commonAncestorContainer.parentElement;
          
          if(!textSelection) return

          const pageNumber = parseInt(textSelection.getAttribute('data-page-number') || '-1')
          const itemIndex = parseInt(textSelection.getAttribute('data-item-index') || '-1')

          const start = {
            pageNumber,
            itemIndex,
            startOffset: range.startOffset,
          }
  
          const end = {
            pageNumber,
            itemIndex,
            endOffset: range.endOffset,
          }

          const isInvalid = [...Object.values(start), ...Object.values(end)].some((v) => v === -1)
          if (isInvalid) {
            console.log('invalid')
            setHighlight(null)
            return;
          }
          setHighlight({start, end});
        } else {
          console.log('unsoported')
        }
       
      };

      
    }
    document.addEventListener('mouseup', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
    };
  }, [])

  const pages = useMemo(() => {
    return Array.from(new Array(numPages), (el, index) => (
      <Page
      key={index}
        height={PAGE_HEIGHT}
        pageNumber={index + 1}
        onGetTextSuccess={
          (params) => updateItemsPerPageRef(index + 1, params.items.length)
        }
        renderTextLayer={true}
        renderAnnotationLayer={true}
        customTextRenderer={(params) => {
          console.log("rerendering")
          const id = formatId(params.pageNumber, params.itemIndex)
          return `<span data-page-number="${index + 1}" data-item-index="${params.itemIndex}" id="${id}"> ${params.str}</span>`
        }}
      />
    ));
  }, [numPages])

  return (
    <Wrapper>
      <div>
        <p>Details</p>
        <ul>
          <li>scrollTop: {scrollTop}</li>
        </ul>
      </div>
      <PDFWrapper onScroll={handleOnScroll}>
        <Document file="http://localhost:8080/static/edited.pdf" onLoadSuccess={onDocumentLoadSuccess}>
      <div ref={containerRef} id="containerref">
          {pages}
          </div>
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

  .highlighted {
    color: red;
    border: 2px solid red;
  }
`


export default PDF