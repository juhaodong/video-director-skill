import { Config } from "@remotion/cli/config";

// The default headless shell can crash on macOS (missing icudtl.dat); Chrome for Testing works.
Config.setChromeMode("chrome-for-testing");
