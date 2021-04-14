const puppy  = require("puppeteer");
const fs= require("fs");
let tab;
async function main(){
    const browser = await puppy.launch({ 
        headless: false ,
        defaultViewport: false,
    });
    let pages = await browser.pages(); 
    let  tab = pages[0];
    await tab.goto("https://gaana.com/");
    let intern50button = await tab.$("a[data-value='playlist4148160']");
    let attribute = await tab.evaluate(function(ele){
        return ele.getAttribute("href");
     }, intern50button);

    await tab.goto("https://gaana.com/" + attribute);
    await tab.waitForSelector(".s_title.p_title.list.loaded div a");
    let song = await tab.$(".s_title.p_title.list.loaded div a");
    let playsong = await tab.evaluate(function(ele){
        return ele.getAttribute("href");
    },song);
    tab.goto(playsong);
    await tab.goto(playsong.replace("song","lyrics"));
    await tab.waitForSelector('.seelyrics');
    let lyric = await tab.$('.seelyrics');
    let lyrics= await tab.evaluate(el => el.textContent, lyric);
    fs.writeFileSync("Lyrics.json", JSON.stringify(lyrics));
    browser.close();
}
main();