#!/usr/bin/env node

const c = require('./argsAndOpts');
const p = require('puppeteer');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 *
 * @param file
 * @param config
 * @return {Promise<void>}
 */
async function generatePdf(file, config) {
  try {
    const launchConfig = {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    };

    if (config.executablePath) {
      console.log('Using Chrome executable at: ' + config.executablePath);
      launchConfig.executablePath = config.executablePath;
    }

    const browser = await p.launch(launchConfig);
    const page = await browser.newPage();
    await page.goto(file, { waitUntil: 'networkidle0', timeout: 0 });
    await page.pdf(config);
    await browser.close();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

/**
 *
 * @param file
 */
const action = function (file) {
  const config = c.opts();

  console.log(`Converting file ${file} to ${config.out}.`);
  console.log(config);

  config.timeout = config.timeout > 0 ? config.timeout : 120000;

  // Adjust configuration parameter names to what puppeteer expects
  config.path = config.out;

  // Get the margins
  config.margin = {};
  ['top', 'left', 'right', 'bottom'].forEach((side) => {
    const optName = 'margin' + capitalize(side);

    if (config[optName]) {
      const optValue = config[optName];
      config.margin[side] = optValue;
      console.log(optName + ' = ' + optValue);
    }
  });

  generatePdf(file, config).then(() => {
    console.log('Done!');
    process.exit(0);
  });
};

c.action(action).parse(process.argv);
