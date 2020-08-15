// test.setup.js
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;

global.window = window;
global.document = document;
global.HTMLElement = window.HTMLElement;
global.navigator = {
  userAgent: 'node.js',
};
