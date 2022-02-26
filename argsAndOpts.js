const { program } = require('commander');

program.requiredOption('--out <filename>', 'Output file name.');
program.option('--landscape', 'Whether or not to print in landscape mode. Defaults to false.');
program.option('--displayHeaderFooter', 'Display header and footer. Defaults to false.');
program.option('--printBackground', 'Print background graphics. Defaults to false.');
program.option(
  '--scale <number>',
  'Scale of the webpage rendering. Defaults to 1 and is limited between 0.1 and 2.',
  parseFloat
);
program.option('--timeout <number>', 'How long we will wait for the PDF to be generated', parseInt);
program.option('--width <number>', 'Paper width with units. Defaults to 8.5in.');
program.option('--height <number>', 'Paper height with units. Defaults to 11in.');

program.option(
  '--executablePath <path>',
  "If you don't want to use the chromium that is packaged with puppeteer, enter the full path to the executable you want here."
);

program.option(
  '--format <format>',
  `Page format. This takes precedence over height/width. Options are 
"Letter" (8.5in x 11in)
"Legal" (8.5in x 14in)
"Tabloid" (11in x 17in)
"Ledger" (17in x 11in)
"A0" (841mm x 1189mm)
"A1" (594mm x 841mm)
"A2" (420mm x 594mm)
"A3" (297mm x 420mm)
"A4" (210mm x 297mm)
"A5" (148mm x 210mm)
"A6" (105mm x 148mm)
`
);

program.option('--marginTop <string>', 'Top margin with units. Defaults to 1cm (~0.4 inches).');
program.option('--marginBottom <string>', 'Bottom margin with units. Defaults to 1cm (~0.4 inches).');
program.option('--marginLeft <string>', 'Left margin with units. Defaults to 1cm (~0.4 inches).');
program.option('--marginRight <string>', 'Right margin with units. Defaults to 1cm (~0.4 inches).');

program.option(
  '--pageRanges <string>',
  "Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to an empty string, which means 'Print all pages'."
);

program.option(
  '--headerTemplate <string>',
  `HTML template for the print header. 
Should be valid HTML markup with following classes used to inject printing values into them: 
date - formatted print date; 
title - document title; 
url - document location; 
pageNumber - current page number; 
totalPages - total pages in the document. 

For example, <span class="title"></span> would generate a span containing the title. 
Make sure margins are such that the header will fit on the page. 
You may also need to explicitly use CSS to set the font-size.
`
);

program.option(
  '--footerTemplate <string>',
  'HTML template for the print footer. Should use the same format as the `headerTemplate`. See there for more information.'
);

program.arguments('<file>');

module.exports = program;
