// Fake a delay of X seconds. Just to see how things run. 
// Need a column in IndexedDB for status.
// maybe a section for failures


self.onmessage = (e: MessageEvent<string>) => {
    console.log('message received')
    console.log(e.data)
};

export { };