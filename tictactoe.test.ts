import { Builder, Capabilities, By } from "selenium-webdriver"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://localhost:4000')
})

afterAll(async () => {
    await driver.quit()
})

test('I can start a game', async () => {

    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();

});

describe('a game of tic tac js', () => {

    test('x makes 3 moves', async () => {
        let upperLeft = await driver.findElement(By.id('cell-0'))
        let upperRight = await driver.findElement(By.id('cell-2'))
        let lowerRight = await driver.findElement(By.id('cell-8'))
        await upperLeft.click()
        await upperRight.click()
        await lowerRight.click()
    })

    test('confirms that moves made show x', async () => {
        let upperLeftClicked = await driver.findElement(By.id('cell-0')).getAttribute('textContent')
        let upperRightClicked = await driver.findElement(By.id('cell-2')).getAttribute('textContent')
        let lowerRightClicked = await driver.findElement(By.id('cell-8')).getAttribute('textContent')
        await expect(upperLeftClicked).toContain('X')
        await expect(upperRightClicked).toContain('X')
        await expect(lowerRightClicked).toContain('X')
    })

    test('checks to see if O makes moves after X', async () => {
        let upperMiddle = await driver.findElement(By.id('cell-1')).getAttribute('textContent')
        let middleLeft = await driver.findElement(By.id('cell-3')).getAttribute('textContent')
        let middleMiddle = await driver.findElement(By.id('cell-4')).getAttribute('textContent')
        await expect(upperMiddle).toContain('O')
        await expect(middleLeft).toContain('O')
        await expect(middleMiddle).toContain('O')
    })

})