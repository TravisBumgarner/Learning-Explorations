// import config from './config'
import fs from 'fs'
import path from 'path'

const ONE_MEGABYTE = 1024e2

function copy(filePath: string) {
    const inputStream = fs.createReadStream(filePath)
    const fileCopyPath = filePath.split('.')[0] + '-copy.' + filePath.split('.')[1]
    const outputStream = fs.createWriteStream(fileCopyPath)

    // inputStream.pipe(outputStream)
    // Above or Below works. 
    inputStream.on('data', async (chunk) => {
        outputStream.write(chunk);
    });
    
    outputStream.on('finish', () => {
        console.log(`You have successfully created a ${filePath} copy. The new file name is ${fileCopyPath}.`);
    })
}

function read(filePath: string) {
    // Second arg can be 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'base64url' | 'latin1' | 'binary' | 'hex';
    let counter = 0;
    const readableStream = fs.createReadStream(
        filePath, 
        {
            encoding: 'utf-8',
            highWaterMark: 5 * ONE_MEGABYTE // Controls the Chunk Size. 
        }
    );

    readableStream.on('error', function (error) {
        console.log(`error: ${error.message}`);
    })

    readableStream.on('data', (chunk: string | Buffer) => {
        console.log(`chunk number ${counter++}`)
        // console.log(chunk );
    })

    readableStream.on('close', () => {
        console.log(`Finished a total of ${counter} chunks`)
    })
}

const main = () => {
    const filename = path.join(__dirname, "./lorem-ipsum.txt")
    console.log('copying file, contents:')
    read(filename)
    copy(filename)
}

export default {
    main
}