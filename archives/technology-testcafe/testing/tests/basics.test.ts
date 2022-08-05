import { Selector } from 'testcafe';

fixture`Getting Started`
    .page`http://localhost:3000`;

test('Can Change Page Text', async t => {
    const getHeader = async () => {
        const pageHeader = await Selector('#page-header')
        let headerText = await pageHeader.innerText;
        return headerText
    }

    await t
        .expect(await getHeader())
        .eql("Hello World!")

    await t
        .typeText('#name', 'John')
        .click('#submit')

    await t
        .expect(await getHeader())
        .eql("Hello John!")
});

test('Cannot name yourself a number', async t => {
    const getHeader = async () => {
        const pageHeader = await Selector('#page-header')
        let headerText = await pageHeader.innerText;
        return headerText
    }

    await t
        .expect(await getHeader())
        .eql("Hello World!")

    await t
        .setNativeDialogHandler((type) => type === 'alert' ? true : null)
        .typeText('#name', '123')
        .click('#submit')

    const result = await t.getNativeDialogHistory()
    console.log(result)
    await t.expect(result[0].type).eql('alert')
});

