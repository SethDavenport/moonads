require('ts-node/register');
const { SpecReporter } = require('jasmine-spec-reporter');
const Jasmine = require('jasmine');

const runner = new Jasmine();

global.jasmine = runner.jasmine;

runner.loadConfig({
  spec_dir: 'src',
  spec_files: [ '**/*.spec.ts' ]
});

runner.clearReporters();
runner.addReporter(new SpecReporter());
runner.execute();
