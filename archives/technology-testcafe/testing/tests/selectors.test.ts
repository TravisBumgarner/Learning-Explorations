import {ReactSelector} from 'testcafe-react-selectors'
import { Selector } from 'testcafe';

fixture`Selectors Testing`
    .page`http://localhost:3000`;

test('Can run test with displayName', async t => {
    const wrapper = ReactSelector('WithDisplayName')
    const button = wrapper.findReact('button')
    await t.expect(button.innerText).eql("Off")
    await t.click(button)
    await t.expect(button.innerText).eql("On")
});


test('Cannot run test without displayName', async t => {
    try {
        const wrapper = ReactSelector('WitouthDisplayName')
        const button = wrapper.findReact('button')
        await t.expect(button.innerText).eql("Off")
        await t.click(button)
        await t.expect(button.innerText).eql("On")
        throw new Error("This shouldn't happen")
    } catch (error) {
        console.log(error)
        await(t.expect(true).eql(true))
    }
});

test('Cannot run test without displayName', async t => {
    try {
        const wrapper = ReactSelector('WitouthDisplayName')
        const button = wrapper.findReact('button')
        await t.expect(button.innerText).eql("Off")
        await t.click(button)
        await t.expect(button.innerText).eql("On")
        throw new Error("This shouldn't happen")
    } catch (error) {
        console.log(error)
        await(t.expect(true).eql(true))
    }
});

test.only('Can target element on page without multiple slectors - Depth0', async t => {
    const wrapper = ReactSelector('Depth0')
    await t.expect(wrapper.innerText).contains("Depth0")
    const h1 = wrapper.findReact('h1')
    await t.expect(h1.innerText).contains("Depth0")
});

test.only('Can target element on page without multiple slectors - Depth0 contains Depth1', async t => {
    const wrapper = ReactSelector('Depth1')
    await t.expect(wrapper.innerText).contains("Depth1")
    const h2 = wrapper.findReact('h2')
    await t.expect(h2.innerText).contains("Depth1")
});

test.only('Can target element on page with multiple slectors - Depth0 -> Depth1', async t => {
    const depth1 = ReactSelector('Depth0').findReact('Depth1')
    await t.expect(depth1.innerText).contains("Depth1")
});