import * as util from 'gulp-util';
import * as gulp from 'gulp';
import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';
import { Stream } from 'stream';
import { File } from 'gulp-util';
import Config from '../../config';

const convert = require('gulp-convert');

export = () => {
  const packageJsonPath = join(process.cwd(), 'package.json');
  const dependenciesSection = 'dependencies';

  let packageJson: any;

  try {
    packageJson = JSON.parse(readFileSync(packageJsonPath).toString());
  } catch (e) {
    util.log('Cannot load package.json file: ' + e.toString());
    return;
  }

  if (!packageJson[dependenciesSection]) {
    throw new Error(`Cannot find ${dependenciesSection} section in package.json file`);
  }

  let dependencies = packageJson[dependenciesSection];
  let dependenciesNames: string[] = Object.keys(dependencies);

  let dependenciesInfoArray = dependenciesNames.map((name: string) => {
    let dependenceInfo: any = JSON.parse(execSync(`npm info ${name} --json`).toString());
    let version = dependencies[name];
    return {
      'Category': 'Library',
      'Name': dependenceInfo.name,
      'Description': dependenceInfo.description,
      'Version': version,
      'License': dependenceInfo.license,
      'URL': (dependenceInfo.homepage && dependenceInfo.homepage.length) ?
        dependenceInfo.homepage : dependenceInfo.repository.url,
      'Comment': ''
    };
  });

  if (dependenciesInfoArray.length) {

    let fields = Object.keys(dependenciesInfoArray[0]);
    let header = fields.reduce((acc: any, name: string) => {
      acc[name] = name;
      return acc;
    }, {});

    let json = JSON.stringify([header, ...dependenciesInfoArray]);

    let stream = new Stream();

    stream
      .pipe(convert({
        from: 'json',
        to: 'csv'
      }))
      .pipe(gulp.dest(Config.CSV_DEST_DIR));

    let file = new File({
      path: join(process.cwd(), 'licenses.json'),
      contents: new Buffer(json)
    });

    stream.emit('data', file);
    stream.emit('finish');
  }
};
