const PdfPrinter = require('pdfmake');

const fontsConfig = {
  Open_Sans: {
    normal: 'opensans-regular.woff',
    bold: 'opensans-bold.woff',
    italics: 'OpenSans-Italic.woff',
    bolditalics: 'opensans-bold.woff'
  },
  PT_Sans: {
    normal: 'pt_sans-regular.woff',
    bold: 'pt_sans-bold.woff',
    italics: 'pt_sans-regular.woff',
    bolditalics: 'pt_sans-bold.woff'
  }
};

const loadFonts = () => {
  const vfs = {};
  for (const fontFamily in fontsConfig) {
    if (!vfs[fontFamily]) vfs[fontFamily] = {};
    for (const fontType in fontsConfig[fontFamily]) {
      const file = fontsConfig[fontFamily][fontType];
      vfs[fontFamily][fontType] = `src/fonts/${fontFamily}/${file}`;
    }
  }
  return vfs;
};

const fonts = loadFonts();
const printer = new PdfPrinter(fonts);

module.exports = printer;
