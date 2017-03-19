import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';
// import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  CSV_DEST_DIR = `${this.DIST_DIR}/csv`;
  FONTS_DEST = `${this.APP_DEST}/fonts`;
  FONTS_SRC = [
    'node_modules/bootstrap/dist/fonts/**',
    'node_modules/font-awesome/fonts/**',
  ];

  constructor() {
    super();
    this.APP_TITLE = 'DEMO';
    this.ENABLE_SCSS = true;

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      { src: 'jquery/dist/jquery.min.js', inject: 'libs' },
      { src: 'traceur/bin/traceur.js', inject: 'libs' },
      { src: 'bootstrap/dist/css/bootstrap.min.css', inject: true },
      { src: 'font-awesome/css/font-awesome.min.css', inject: true },
      { src: 'animate.css/animate.min.css', inject: true },
      { src: 'awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css', inject: true },
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // Styles
      { src: `${this.ASSETS_SRC}/app.${ this.getInjectableStyleExtension() }`, inject: true },
    ];

    let additionalPackages: ExtendPackages[] = [{
      name: 'ng2-translate',
      path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js',
      packageMeta: {
        main: 'ng2-translate.js',
        defaultExtension: 'js'
      }
    }];

    this.addPackagesBundles(additionalPackages);

    /* Add to or override NPM module configurations: */
    this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], {
      socket: {
        domain: 'localhost:5555'
      }
    });
  }

}
